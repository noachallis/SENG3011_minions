from fastapi.testclient import TestClient

import sys

sys.path.append("./")
from src.main import app
import json

client = TestClient(app)


## test limiting
version_num = "v1"


def test_article_limit():
    response = client.get(version_num + "/articles?limit=10")
    assert response.status_code == 200
    
    json_data = response.json()
    assert len(json_data) <= 10


def test_report_limit():
    response = client.get(version_num + "/reports?limit=10")
    assert response.status_code == 200
    # json_data = json.dumps(str(response.json()))
    json_data = response.json()
    assert len(json_data) <= 10


def test_article_auto_limit():
    response = client.get(version_num + "/articles")
    assert response.status_code == 200
    # json_data = json.dumps(str(response.json()))
    json_data = response.json()
    assert len(json_data) <= 25


def test_report_auto_limit():
    response = client.get(version_num + "/reports")
    assert response.status_code == 200
    # json_data = json.dumps(str(response.json()))
    json_data = response.json()
    assert len(json_data) <= 25
