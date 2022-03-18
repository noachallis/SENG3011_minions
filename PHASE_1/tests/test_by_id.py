from fastapi.testclient import TestClient

import sys
sys.path.append('./')
from src.main import app

client = TestClient(app)


## get article by id

# def test_article_by_id():
#     response = client.get("/articles/6233de82bee4f13366d4e585")
#     assert response.status_code == 200
#     data = response.json()
#     assert str(data["_id"]) == "6233de82bee4f13366d4e585"

def test_article_by_nonexistant_id():
    response = client.get("/articles/0")
    assert response.status_code == 404
    assert response.json() == {"error":{"status":404,"message":"Not found"}}

# def test_get_reports_by_article_with_id():
#     response = client.get("/articles/6233df32c6f4ddf1537ad156/reports")
#     assert response.status_code == 200