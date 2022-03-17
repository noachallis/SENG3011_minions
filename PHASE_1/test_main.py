from fastapi import FastAPI
from fastapi.testclient import TestClient

from src.main import app

client = TestClient(app)

## articles
def test_get_all_articles():
    response = client.get("/articles")
    assert response.status_code == 200

def test_get():
    response = client.get("/")
    assert response.status_code == 200


## reports



## diseases


## locations

## syndromes