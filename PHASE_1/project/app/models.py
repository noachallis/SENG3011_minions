from typing import Optional
from pydantic import condecimal
from sqlmodel import SQLModel, Field

# Article
class ArticleBase(SQLModel):
    url: str
    pub_date: str
    headline: str
    main_text: str
    notes: str

class Article(ArticleBase, table=True):
    id: int = Field(default=None, primary_key=True)

class ArticleCreate(ArticleBase):
    pass


# Report
class ReportBase(SQLModel):
    event_date: str
    notes: str

class Report(ReportBase, table=True):
    id: int = Field(default=None, primary_key=True)
    disease_id: Optional[int] = Field(default=None, foreign_key="disease.id")
    location_id: Optional[int] = Field(default=None, foreign_key="location.id")
    article_id: Optional[int] = Field(default=None, foreign_key="article.id")

class ReportCreate(ReportBase):
    pass

# Syndrome
class SyndromeBase(SQLModel):
    name: str

class Syndrome(SyndromeBase, table=True):
    id: int = Field(default=None, primary_key=True)

class SyndromeCreate(SyndromeBase):
    pass

# Disease
class DiseaseBase(SQLModel):
    name: str

class Disease(DiseaseBase, table=True):
    id: int = Field(default=None, primary_key=True)

class DiseaseCreate(DiseaseBase):
    pass

#Location
class LocationBase(SQLModel):
    name: str
    country: str
    city: str
    region: str
    longitude: condecimal(max_digits=5, decimal_places=3) = Field(default=0)
    latitude: condecimal(max_digits=5, decimal_places=3) = Field(default=0)

class Location(LocationBase, table=True):
    id: int = Field(default=None, primary_key=True)

class LocationCreate(LocationBase):
    pass