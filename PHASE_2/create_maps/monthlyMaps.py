import csv
import json
import re
from datetime import datetime

covid_data_csv = 'all.csv'
geodata_json = 'countries.geojson'

#Read CSV File
def read_CSV(covid_data_csv):
    covid_data = []
    with open(covid_data_csv) as csvfile:
        reader = csv.DictReader(csvfile)
        field = reader.fieldnames
        for row in reader:
            covid_data.extend([{field[i]:row[field[i]] for i in range(len(field))}])
    return covid_data

#Read Json File
def read_JSON(geodata_json):
    geojson_data = []
    with open(geodata_json) as geodata_json:
        geojson_data = json.load(geodata_json)
    return geojson_data

# get range of dates
def get_dates(covid_data):
    dates = []
    for d in covid_data:
        dates.append(d['date'])
    return list(set(dates))

# add covid data into map
def getOneDate(covid_data, geojson_data, date):
    total_cases = 0
    people_fully_vaccinated = 0
    world_population = 0
    for country_data in geojson_data["features"]:
        country_dict = country_data["properties"]
        iso_code = country_dict['ISO_A3']
        country_data["properties"]['total_cases'] = 0
        country_data["properties"]['people_fully_vaccinated'] = 0
        country_data["properties"]['total_vaccinations_per_hundred'] = 0
        for d in covid_data:

            if (iso_code == d['iso_code'] and date == d['date']):
                country_data["properties"]['iso_code'] = d['iso_code']
                try :
                    country_data["properties"]['total_cases'] = float(d['total_cases'])
                except Exception:
                    country_data["properties"]['total_cases'] = 0
                try :
                    country_data["properties"]['people_fully_vaccinated'] = float(d['people_fully_vaccinated'])
                except Exception:
                    country_data["properties"]['people_fully_vaccinated'] = 0
                try :
                    country_data["properties"]['total_vaccinations_per_hundred'] = float(d['total_vaccinations_per_hundred'])
                except Exception:
                    country_data["properties"]['total_vaccinations_per_hundred'] = 0
                try :
                    total_cases = total_cases + float(d['total_cases'])
                except Exception:
                    pass
                try :
                    people_fully_vaccinated = people_fully_vaccinated + float(d['people_fully_vaccinated'])
                except Exception:
                    pass
                try : 
                    world_population = world_population + country_dict['POP_EST']
                except Exception:
                    pass
    geojson_data["total_cases"] = total_cases
    geojson_data["people_fully_vaccinated"] = people_fully_vaccinated
    geojson_data["world_population"] = world_population
    return geojson_data

#Convert csv data into json
def convert_write_json(data, output_file):
    with open(output_file, "w") as f:
        f.write(json.dumps(data, sort_keys=False, indent=4, separators=(',', ': '))) #for pretty

################ Main ################

# get data
covid_data = read_CSV(covid_data_csv)
geojson_data = read_JSON(geodata_json)

# get dates
dates = get_dates(covid_data)
dates.sort(key=lambda date: datetime.strptime(date, "%Y-%m-%d"))

filtered_dates = []
# ouput maps
for date in dates:
    result = re.match('20..-12-01', date)
    if result:
        filtered_dates.append(date)
        filename = 'maps/' + date + '_map.json'
        merged_data_one_date = getOneDate(covid_data, geojson_data, date)
        convert_write_json(merged_data_one_date, filename)

convert_write_json(filtered_dates, 'maps/dates.json')