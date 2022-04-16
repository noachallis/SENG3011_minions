import wbdata
import datetime
import pandas as pd
import json

# print(dots("GR", ["US", "AU", "DE"], 2019, 2025))

d = wbdata.get_data("NYGDPMKTPKDZ", country="", data_date=(datetime.date(2019, 1, 1), datetime.date(2024,4,13)))
# print(d)

# d is an array with every single entry by year

# "year": {countryGDPGrowth: [{nz},{aus},{}]}
# country object = {iso, name, rate}
newData = {}
startDate = "2019-01"
finalDate = str(int(datetime.datetime.today().year) + 1) + "-01"
# all_month = (pd.date_range(startDate, finalDate, freq='MS').strftime("%Y-%m").tolist())
# for month in all_month:
#     newData[month] = {"countryGDPGrowthRates": []}

all_year = (pd.date_range(startDate, finalDate, freq='YS').strftime("%Y").tolist())
for year in all_year:
    newData[year] = {"countryGDPGrowthRates": []}

for areas in d:
    newCountry = {}
    newCountry["iso_code"] = areas["countryiso3code"]
    newCountry["name"] = areas["country"]["value"]
    newCountry["rate"] = areas["value"]
    year = areas["date"]
    newData[year]["countryGDPGrowthRates"].append(newCountry)
    
# print(json.dumps(newData))