import datetime
from bson.objectid import ObjectId


class Validator:
    def get_error(self, status, message):
        return {"error": {"status": status, "message": message}}

    def validate_datetime(self, date):
        if not date:
            return True
        try:
            date = datetime.datetime.strptime(date, "%Y-%m-%d %H:%M:%S")
        except Exception:
            return False

        if date > datetime.datetime.now():
            return False

        return True

    def validate_id(self, id):
        try:
            ObjectId(id)
        except Exception:
            return False

        return True
