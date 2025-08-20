import { ethers, utils, Wallet } from "ethers";
import { entropyToMnemonic } from "ethers/lib/utils";
import Address from "@bitsler/tron-address";

export const generateMnemonics = () => {
  // const mnemonics = HDNode.entropyToMnemonic(utils.randomBytes(16));
  const mnemonics = entropyToMnemonic(utils.randomBytes(16));

  console.log("generateMnemonics ===========>", mnemonics);
  return mnemonics;
};

export const generateAddressFromMnemonics = (mnemonics) => {
  const wallet = Wallet.fromMnemonic(mnemonics);
  // console.log('generateAddressFromMnemonics----- =>', mnemonics);
  return { mnemonics: mnemonics, address: wallet.address };
};

export const generateEthWallet = (mnemonics) => {
  const wallet = Wallet.fromMnemonic(mnemonics);
 const walletPrivateKey = new Wallet(wallet.privateKey)
  console.log("generateEthWallet ==========>",walletPrivateKey, wallet);
  return wallet;
};

/************************************** Generate Tezos Wallet ************************************/

export const generateXtzWallet = async (mnemonics) => {
  try {
    const keystore =
      await conseiljssoftsigner.KeyStoreUtils.restoreIdentityFromMnemonic(
        mnemonics,
        "",
        "",
        `m/44'/1729'/0'/0'`,
        true
      );
    return keystore;
  } catch (error) {
    console.log(`error secret key=====`, JSON.stringify(error));

    alert(JSON.stringify(error));
  }
};

export const generateBTCAddress = (mnemonics) => {
  console.log("mnemonic:=====1111");
  const BIP84 = require("bip84");
  // var mnemonic =
  //   "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
  var root = new BIP84.fromMnemonic(mnemonics, '', false);
  console.log("mnemonic:=====2222", mnemonics);
  console.log('rootpriv:', root.getRootPrivateKey())
  var child0 = root.deriveAccount(0);
  // var root = new BIP84.fromMnemonic(mnemonics)

  // var root = new BIP84.fromSeed(mnemonics, "", true); //pass true for testnet and false for mainnet
  // var root = new BIP84.fromSeed(mnemonics, "", constants.network == "testnet" ? true : false); //pass true for testnet and false for mainnet
  // var root = new BIP84.fromSeed(mnemonics, '', true); //pass true for testnet and false for mainnet
  // console.log("mnemonic:", root);
  // var child0 = root.deriveAccount(0);

  console.log("rootpriv:", child0);
  // console.log('rootpub:', root.getRootPublicKey());
  // console.log('\n');

  var account0 = new BIP84.fromZPrv(child0);
  // console.log("Account 0, first receiving address = m/84'/0'/0'/0/0");
  // console.log('Prvkey is:', account0.getPrivateKey(0));
  // console.log('Pubkey:', account0.getPublicKey(0));
  // console.log('Address is :', account0.getAddress(0));
  // console.log('\n');

  return {
    btcAddress: account0.getAddress(0),
    btc_pvtKey: account0.getPrivateKey(0),
  }; //account0;
};

export const generateTronAddress = (mnemonic) => {
  console.log("generateTronAddress", mnemonic);
  try {
    const addressobj = new Address(mnemonic, 0);
    const address = addressobj.getAddressInfo(0).address;
    const privateKey = addressobj.getAddressInfo(0).privateKey;
    console.log("tronAddrss===========>", address, privateKey);
    return { address, privateKey };
  } catch (error) {
    console.log("createTronAddress error", error);
  }
};
