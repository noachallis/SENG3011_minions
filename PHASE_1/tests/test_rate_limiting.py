
from fastapi.testclient import TestClient

import sys

sys.path.append("./")
from src.main import app
import json

client = TestClient(app)


## test limiting
version_num = "v1"
ratelimit = 50

def test_rate_limit_articles():
    for i in range(ratelimit*2):
        client.get(version_num + "/articles?limit=10")
    response = client.get(version_num + "/articles?limit=10")
    assert response.status_code == 429
    
def test_rate_limit_report():
    for i in range(ratelimit*2):
        client.get(version_num + "/reports?limit=10")
    response = client.get(version_num + "/reports?limit=10")
    assert response.status_code == 429

def test_rate_limit_covid():
    for i in range(ratelimit*2):
        client.get(version_num + "/covid/date?date=2020-02-15")
    response = client.get(version_num + "/covid/date?date=2020-02-15")
    assert response.status_code == 429