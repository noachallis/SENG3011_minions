from fastapi import FastAPI
from typing import Optional
from pymongo import MongoClient
from seeder.seeder import Seeder
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
            datetime.datetime.strptime(date, "%Y-%m-%d %H:%M:%S")
        except Exception:
            return False
        
        return True

app = FastAPI()
db = MongoClient().seng
total = db.articles.count()
string_total = str(total)
seeder = Seeder()
seeder.insert_all_data()
error_handler = Validator()
current_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

@app.get("/")
async def root(id : int = 0 ):
    return "Welcome"

@app.get("/articles")
async def articles(key_term : Optional[str] = "", location : Optional[str] = "", 
                    start_date : Optional[str] = current_date, end_date : Optional[str] = "2014-01-01 00:00:00", 
                    limit : int = 25, offset : int = 0):
    
    # Error checking
    if limit <= 0 or limit > total:
        return error_handler.get_error(400, "Limit has to be between 0 and " + string_total)

    if offset * limit > total or offset < 0:
        max_offset = str(total // limit)
        return error_handler.get_error(400, "Offset has to be between 0 and " + max_offset)

    if not error_handler.validate_datetime(start_date):
        return error_handler.get_error(400, "Start date has to be in the following format yyyy-MM-dd hh:mm:ss")

    if not error_handler.validate_datetime(end_date):
        return error_handler.get_error(400, "End date has to be in the following format yyyy-MM-dd hh:mm:ss")

    if not key_term:
        key_term = {"$exists":True}
    else:
        key_term = re.compile(".*" + key_term + ".*", re.IGNORECASE)


    if not location:
        location = {"$exists":True}
    else:
        location = re.compile(".*" + location + ".*", re.IGNORECASE)
    return_data = []
    data = db.articles.find(
    { "$or" : 
        [ 
            { "name" : key_term }, 
            { "description": key_term }, 
            { "city" : location}, 
            { "country" : location}
        ]
    }).limit(limit)
    for x in data:
        x["_id"] = str(x["_id"])
        return_data.append(x)
    return return_data


@app.get("/reports")
async def reports(key_term : Optional[str] = None, location : Optional[str] = None, 
                    start_date : Optional[str] = None, end_data : Optional[str] = None, 
                    limit : int = 0, offset : int = 0):
    
    if limit <= 0 or limit > total:
        return error_handler.get_error(400, "Limit has to be between 0 and " + string_total)

    if offset * limit > total or offset < 0:
        max_offset = str(total // limit)
        return error_handler.get_error(400, "Offset has to be between 0 and " + max_offset)

    if not error_handler.validate_datetime(start_date):
        return error_handler.get_error(400, "Start date has to be in the following format yyyy-MM-dd hh:mm:ss")

    if not error_handler.validate_datetime(end_date):
        return error_handler.get_error(400, "End date has to be in the following format yyyy-MM-dd hh:mm:ss")
    
    return [{"name": "Foo"}]




@app.get("/articles/{id}/reports")
async def reports_by_article_id(id : Optional[str] = None, limit : int = 0, 
                                offset : int = 0, sort_by : Optional[str] = None):
    return {"Welcome"}


@app.get("/articles/{id}")
async def articles_by_id(id : Optional[str] = None):
    return {"Welcome"}


@app.get("/reports/{id}")
async def reports_by_id(id : Optional[str] = None):
    return {"Welcome"}

