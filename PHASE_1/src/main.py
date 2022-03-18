from fastapi import FastAPI, Response, status
from typing import Optional
from pymongo import MongoClient
from bson.objectid import ObjectId
import datetime
import re

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

app = FastAPI()
db = MongoClient().seng
total = db.articles.count()
string_total = str(total)
error_handler = Validator()
current_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

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
                    { "time" : {"$gte" : end_date} }, 
                    { "time" : {"$lte" : start_date} }, 
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
                    { "time" : {"$gte" : end_date} }, 
                    { "time" : {"$lte" : start_date} }, 
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
                    { "time" : {"$gte" : end_date} }, 
                    { "time" : {"$lte" : start_date} }, 
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
                    { "time" : {"$gte" : end_date} }, 
                    { "time" : {"$lte" : start_date} }, 
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
                    { "time" : {"$gte" : end_date} }, 
                    { "time" : {"$lte" : start_date} }, 
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
                    { "time" : {"$gte" : end_date} }, 
                    { "time" : {"$lte" : start_date} }, 
                ]
            }
        ).limit(limit)

    return data   


@app.get("/")
async def root(id : int = 0 ):
    return "Welcome"

@app.get("/articles")
async def articles(response: Response, key_term : Optional[str] = "", location : Optional[str] = "", 
                    start_date : Optional[str] = current_date, end_date : Optional[str] = "2014-01-01 00:00:00", 
                    limit : int = 25, offset : int = 0):
    
    # Error checking
    now = str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

    if not isinstance(limit, int) or limit <= 0 or limit > total:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "Limit has to be between 0 and " + string_total)

    if not isinstance(offset, int) or offset * limit > total or offset < 0:
        max_offset = str(total // limit)
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "Offset has to be between 0 and " + max_offset)

    if not error_handler.validate_datetime(start_date):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "Start date has to be in the following format yyyy-MM-dd hh:mm:ss and less than " + now)

    if not error_handler.validate_datetime(end_date):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "End date has to be in the following format yyyy-MM-dd hh:mm:ss and less than " + now)

    start_date = datetime.datetime.strptime(start_date, "%Y-%m-%d %H:%M:%S").isoformat()
    end_date = datetime.datetime.strptime(end_date, "%Y-%m-%d %H:%M:%S").isoformat()

    data = query_articles(key_term, location,start_date, end_date, limit)
    return_data = []
    for x in data:
        x["_id"] = str(x["_id"])
        return_data.append(x)
    return return_data


@app.get("/reports")
async def reports(response: Response,  key_term : Optional[str] = "", location : Optional[str] = "", 
                    start_date : Optional[str] = current_date, end_date : Optional[str] = "2014-01-01 00:00:00", 
                    limit : int = 25, offset : int = 0):
    # Error checking
    now = str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

    if not isinstance(limit, int) or limit <= 0 or limit > total:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "Limit has to be between 0 and " + string_total)

    if not isinstance(offset, int) or offset * limit > total or offset < 0:
        max_offset = str(total // limit)
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "Offset has to be between 0 and " + max_offset)

    if not error_handler.validate_datetime(start_date):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "Start date has to be in the following format yyyy-MM-dd hh:mm:ss and less than " + now)

    if not error_handler.validate_datetime(end_date):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "End date has to be in the following format yyyy-MM-dd hh:mm:ss and less than " + now)
    
    data = query_reports(key_term, location, start_date, end_date, limit)


    return_data = []
    for x in data:
        for y in x["reports"]:
            if y["report"] and key_term.lower() in y["report"].lower():
                return_data.append(y)

    print(len(return_data))
    return return_data


@app.get("/articles/{id}/reports")
async def reports_by_article_id(response: Response, id : Optional[str] = None):
    if not isinstance(id, str):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "id has to be type string")
    
    reports = {}

    if not error_handler.validate_id(id):
        response.status_code = status.HTTP_404_NOT_FOUND
        return error_handler.get_error(404, "Not found")



    data = db.articles.find({"_id" : ObjectId(id)})
    for x in data:
        reports = x["reports"]
        
    if len(reports) == 0:
        response.status_code = status.HTTP_404_NOT_FOUND
        return error_handler.get_error(404, "Not found")
    
    return reports


@app.get("/articles/{id}")
async def articles_by_id(response: Response, id : Optional[str] = None):
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

@app.get("/reports/{id}")
async def reports_by_id(response: Response, id : Optional[str] = None):
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

