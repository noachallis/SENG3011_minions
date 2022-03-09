from fastapi import FastAPI, Query
from typing import Optional
from datetime import datetime

app = FastAPI(
    title="SENG3011-Minions",
    description="SENG3011 Deliverable 2 API",
    version="0.0.1"
)

# Articles
@app.get("/articles", summary="Get all articles.")
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
    return {"blah"}

@app.get("/articles/{article_id}", summary="Get a single article by article id.")
async def articles_id(article_id: int):
    return {"article_id": article_id}

@app.get("/articles/{article_id}/reports", summary="Get reports related to a specific article.")
async def articles_id_reports(
    article_id: int,
    offset: int = 0, 
    limit: int = Query(default=100, lte=100),
    sort_by: Optional[str] = None,
    ):
    return {"article_id": article_id}

# Reports
@app.get("/reports", summary="Get all reports.")
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
    return {"blah"}

@app.get("/reports/{report_id}", summary="Get a single report by report id.")
async def reports_id(report_id: int):
    return {"report_id": report_id}