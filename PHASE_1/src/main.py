from tokenize import String
from fastapi import FastAPI
from typing import Optional
from pymongo import MongoClient
from seeder.seeder import Seeder
app = FastAPI()
db = MongoClient().seng
seeder = Seeder()
seeder.insert_all_data()

@app.get("/")
async def root(id : int = 0 ):
    return "Welcome"

@app.get("/articles")
async def articles(key_term : Optional[str] = "", location : Optional[str] = "", 
                    start_date : Optional[str] = "", end_data : Optional[str] = "", 
                    limit : int = 25, offset : int = 0, sort_by : Optional[str] = ""):
    
    # query = {"name" : /.*son.*/}
    # articles = db.articles.find_one({"username" : /.*son.*/})
    #print(articles)
    return [{"name": "Foo"}]


@app.get("/reports")
async def reports(key_term : Optional[str] = None, location : Optional[str] = None, 
                    start_date : Optional[str] = None, end_data : Optional[str] = None, 
                    limit : int = 0, offset : int = 0, sort_by : Optional[str] = None):
    return {"Welcome"}


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

