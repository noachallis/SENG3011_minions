from fastapi.testclient import TestClient
from src.main import app, datetime

client = TestClient(app)

## test general get endpoints

def test_get():
    response = client.get("/")
    assert response.status_code == 200

def test_get_all_articles():
    response = client.get("/articles")
    assert response.status_code == 200

def test_get_all_reports():
    response = client.get("/reports")
    assert response.status_code == 200

def test_nonexistant_endpont():
    response = client.get("/blah")
    assert response.status_code == 404
    assert response.json() == {'detail': 'Not Found'}


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


## test get article by disease

def test_get_article_by_disease(): 
    response = client.get("/articles?key_term=coronavirus")
    assert response.status_code == 200

def test_query_nonexistant_disease():
    response = client.get("/articles?key_term=non_existant_disease")
    assert response.status_code == 200
    assert response.json() == []


## test get by date
now = str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

def test_get_article_date_after_today():
    response = client.get("/articles?start_date=2223-03-20%2002%3A01%3A48")
    assert response.status_code == 400
    assert response.json() == {'error': {'message': 'Start date has to be in the following format yyyy-MM-dd hh:mm:ss and less than ' + now, 'status': 400}}

def test_get_article_date_wrong_syntax():
    response = client.get("/articles?start_date=2")
    assert response.status_code == 400
    assert response.json() == {'error': {'message': 'Start date has to be in the following format yyyy-MM-dd hh:mm:ss and less than ' + now, 'status': 400}}

def test_get_report_date_after_today():
    response = client.get("/reports?start_date=2223-03-20%2002%3A01%3A48")
    assert response.status_code == 400
    assert response.json() == {'error': {'message': 'Start date has to be in the following format yyyy-MM-dd hh:mm:ss and less than ' + now, 'status': 400}}

def test_get_report_date_wrong_syntax():
    response = client.get("/reports?start_date=2")
    assert response.status_code == 400
    assert response.json() == {'error': {'message': 'Start date has to be in the following format yyyy-MM-dd hh:mm:ss and less than ' + now, 'status': 400}}

def test_get_article_no_dates():
    response = client.get("/reports?start_date=2000-03-20%2002%3A01%3A48")
    assert response.status_code == 200
    assert response.json() == []

def test_get_report_no_dates():
    response = client.get("/reports?start_date=1000-03-20%2002%3A01%3A48")
    assert response.status_code == 200
    assert response.json() == []

# def test_get_article_by_enddate_before_startdate():
#     response = client.get("/reports?start_date=2018-03-20%2002%3A01%3A48&end_date=2016-03-20%2002%3A01%3A48")
#     assert response.status_code == 400


## get by location

def test_get_article_by_location():
    response = client.get("/reports?location=Sydney")
    assert response.status_code == 200

def test_get_article_nonexistant_location():
    response = client.get("/reports?location=non_existant_location")
    assert response.status_code == 200
    assert response.json() == []
