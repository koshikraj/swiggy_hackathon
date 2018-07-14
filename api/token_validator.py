import falcon
import json


def validate_token(func):
    def wrapper(*args):

        resp = args[2]
        user_token = args[1].get_header('Authorization')

        if user_token == "1111":

            func(*args)

        else:
            resp.status = falcon.HTTP_203
            resp.body = json.dumps({'status': False, 'message': 'Unauthorized access'})


    return wrapper