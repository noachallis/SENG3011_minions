from fastapi import FastAPI
from fastapi.testclient import TestClient

from src.main import app

client = TestClient(app)

## general get endpoints
def test_get():
    response = client.get("/")
    assert response.status_code == 200

def test_get_all_articles():
    response = client.get("/articles")
    assert response.status_code == 200

def test_get_all_reports():
    response = client.get("/reports")
    assert response.status_code == 200

# def test_nonexistant_endpont():
#     response = client.get("/articles/reports")
#     assert response.status_code == 400



## get article by id

def test_article_by_id():
    response = client.get("/articles/623327582c76fb9a3c327706")
    assert response.status_code == 200
    data = response.json()
    assert str(data["d"]["_id"]) == "623327582c76fb9a3c327706"

def test_article_by_nonexistant_id():
    response = client.get("/articles/0")
    assert response.status_code == 400

def test_get_reports_by_article_with_id():
    response = client.get("/articles/623327582c76fb9a3c327706/reports")
    assert response.status_code == 200

## get article by disease
def test_get_article_by_disease(): 
    response = client.get("/articles?key_term=coronavirus")
    assert response.status_code == 200

def test_query_nonexistant_disease():
    response = client.get("/articles?key_term=non_existant_disease")
    assert response.status_code == 200
    assert response.json() == []

## query errors
def test_date_after_today():
    response = client.get("/articles?start_date=2")
    assert response.status_code == 400
