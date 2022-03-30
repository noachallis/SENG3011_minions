from pymongo import MongoClient
import json
import datetime
import random
import csv
import pandas as pd
import os

diseases = {
    "African Swine Fever / Swine Fever": [
        "fever",
        "loss of appetite",
        "skin reddening",
        "blueness of extremities",
        "coughing and difficulty breathing",
        "diarrhoea",
        "vomiting",
    ],
    "Classical Swine Fever": [
        "fever",
        "loss of appetite",
        "skin reddening",
        "blueness of extremities",
        "coughing and difficulty breathing",
        "diarrhoea",
        "vomiting",
    ],
    "Anthrax": [
        "a group of small blisters or bumps that may itch",
        "swelling around the sore",
        "a painless skin sore (ulcer) with a black center that appears after the small blisters or bumps",
    ],
    "anthrax gastrointestinous": [
        "fever",
        "chills",
        "swelling of neck or neck glands",
        "sore throat" "painful swallowing",
        "hoarseness",
        "nausea and vomiting",
        "bloody vomiting",
        "diarrhea or bloody diarrhea",
        "headache",
        "flushing",
        "red eyes",
        "stomach pain",
        "fainting",
        "swelling of abdomen",
    ],
    "anthrax inhlation": [
        "fever",
        "chills",
        "chest discomfort",
        "shortness of breath",
        "confusion or dizziness",
        "cough",
        "nausea and vomiting",
        "stomach pains",
        "headache",
        "sweats",
        "extreme fatigue",
        "body aches",
    ],
    "Avian Flu": ["fever", "sore throat", "cough", "headache", "aching muscles"],
    "Botulism": [
        "difficulty swallowing",
        "muscle weakness",
        "double vision",
        "drooping eyelids",
        "blurry vision",
        "slurred speech",
        "difficulty breathing",
        "difficulty moving the eyes",
    ],
    "Brucellosis": [
        "fever",
        "sweats",
        "malaise",
        "anorexia",
        "headache",
        "pain in muscles, joint, and/or back",
        "fatigue",
        "recurrent fevers",
        "arthritis",
        "swelling of the testicle and scrotum area",
        "endocarditis",
        "neurologic symptoms",
        "chronic fatigue",
        "depression",
        "swelling of the liver and/or spleen",
    ],
    "Chikungunya": [
        "fever",
        "joint pain",
        "headache",
        "muscle pain",
        "joint swelling",
        "rash",
    ],
    "Cholera Outbreak": [
        "profuse watery diarrhea",
        "vomiting",
        "thirst",
        "leg cramps",
        "restlessness",
        "rapid heart rate",
        "loss of skin elasticity",
        "dry mucous membranes",
        "low blood pressure",
    ],
    "Swine Flu - Confirmed Cases": [
        "fever",
        "hemorrhages",
        "lethargy",
        "yellowish diarrhea",
        "vomiting",
        "purple skin discoloration of the ears, lower abdomen, and legs",
    ],
    "Congo Fever": [
        "headache",
        "high fever",
        "back pain",
        "joint pain,",
        "stomach pain",
        "vomiting",
        "red eyes",
        "flushed face",
        "red throat",
        "petechiae on the palate",
    ],
    "Coronavirus": [
        "fever or chills",
        "cough",
        "shortness of breath or difficulty breathing",
        "fatigue",
        "muscle or body aches",
        "headache",
        "new loss of taste or smell",
        "sore throat",
        "congestion or runny nose",
        "nausea and vomiting",
        "diarrhea",
    ],
    "cryptococcosis": [
        "fever",
        "malaise",
        "pleuritic chest pain",
        "cough",
        "hemoptysis",
        "headache",
        "vision changes",
        "nausea and vomiting",
        "mental status changes",
        "meningitis",
        "seizures",
        "coma",
    ],
    "cryptosporidiosis": [
        "watery diarrhea",
        "fever",
        "lack of appetite",
        "stomach cramps",
        "dehydration",
        "weight loss",
        "nausea, and vomiting",
    ],
    "Dengue / Hemorrhagic Fever": [
        "fever",
        "nausea and vomiting",
        "rash",
        "aches and pains",
    ],
    "diphtheria": [
        "weakness",
        "sore throat",
        "mild fever",
        "swollen glands in the neck",
    ],
    "Ebola / Marburg": [
        "fever",
        "aches and pains",
        "weakness and fatigue",
        "sore throat",
        "loss of appetite",
        "gastrointestinal symptoms",
        "unexplained hemorrhaging, bleeding or bruising",
    ],
    "Encephalitis": [
        "fever",
        "seizures",
        "headache",
        "movement disorders",
        "sensitivity to light",
        "sensitivity to sound",
        "neck stiffness",
        "loss of consciousness",
    ],
    "Foot-And-Mouth Disease": [
        "fever",
        "sore throat",
        "feeling unwell",
        "painful, red, blister-like lesions on the tongue, gums and inside of the cheeks",
        "a red rash, without itching but sometimes with blistering, on the palms, soles and sometimes the buttocks",
        "irritability in infants and toddlers",
        "loss of appetite",
    ],
    "Glanders": [
        "fever",
        "chills and sweating",
        "muscle aches",
        "chest pain",
        "muscle tightness",
        "headache",
        "excessive tearing of the eyes",
        "light sensitivity",
        "ulcers",
        "diarrhea",
    ],
    "Notable H1N1 News And Announcements": [
        "fever",
        "headache",
        "sore throat",
        "cough",
        "fatigue",
        "general aches and pains",
        "nose, throat and lung congestion",
    ],
    "H7N9 / H5N1 / H5N2 / H7N1 / H7N3 / H7N7 / H5N8": [
        "fever",
        "cough that produces sputum",
        "breathing problems and wheezing",
        "headache",
        "myalgia",
        "malaise",
    ],
    "h5n1": [
        "cough",
        "diarrhea",
        "respiratory difficulties",
        "fever",
        "headache",
        "muscle aches",
        "malaise",
        "runny nose",
    ],
    "h5n2": ["fever", "respiratory difficulties", "muscle aches", "red, itchy eyes"],
    "h7n1": [
        "fever",
        "cough",
        "aching muscles",
        "sore throat",
        "eye infection",
        "serious respiratory infection",
        "pneumonia",
    ],
    "h7n3": [
        "fever",
        "cough",
        "conjunctivitis",
        "sore throat",
        "myalgia",
        "arthralgia",
        "fatigue",
        "diarrhea",
        "chills",
        "headache",
    ],
    "h7n7": ["fever", "cough", "rhinorrhoea", "sore throat", "myalgia", "headache"],
    "h5n8": [
        "fever",
        "cough",
        "sore throat",
        "muscle aches",
        "headache",
        "shortness of breath",
    ],
    "Hantavirus": [
        "fever",
        "fatigue",
        "muscle pain",
        "headache and nausea",
        "vomiting",
        "diarrhea",
        "dizziness",
    ],
    "Hendra Virus": ["fever", "cough", "sore throat", "headache", "fatigue"],
    "kcp": [
        "fever",
        "chills",
        "cough",
        "yellow or bloody mucus",
        "shortness of breath",
        "chest pain",
    ],
    "Lassa Fever": [
        "fever",
        "general weakness",
        "malaise",
        "headache",
        "sore throat",
        "muscle pain",
        "chest pain",
        "nausea",
        "vomiting",
        "diarrhoea",
        "cough",
        "abdominal pain",
    ],
    "Malaria": [
        "fever",
        "chills",
        "headache",
        "muscle aches",
        "fatigue",
        "nausea",
        "vomiting",
        "diarrhea",
        "anemia",
        "jaundice",
    ],
    "Meningitis Outbreak ( Suspected or Confirmed)": [
        "sudden high fever",
        "stiff neck",
        "severe headache",
        "nausea and vomiting",
        "confusion or difficulty concentrating",
        "seizures",
        "sleepiness or difficulty waking",
        "sensitivity to light",
        "no appetite or thirst",
        "skin rash",
    ],
    "Monkey Pox": [
        "fever",
        "headache",
        "muscle aches",
        "backache",
        "swollen lymph nodes",
        "chills",
        "exhaustion",
        "macules",
        "papules",
        "vesicles",
        "pustules",
        "scabs",
    ],
    "NDM-1": ["fever", "fatigue", "confusion", "shock"],
    "Newcastle Disease": [
        "loss of appetite",
        "coughing",
        "gasping",
        "nasal discharge",
        "watery eyes",
        "bright green diarrhoea",
        "paralysis",
        "convulsions",
    ],
    "nipah virus": [
        "fever",
        "headache",
        "cough",
        "sore throat",
        "trouble breathing",
        "vomiting",
    ],
    "Plague": [
        "fever",
        "headache",
        "chills",
        "weakness",
        "swollen, painful lymph nodes",
    ],
    "Polio": [
        "fever",
        "sore throat",
        "headache",
        "vomiting",
        "fatigue",
        "back pain or stiffness",
        "neck pain or stiffness",
        "pain or stiffness in the arms or legs",
        "muscle weakness or tenderness",
    ],
    "q-fever": [
        "fever",
        "chills",
        "fatigue",
        "headache",
        "muscle aches",
        "nausea",
        "vomiting",
        "diarrhea",
        "chest pain",
        "stomach pain",
        "weight loss",
        "non-productive cough",
    ],
    "Rabies": [
        "fever",
        "headache",
        "nausea",
        "vomiting",
        "agitation",
        "anxiety",
        "confusion",
        "hyperactivity",
        "difficulty swallowing",
        "excessive salivation",
        "hallucinations",
        "insomnia",
        "partial paralysis",
    ],
    "Rathayibacter": ["blight, or yellow ear rot"],
    "ricin": [
        "difficulty breathing",
        "fever",
        "cough",
        "nausea",
        "tightness in the chest",
        "heavy sweating",
        "pulmonary edema",
        "vomiting and diarrhea",
    ],
    "Rift Valley Fever": [
        "fever",
        "general weakness",
        "back pain",
        "dizziness",
        "extreme weight loss",
        "blurred and decreased vision",
    ],
    "Salmonella Outbreak (Suspected or Confirmed)": [
        "diarrhea",
        "fever",
        "stomach cramps",
    ],
    "schmallenberg virus": [
        "fever",
        "reduced milk yield",
        "inappetence",
        "loss of body condition",
        "diarrhoea",
    ],
    "Small Pox": [
        "fever",
        "overall discomfort",
        "headache",
        "severe fatigue",
        "severe back pain",
        "vomiting",
    ],
    "tularemia": [
        "skin ulcers",
        "swollen and painful lymph glands",
        "inflamed eyes",
        "sore throat",
        "mouth sores",
        "diarrhea",
        "pneumonia",
        "fever",
        "chills",
        "headache",
        "muscle aches",
        "joint pain",
        "dry cough",
    ],
    "Typhoid / Typhus": [
        "weakness",
        "stomach pain",
        "headache",
        "diarrhea",
        "constipation",
        "cough",
        "loss of appetite",
    ],
    "typhus": ["fever", "chills", "headache", "muscle aches", "malaise", "eschar"],
    "West Nile Virus (suspected or confirmed)": [
        "fever",
        "headache",
        "body aches",
        "joint pains",
        "vomiting",
        "diarrhea",
        "rash",
        "fatigue",
    ],
    "zika": ["fever", "rash", "headache", "joint pain", "red eyes", "muscle pain"],
}
def csv_to_json(filename, header=None):
    data = pd.read_csv(filename, header=header)
    return data.to_dict('records')

class Seeder:
    def __init__(self) -> None:
        self.client = MongoClient()
        self.db = self.client.seng

    # only run this once
    def insert_all_data(self):
        self.drop()
        articles = self.db.articles
        reports_curr = self.db.reports

        if "articles" in self.db.list_collection_names() and articles.count() != 0:
            print("about to return")
            return
        try:
            self.db.create_collection("articles")
            self.db.create_collection("reports")
        except Exception:
            pass
        articles = self.db.articles
        reports_curr = self.db.reports

        with open("scraper/data/pray_to_jesus1.json", "r") as json_file:
            json_list = list(json_file)
        for json_str in json_list:
            article = json.loads(json_str)
            try:
                article["time"] = datetime.datetime.strptime(
                    article["time"], "%Y-%m-%d %H:%M:%S"
                ).isoformat()
            except Exception:
                pass

            article["syndromes"] = []

            if article["name"] in diseases:
                syndromes = diseases[article["name"]]
                number = random.randint(-len(syndromes), len(syndromes))
                if number > 0:
                    case = random.sample(syndromes, number)
                    article["syndromes"] = case

            reports = []
            for x in article["reports"]:
                _id = reports_curr.insert_one({"report": x})
                reports.append({"id": str(_id.inserted_id), "report": x})
            article["reports"] = reports

            articles.insert_one(article)

    # run this once
    def insert_all_data_covid(self):
        self.db.covidReports.drop()
        try:
            self.db.create_collection("covidReports")
        except Exception:
            pass
        covidReports = self.db.covidReports
        data_file_path = os.path.join(os.path.dirname(__file__), "all.csv")
        covidReports.insert_many(csv_to_json(data_file_path, header=0))

    # run this daily
    def insert_latest_data_covid(self):
        try:
            self.db.create_collection("covidReports")
        except Exception:
            pass
        covidReports = self.db.covidReports
        data_file_path = os.path.join(os.path.dirname(__file__), "latest.csv")
        covidReports.insert_many(csv_to_json(data_file_path, header=0))


    def test(self):
        test = self.db.reports.count()
        print(test)

    def drop(self):
        self.db.articles.drop()
        self.db.reports.drop()

if __name__ == "__main__":
    seeder = Seeder()
    seeder.insert_all_data()
    seeder.insert_all_data_covid()
