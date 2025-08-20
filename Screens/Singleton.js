import { NativeModules } from "react-native";
import { generateBTCAddress, generateEthWallet, generateMnemonics, generateTronAddress } from "./utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { CreateWallet } = NativeModules;
const CryptoJS = require("crypto-js");

export default class Singleton {

  static myInstance = null;
  static getInstance() {
    if (Singleton.myInstance == null) {
      Singleton.myInstance = new Singleton();
    }
    return this.myInstance;
  }

  saveData(key, value) {
    // console.log('key#####' + key + 'value #### ' + value);
    return new Promise((resolve, reject) => {
      var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(value), "ZtoomLrXHf2P9UevTcVO3KtstapohCnV1XgbZZpmtYpug2rT5q").toString();
      AsyncStorage.setItem(key, ciphertext)
        .then((response) => {
          resolve(ciphertext);
        })
        .catch((error) => {
          // console.log('error #### ' + key);
          reject(error);
        });
    });
  }

   createWallet= () =>{
    console.log("-=-=-=-=-=-start-=-=-=--=", new Date().getSeconds());
    try {
      let IOS = Platform.OS === "ios";
      const mnemonics = generateMnemonics();
      // const mnemonics = "dilemma spoil usage flower volume bonus belt walk doll text draw kitchen";
      CreateWallet?.generateAddressFromMnemonics(mnemonics, async (obj) => {
        console.log("-=-=-=-=-obj-=-=-=-=-", obj);
        let parseData = JSON.parse(obj);
            let ethWallet = parseData.eth;
            let BTCWallet = parseData.btc;
        // *******************************  FOR ETH  ***********************************
        // const ethWallet = await generateEthWallet(mnemonics);
        // console.log("-=-=-=-------------------=-=-ethWallet-=-=--------------------",ethWallet.pvtKey, ethWallet);
        if (ethWallet.pvtKey?.length < 66) {
          let suffix = "0x" + "0".repeat(66 - ethWallet.pvtKey?.length);
          ethWallet["pvtKey"] = suffix + ethWallet.pvtKey.substring(2);
          await this.saveData(ethWallet.address + "_pk", ethWallet.pvtKey);
          await this.saveData(ethWallet.address, mnemonics);
          console.log("-=-=-=-=-=-=ethWallet-=-=-=-=-=-", ethWallet);
        } else {
          console.log("-=-=-=-=-=-=ethWallet-=-=-=-=-=-", ethWallet.address, ethWallet.pvtKey);
          await this.saveData(ethWallet.address + "_pk", ethWallet.pvtKey);
          await this.saveData(ethWallet.address, mnemonics);
        }
        // ********************************  FOR BTC  ************************************
        // const BTCWallet = await generateBTCAddress(mnemonics);
        console.log("-=-=-=-=-=-=BTCWallet-=-=-=-=-=-", BTCWallet);
        const btcAddress = BTCWallet.address;
        await this.saveData(btcAddress + "_pk", BTCWallet.pvtKey);
        await this.saveData(btcAddress, mnemonics);
        // ********************************  FOR TRON  ************************************
        const TRONWallet = generateTronAddress(mnemonics);
        console.log("-=-=-=-=-=-=TRONWallet-=-=-=-=-=-", TRONWallet);
        const trxAddress = TRONWallet.address;
        await this.saveData(trxAddress + "_pk", TRONWallet.privateKey);
        await this.saveData(trxAddress, mnemonics);
        console.log("-=-=-=-=-=-end-=-=-=--=", new Date().getSeconds(), ethWallet.address, btcAddress);
        resolve({
          mnemonics,
          ethAddress: ethWallet.address,
          btcAddress: btcAddress,
          trxAddress: trxAddress,
        });
       
       
      })
    // })
    } catch (error) {
      console.log("-=-=-=-=-=-ERRR-=-=-=--=", new Date().getSeconds(), error);
    }
  }
}

