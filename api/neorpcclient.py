from neorpc.Client import RPCClient
import binascii
import base64
import json

client = RPCClient()
CONTRACT_ID = '0xd2034b4fa9ed43008ea709f53f3086dbe9b6ca8c'


def get_hash_of_block(block_id=1):
    return client.get_block_hash(block_id)


def invoke_contract(assets_id='asd'):
    return client.invoke_contract_fn(CONTRACT_ID, "query", [{'type': 7, 'value': assets_id}])


def get_owner_data(assets_id='asd'):
    data = dict(invoke_contract(assets_id))
    value = data['stack'][0]['value']
    owner_data = json.loads(base64.b64decode(binascii.a2b_hex(value)).decode())
    return owner_data


def transfer_ownership():
    # client.
    # client
    pass
