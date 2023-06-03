const TonWeb = require('./tonweb/src/index').default;
// const TonWeb = require('tonweb-kaios-wallet');
const tonMnemonic = require("tonweb-mnemonic");
// const Wallets = require("./tonweb/src/contract/wallet").default;
// const HttpProvider = require("./tonweb/src/providers").default;

// const tonweb = new TonWeb();

// let keyPair = {
//     publicKey: [77, 69, 34, 112, 178, 54, 213, 206, 112, 221, 165, 35, 0, 25, 67, 251, 205, 92, 51, 211, 202, 47, 176, 205, 12, 230, 133, 226, 144, 15, 116, 214],
//     secretKey: [215, 100, 160, 86, 43, 211, 96, 190, 175, 150, 136, 34, 211, 231, 56, 24, 201, 2, 65, 185, 16, 17, 54, 85, 197, 107, 87, 97, 224, 193, 239, 115, 77, 69, 34, 112, 178, 54, 213, 206, 112, 221, 165, 35, 0, 25, 67, 251, 205, 92, 51, 211, 202, 47, 176, 205, 12, 230, 133, 226, 144, 15, 116, 214]
// }
// const wallet = tonweb.wallet.create(keyPair);

async function main() {
    let d = new TonWeb.Wallets
    const DEFAULT_WALLET_VERSION = 'v3R2';
    // const mnemonic = await tonMnemonic.generateMnemonic();
    // console.log("mnemonic",mnemonic)

    const mnemonic = ['gossip', 'exotic', 'museum', 'earn', 'please', 'rose', 'stage', 'creek', 'theory', 'prefer', 'either', 'call', 'captain', 'uniform', 'shield', 'proof', 'apple', 'loan', 'zoo', 'empower', 'evoke', 'churn', 'lawsuit', 'deliver'];

    const keyPair = await tonMnemonic.mnemonicToKeyPair(mnemonic);

    let WalletClass = d.all.v3R2;
    let walletContract = new WalletClass("https://testnet.toncenter.com/api/v2/jsonRPC", {
        publicKey: keyPair.publicKey
    });

    const address = await walletContract.getAddress();
    const add = await address.toString(true, true, true)
    console.log("add", add)



    // Balance Fetch
    // let httpProvide = new TonWeb.HttpProvider("https://testnet.toncenter.com/api/v2/jsonRPC");
    // let balance = await httpProvide.getBalance("EQDYWEaGdAN24UyB2mXZzSh8Fsn301ZqSVYYAbdLAkddD0Bo");
    // console.log("balance",balance)


    const headers = {
        'Content-Type': 'application/json'
    };
    const request = {
        "id": 1,
        "jsonrpc": "2.0",
        "method": "getAddressBalance",
        "params": { "address": "EQDYWEaGdAN24UyB2mXZzSh8Fsn301ZqSVYYAbdLAkddD0Bo" }

    }

    fetch("https://testnet.toncenter.com/api/v2/jsonRPC", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(request)
    }).then((response) => response.json()).catch(error => alert(error))


    return add;
}
// main();
export { main }