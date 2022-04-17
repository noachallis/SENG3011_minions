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
    dates = db.covidReports.distinct('date') 
    # if not error_handler.validate_date(date):
    #     response.status_code = status.HTTP_400_BAD_REQUEST
    #     return error_handler.get_error(
    #         400,
    #         "Date has to be in the following format yyyy-MM-dd and less than or equal to "
    #         + dates[len(dates)-1],
    #     )
    
    data = db.covidReports.find({ "date" : date}, {'_id': 0})

    if data is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return error_handler.get_error(404, "Not Found")
            
    return getMap(data)

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

def getMap(covid_data: dict):
    dateData = {}
    dateData['total_cases'] = 0
    total_cases = 0
    dateData['people_fully_vaccinated'] = 0
    people_fully_vaccinated = 0
    dateData['world_population'] = 0
    world_population = 0
    dateData['world_population'] = 0
    total_deaths = 0
    dateData['total_deaths'] = 0
    country_stats = []
    for d in covid_data:
        country = {}
        country['iso_code'] = d['iso_code']
        properties = {}

        ## Total Cases
        try :
            if (is_nan(d['total_cases'])):
                properties['total_cases'] = 0
            else:
                properties['total_cases'] = float(d['total_cases'])
                total_cases = total_cases + float(d['total_cases'])
        except Exception:
            properties['total_cases'] = 0
        
        ## Total People Fully Vaccinated
        try :
            if (is_nan(d['people_fully_vaccinated'])):
                properties['people_fully_vaccinated'] = 0
            else:
                properties['people_fully_vaccinated'] = float(d['people_fully_vaccinated'])
                people_fully_vaccinated = people_fully_vaccinated + float(d['people_fully_vaccinated'])
        except Exception:
            properties['people_fully_vaccinated'] = 0
                
        ## Population
        try :
            if (is_nan(d['population'])):
                properties['population'] = 0
            else:
                properties['population'] = float(d['population'])
                world_population = world_population + float(d['population'])
        except Exception:
            properties['population'] = 0

        ##  Total Deaths
        try :
            if (is_nan(d['total_deaths'])):
                properties['total_deaths'] = 0
            else:
                properties['total_deaths'] = float(d['total_deaths'])
                total_deaths = total_deaths + float(d['total_deaths'])
        except Exception:
            properties['total_deaths'] = 0
        
       

        # Fortnight Cases


        # Fortnight Vaccinated

        
        # Fortnight Deaths

        
        # Fortnight Hospitilisations
        try :
            if (is_nan(d['hosp_patients_per_million'])):
                properties['hosp_patients_per_million'] = 0
            else:
                properties['hosp_patients_per_million'] = float(d['hosp_patients_per_million'])
        except Exception:
            properties['hosp_patients_per_million'] = 0

        country['properties'] = properties   
        country_stats.append(country)

    dateData['country_stats'] = country_stats                    
    dateData['total_cases'] = total_cases
    dateData['people_fully_vaccinated'] = people_fully_vaccinated
    dateData['world_population'] = world_population
    dateData['total_deaths'] = total_deaths
    return dateData
