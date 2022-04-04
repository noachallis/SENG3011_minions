import csv
import json

covid_data_csv = 'latest.csv'
geodata_json = 'countries.geojson'
output_file = 'output_single_map.json'

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
        
# add covid data into map
def merge_data(covid_data, geojson_data):
    for country_data in geojson_data["features"]:
        country_dict = country_data["properties"]
        iso_code = country_dict['ISO_A3']
        for d in covid_data:
            if (iso_code == d['iso_code']):
                for key in d:
                    country_data["properties"][key] = d[key]
    return geojson_data
    
#Convert csv data into json
def convert_write_json(data, output_file):
    with open(output_file, "w") as f:
        f.write(json.dumps(data, sort_keys=False, indent=4, separators=(',', ': '))) #for pretty

# Main
covid_data = read_CSV(covid_data_csv)
geojson_data = read_JSON(geodata_json)
merged_data = merge_data(covid_data, geojson_data)
convert_write_json(merged_data, output_file)