import pandas as pd
import datetime
import json
import pycountry

# https://www.imf.org/external/datamapper/NGDP_RPCH@WEO/OEMDC/ADVEC/WEOWORLD
# data source country mappings that don't match pycountry 
dataCountriesMatch = {"China, People's Republic of": "China","Bahamas, The":"Bahamas", "Gambia, The": "Gambia", "South Sudan, Republic of": "South Sudan", "Micronesia, Fed. States of": "Micronesia", "Taiwan Province of China": "Taiwan", "Lao P.D.R.": "Lao", "Congo, Republic of ": "Congo", "Congo, Dem. Rep. of the": "Congo, The Democratic Republic of the"}

def search_country(name1):
    newC = pycountry.countries.get(name=name1)
    if not newC:
        newC = pycountry.countries.search_fuzzy(name1)
    if isinstance(newC, list):
        newC = newC[0]
    return newC

def get_area_name(name1):
    try:
        if name1 in dataCountriesMatch:
            c = search_country(dataCountriesMatch[name1])
        else:
            c = search_country(name1)
    except LookupError:
        # print(f'LookUpError with {name1}')
        return None
        # code to get first name of country before ',' -> commented out and replaced with dataCountries match due to reliability
        # newName = name1.split(',')[0]
        # try: 
        #     c = search_country(newName)
        #     return (c.alpha_3, c.name)
        # except Exception:
        #     print(name1)
        #     return None
    except Exception:
        # print(f'Exception at {name1}')
        return None
    return (c.alpha_3, c.name)

df = pd.read_csv('imfWEO_10-21-gdp.csv')
dfDict = df.to_dict()

newData = {}
startDate = "2019-01"
finalDate = str(int(datetime.datetime.today().year) + 1) + "-01"

all_year = (pd.date_range(startDate, finalDate, freq='YS').strftime("%Y").tolist())
for year in all_year:
    newData[year] = {"countryGDPGrowthRates": []}
    
# limit data to years we want (2019 - 2023)
dataSource = {}
for year in newData.keys():
    dataSource[year] = dfDict[year]
countryIdsToNames = dfDict["Real GDP growth (Annual percent change)"]

for year,rates in dataSource.items():
    for countryId, rate in rates.items():
        countryName = countryIdsToNames[countryId]
        if isinstance(countryName, str):
            countrytuple = get_area_name(countryName)
            if countrytuple:
                newCountry = {}
                newCountry["iso_code"] = countrytuple[0]
                newCountry["name"] = countrytuple[1]
                newCountry["rate"] = rate
                newData[year]["countryGDPGrowthRates"].append(newCountry)

print(json.dumps(newData))