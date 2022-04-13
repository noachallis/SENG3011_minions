from pydantic import BaseModel
from typing import Optional, List
from fastapi import Query

tags_metadata = [
    {
        "name": "articles",
        "description": "Get disease articles by key word, time and location",
    },
    {
        "name": "reports",
        "description": "Get reports of diseases by key word, time and location",
    },
    {
        "name": "covid",
        "description": "Get collection of the COVID-19 data maintained by Our World in Data",
    }
]


class CustomQueryParams:
    def __init__(
        self,
        key_term: Optional[str] = Query(
            None,
            description="Key term can be used to query title, description or report metadata",
        ),
        location: Optional[str] = Query(
            None, description="Location can be used to query country and cities"
        ),
        start_date: Optional[str] = Query(
            None, description="The start date in the format yyyy-MM-dd hh:mm:ss"
        ),
        end_date: Optional[str] = Query(
            None, description="The end date in the format yyyy-MM-dd hh:mm:ss"
        ),
        limit: Optional[str] = Query(
            None, description="The total number of documents you want to retrieve"
        )
    ):
        self.key_term = key_term
        self.location = location
        self.start_date = start_date
        self.end_date = end_date
        self.limit = limit

class identifier:
    def __init__(
        self,
        id: str = Query(
            None, description="Id in the format of mongo ID. See more information "
        ),
    ):
        self.id = id


class Report(BaseModel):
    id: str
    report: str

    class Config:
        validation = False


class Article(BaseModel):
    class Config:
        validation = False

    _id: Optional[str]
    name: Optional[str]
    links: Optional[List[str]]
    time: Optional[str]
    region_code: Optional[str]
    country: Optional[str]
    description: Optional[str]
    latitude: Optional[str]
    longitude: Optional[str]
    reports: Optional[List[Report]]
    syndromes: Optional[List[str]]

class CovidData(BaseModel):
    class Config:
        validation = False

    _id: Optional[str]
    iso_code: Optional[str]
    continent: Optional[str]
    location: Optional[str]
    date: Optional[str]
    total_cases: Optional[int]
    new_cases: Optional[int]
    new_cases_smoothed: Optional[float]
    total_deaths: Optional[int]
    new_deaths: Optional[int]
    new_deaths_smoothed: Optional[int]
    total_cases_per_million: Optional[float]
    new_cases_per_million:Optional[float]
    new_cases_smoothed_per_million: Optional[float]
    total_deaths_per_million: Optional[int]
    new_deaths_per_million: Optional[int]
    new_deaths_smoothed_per_million: Optional[int]
    reproduction_rate: Optional[float]
    icu_patients: Optional[float]
    icu_patients_per_million: Optional[float]
    hosp_patients: Optional[float]
    hosp_patients_per_million: Optional[float]
    weekly_icu_admissions: Optional[float]
    weekly_icu_admissions_per_million: Optional[float]
    weekly_hosp_admissions: Optional[float]
    weekly_hosp_admissions_per_million: Optional[float]
    total_tests: Optional[float]
    new_tests: Optional[float]
    total_tests_per_thousand: Optional[float]
    new_tests_per_thousand: Optional[float]
    new_tests_smoothed: Optional[float]
    new_tests_smoothed_per_thousand: Optional[float]
    positive_rate: Optional[float]
    tests_per_case: Optional[float]
    tests_units: Optional[float]
    total_vaccinations: Optional[float]
    people_vaccinated: Optional[float]
    people_fully_vaccinated: Optional[float]
    total_boosters: Optional[float]
    new_vaccinations: Optional[float]
    new_vaccinations_smoothed: Optional[float]
    total_vaccinations_per_hundred: Optional[float]
    people_vaccinated_per_hundred: Optional[float]
    people_fully_vaccinated_per_hundred: Optional[float]
    total_boosters_per_hundred: Optional[float]
    new_vaccinations_smoothed_per_million: Optional[float]
    new_people_vaccinated_smoothed: Optional[float]
    new_people_vaccinated_smoothed_per_hundred: Optional[float]
    stringency_index: Optional[float]
    population: Optional[int]
    population_density: Optional[float]
    median_age: Optional[float]
    aged_65_older: Optional[float]
    aged_70_older: Optional[float]
    gdp_per_capita: Optional[float]
    extreme_poverty: Optional[float]
    cardiovasc_death_rate: Optional[float]
    diabetes_prevalence: Optional[float]
    female_smokers: Optional[float]
    male_smokers: Optional[float]
    handwashing_facilities:Optional[float]
    hospital_beds_per_thousand: Optional[float]
    life_expectancy: Optional[float]
    human_development_index: Optional[float]
    excess_mortality_cumulative_absolute: Optional[float]
    excess_mortality_cumulative: Optional[float]
    excess_mortality: Optional[float]
    excess_mortality_cumulative_per_million: Optional[float]
  

class error_message400(BaseModel):
    status: int = 400
    message: str


class rahul400(BaseModel):
    class Config:
        validation = False

    error: error_message400


class error_message404(BaseModel):
    status: int = 404
    message: str


class rahul404(BaseModel):
    class Config:
        validation = False

    error: error_message404


class report(BaseModel):
    class Config:
        validation = False

    id: Optional[str]
    report: Optional[str]
