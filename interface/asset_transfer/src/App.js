import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Neon, {rpc} from '@cityofzion/neon-js'
import {encode, decode} from 'base-64';
// base58 = require("ba se-58");
// import {encode, decode} from 'base-58';
import hexEncoding from 'crypto-js/enc-hex';
import SHA256 from 'crypto-js/sha256';

const ADDR_VERSION = '17';

function hash256(hex) {
    if (typeof hex !== 'string') throw new Error('reverseHex expects a string');
    if (hex.
            length % 2 !== 0) throw new Error('Incorrect Length:');
    var hexEncoded = hexEncoding.parse(hex);
    var ProgramSha256 = SHA256(hexEncoded);
    return SHA256(ProgramSha256).toString()
}

function reverseHex(hex) {

    var out = ''
    for (var i = hex.length - 2; i >= 0; i -= 2) {
        out += hex.substr(i, 2)
    }
    return out
}



function scripthash_to_address(scriptHash)
{

    // scriptHash = reverseHex(scriptHash)
    const shaChecksum = hash256(ADDR_VERSION + scriptHash).substr(0, 8);
    return encode(Buffer.from(ADDR_VERSION + scriptHash + shaChecksum, 'hex'))
}
String.prototype.hexEncode = function(){
    let hex, i;

    let result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += (hex).slice(-4);
    }

    return result
};

String.prototype.hexDecode = function(){
    let j;
    let hexes = this.match(/.{1,2}/g) || [];
    let back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
};

function transferAsset(assetId, fromAddress, toAddress) {
    const config = {
        scriptHash: '73a943ddf76e7d6d29847a19ab0e9ea7e83d8e90',
        operation: 'query',
        args: [assetId.hexEncode()
        ]
    };

    rpc.Query.invokeScript(Neon.create.script(config)).execute('http://139.59.65.33:30333').then((res) => {
        console.log(res.result.stack[0].value.hexDecode())});

}

function registerAsset() {

    const sourceAddress = 'AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y';
    const assetId = Math.floor((Math.random() * 1000000)).toString();

    // const config = {
    //     scriptHash: 'f5f52e1afedf383940e875db37cb5641516d4692',
    //     operation: 'register',
    //     args: [assetId.hexEncode(), sourceAddress.hexEncode(), "koshik".hexEncode()]
    // };

    // rpc.Query.invokeScript(Neon.create.script(config)).execute('http://139.59.65.33:30333').then((res) => {
    //     console.log(res.result.stack[0])});

    // only param generation

    // mush01
    // pota01
    // dal01
    // appl01
    // bana01


    console.log([assetId, sourceAddress, encode(JSON.stringify({"type": "mush01",
        "timestamp": [1531608975],
        "owners": [sourceAddress]
    }))])





}

transferAsset('70434')
// registerAsset('koshika')



class App extends Component {

    getAssetOwner() {
        const props = {
            scriptHash: '60a7ed582c6885addf1f9bec7e413d01abe54f1a',
            operation: 'query',
            args: ['f572f8ce40bf97b56bad1c6f8d62552b8b066039a9835f294ea4826629278df3'.hexEncode(),
                ''
            ]
        };

        const config = {
            net: 'TestNet',
            script: Neon.create.script({
                scriptHash: '60a7ed582c6885addf1f9bec7e413d01abe54f1a',
                operation: 'query',
                args: ['f572f8ce40bf97b56bad1c6f8d62552b8b066039a9835f294ea4826629278df3'.hexEncode(),
                    ''
                ]
            }),
            address: 'AH4dqfuyaT1tGthQiQQ2RQ8c7Xksuphb7k',
            privateKey: 'L5cLcBorRVAkzM4fgvFqzWM3EweZKGJqQSZbMT5DSyEBAQkL2Hp6',
            gas: 1
        }

        // Neon.doInvoke(config).then(res => {
        //     console.log(res)
        // })


        // rpc.Query.invokeScript(config.script).execute('http://139.59.65.33:30333').then((res) => {
        //
        //     this.setState({owner: scripthash_to_address(res.result.stack[0].value)});
        // });

    }

    constructor(props) {
        super(props);
        this.state = {owner: ''};
        this.getAssetOwner();

    }

  render() {
    return (
      <div className="PooApp">
          Hello: {this.state.owner}

      </div>
    );
  }
}

export default App;
