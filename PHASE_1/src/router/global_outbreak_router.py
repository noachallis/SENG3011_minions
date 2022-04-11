from fastapi import Depends, APIRouter, Response, status, Request
from typing import Optional, List
import datetime
from pymongo import MongoClient
from bson.objectid import ObjectId
from src.validator import validator
from src.database import query_articles
from src.open_api.docs import *

"""
    Core Application
"""
router = APIRouter()


"""
    GLOBAL CLASSES and Variables. Used as "Services to the API"
"""
db = MongoClient().seng
query_articles = query_articles.QueryArticles(db)
total = db.articles.count()
string_total = str(total)
error_handler = validator.Validator()
current_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")


@router.get(
    "/v1/articles",
    tags=["articles"],
    responses={
        200: {"model": List[Article]},
        400: {"model": rahul400},
        404: {"model": rahul404},
        422: {"model": rahul404},
    },
)
async def articles(
    request: Request,
    response: Response,
    params: CustomQueryParams = Depends(),
    key_term: Optional[str] = "",
    location: Optional[str] = "",
    start_date: Optional[str] = "2014-01-01 00:00:00",
    end_date: Optional[str] = current_date,
    limit: int = 25,
):

    # Error checking
    now = str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

    if not isinstance(limit, int) or limit <= 0 or limit > total:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(
            400, "Limit has to be between 0 and " + string_total
        )

    print(start_date)

    if not error_handler.validate_datetime(start_date):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(
            400,
            "Start date has to be in the following format yyyy-MM-dd hh:mm:ss and less than "
            + now,
        )

    if not error_handler.validate_datetime(end_date):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(
            400,
            "End date has to be in the following format yyyy-MM-dd hh:mm:ss and less than "
            + now,
        )

    start_date = datetime.datetime.strptime(start_date, "%Y-%m-%d %H:%M:%S").isoformat()
    end_date = datetime.datetime.strptime(end_date, "%Y-%m-%d %H:%M:%S").isoformat()

    if start_date > end_date:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "End date has to be larger than start date")

    data = query_articles.query_articles(
        key_term, location, start_date, end_date, limit
    )
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
        response.status_code = status.HTTP_404_NOT_FOUND
        return error_handler.get_error(404, "Not Found")
    return return_data


@router.get(
    "/v1/reports",
    tags=["reports"],
    responses={
        200: {"model": List[report]},
        400: {"model": rahul400},
        404: {"model": rahul404},
        422: {"model": rahul404},
    },
)
async def reports(
    request: Request,
    response: Response,
    params: CustomQueryParams = Depends(),
    key_term: Optional[str] = "",
    location: Optional[str] = "",
    start_date: Optional[str] = "2014-01-01 00:00:00",
    end_date: Optional[str] = current_date,
    limit: int = 25,
):

    # Error checking
    now = str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

    if not isinstance(limit, int) or limit <= 0 or limit > total:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(
            400, "Limit has to be between 0 and " + string_total
        )
    if not error_handler.validate_datetime(start_date):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(
            400,
            "Start date has to be in the following format yyyy-MM-dd hh:mm:ss and less than "
            + now,
        )

    if not error_handler.validate_datetime(end_date):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(
            400,
            "End date has to be in the following format yyyy-MM-dd hh:mm:ss and less than "
            + now,
        )

    data = query_articles.query_reports(key_term, location, start_date, end_date, limit)
    start_date = datetime.datetime.strptime(start_date, "%Y-%m-%d %H:%M:%S").isoformat()
    end_date = datetime.datetime.strptime(end_date, "%Y-%m-%d %H:%M:%S").isoformat()
    if start_date > end_date:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "End date has to be larger than start date")
    return_data = []

    """
        TODO: The 
    """
    for x in data:
        for y in x["reports"]:
            if y["report"] and key_term.lower() in y["report"].lower():
                return_data.append(y)

    if not return_data:
        response.status_code = status.HTTP_404_NOT_FOUND
        return error_handler.get_error(404, "Not Found")

    return return_data


@router.get(
    "/v1/articles/{id}/reports",
    responses={
        200: {"model": List[report]},
        400: {"model": rahul400},
        404: {"model": rahul404},
        422: {"model": rahul404},
    },
)
async def reports_by_article_id(
    request: Request,
    response: Response,
    params: identifier = Depends(),
    id: Optional[str] = None,
):
    if not isinstance(id, str):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "id has to be type string")
    reports = []

    if not error_handler.validate_id(id):
        response.status_code = status.HTTP_404_NOT_FOUND
        return error_handler.get_error(404, "Not found")

    data = db.articles.find({"_id": ObjectId(id)})
    for x in data:
        print(x)
        reports = x["reports"]

    return reports


@router.get(
    "/v1/articles/{id}",
    responses={
        200: {"model": Article},
        400: {"model": rahul400},
        404: {"model": rahul404},
        422: {"model": rahul404},
    },
)
async def articles_by_id(
    request: Request,
    response: Response,
    params: identifier = Depends(),
    id: Optional[str] = None,
):
    if not isinstance(id, str):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "id has to be type string")

    if not error_handler.validate_id(id):
        response.status_code = status.HTTP_404_NOT_FOUND
        return error_handler.get_error(404, "Not found")

    data = db.articles.find({"_id": ObjectId(id)})
    return_data = []
    for x in data:
        x["_id"] = str(x["_id"])
        return_data.append(x)

    if len(return_data) == 0:
        response.status_code = status.HTTP_404_NOT_FOUND
        return error_handler.get_error(404, "Not found")

    return return_data


@router.get(
    "/v1/reports/{id}",
    responses={
        200: {"model": report},
        400: {"model": rahul400},
        404: {"model": rahul404},
        422: {"model": rahul404},
    },
)
async def reports_by_id(
    request: Request,
    response: Response,
    id: Optional[str] = None,
    params: identifier = Depends(),
):
    if not isinstance(id, str):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return error_handler.get_error(400, "id has to be type string")

    if not error_handler.validate_id(id):
        response.status_code = status.HTTP_404_NOT_FOUND
        return error_handler.get_error(404, "Not found")

    data = db.reports.find({"_id": ObjectId(id)})
    return_data = []
    for x in data:
        x["_id"] = str(x["_id"])
        return_data.append(x)

    if len(return_data) == 0:
        response.status_code = status.HTTP_404_NOT_FOUND
        return error_handler.get_error(404, "Not found")

    return return_data
