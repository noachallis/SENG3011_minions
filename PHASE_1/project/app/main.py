from fastapi import Depends, FastAPI
from fastapi.responses import JSONResponse
from db import get_db, engine
import sql_app.models as models
import sql_app.schemas as schemas
from sql_app.repositories import ArticleRepo # ,ReportRepo
from sqlalchemy.orm import Session
from typing import List,Optional

app = FastAPI(title="Sample FastAPI Application",
    description="Sample FastAPI Application with Swagger and Sqlalchemy",
    version="1.0.0",)

models.Base.metadata.create_all(bind=engine)

@app.exception_handler(Exception)
def validation_exception_handler(request, err):
    base_error_message = f"Failed to execute: {request.method}: {request.url}"
    return JSONResponse(status_code=400, content={"message": f"{base_error_message}. Detail: {err}"})

@app.get("/")
def hello():
    return {"message":"Hello"}

@app.get('/articles', tags=["Article"],response_model=List[schemas.Article])
def get_all_items(name: Optional[str] = None,db: Session = Depends(get_db)):
    """
    Get all the Articles stored in database
    """
    if id:
        articles =[]
        db_article = ArticleRepo.fetch_by_id(db,id)
        articles.append(db_article)
        return articles
    else:
        return ArticleRepo.fetch_all(db)
