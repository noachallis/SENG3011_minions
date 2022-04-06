import csv
import json
import re
from datetime import datetime

covid_data_csv = 'all.csv'

#Read CSV File
def read_CSV(covid_data_csv):
    covid_data = []
    with open(covid_data_csv) as csvfile:
        reader = csv.DictReader(csvfile)
        field = reader.fieldnames
        for row in reader:
            covid_data.extend([{field[i]:row[field[i]] for i in range(len(field))}])
    return covid_data

# get range of dates
def get_dates(covid_data):
    dates = []
    for d in covid_data:
        dates.append(d['date'])
    return list(set(dates))

# add covid data into map
def getOneDate(covid_data, date):
    dateData = {}
    dateData['total_cases'] = 0
    total_cases = 0
    dateData['people_fully_vaccinated'] = 0
    people_fully_vaccinated = 0
    dateData['world_population'] = 0
    world_population = 0
    dateData['world_population'] = 0
    world_population = 0
    country_stats = []
    for d in covid_data:
        if (date == d['date']):
            country = {}
            iso_code = d['iso_code']
            country['iso_code'] = iso_code
            properties = {}
            try :
                properties['total_cases'] = float(d['total_cases'])
                total_cases = total_cases + float(d['total_cases'])
            except Exception:
               properties['total_cases'] = 0
            try :
                properties['people_fully_vaccinated'] = float(d['people_fully_vaccinated'])
                people_fully_vaccinated = people_fully_vaccinated + float(d['people_fully_vaccinated'])
            except Exception:
               properties['people_fully_vaccinated'] = 0
            try :
                properties['total_vaccinations_per_hundred'] = float(d['total_vaccinations_per_hundred'])
            except Exception:
                properties['total_vaccinations_per_hundred'] = 0
            try :
                properties['population'] = float(d['population'])
                world_population = world_population + float(d['population'])
            except Exception:
                properties['population'] = 0
            country['properties'] = properties   
            country_stats.append(country)
    dateData['country_stats'] = country_stats                    
    dateData['total_cases'] = total_cases
    dateData['people_fully_vaccinated'] = people_fully_vaccinated
    dateData['world_population'] = world_population
    return dateData

#Convert csv data into json
def convert_write_json(data, output_file):
    with open(output_file, "w") as f:
        f.write(json.dumps(data, sort_keys=False, indent=4, separators=(',', ': '))) #for pretty

################ Main ################

# get data
covid_data = read_CSV(covid_data_csv)

# get dates
dates = get_dates(covid_data)
dates.sort(key=lambda date: datetime.strptime(date, "%Y-%m-%d"))

filtered_dates = []
# ouput maps
for date in dates:
    result = re.match('20..-..-01', date)
    if result:
        filename = 'maps/' + date + '_map.json'
        filenameWoMaps = date + '_map.json'
        filtered_dates.append(filenameWoMaps)
        merged_data_one_date = getOneDate(covid_data, date)
        convert_write_json(merged_data_one_date, filename)

convert_write_json(filtered_dates, 'maps/dates.json')
