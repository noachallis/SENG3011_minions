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
    response = client.get("/articles/reports")
    assert response.status_code == 200

## endpoint errors
def test_wrong_endpont():
    response = client.get("/reports")
    assert response.status_code == 400

## queries
def test_get_article_by_disease(): 
    assert 5 == 5

## query errors
def test_date_after_today():
    assert 5 == 5