from sqlalchemy import Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship

from db import Base
    
class Article(Base):
    __tablename__ = "articles"
    
    id = Column(Integer, primary_key=True,index=True)
    url = Column(String(200))
    pub_date = Column(String(200))
    headline = Column(String(200))
    main_text = Column(String(200))
    notes = Column(String(200))
    def __repr__(self):
        return 'Article(id=%s, url=%s, pub_date=%s, headline=%s, main_text=%s, notes=%s)' % (self.id, self.url ,self.pub_date, self.headline, self.main_text, self.notes)
    
class Report(Base):
    __tablename__ = "reports"
    id = Column(Integer, primary_key=True,index=True)
    # disease = Column(Integer,ForeignKey('articles.id'),nullable=False)
    event_date = Column(String(200))
    # location = Column(Integer,ForeignKey('articles.id'),nullable=False)
    article = Column(Integer,ForeignKey('articles.id'),nullable=False)
    notes = Column(String(200))

    def __repr__(self):
        return 'Report(id=%s, event_date = %s, article=%s, notes=%s)' % (self.id, self.event_date, self.article, self.notes)