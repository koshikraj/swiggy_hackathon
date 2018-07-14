import json
import falcon
from token_validator import validate_token
final_distance = 1
from neorpcclient import *


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
        data = {
            "categories": [{
                "category_name": "Dal",
                "category_id": "1",
                "category_items": [{
                    "item_name": "Dal Fry",
                    "item_id": 1,
                    "price": 137,
                    "is_veg": True,
                    "ingredient_id": [123]
                }]
            }]
        }

        res.status = falcon.HTTP_200
        res.body = json.dumps({'status': True,
                               'data': data,
                               'message': 'success'
                               })


class GetHash:
    def on_get(self, req, res, block_id):
        print("Block ID ", block_id)

        res.status = falcon.HTTP_200
        # print(get_hash_of_block(block_id))
        res.body = json.dumps({'status': True,
                               'data': get_hash_of_block(block_id),
                               'message': 'success'
                               })


class OwnerData:
    def on_get(self, req, res, assets_id):
        try:
            print("Block ID ", assets_id)
            res.status = falcon.HTTP_200
            res.body = json.dumps({'status': True,
                                   'data': get_owner_data(assets_id),
                                   'message': 'success'
                                   })

        except Exception as e:
            res.status = falcon.HTTP_400
            res.body = json.dumps({'status': False,
                                     'data': {},
                                     'message': str(e)
                                     })

