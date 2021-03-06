from fastapi.testclient import TestClient

import sys

sys.path.append("./")
from src.main import app
import datetime

client = TestClient(app)
version_num = 'v1'


## test get by date
now = str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))


def test_get_article_date_after_today():
    response = client.get(version_num + '/articles?start_date=2223-03-20')
    assert response.status_code == 400
    assert response.json() == {
        "error": {
            "message": "Start date has to be in the following format yyyy-MM-dd hh:mm:ss and less than "
            + now,
            "status": 400,
        }
    }


def test_get_article_date_wrong_syntax():
    response = client.get(version_num + "/articles?start_date=2")
    assert response.status_code == 400
    assert response.json() == {
        "error": {
            "message": "Start date has to be in the following format yyyy-MM-dd hh:mm:ss and less than "
            + now,
            "status": 400,
        }
    }


def test_get_report_date_after_today():
    response = client.get(version_num + "/reports?start_date=2223-03-20%2002%3A01%3A48")
    assert response.status_code == 400
    assert response.json() == {
        "error": {
            "message": "Start date has to be in the following format yyyy-MM-dd hh:mm:ss and less than "
            + now,
            "status": 400,
        }
    }


def test_get_report_date_wrong_syntax():
    response = client.get(version_num + "/reports?start_date=2")
    assert response.status_code == 400
    assert response.json() == {
        "error": {
            "message": "Start date has to be in the following format yyyy-MM-dd hh:mm:ss and less than "
            + now,
            "status": 400,
        }
    }


def test_get_article_date():
    response = client.get(version_num + "/reports?start_date=2000-03-20%2002%3A01%3A48")
    assert response.status_code == 200

def test_get_report_date():
    response = client.get(version_num + "/reports?start_date=1000-03-20%2002%3A01%3A48")
    assert response.status_code == 200


def test_get_article_by_enddate_before_startdate():
    response = client.get(
        version_num + "/reports?start_date=2018-03-20%2002%3A01%3A48&end_date=2016-03-20%2002%3A01%3A48"
    )
    assert response.status_code == 400
