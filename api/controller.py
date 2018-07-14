import json
import falcon
from token_validator import validate_token
final_distance = 1


vendor = {"fsdhjfgsdf" : "sfhjsgfjsf"}
source = {"fdsdfsdfsd" : "dfsdfsdfdf"}
raw_material = {"zvxcvxcvxcv" : "dfsdfsdzcvxcvxcvfdf"}
foods = {"1" : {"name": "fsfsdf" }}

class GetData:
    # @validate_token
    def on_get(self, req, res):

        res.status = falcon.HTTP_200

        res.body = json.dumps({'status': True,
                              'data': {
                                       'distance': final_distance
                                       },
                               'message': 'success'
                              })


class PostData:
    # @validate_token
    def on_post(self, req, res):
        json_data = json.loads(req.stream.read().decode('utf8'))
        distance = int(json_data['distance'])
        global final_distance
        final_distance = distance
        res.status = falcon.HTTP_200
        res.body = json.dumps({'status': True,
                              'data': {
                                       'distance': final_distance
                                       },
                               'message': 'success'
                              })


class Category:
    def on_get(self, req, res, restaurant_id):
        print(restaurant_id)
        res.status = falcon.HTTP_200
        res.body = json.dumps({
            "data": {
                "categories": [
                    {
                        "category_name": "Dal",
                        "category_id": "1",
                        "category_items": [
                            {
                                "Dal Fry": {
                                    "item_id": 1,
                                    "price": 137,
                                    "veg": True,
                                    "ingredient_id": 123
                                }
                            }
                        ]
                    }
                ]
            },
            "status": True
        })


