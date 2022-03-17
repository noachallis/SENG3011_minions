class Errors:    
    def get_error(self, status, message):
        return {
            "error" : {
                "status" : status,
                "message" : message
            }
        }