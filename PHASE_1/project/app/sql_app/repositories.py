from sqlalchemy.orm import Session

from . import schemas
from . import models


class ArticleRepo:
    
 async def create(db: Session, article: schemas.ArticleCreate):
        db_article = models.Article(id=article.id, url=article.url, pub_date=article.pub_date, headline=article.headline, main_text=article.main_text, notes=article.notes)
        db.add(db_article)
        db.commit()
        db.refresh(db_article)
        return db_article
    
 def fetch_by_id(db: Session,_id):
     return db.query(models.Article).filter(models.Article.id == _id).first()
 
 def fetch_by_url(db: Session,url):
     return db.query(models.Article).filter(models.Article.url == url).first()
 
 def fetch_all(db: Session, skip: int = 0, limit: int = 100):
     return db.query(models.Article).offset(skip).limit(limit).all()
 
 async def delete(db: Session,article_id):
     db_article= db.query(models.Article).filter_by(id=article_id).first()
     db.delete(db_article)
     db.commit()
     
     
 async def update(db: Session,article_data):
    updated_article = db.merge(article_data)
    db.commit()
    return updated_article
    
    
    
# class ReportRepo:
    
#     async def create(db: Session, store: schemas.StoreCreate):
#             db_store = models.Store(name=store.name)
#             db.add(db_store)
#             db.commit()
#             db.refresh(db_store)
#             return db_store
        
#     def fetch_by_id(db: Session,_id:int):
#         return db.query(models.Store).filter(models.Store.id == _id).first()
    
#     def fetch_by_name(db: Session,name:str):
#         return db.query(models.Store).filter(models.Store.name == name).first()
    
#     def fetch_all(db: Session, skip: int = 0, limit: int = 100):
#         return db.query(models.Store).offset(skip).limit(limit).all()
    
#     async def delete(db: Session,_id:int):
#         db_store= db.query(models.Store).filter_by(id=_id).first()
#         db.delete(db_store)
#         db.commit()
        
#     async def update(db: Session,store_data):
#         db.merge(store_data)
#         db.commit()