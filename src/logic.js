// const TonWeb = require('tonweb');
const tonMnemonic = require("tonweb-mnemonic");

// const tonweb = new TonWeb();

// let keyPair = {
//     publicKey: [77, 69, 34, 112, 178, 54, 213, 206, 112, 221, 165, 35, 0, 25, 67, 251, 205, 92, 51, 211, 202, 47, 176, 205, 12, 230, 133, 226, 144, 15, 116, 214],
//     secretKey: [215, 100, 160, 86, 43, 211, 96, 190, 175, 150, 136, 34, 211, 231, 56, 24, 201, 2, 65, 185, 16, 17, 54, 85, 197, 107, 87, 97, 224, 193, 239, 115, 77, 69, 34, 112, 178, 54, 213, 206, 112, 221, 165, 35, 0, 25, 67, 251, 205, 92, 51, 211, 202, 47, 176, 205, 12, 230, 133, 226, 144, 15, 116, 214]
// }
// const wallet = tonweb.wallet.create(keyPair);

async function main() {
    const DEFAULT_WALLET_VERSION = 'v3R2';
    // const mnemonic = await tonMnemonic.generateMnemonic();
    // console.log("mnemonic",mnemonic)

    const mnemonic = ['gossip', 'exotic', 'museum', 'earn', 'please', 'rose', 'stage', 'creek', 'theory', 'prefer', 'either', 'call', 'captain', 'uniform', 'shield', 'proof', 'apple', 'loan', 'zoo', 'empower', 'evoke', 'churn', 'lawsuit', 'deliver'];

    const keyPair = await tonMnemonic.mnemonicToKeyPair(mnemonic);
    console.log("keyPair", keyPair);

    let publicKey = await window.TonWeb.utils.bytesToBase64(keyPair.publicKey.slice(0, 32))
    console.log("publicKey", publicKey)
    const tonWeb = new window.TonWeb;
    const WalletClass = tonWeb.wallet.all[DEFAULT_WALLET_VERSION];
    let walletContract = new WalletClass("https://toncenter.com/api/v2/jsonRPC", {
        publicKey: keyPair.publicKey,
        wc: 0
    });

    const address = await walletContract.getAddress();
    const add = await address.toString(true, true, true)
    console.log("address", add)
    return add
}

// main();
export { main }