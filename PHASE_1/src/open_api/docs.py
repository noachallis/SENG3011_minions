from pydantic import BaseModel
from typing import Optional, List
from fastapi import Query

tags_metadata = [
    {
        "name": "articles",
        "description": "Get disease articles by key word, time and location",
    },
    {
        "name": "reports",
        "description": "Get reports of diseases by key word, time and location",
    },
]


class CustomQueryParams:
    def __init__(
        self,
        key_term: Optional[str] = Query(
            None,
            description="Key term can be used to query title, description or report metadata",
        ),
        location: Optional[str] = Query(
            None, description="Location can be used to query country and cities"
        ),
        start_date: Optional[str] = Query(
            None, description="The start date in the format yyyy-MM-dd hh:mm:ss"
        ),
        end_date: Optional[str] = Query(
            None, description="The end date in the format yyyy-MM-dd hh:mm:ss"
        ),
        limit: Optional[str] = Query(
            None, description="The total number of documents you want to retrieve"
        ),
    ):
        self.key_term = key_term
        self.location = location
        self.start_date = start_date
        self.end_date = end_date
        self.limit = limit


class identifier:
    def __init__(
        self,
        id: str = Query(
            None, description="Id in the format of mongo ID. See more information "
        ),
    ):
        self.id = id


class Report(BaseModel):
    id: str
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
    region_code: Optional[str]
    country: Optional[str]
    description: Optional[str]
    latitude: Optional[str]
    longitude: Optional[str]
    reports: Optional[List[Report]]
    syndromes: Optional[List[str]]


class error_message400(BaseModel):
    status: int = 400
    message: str


class rahul400(BaseModel):
    class Config:
        validation = False

    error: error_message400


class error_message404(BaseModel):
    status: int = 404
    message: str


class rahul404(BaseModel):
    class Config:
        validation = False

    error: error_message404


class report(BaseModel):
    class Config:
        validation = False

    id: Optional[str]
    report: Optional[str]
