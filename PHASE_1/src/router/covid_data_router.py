from fastapi import Depends, APIRouter, Response, status, Request
from typing import Optional, List
import datetime
from pymongo import MongoClient
from src.validator import validator
from src.open_api.docs import *
import math
import re

def is_nan(value):
    return math.isnan(float(value))

"""
    Core Application
"""
router = APIRouter()


"""
    GLOBAL CLASSES and Variables. Used as "Services to the API"
"""
db = MongoClient().seng
total = db.covidReports.count()
string_total = str(total)
error_handler = validator.Validator()
current_date = datetime.datetime.now().strftime("%Y-%m-%d")


@router.get(
    "/v1/covid",
    tags=["covid"],
    responses={
        200: {"model": List[CovidData]},
        400: {"model": rahul400},
        404: {"model": rahul404},
        422: {"model": rahul404},
    },
)
async def covid(
    request: Request,
    response: Response,
    iso_code: str = Query(..., description="The three letter country code i.e. AUS", ),
    date: str = Query(..., description="The date in the format yyyy-mm-dd", ),
):

    if not error_handler.validate_date(date):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(
            400,
            "Date has to be in the following format yyyy-MM-dd and less than "
            + current_date,
        )
    
    data = db.covidReports.find_one({ "iso_code": iso_code, "date" : date}, {'_id': 0})

    if data is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return error_handler.get_error(404, "Not Found")

    return_data = dict()
    for (key, value) in data.items():
        if type(value) is float:
            if not is_nan(value):
                return_data[key] = value
        else:
            return_data[key] = value
            
    return return_data

@router.get(
    "/v1/covid/locations",
    tags=["covid"],
    responses={
        200: {"model": List[str]},
        400: {"model": rahul400},
        404: {"model": rahul404},
        422: {"model": rahul404},
    },
)
async def covid_locations(
    request: Request,
    response: Response,
    with_overall: bool = Query(False, description="Include overall world and continent data", ),
):
    data = db.covidReports.distinct('iso_code') 
    if not with_overall:
        r = re.compile("(?!OWID)")
        data = list(filter(r.match, data))

    return data

@router.get(
    "/v1/covid/dates",
    tags=["covid"],
    responses={
        200: {"model": List[str]},
        400: {"model": rahul400},
        404: {"model": rahul404},
        422: {"model": rahul404},
    },
)
async def covid_dates(
    request: Request,
    response: Response,
):
    data = db.covidReports.distinct('date') 
    return data