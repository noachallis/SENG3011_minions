from typing import List, Optional

from pydantic import BaseModel


class ArticleBase(BaseModel):
    id: int
    url : str
    pub_date: str
    headline: int
    main_text: str
    notes: Optional[str] = None


class ArticleCreate(ArticleBase):
    pass


class Article(ArticleBase):
    id: int

    class Config:
        orm_mode = True


class ReportBase(BaseModel):
    name: str

class ReportCreate(ReportBase):
    pass

class Report(ReportBase):
    id: int

    class Config:
        orm_mode = True