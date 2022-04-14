import re


class QueryArticles:
    def __init__(self, db) -> None:
        self.db = db

    def query_articles(self, key_term, location, start_date, end_date, limit):
        data = []
        if not key_term and not location:
            data = self.db.articles.find(
                {
                    "$or": [
                        {"name": {"$exists": True}},
                        {"description": {"$exists": True}},
                        {"city": {"$exists": True}},
                        {"country": {"$exists": True}},
                    ],
                    "$and": [
                        {"time": {"$lte": end_date}},
                        {"time": {"$gte": start_date}},
                    ],
                }
            ).limit(limit)
        elif key_term:
            key_term = re.compile(".*" + key_term + ".*", re.IGNORECASE)
            data = self.db.articles.find(
                {
                    "$or": [
                        {"name": key_term},
                        {"description": key_term},
                        {"reports": {"$elemMatch": {"report": key_term}}},
                    ],
                    "$and": [
                        {"time": {"$lte": end_date}},
                        {"time": {"$gte": start_date}},
                    ],
                }
            ).limit(limit)
        else:
            location = re.compile(".*" + location + ".*", re.IGNORECASE)
            data = self.bdb.articles.find(
                {
                    "$or": [{"city": location}, {"country": location}],
                    "$and": [
                        {"time": {"$lte": end_date}},
                        {"time": {"$gte": start_date}},
                    ],
                }
            ).limit(limit)

        return data


    def query_reports(self, key_term, location, start_date, end_date, limit):
        data = []
        if not key_term and not location:
            data = self.db.articles.find(
                {
                    "$or": [
                        {"name": {"$exists": True}},
                        {"description": {"$exists": True}},
                        {"city": {"$exists": True}},
                        {"country": {"$exists": True}},
                    ],
                    "$and": [
                        {"time": {"$lte": end_date}},
                        {"time": {"$gte": start_date}},
                    ],
                }
            ).limit(limit)
        elif key_term:
            key_term = re.compile(".*" + key_term + ".*", re.IGNORECASE)
            data = self.db.articles.find(
                {
                    "$and": [
                        {"reports": {"$elemMatch": {"report": key_term}}},
                        {"time": {"$lte": end_date}},
                        {"time": {"$gte": start_date}},
                    ]
                }
            ).limit(limit)
        else:
            location = re.compile(".*" + location + ".*", re.IGNORECASE)
            data = self.db.articles.find(
                {
                    "$or": [{"city": location}, {"country": location}],
                    "$and": [
                        {"time": {"$lte": end_date}},
                        {"time": {"$gte": start_date}},
                    ],
                }
            ).limit(limit)

        return data
