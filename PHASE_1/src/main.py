from fastapi import Depends, FastAPI, Response, status, Request, Query
from typing import Optional, List
from pymongo import MongoClient
from bson.objectid import ObjectId
import datetime
import re
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from pydantic import BaseModel


class Validator:    
    def get_error(self, status, message):
        return {
            "error" : {
                "status" : status,
                "message" : message
            }
        }

    def validate_datetime(self, date):
        if not date:
            return True
        try:
            date = datetime.datetime.strptime(date, "%Y-%m-%d %H:%M:%S")
        except Exception:
            return False
        
        if date > datetime.datetime.now():
            return False

        return True

    def validate_id(self, id):
        try:
            ObjectId(id)
        except Exception:
            return False

        return True

tags_metadata = [
    {
        "name": "articles",
        "description": "Get disease articles by key word, time and location",
    },
    {
        "name": "reports",
        "description": "Get reports of diseases by key word, time and location",
    }
]

app = FastAPI(openapi_tags=tags_metadata)
db = MongoClient().seng
total = db.articles.count()
string_total = str(total)
error_handler = Validator()
current_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# Rate limiting
# limiter = Limiter(key_func=get_remote_address)
# app.state.limiter = limiter
# app.add_exception_handler(500, _rate_limit_exceeded_handler)



def query_articles(key_term, location, start_date, end_date, limit):
    data = []
    if not key_term and not location:
        data = db.articles.find(
            { "$or" : 
                [
                    { "name" : {"$exists":True} }, 
                    { "description": {"$exists":True} }, 
                    { "city" : {"$exists":True}}, 
                    { "country" : {"$exists":True}}
                ],
                "$and" : 
                [
                    { "time" : {"$lte" : end_date} }, 
                    { "time" : {"$gte" : start_date} }, 
                ]
            }
        ).limit(limit)
    elif key_term:
        key_term = re.compile(".*" + key_term + ".*", re.IGNORECASE)
        data = db.articles.find(
            { "$or" : 
                [
                    { "name" : key_term }, 
                    { "description": key_term },
                    { "reports": {"$elemMatch" : { "report" : key_term}} },

                ],
                "$and" : 
                [
                    { "time" : {"$lte" : end_date} }, 
                    { "time" : {"$gte" : start_date} }, 
                ]
            }
        ).limit(limit)
    else:
        location = re.compile(".*" + location + ".*", re.IGNORECASE)
        data = db.articles.find(
            { "$or" : 
                [
                    { "city" : location }, 
                    { "country": location }
                ],
                "$and" : 
                [
                    { "time" : {"$lte" : end_date} }, 
                    { "time" : {"$gte" : start_date} }, 
                ]
            }
        ).limit(limit)

    return data


def query_reports(key_term, location, start_date, end_date, limit):
    data = []
    if not key_term and not location:
        data = db.articles.find(
            { "$or" : 
                [
                    { "name" : {"$exists":True} }, 
                    { "description": {"$exists":True} }, 
                    { "city" : {"$exists":True}}, 
                    { "country" : {"$exists":True}}
                ],
                "$and" : 
                [
                    { "time" : {"$lte" : end_date} }, 
                    { "time" : {"$gte" : start_date} }, 
                ]
            }
        ).limit(limit)
    elif key_term:
        key_term = re.compile(".*" + key_term + ".*", re.IGNORECASE)
        data = db.articles.find(
            {
                "$and" : 
                [
                    { "reports": {"$elemMatch" : { "report" : key_term}} },
                    { "time" : {"$lte" : end_date} }, 
                    { "time" : {"$gte" : start_date} }, 
                ]
            }
        ).limit(limit)
    else:
        location = re.compile(".*" + location + ".*", re.IGNORECASE)
        data = db.articles.find(
            { "$or" : 
                [
                    { "city" : location }, 
                    { "country": location }
                ],
                "$and" : 
                [
                    { "time" : {"$lte" : end_date} }, 
                    { "time" : {"$gte" : start_date} }, 
                ]
            }
        ).limit(limit)

    return data   


@app.get("/")
async def root(id : int = 0 ):
    return "Welcome"

class Report(BaseModel):
    id : str
    report: str
    class Config:
        validation = False

class Article(BaseModel):
    class Config:
        validation = False
    _id: Optional[str]
    name: Optional[str]
    links: Optional[List[str]]
    time: Optional[str]
    region_code : Optional[str]
    country : Optional[str]
    description : Optional[str]
    latitude : Optional[str]
    longitude : Optional[str]
    reports : Optional[List[Report]]
    syndromes : Optional[List[str]]
    
 
class error_message400(BaseModel):
    status : int = 400
    message : str

class rahul400(BaseModel):
    class Config:
        validation = False
    error : error_message400

class error_message404(BaseModel):
    status : int = 404
    message : str

class rahul404(BaseModel):
    class Config:
        validation = False
    error : error_message404

class CustomQueryParams:
    def __init__(
        self,
        key_term: Optional[str] = Query(None, description="Key term can be used to query title, description or report metadata"),
        location: Optional[str] = Query(None, description="Location can be used to query country and cities"),
        start_date: Optional[str] = Query(None, description="The start date in the format yyyy-MM-dd hh:mm:ss"),
        end_date: Optional[str] = Query(None, description="The end date in the format yyyy-MM-dd hh:mm:ss"),
        limit: Optional[str] = Query(None, description="The total number of documents you want to retrieve"),

    ):
        self.key_term = key_term
        self.location = location
        self.start_date = start_date
        self.end_date = end_date
        self.limit = limit

class identifier:
    def __init__(
        self,
        id: str = Query(None, description="Id in the format of mongo ID. See more information "),
    ):
        self.id = id


@app.get("/articles",tags=["articles"] , responses={200: {"model": List[Article]}, 400 : {"model" : rahul400}, 404 : {"model" : rahul404}, 422: {"model": rahul404}})
# @limiter.limit("5/minute")
async def articles(request: Request, response: Response, params: CustomQueryParams = Depends(), key_term : Optional[str] = "", location : Optional[str] = "", 
                    start_date : Optional[str] = "2014-01-01 00:00:00", end_date : Optional[str] = current_date, 
                    limit : int = 25):
    
    # Error checking
    now = str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

    if not isinstance(limit, int) or limit <= 0 or limit > total:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "Limit has to be between 0 and " + string_total)


    if not error_handler.validate_datetime(start_date):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "Start date has to be in the following format yyyy-MM-dd hh:mm:ss and less than " + now)

    if not error_handler.validate_datetime(end_date):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "End date has to be in the following format yyyy-MM-dd hh:mm:ss and less than " + now)

    start_date = datetime.datetime.strptime(start_date, "%Y-%m-%d %H:%M:%S").isoformat()
    end_date = datetime.datetime.strptime(end_date, "%Y-%m-%d %H:%M:%S").isoformat()

    if start_date > end_date:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "End date has to be larger than start date")

    data = query_articles(key_term, location,start_date, end_date, limit)
    return_data = []
    for x in data:
        x["_id"] = str(x["_id"])
        reports = []
        for y in x["reports"]:
            if y["report"] and not y["report"].isspace():
                reports.append(y)
        x["reports"] = reports
        return_data.append(x)

    if not return_data:
        response.status_code = status.HTTP_404_BAD_REQUEST
        return error_handler.get_error(404, "Not Found")
    return return_data


class report(BaseModel):
    class Config:
        validation = False
    id : Optional[str]
    report : Optional[str]



@app.get("/reports", tags=["reports"] ,responses={200: {"model": List[report]}, 400 : {"model" : rahul400}, 404 : {"model" : rahul404}, 422: {"model": rahul404}})
# @limiter.limit("5/minute")
async def reports(request: Request, response: Response, params: CustomQueryParams = Depends(), key_term : Optional[str] = "", location : Optional[str] = "", 
                    start_date : Optional[str] = "2014-01-01 00:00:00", end_date : Optional[str] = current_date, 
                    limit : int = 25):
    # Error checking
    now = str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

    if not isinstance(limit, int) or limit <= 0 or limit > total:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "Limit has to be between 0 and " + string_total)

    if not error_handler.validate_datetime(start_date):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "Start date has to be in the following format yyyy-MM-dd hh:mm:ss and less than " + now)

    if not error_handler.validate_datetime(end_date):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "End date has to be in the following format yyyy-MM-dd hh:mm:ss and less than " + now)
    
    data = query_reports(key_term, location, start_date, end_date, limit)
    start_date = datetime.datetime.strptime(start_date, "%Y-%m-%d %H:%M:%S").isoformat()
    end_date = datetime.datetime.strptime(end_date, "%Y-%m-%d %H:%M:%S").isoformat()
    if start_date > end_date:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "End date has to be larger than start date")
    return_data = []
    for x in data:
        for y in x["reports"]:
            if y["report"] and key_term.lower() in y["report"].lower():
                return_data.append(y)

    if not return_data:
        response.status_code = status.HTTP_404_BAD_REQUEST
        return error_handler.get_error(404, "Not Found")    
        
    return return_data


@app.get("/articles/{id}/reports", responses={200: {"model": List[report]}, 400 : {"model" : rahul400}, 404 : {"model" : rahul404}, 422: {"model": rahul404}})
# @limiter.limit("5/minute")
async def reports_by_article_id(request: Request, response: Response, params: identifier = Depends(), id : Optional[str] = None):
    if not isinstance(id, str):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "id has to be type string")
    reports = []

    if not error_handler.validate_id(id):
        response.status_code = status.HTTP_404_NOT_FOUND
        return error_handler.get_error(404, "Not found")



    data = db.articles.find({"_id" : ObjectId(id)})
    for x in data:
        print(x)
        reports = x["reports"]
    
    
    return reports


@app.get("/articles/{id}", responses={200: {"model": Article}, 400 : {"model" : rahul400}, 404 : {"model" : rahul404}, 422: {"model": rahul404}})
# @limiter.limit("5/minute")
async def articles_by_id(request: Request, response: Response, params: identifier = Depends(), id : Optional[str] = None):
    if not isinstance(id, str):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "id has to be type string")
    
    if not error_handler.validate_id(id):
        response.status_code = status.HTTP_404_NOT_FOUND
        return error_handler.get_error(404, "Not found")

    data = db.articles.find({"_id" : ObjectId(id)})
    return_data = []
    for x in data:
        x["_id"] = str(x["_id"])
        return_data.append(x)

    if len(return_data) == 0:
        response.status_code = status.HTTP_404_NOT_FOUND
        return error_handler.get_error(404, "Not found")

    return return_data

@app.get("/reports/{id}", responses={200: {"model": report}, 400 : {"model" : rahul400}, 404 : {"model" : rahul404}, 422: {"model": rahul404}})
# @limiter.limit("5/minute")
async def reports_by_id(request: Request, response: Response, id : Optional[str] = None, params: identifier = Depends(),):
    if not isinstance(id, str):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "id has to be type string")

    if not error_handler.validate_id(id):
        response.status_code = status.HTTP_404_NOT_FOUND
        return error_handler.get_error(404, "Not found")

    data = db.reports.find({"_id" : ObjectId(id)})
    return_data = []
    for x in data:
        x["_id"] = str(x["_id"])
        return_data.append(x)
    
    if len(return_data) == 0:
        response.status_code = status.HTTP_404_NOT_FOUND
        return error_handler.get_error(404, "Not found")

    return return_data

