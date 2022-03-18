from fastapi.testclient import TestClient

import sys
sys.path.append('./')
from src.main import app

client = TestClient(app)


## test by disease

def test_get_article_by_disease(): 
    response = client.get("/articles?key_term=coronavirus")
    assert response.status_code == 200

def test_query_nonexistant_disease():
    response = client.get("/articles?key_term=non_existant_disease")
    assert response.status_code == 200
    assert response.json() == []

def test_get_report_by_disease(): 
    response = client.get("/reports?key_term=coronavirus")
    assert response.status_code == 200