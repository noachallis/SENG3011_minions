from fastapi import Depends, APIRouter, Response, status, Request
from typing import Optional, List
import datetime
from pymongo import MongoClient
from src.validator import validator
from src.open_api.docs import *
import math
import re
import json
import csv
import pandas as pd
import os

def is_nan(value):
    return math.isnan(float(value))

"""
    Core Application
"""
router = APIRouter()

"""
    GLOBAL CLASSES and Variables. Used as "Services to the API"
"""
db = MongoClient().seng
total = db.covidReports.count()
string_total = str(total)
error_handler = validator.Validator()
current_date = datetime.datetime.now().strftime("%Y-%m-%d")

@router.get(
    "/v1/covid/date",
    tags=["covid"],
    responses={
        200: {"model": List[CovidData]},
        400: {"model": rahul400},
        404: {"model": rahul404},
        422: {"model": rahul404},
    },
)
async def covid_date(
    request: Request,
    response: Response,
    date: str = Query(..., description="The date in the format yyyy-mm-dd", ),
):
    data = db.covidReports.find({ "date" : date}, {'_id': 0})
    if data is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return error_handler.get_error(404, "Not Found")
            
    return getMap(data, date)

@router.get(
    "/v1/covid/dates",
    tags=["covid"],
    responses={
        200: {"model": List[str]},
        400: {"model": rahul400},
        404: {"model": rahul404},
        422: {"model": rahul404},
    },
)
async def covid_dates_set(
    request: Request,
    response: Response,
    regex: str = Query('....-..-..', description="Regex to filter available dates by", ),
):
    dates = db.covidReports.distinct('date') 
    outputDates = []
    for date in dates:
        result = re.match(regex, date)
        if result:
            outputDates.append(date)
    return outputDates


@router.put(
    "/v1/covid",
    tags=["covid"],
    responses={
        200: {"model": List[str]},
        400: {"model": rahul400},
        404: {"model": rahul404},
        422: {"model": rahul404},
    },
)

async def covid_update_data(
    request: Request,
    response: Response,
):
    db.covidReports.drop()

    try:
        db.create_collection("covidReports")
    except Exception:
        pass
    covidReports = db.covidReports
    data = pd.read_csv('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv')
    covidReports.insert_many(data.to_dict('records'))

    return {"Data Update Successful"}

def getGDP(year: str):
    __location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))
    pathname = os.path.join(__location__, 'gdpGrowthIMF-WEO.json')
    with open(pathname, 'r') as gdp_data:
        data = json.load(gdp_data)
    return data[year]["countryGDPGrowthRates"]

def getUnemployment(year: str):
    __location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))
    pathname = os.path.join(__location__, 'unemploymentILOAnnual.json')
    with open(pathname, 'r') as unemployment_data:
        data = json.load(unemployment_data)
    return data[year]["countryUnemploymentRates"]

def getMap(covid_data: dict, date: str):
    dateData = {}
    country_stats = []
    world_data_collected = False

    # Get GDP Growth
    year = date[0:4]
    GDPGrowthRates = getGDP(year)

    # Get Unemployment Rates
    year = date[0:4]
    unemploymentRates = getUnemployment(year)

    world_data = {}

    iso_codes = full_countries_list.copy()

    for d in covid_data:
        country = {}
        country['iso_code'] = d['iso_code']
        properties = {}

        # include all countries economic data
        if d['iso_code'] in iso_codes:
            iso_codes.remove(d['iso_code'])

        ## Total Cases
        try :
            if (is_nan(d['total_cases'])):
                properties['total_cases'] = 0
            else:
                properties['total_cases'] = float(d['total_cases'])
        except Exception:
            properties['total_cases'] = 0
        
        ## Total People Fully Vaccinated
        try :
            if (is_nan(d['people_fully_vaccinated'])):
                properties['people_fully_vaccinated'] = 0
            else:
                properties['people_fully_vaccinated'] = float(d['people_fully_vaccinated'])
        except Exception:
            properties['people_fully_vaccinated'] = 0
                
        ## Population
        try :
            if (is_nan(d['population'])):
                properties['population'] = 0
            else:
                properties['population'] = float(d['population'])
        except Exception:
            properties['population'] = 0

        ##  Total Deaths
        try :
            if (is_nan(d['total_deaths'])):
                properties['total_deaths'] = 0
            else:
                properties['total_deaths'] = float(d['total_deaths'])
        except Exception:
            properties['total_deaths'] = 0

        # Stringency index
        try :
            if (is_nan(d['stringency_index'])):
                properties['stringency_index'] = 0
            else:
                properties['stringency_index'] = float(d['stringency_index'])
        except Exception:
            properties['stringency_index'] = 0

        if d['iso_code'] != "OWID_WRL":
            # GDP
            try:
                countryGDP = next(item for item in GDPGrowthRates if item["iso_code"] == d['iso_code'])
                if countryGDP['rate']:
                    if countryGDP['rate'] == "no data":
                        properties['gdp_growth_rate'] = 0
                    else:
                        properties['gdp_growth_rate'] = countryGDP['rate']
                else:
                    properties['gdp_growth_rate'] = 0
            except Exception:
                properties['gdp_growth_rate'] = 0

            # Unemployment 
            if unemploymentRates != []:
                try :
                    countryUnemployment = next(item for item in unemploymentRates if item["iso_code"] == d['iso_code'])
                    properties['unemployment_rate'] = float(countryUnemployment["rate"])
                except Exception:
                    properties['unemployment_rate'] = 0
            else:
                properties['unemployment_rate'] = 0

        if d['iso_code'] == "OWID_WRL":
            world_data_collected = True
            world_data = properties
        else:
            country['properties'] = properties
            country_stats.append(country)
    
    # Add missing country economic data
    for missing_iso_code in iso_codes:
        country = {}
        country['iso_code'] = missing_iso_code
        properties = {}
        properties['total_cases'] = 0
        properties['people_fully_vaccinated'] = 0
        properties['population'] = 0
        properties['total_deaths'] = 0
        properties['stringency_index'] = 0
        try:
            countryGDP = next(item for item in GDPGrowthRates if item["iso_code"] == missing_iso_code)
            if countryGDP['rate']:
                if countryGDP['rate'] == "no data":
                    properties['gdp_growth_rate'] = 0
                else:
                    properties['gdp_growth_rate'] = countryGDP['rate']
            else:
                properties['gdp_growth_rate'] = 0
        except Exception:
            properties['gdp_growth_rate'] = 0

        # Unemployment 
        if unemploymentRates != []:
            try :
                countryUnemployment = next(item for item in unemploymentRates if item["iso_code"] == missing_iso_code)
                properties['unemployment_rate'] = float(countryUnemployment["rate"])
            except Exception:
                properties['unemployment_rate'] = 0
        else:
            properties['unemployment_rate'] = 0
        country['properties'] = properties   
        country_stats.append(country)


    if not world_data_collected:
        dateData['total_cases'] = 0
        dateData['people_fully_vaccinated'] = 0
        dateData['population'] = 0
        dateData['total_deaths'] = 0
    else: 
        dateData['total_cases'] = world_data['total_cases']
        dateData['population'] = world_data['population']
        dateData['total_deaths'] = world_data['total_deaths']
        # missing data for 2022-04-15
        if date == "2022-04-15":
            dateData['people_fully_vaccinated'] = 4621794758.0
        else:
            dateData['people_fully_vaccinated'] = world_data['people_fully_vaccinated']

    dateData['country_stats'] = country_stats
    return dateData

full_countries_list = [
  "AFG",
  "OWID_AFR",
  "ALB",
  "DZA",
  "AND",
  "AGO",
  "AIA",
  "ATG",
  "ARG",
  "ARM",
  "ABW",
  "OWID_ASI",
  "AUS",
  "AUT",
  "AZE",
  "BHS",
  "BHR",
  "BGD",
  "BRB",
  "BLR",
  "BEL",
  "BLZ",
  "BEN",
  "BMU",
  "BTN",
  "BOL",
  "BES",
  "BIH",
  "BWA",
  "BRA",
  "VGB",
  "BRN",
  "BGR",
  "BFA",
  "BDI",
  "KHM",
  "CMR",
  "CAN",
  "CPV",
  "CYM",
  "CAF",
  "TCD",
  "CHL",
  "CHN",
  "COL",
  "COM",
  "COG",
  "COK",
  "CRI",
  "CIV",
  "HRV",
  "CUB",
  "CUW",
  "CYP",
  "CZE",
  "COD",
  "DNK",
  "DJI",
  "DMA",
  "DOM",
  "ECU",
  "EGY",
  "SLV",
  "GNQ",
  "ERI",
  "EST",
  "SWZ",
  "ETH",
  "OWID_EUR",
  "OWID_EUN",
  "FRO",
  "FLK",
  "FJI",
  "FIN",
  "FRA",
  "PYF",
  "GAB",
  "GMB",
  "GEO",
  "DEU",
  "GHA",
  "GIB",
  "GRC",
  "GRL",
  "GRD",
  "GUM",
  "GTM",
  "GGY",
  "GIN",
  "GNB",
  "GUY",
  "HTI",
  "OWID_HIC",
  "HND",
  "HKG",
  "HUN",
  "ISL",
  "IND",
  "IDN",
  "OWID_INT",
  "IRN",
  "IRQ",
  "IRL",
  "IMN",
  "ISR",
  "ITA",
  "JAM",
  "JPN",
  "JEY",
  "JOR",
  "KAZ",
  "KEN",
  "KIR",
  "OWID_KOS",
  "KWT",
  "KGZ",
  "LAO",
  "LVA",
  "LBN",
  "LSO",
  "LBR",
  "LBY",
  "LIE",
  "LTU",
  "OWID_LIC",
  "OWID_LMC",
  "LUX",
  "MAC",
  "MDG",
  "MWI",
  "MYS",
  "MDV",
  "MLI",
  "MLT",
  "MHL",
  "MRT",
  "MUS",
  "MEX",
  "FSM",
  "MDA",
  "MCO",
  "MNG",
  "MNE",
  "MSR",
  "MAR",
  "MOZ",
  "MMR",
  "NAM",
  "NRU",
  "NPL",
  "NLD",
  "NCL",
  "NZL",
  "NIC",
  "NER",
  "NGA",
  "NIU",
  "OWID_NAM",
  "MKD",
  "OWID_CYN",
  "MNP",
  "NOR",
  "OWID_OCE",
  "OMN",
  "PAK",
  "PLW",
  "PSE",
  "PAN",
  "PNG",
  "PRY",
  "PER",
  "PHL",
  "PCN",
  "POL",
  "PRT",
  "PRI",
  "QAT",
  "ROU",
  "RUS",
  "RWA",
  "SHN",
  "KNA",
  "LCA",
  "SPM",
  "VCT",
  "WSM",
  "SMR",
  "STP",
  "SAU",
  "SEN",
  "SRB",
  "SYC",
  "SLE",
  "SGP",
  "SXM",
  "SVK",
  "SVN",
  "SLB",
  "SOM",
  "ZAF",
  "OWID_SAM",
  "KOR",
  "SSD",
  "ESP",
  "LKA",
  "SDN",
  "SUR",
  "SWE",
  "CHE",
  "SYR",
  "TWN",
  "TJK",
  "TZA",
  "THA",
  "TLS",
  "TGO",
  "TKL",
  "TON",
  "TTO",
  "TUN",
  "TUR",
  "TKM",
  "TCA",
  "TUV",
  "UGA",
  "UKR",
  "ARE",
  "GBR",
  "USA",
  "VIR",
  "OWID_UMC",
  "URY",
  "UZB",
  "VUT",
  "VAT",
  "VEN",
  "VNM",
  "WLF",
  "OWID_WRL",
  "YEM",
  "ZMB",
  "ZWE"
]