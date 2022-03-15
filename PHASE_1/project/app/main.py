from fastapi import Depends, FastAPI, HTTPException, status, Query
from typing import Optional
from datetime import datetime
from pydantic import BaseModel

from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_session, init_db
from app.models import Article, ArticleCreate, Report, ReportCreate, Disease, DiseaseCreate, Location, LocationCreate, Syndrome, SyndromeCreate

app = FastAPI(
    title="SENG3011-Minions",
    description="SENG3011 Deliverable 2 API",
    version="0.0.1"
)

@app.on_event("startup")
async def on_startup():
    await init_db()

# Articles
@app.get("/articles", summary="Get all articles", response_model=list[Article])
async def articles(
    key_term: Optional[str] = None,
    location: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    sort_by: Optional[str] = None,
    offset: int = 0, 
    limit: int = Query(default=100, lte=100),
    sort: Optional[str] = None,
    session: AsyncSession = Depends(get_session)
    ):
    result = await session.execute(select(Article))
    articles = result.scalars().all()
    return [Article(headline=article.headline, url=article.url, pub_date=article.pub_date, main_text=article.main_text, notes=article.notes, id=article.id ) for article in articles]


@app.post("/articles")
async def add_article(article: ArticleCreate, session: AsyncSession = Depends(get_session)):
    article = Article(headline=article.headline, url=article.url, pub_date=article.pub_date, main_text=article.main_text, notes=article.notes)
    session.add(article)
    await session.commit()
    await session.refresh(article)
    return article

@app.delete("/articles/{article_id}")
async def delete_article(article_id: int, session: AsyncSession = Depends(get_session)):
    article = await session.get(Article, article_id)
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    await session.delete(article)
    await session.commit()
    await session.refresh(article)
    return {"ok": True}

@app.get("/articles/{article_id}", summary="Get a single article by article id")
async def articles_id(article_id: int):
    return {"article_id": article_id}

@app.get("/articles/{article_id}/reports", summary="Get reports related to a specific article")
async def articles_id_reports(
    article_id: int,
    offset: int = 0, 
    limit: int = Query(default=100, lte=100),
    sort_by: Optional[str] = None,
    ):
    return {"article_id": article_id}

# Reports
@app.get("/reports", summary="Get all reports", response_model=list[Report])
async def reports(
    key_term: Optional[str] = None,
    location: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    sort_by: Optional[str] = None,
    offset: int = 0, 
    limit: int = Query(default=100, lte=100),
    sort: Optional[str] = None,
    session: AsyncSession = Depends(get_session)
    ):
    result = await session.execute(select(Report))
    reports = result.scalars().all()
    return [Report(event_date=report.event_date, notes=report.notes, id=report.id ) for report in reports]

@app.get("/reports/{report_id}", summary="Get a single report by report id")
async def reports_id(report_id: int):
    return {"report_id": report_id}

@app.post("/reports")
async def add_report(report: ReportCreate, session: AsyncSession = Depends(get_session)):
    report = Report(event_date=report.event_date, notes=report.notes)
    session.add(report)
    await session.commit()
    await session.refresh(report)
    return report

@app.get("/diseases", summary="Get all diseases")
async def diseases(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Disease))
    diseases = result.scalars().all()
    return [Disease(name=disease.name, id=disease.id ) for disease in diseases]

@app.post("/diseases")
async def add_disease(disease: DiseaseCreate, session: AsyncSession = Depends(get_session)):
    disease = Disease(name=disease.name)
    session.add(disease)
    await session.commit()
    await session.refresh(disease)
    return disease

@app.get("/locations", summary="Get all locations")
async def locations(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Location))
    locations = result.scalars().all()
    return [Location(name=location.name, id=location.id ) for location in locations]

@app.post("/locations")
async def add_location(location: LocationCreate, session: AsyncSession = Depends(get_session)):
    location = Location(name=location.name)
    session.add(location)
    await session.commit()
    await session.refresh(location)
    return location

@app.get("/syndromes", summary="Get all syndromes")
async def syndromes(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Syndrome))
    syndromes = result.scalars().all()
    return [Syndrome(name=syndrome.name, id=syndrome.id ) for syndrome in syndromes]

@app.post("/syndromes")
async def add_syndrome(syndrome: SyndromeCreate, session: AsyncSession = Depends(get_session)):
    syndrome = Syndrome(name=syndrome.name)
    session.add(syndrome)
    await session.commit()
    await session.refresh(syndrome)
    return syndrome
