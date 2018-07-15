from neorpc.Client import RPCClient
import binascii
import base64
import json

client = RPCClient()
CONTRACT_ID = '0xe9bf8617ee1e4a3ff9177eb6ebe2d9e790fc590a'


def get_hash_of_block(block_id=1):
    return client.get_block_hash(block_id)


def invoke_contract(assets_id):
    return client.invoke_contract_fn(CONTRACT_ID, "query", [{'type': 7, 'value': assets_id}])

def invoke_contract_query_asset(owner):
    return client.invoke_contract_fn(CONTRACT_ID, "query_asset_list", [{'type': 7, 'value': owner}])



def get_owner_data(assets_id='asd'):
    data = dict(invoke_contract(assets_id))
    value = data['stack'][0]['value']
    owner_data = json.loads(base64.b64decode(binascii.a2b_hex(value)).decode())
    return owner_data


def transfer_ownership():
    # client.
    # client
    pass
