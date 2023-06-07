const TonWeb = require('./tonweb/src/index').default;
// const TonWeb = require('tonweb-kaios-wallet');
const tonMnemonic = require("tonweb-mnemonic");
const axios = require("axios");
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
    let walletContract = new WalletClass("https://ton-backend-api-testing.onrender.com/json-rpc", {
        publicKey: keyPair.publicKey
    });

    const address = await walletContract.getAddress();
    const add = await address.toString(true, true, true)
    console.log("add", add)



    // Balance Fetch
    let httpProvide = new TonWeb.HttpProvider("https://ton-backend-api-testing.onrender.com/json-rpc");
    // let balance = await httpProvide.getBalance("EQDYWEaGdAN24UyB2mXZzSh8Fsn301ZqSVYYAbdLAkddD0Bo");
    // console.log("balance",balance)



    // Transaction
    // await walletContract.deploy(httpProvide,keyPair.secretKey).send();  // Deploy account on ton blockchain i.e - Active account trough it.

    let balance
    try {
        let seqno = await walletContract.methods.seqno().call(httpProvide); // Get Seqno
        console.log("seqno", seqno);
        alert(seqno)

        let transfer = walletContract.methods.transfer({
            secretKey: keyPair.secretKey,
            toAddress: 'EQDjVXa_oltdBP64Nc__p397xLCvGm2IcZ1ba7anSW0NAkeP',
            amount: TonWeb.utils.toNano("0.01"), // 0.01 TON
            seqno: seqno,
            payload: 'Hello',
            sendMode: 3,
        }, httpProvide);


        const transferFee = await transfer.estimateFee(httpProvide);   // get estimate fee of transfer
        console.log("transferFee", transferFee)


        setTimeout(async()=>{
            const transferSended = await transfer.send();  // send transfer query to blockchain
            console.log("transferSended", transferSended)
        },1500)

        const transferQuery = await transfer.getQuery(); // get transfer query Cell
        console.log("transferQuery", transferQuery)


        balance = await httpProvide.getBalance("EQDYWEaGdAN24UyB2mXZzSh8Fsn301ZqSVYYAbdLAkddD0Bo");
        console.log("balance", balance)
    } catch (error) {
        console.log(error)
        alert(error)
    }


    return balance



    // walletContract.methods.seqno().call(httpProvide).then(async(seqno)=>{
    //     console.log("seqno", seqno);
    //     alert(seqno);
    //     let transfer = walletContract.methods.transfer({
    //         secretKey: keyPair.secretKey,
    //         toAddress: 'EQDjVXa_oltdBP64Nc__p397xLCvGm2IcZ1ba7anSW0NAkeP',
    //         amount: TonWeb.utils.toNano("0.01"), // 0.01 TON
    //         seqno: seqno,
    //         payload: 'Hello',
    //         sendMode: 3,
    //     }, httpProvide)

    //         transfer.estimateFee(httpProvide).then(transferFee=>{
    //             alert(transferFee)
    //             console.log("transferFee", transferFee)


    //             transfer.send().then(transferSended=>{
    //                 console.log("transferSended", transferSended)
    //                 alert(transferSended)
    //                 transfer.getQuery().then(transferQuery=>{
    //                     console.log("transferQuery", transferQuery)
    //                     alert(transferQuery)
    //                     httpProvide.getBalance("EQDYWEaGdAN24UyB2mXZzSh8Fsn301ZqSVYYAbdLAkddD0Bo").then(balance=>{
    //                         console.log("balance", balance)
    //                         alert(balance)
    //                         return balance;
    //                     })

    //                 }) // get transfer query Cell
    //             })  // send transfer query to blockchain




    //         })  // get estimate fee of transfer
    //     })


}
// main();
export { main }