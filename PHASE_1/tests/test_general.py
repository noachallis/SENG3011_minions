from fastapi.testclient import TestClient

import sys

sys.path.append("./")
from src.main import app

client = TestClient(app)
version_num = "v1"

## test general get endpoints


def test_get():
    response = client.get("/")
    assert response.status_code == 200


def test_get_all_articles():
    response = client.get(version_num + "/articles")
    assert response.status_code == 200


def test_get_all_reports():
    response = client.get(version_num + "/reports")
    assert response.status_code == 200


def test_nonexistant_endpont():
    response = client.get(version_num + "/blah")
    assert response.status_code == 404
    assert response.json() == {"detail": "Not Found"}


def test_nonexistant_queryparam():
    response = client.get(version_num + "/article?blah=10")
    assert response.status_code == 404
    assert response.json() == {"detail": "Not Found"}
