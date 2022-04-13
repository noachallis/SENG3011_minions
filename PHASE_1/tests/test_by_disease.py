from fastapi.testclient import TestClient

import sys

sys.path.append("./")
from src.main import app

client = TestClient(app)

version_num = "v1"
## test by disease


def test_get_article_by_disease():
    response = client.get(version_num + "/articles?key_term=coronavirus")
    assert response.status_code == 200


def test_query_nonexistant_term():
    response = client.get(version_num + "/articles?key_term=non_existant_term")
    assert response.status_code == 404

def test_get_report_by_disease():
    response = client.get(version_num + "/reports?key_term=coronavirus")
    assert response.status_code == 200
