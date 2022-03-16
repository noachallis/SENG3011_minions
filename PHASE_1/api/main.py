from fastapi import FastAPI, Query, HTTPException
from typing import Optional
from datetime import datetime
from fastapi.responses import JSONResponse
from pydantic import BaseModel

app = FastAPI(
    title="SENG3011-Minions",
    description="SENG3011 Deliverable 2 API",
    version="0.0.1"
)

class Message(BaseModel):
    message: str

# Articles
@app.get("/articles", summary="Get articles.")
async def articles(
    key_term: Optional[str] = None,
    location: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    sort_by: Optional[str] = None,
    offset: int = 0, 
    limit: int = Query(default=100, lte=100),
    sort: Optional[str] = None
    ):
    return articles

@app.get("/articles/{article_id}", summary="Get an article record by article_id.", responses={
        404: {"model": Message, "description": "Article not found"}})
async def article_id(article_id: int):
    for article in articles:
        try:
            if(article['id'] == article_id): return {
                "id": article_id,
                "url": article['url'],
                "pub_date": article['pub_date'],
                "headline": article['headline'],
                "main_text": article['main_text'],
                "notes": article['notes']
            }
        except:
            pass
    return JSONResponse(status_code=404, content={"message": "Article not found"})

@app.post("/articles", summary="Add article.")
async def add_article(url: str, pub_date: str, headline: str, main_text: str, notes: str):
    return {
        "id": "xxx",
        "url": url,
        "pub_date": pub_date,
        "headline": headline,
        "main_text": main_text,
        "notes": notes
    }

@app.delete("/articles/{article_id}", summary="Delete an article record by article_id.", responses={
        404: {"model": Message, "description": "Article not found"}})
async def delete_article(article_id: int):
    for i in range(len(articles)):
        try:
            if(articles[i]['id']  == article_id): 
                del articles[i]
                return {"Article deleted."}
        except:
            pass
    return JSONResponse(status_code=404, content={"message": "Article not found"})

# @app.get("/articles/{article_id}/reports", summary="Get reports related to a specific article.")
# async def articles_id_reports(
#     article_id: int,
#     offset: int = 0, 
#     limit: int = Query(default=100, lte=100),
#     sort_by: Optional[str] = None,
#     ):
#     return {"article_id": article_id}

# Reports
@app.get("/reports", summary="Get reports.")
async def reports(
    key_term: Optional[str] = None,
    location: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    sort_by: Optional[str] = None,
    offset: int = 0, 
    limit: int = Query(default=100, lte=100),
    sort: Optional[str] = None
    ):
    return reports

@app.get("/reports/{report_id}", summary="Get a report record by report_id.", responses={
        404: {"model": Message, "description": "Report not found"}})
async def report_id(report_id: int):
    for report in reports:
        try:
            if(report['id'] == report_id): return {
                "id": 1, 
                "disease_id": report['disease_id'], 
                "event_date": report['event_date'], 
                "location_id": report['location_id'], 
                "article_id": report['article_id'], 
                "notes": report['notes']
                }
        except:
            pass
    return JSONResponse(status_code=404, content={"message": "Report not found"})

@app.post("/reports", summary="Add report.")
async def add_report(disease_id: int, event_date: str, location_id: int, article_id: int, notes: str):
    return {
        "id": "xxx",
        "disease_id": disease_id, 
        "event_date": event_date, 
        "location_id": location_id, 
        "article_id": article_id, 
        "notes": notes
    }

@app.delete("/reports/{report_id}", summary="Delete a report record by report_id.", responses={
        404: {"model": Message, "description": "Report not found"}})
async def delete_report(report_id: int):
    for i in range(len(reports)):
        try:
            if(reports[i]['id'] == report_id): 
                del reports[i]
                return {"Report deleted."}
        except:
            pass
    return JSONResponse(status_code=404, content={"message": "Report not found"})


# Diseases
@app.get("/diseases", summary="Get diseases.", responses={
        404: {"model": Message, "description": "Disease not found"}})
async def diseases(
    name: Optional[str] = None,
    offset: int = 0, 
    limit: int = Query(default=100, lte=100),
    sort: Optional[str] = None
    ):
    if name != None:
        for disease in diseases:
            try:
                if(disease['name'] == name): return {"disease_id" : disease_id, "name" : disease['name']}
            except:
                pass
        return JSONResponse(status_code=404, content={"message": "Disease not found"})
    return diseases

@app.get("/diseases/{disease_id}", summary="Get a disease record by disease_id.", responses={
        404: {"model": Message, "description": "Disease not found"}})
async def disease_id(disease_id: int):
    for disease in diseases:
        try:
            if(disease['id'] == disease_id): return {"disease_id" : disease_id, "name" : disease['name']}
        except:
            pass
    return JSONResponse(status_code=404, content={"message": "Disease not found"})

@app.post("/diseases",  summary="Add disease.")
async def add_disease(name: str):
    return {"disease_id" : "xx", "name" : "xx"}

@app.delete("/diseases/{disease_id}", summary="Delete a disease record by disease_id.", responses={
        404: {"model": Message, "description": "Disease not found"}})
async def delete_disease(disease_id: int):
    for i in range(len(diseases)):
        try:
            if(diseases[i]['id']  == disease_id): 
                del diseases[i]
                return {"Disease deleted."}
        except:
            pass
    return JSONResponse(status_code=404, content={"message": "Disease not found"})


# Locations
@app.get("/locations", summary="Get locations.")
async def locations(
    country: Optional[str] = None,
    city: Optional[str] = None,
    region: Optional[str] = None,
    latitude: Optional[float] = None,
    longitude: Optional[float] = None,
    offset: int = 0, 
    limit: int = Query(default=100, lte=100),
    sort: Optional[str] = None
    ):
    return locations

@app.get("/locations/{location_id}", summary="Get a location record by location_id.", responses={
        404: {"model": Message, "description": "Location not found"}})
async def location_id(location_id: int):
    for location in locations:
        try:
            if(location['id'] == location_id): return {"location_id" : location_id, "name" : location['name']}
        except:
            pass
    return JSONResponse(status_code=404, content={"message": "Location not found"})

@app.post("/locations",  summary="Add location.")
async def add_location(
    country: str,
    city: str,
    region: str,
    latitude: float,
    longitude: float):
    return {"id": xx, "country": "xx", "city": "xx", "region": "", "latitude": 0, "longitude": 0}

@app.delete("/locations/{location_id}", summary="Delete a location record by location_id.", responses={
        404: {"model": Message, "description": "Location not found"}})
async def delete_location(location_id: int):
    for i in range(len(locations)):
        try:
            if(locations[i]['id']  == location_id): 
                del locations[i]
                return {"Location deleted."}
        except:
            pass
    return JSONResponse(status_code=404, content={"message": "Location not found"})


# Syndromes
@app.get("/syndromes", summary="Get syndromes.", responses={
        404: {"model": Message, "description": "Syndrome not found"}})
async def syndromes(
    name: Optional[str] = None,
    offset: int = 0, 
    limit: int = Query(default=100, lte=100),
    sort: Optional[str] = None
    ):
    if name != None:
        for syndrome in syndromes:
            try:
                if(syndrome['name'] == name): return {"syndrome_id" : syndrome_id, "name" : syndrome['name']}
            except:
                pass
        return JSONResponse(status_code=404, content={"message": "Syndrome not found"})
    return syndromes

@app.get("/syndromes/{syndrome_id}", summary="Get a syndrome record by syndrome_id.", responses={
        404: {"model": Message, "description": "Syndrome not found"}})
async def syndrome_id(syndrome_id: int):
    for syndrome in syndromes:
        try:
            if(syndrome['id'] == syndrome_id): return {"syndrome_id" : syndrome_id, "name" : syndrome['name']}
        except:
            pass
    return JSONResponse(status_code=404, content={"message": "Syndrome not found"})


@app.post("/syndromes",  summary="Add syndrome.")
async def add_syndrome(name: str):
    return {"syndrome_id" : "xx", "name" : "xx"}

@app.delete("/syndromes/{syndrome_id}", summary="Delete a syndrome record by syndrome_id.", responses={
        404: {"model": Message, "description": "Syndrome not found"}})
async def delete_syndrome(syndrome_id: int):
    for i in range(len(syndromes)):
        try:
            if(syndromes[i]['id']  == syndrome_id): 
                del syndromes[i]
                return {"Syndrome deleted."}
        except:
            pass
    return JSONResponse(status_code=404, content={"message": "Syndrome not found"})

#data
articles = [
    {
        "id": 1,
        "url": "https://then24.com/2022/02/22/consumption-withdraws-several-batches-of-two-special-infant-formulas-due-to-the-possible-presence-of-salmonella/",
        "pub_date": "2022:02:22 16:06:00",
        "headline": "SPAIN - Consumption Withdraws Several Batches Of Two Special Infant Formulas Due To The Possible Pre",
        "main_text": "The Spanish Agency for Food Safety and Nutrition (AESAN) has reported that the Community of Madrid has notified the possible presence of ‘Cronobacter sakazakii’ and ‘Salmonella Newport’ in two special infant formulas, Similac Alimentum and Similac Elecare, although at the moment there is no record of any associated case in Spain.",
        "notes": "Salmonella Outbreak (Suspected or Confirmed) "
    },
    {
        "id": 2,
        "url": "https://www.dailymail.co.uk/news/article-10605221/Four-month-old-boy-rushed-Melbourne-hospital-Japanese-encephalitis-virus-mosquito-bite.html",
        "pub_date": "2022:03:12 16:04:00",
        "headline": "Terrifying moment a four-month old boy was hospitalised with the Japanese encephalitis virus after a mozzie bite - as his mother warns of the telltale signs to look out for",
        "main_text": "A mother has issued a desperate warning to other parents about the dangers of the Japanese encephalitis virus after her four-month-old baby caught the deadly illness on a camping trip.",
        "notes": ""
    },
    {
        "id": 3,
        "url": "https://www.nyasatimes.com/ministry-reports-cholera-case-in-machinga/",
        "pub_date": "2022:03:04 22:51:00",
        "headline": "MALAWI - Ministry reports cholera case in Machinga",
        "main_text": "The Ministry of Health has reported a cholera case at Machinga District Hospital confirmed on 2nd March, 2022.",
        "notes": ""
    },
    {
        "id": 4,
        "url": "https://www.theborneopost.com/2022/03/12/african-swine-fever-some-585-pigs-in-miri-culled-in-two-day-operation/",
        "pub_date": "2022:03:12 20:49:00",
        "headline": "African Swine Fever: Some 585 pigs in Miri culled in two-day operation",
        "main_text": " A total of 585 pigs here were culled in a two-day operation conducted on March 9 and March 10, following African Swine Fever (ASF) cases detected at two commercial pig farms in the division.",
        "notes": ""
    },
    {
        "id": 5,
        "url": "https://easternmirrornagaland.com/wokha-detects-three-malaria-cases-in-2021/",
        "pub_date": "2022:02:16 20:28:00",
        "headline": "INDIA - Wokha detects three malaria cases in 2021",
        "main_text": "Three cases of malaria were detected in Wokha district in 2021. The district also falls under category-2, which is in the pre-elimination phase.",
        "notes": ""
    },
    {
        "id": 6,
        "url": "https://www.news24.com/news24/southafrica/news/western-cape-girl-diagnosed-with-malaria-infection-potentially-linked-to-mozambique-traveller-20220301",
        "pub_date": "2022:03:01 18:40:00",
        "headline": "SOUTH AFRICA - Western Cape girl diagnosed with malaria, infection potentially linked to Mozambique traveller",
        "main_text": "Western Cape healthcare workers were baffled when a 7-year-old girl had symptoms of fever, seizures and diarrhoea for nearly two months.",
        "notes": ""
    }
    ]

reports = [
    {"id": 1, "disease_id": 52, "event_date": "2022:02:22 16:06:00", "location_id": 1, "article_id": 1, "notes": ""},
    {"id": 2, "disease_id": 67, "event_date": "2022:02:22 12:34:56", "location_id": 2, "article_id": 2, "notes": ""},
    {"id": 3, "disease_id": 9, "event_date": "2022:02:22 7:34:23", "location_id": 3, "article_id": 3, "notes": ""},
    {"id": 4, "disease_id": 68, "event_date": "2022:02:22 12:34:56", "location_id": 5, "article_id": 4, "notes": ""},
    {"id": 5, "disease_id": 36, "event_date": "2022:02:22 8:22:56", "location_id": 4, "article_id": 5, "notes": ""},
    {"id": 6, "disease_id": 36, "event_date": "2022:02:22 2:11:33", "location_id": 4, "article_id": 5, "notes": ""},
    {"id": 7, "disease_id": 36, "event_date": "2022:02:22 9:23:56", "location_id": 4, "article_id": 5, "notes": ""},
    {"id": 8, "disease_id": 36, "event_date": "2022:02:22 3:33:37", "location_id": 6, "article_id": 8, "notes": ""}
    ]

diseases = [
    {"id":1,"name":"unknown"}, {"id":2,"name":"other"}, {"id":3,"name":"anthrax cutaneous"},
   {"id":4,"name":"anthrax gastrointestinous"},{"id":5,"name":"anthrax inhalation"},{"id":6,"name":"botulism"},
   {"id":7,"name":"brucellosis"},{"id":8,"name":"chikungunya "},{"id":9,"name":"cholera"},{"id":10,"name":"cryptococcosis"},
   {"id":11,"name":"cryptosporidiosis"},{"id":12,"name":"crimean-congo haemorrhagic fever"},
   {"id":13,"name":"dengue"},{"id":14,"name":"diphtheria"},{"id":15,"name":"ebola haemorrhagic fever"},
   {"id":16,"name":"ehec (e.coli)"},{"id":17,"name":"enterovirus 71 infection"},{"id":18,"name":"influenza a/h5n1"},
   {"id":19,"name":"influenza a/h7n9"},{"id":20,"name":"influenza a/h9n2"},{"id":21,"name":"influenza a/h1n1"},
   {"id":22,"name":"influenza a/h1n2"},{"id":23,"name":"influenza a/h3n5"},{"id":24,"name":"influenza a/h3n2"},
   {"id":25,"name":"influenza a/h2n2"},{"id":26,"name":"Hand, foot, and mouth disease"},{"id":27,"name":"hantavirus"},
   {"id":28,"name":"hepatitis a"},{"id":29,"name":"hepatitis b"},{"id":30,"name":"hepatitis c"},{"id":31,"name":"hepatitis d"},
   {"id":32,"name":"hepatitis e"},{"id":33,"name":"histoplasmosis "},{"id":34,"name":"hiv/aids"},{"id":35,"name":"lassa fever"},
   {"id":36,"name":"malaria"},{"id":37,"name":"marburg virus disease"},{"id":38,"name":"measles"},{"id":39,"name":"mers-cov"},
   {"id":40,"name":"mumps"},{"id":41,"name":"nipah virus"},{"id":42,"name":"norovirus infection"},{"id":43,"name":"pertussis"},
   {"id":44,"name":"plague"},{"id":45,"name":"pneumococcus pneumonia"},{"id":46,"name":"poliomyelitis"},
   {"id":47,"name":"q fever"},{"id":48,"name":"rabies"},{"id":49,"name":"rift valley fever"},
   {"id":50,"name":"rotavirus infection"},{"id":51,"name":"rubella"},{"id":52,"name":"salmonellosis "},{"id":53,"name":"sars"},
   {"id":54,"name":"shigellosis"},{"id":55,"name":"smallpox"},{"id":56,"name":"staphylococcal enterotoxin b"},
   {"id":57,"name":"typhoid fever"},{"id":58,"name":"tuberculosis"},{"id":59,"name":"tularemia"},
   {"id":60,"name":"vaccinia and cowpox"},{"id":61,"name":"varicella"},{"id":62,"name":"west nile virus"},
   {"id":63,"name":"yellow fever"},{"id":64,"name":"yersiniosis"},{"id":65,"name":"zika"},{"id":66,"name":"legionnaires "},
   {"id":67,"name":"encephalitis"},{"id":68,"name":"swine fever"}]

locations =[
    {"id": 1, "country": "Spain", "city": "Madrid", "region": "", "latitude": 40.417, "longitude": -3.704},
    {"id": 2, "country": "Australia", "city": "Canberra", "region": "", "latitude": -35.280, "longitude": 149.131}, 
    {"id": 3, "country": "Malawi", "city": "Machinga", "region": "", "latitude": -15.170, "longitude": 35.300},
    {"id": 4, "country": "India", "city": "Wokha", "region": "Nagaland", "latitude": 26.091, "longitude": 94.259},
    {"id": 5, "country": "Malaysia", "city": "Miri", "region": "Sarawak", "latitude": 4.399, "longitude": 113.991},
    {"id": 6, "country": "South Africa", "city": "Western Cape", "region": "", "latitude": -33.228, "longitude": 21.857}
    ]


syndromes = [
    {"id": 1, "name": "Haemorrhagic Fever"}, 
    {"id": 2, "name": "Acute Flaccid Paralysis"},
    {"id": 3, "name": "Acute gastroenteritis"},
    {"id": 4, "name": "Acute respiratory syndrome"},
    {"id": 5, "name": "Influenza-like illness"},
    {"id": 6, "name": "Acute fever and rash"},
    {"id": 7, "name": "Fever of unknown Origin"},
    {"id": 8, "name": "Encephalitis"},
    {"id": 9, "name": "Meningitis"}
    ]
