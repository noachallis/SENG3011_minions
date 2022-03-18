from fastapi.testclient import TestClient

import sys
sys.path.append('./')
from src.main import app

client = TestClient(app)


## get by location

def test_get_article_by_location():
    response = client.get("/articles?location=Sydney")
    assert response.status_code == 200

def test_get_article_nonexistant_location():
    response = client.get("/articles?location=non_existant_location")
    assert response.status_code == 200
    assert response.json() == []

def test_get_report_by_location():
    response = client.get("/reports?location=Sydney")
    assert response.status_code == 200

def test_get_report_nonexistant_location():
    response = client.get("/reports?location=non_existant_location")
    assert response.status_code == 200
    assert response.json() == []