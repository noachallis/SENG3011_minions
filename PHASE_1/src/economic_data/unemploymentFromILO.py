import json
import pandas as pd
import datetime
import pycountry

# query for JSON = https://www.ilo.org/shinyapps/bulkexplorer8/?lang=en&segment=indicator&id=UNE_2EAP_SEX_AGE_RT_A&ref_area=AFG+ALB+DZA+AGO+ARG+ARM+AUS+AUT+AZE+BHS+BHR+BGD+BRB+BLR+BEL+BLZ+BEN+BTN+BOL+BIH+BWA+BRA+BRN+BGR+BFA+BDI+KHM+CMR+CAN+CPV+CAF+TCD+CHA+CHL+CHN+COL+COM+COG+COD+CRI+HRV+CUB+CYP+CZE+CIV+DNK+DJI+DOM+ECU+EGY+SLV+GNQ+ERI+EST+SWZ+ETH+FJI+FIN+FRA+PYF+GAB+GMB+GEO+DEU+GHA+GRC+GUM+GTM+GIN+GNB+GUY+HTI+HND+HKG+HUN+ISL+IND+IDN+IRN+IRQ+IRL+ISR+ITA+JAM+JPN+JOR+KAZ+KEN+PRK+KOR+KWT+KGZ+LAO+LVA+LBN+LSO+LBR+LBY+LTU+LUX+MAC+MDG+MWI+MYS+MDV+MLI+MLT+MRT+MUS+MEX+MDA+MNG+MNE+MAR+MOZ+MMR+NAM+NPL+NLD+NCL+NZL+NIC+NER+NGA+MKD+NOR+PSE+OMN+PAK+PAN+PNG+PRY+PER+PHL+POL+PRT+PRI+QAT+ROU+RUS+RWA+LCA+VCT+WSM+STP+SAU+SEN+SRB+SLE+SGP+SVK+SVN+SLB+SOM+ZAF+SSD+ESP+LKA+SDN+SUR+SWE+CHE+SYR+TWN+TJK+TZA+THA+TLS+TGO+TON+TTO+TUN+TUR+TKM+UGA+UKR+ARE+GBR+USA+VIR+URY+UZB+VUT+VEN+VNM+ESH+YEM+ZMB+ZWE+X01+X02+X03+X04+X05+X06+X07+X08+X09+X10+X80+X11+X12+X13+X14+X15+X16+X17+X18+X19+X20+X21+X23+X24+X25+X26+X28+X29+X30+X31+X32+X33+X34+X35+X36+X94+X37+X38+X39+X40+X41+X42+X43+X44+X45+X46+X86+X47+X48+X49+X51+X52+X53+X54+X55+X56+X57+X58+X59+X60+X61+X62+X63+X64+X65+X66+X67+X68+X69+X70+X71+X72+X73+X78+X75+X76+X77+X74+X79+X84+X85+X92+X82+X83+X87+X88+X89+X90+X91&sex=SEX_T&classif1=AGE_YTHADULT_YGE15&timefrom=2019&timeto=2023

def get_area_name(iso_3):
    c = pycountry.countries.get(alpha_3=iso_3)
    if not c:
        return 
    return (c.alpha_3, c.name)


f = open('ILOUnemployment.json')

unemployData = json.load(f)

newData = {}
startDate = "2019-01"
finalDate = str(int(datetime.datetime.today().year) + 1) + "-01"

all_year = (pd.date_range(startDate, finalDate, freq='YS').strftime("%Y").tolist())
for year in all_year:
    newData[year] = {"countryUnemploymentRates": []}

# ref area
# time
# obs value

for i in range(0, len(unemployData["ref_area"])):
    newCountry = {}
    country_tuple = get_area_name(unemployData["ref_area"][i])
    if country_tuple:
        newCountry["iso_code"] = country_tuple[0]
        newCountry["name"] = country_tuple[1]
        newCountry["rate"] = unemployData["obs_value"][i]
        newData[unemployData["time"][i]]["countryUnemploymentRates"].append(newCountry)

print(json.dumps(newData))