
import requests
import json
import datetime
import pycountry
import pandas as pd

# data structure http://dataservices.imf.org/REST/SDMX_JSON.svc/DataStructure/IFS
# data  http://dataservices.imf.org/REST/SDMX_JSON.svc/CompactData/IFS/M..LUR_PT.?startPeriod=2020&endPeriod=2023
def get_area_name(ref_area):
    c = pycountry.countries.get(alpha_2=ref_area)
    return (c.alpha_3, c.name)

quartersToMonth = {"Q1": ["01", "02", "03"], "Q2": ["04", "05", "06"], "Q3": ["07", "08", "09"], "Q4": ["10", "11", "12"]}

# base url
data_url = 'http://dataservices.imf.org/REST/SDMX_JSON.svc/'
# for IFS unemployment data
data_key = 'CompactData/IFS/Q..LUR_PT.' 
# structure_key = 'DataStructure/IFS'
# structure = (requests.get(f'{data_url}{structure_key}').json())
# codeLists = structure["Structure"]["CodeLists"]["CodeList"]

# parameters
param = 'startPeriod=2019&endPeriod=' + str(int(datetime.datetime.today().year) + 1)

# TODO: rate limited -> need to find a way to limit the calls to the api


# Navigate to series in API-returned JSON data
data = (requests.get(f'{data_url}{data_key}?{param}').json())
seriesData = data['CompactData']['DataSet']["Series"]

newData = {}
    # {time: monthly from 2020-01-01 to 2023-01-01}
    # "2020-01-01": {countryUnemploymentRates: [{nz},{aus},{}]}
    # country object = {iso, name, rate}
startDate = "2019-01"
finalDate = str(int(datetime.datetime.today().year) + 1) + "-01"
all_month = (pd.date_range(startDate, finalDate, freq='MS').strftime("%Y-%m").tolist())
for month in all_month:
    newData[month] = {"countryUnemploymentRates": []}

for country in seriesData:
    newCountry = {}
    country_tuple = get_area_name(country["@REF_AREA"])
    newCountry["iso_code"] = country_tuple[0]
    newCountry["name"] = country_tuple[1]
    # now for each time
    if "Obs" in country:
        for quarter in country["Obs"]:
            raw_date = quarter["@TIME_PERIOD"]
            # get year
            year = raw_date[:4]
            quart = raw_date[5:]
            months = quartersToMonth[quart]
            rate = quarter["@OBS_VALUE"]
            newCountry["rate"] = rate
            for m in months:
                d = f'{year}-{m}'
                newData[d]["countryUnemploymentRates"].append(newCountry)

# print(json.dumps(newData))