from pymongo import MongoClient
import json

class Seeder:

    def __init__(self) -> None:
        self.client = MongoClient()
        self.db = self.client.seng
        self.db.articles.insert({ "_id": 1, "category": "café", "status": "A" })
        self.db.articles.remove({ "category": "cafe", "status": "A" })

    # only run this once
    def insert_all_data(self):
        articles = self.db.articles
        if articles.count() != 0:
            return
        
        with open('scraper/data/pray_to_jesus1.json', 'r') as json_file:
            json_list = list(json_file)

        for json_str in json_list:
            article = json.loads(json_str)
            articles.insert_one(article)

    def test(self):
        test = self.db.articles.find_one()
        print(test["name"])

    def drop(self):
        self.db.articles.drop()
        

if __name__ == '__main__':
    seeder = Seeder()
    seeder.test()