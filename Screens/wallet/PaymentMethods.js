import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderTitleComponent from "../../Components/HeaderTitle";
import { SvgUri } from "react-native-svg";
import { cryptoCurrencies, paymentOptions } from "../../constant/data";
import LinearGradient from "react-native-linear-gradient";
import Metrics from "../../Helpers/Metrics";
import { generateMnemonics } from "../utils";
import Singleton, { createWallet } from "../Singleton";


const PaymentMethods = ({ navigation }) => {
  const mnemonics = async () => {
    await Singleton.getInstance()
      .createWallet()
      .then((res) => {
        console.log("-=-=-=-=-=-res-=-=-=-=-0000-=-=-=-=-=-", res);
      })
      .catch((err) => {
        console.log("-=-=-=-=-=-err-=-=-=-=-0000-=-=-=-=-=-", err);
      });
    // try {
    //   const addresses = await createWallet();
    //   console.log(
    //     "-=-=-=-=-mnemonics-=-=-=-=-=-mnemonics-=-=-=-mnemonics-=-=--=",
    //     addresses
    //   );

    //   return addresses;
    // } catch (error) {
    //   console.log("-=-=22222=-=--=", error);
    //   return error;
    // }
  };

  // const UPI_payment=()=>{
  //   const apps =  OneUpi.getInstalledUPIApps()
  //          console.log('-=-=-=-=-=-=-=-app-=-=-=-=-=-==',apps)
    
  // }

  return (
    <LinearGradient
      colors={["#962f2a", "#ba4940", "#d35c50"]}
      style={styles.container}
    >
      <HeaderTitleComponent
        style={{ paddingBottom: 10, paddingHorizontal: 5 }}
        wallet={false}
        onCurrencyClick={() => {
          setCurrencyModal(true);
        }}
        goBack={() => navigation.goBack()}
        title={"Deposit"}
      />
      <View style={styles.listItem}>
        <FlatList
          numColumns={3}
          // style={styles.listView}
          data={paymentOptions}
          renderItem={({ item, index, separators }) => (
            <TouchableOpacity
              key={item.key}
              onPress={() => {
                // navigation.navigate("Deposit", { title: item.title });
                // if(index==0){
                //   UPI_payment()
                // }else{
                //   mnemonics();
                // }
                
                // console.log("-=-=-=-=-87687687678-=-=-=-", item.name);
                if(item.name ==='UPI' || item.name==='AstroPay'){
                   navigation.navigate("Deposit", { title: item.title });
                }else{
                  navigation.navigate('CryptoDeposit',{title:item.name});
                }
              }}
              style={styles.selectedLanguage}
            >
              <View
                style={{
                  width: item.title == "CryptoCurrency" ? 30 : 60,
                  height: 30,
                  marginTop: 5,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <SvgUri
                  // preserveAspectRatio='xMinYMin slice'
                  width={"70%"}
                  height={"70%"}
                  uri={item.image}
                ></SvgUri>
                {/* {item.title == "CryptoCurrency" && (
                  <SvgUri
                  preserveAspectRatio='xMinYMin slice'
                    style={{ marginHorizontal: 1, backgroundColor:"red" }}
                    width={"50%"}
                    height={"50%"}
                    uri={
                      "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110023/BTC_gscysz.svg"
                    }
                  ></SvgUri>
                )}
                {item.title == "CryptoCurrency" && (
                  <SvgUri
                  preserveAspectRatio='xMinYMin slice'
                    width={"100%"}
                    height={"50%"}
                    uri={
                      "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110023/TRX_dp0qhv.svg"
                    }
                  ></SvgUri>
                )} */}
                {/* {item.title == "CryptoCurrency" && (
                  <Text style={styles.addition}>+</Text>
                )} */}
              </View>
              <Text style={[styles.selectedText]}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectedLanguage: {
    backgroundColor: "#fff",
    padding: 15,
    width: "30%",
    // height:200,
    margin: 5,
    borderRadius: 8,
  },
  listView: {
    margin: 15,
    borderRadius: 8,
    padding: 10,

    // height: '30%',
  },
  listItem: {
    // flexGrow:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dedee0",
    margin: 15,
    borderRadius: 8,
    padding: 10,
  },
  selectedText: {
    fontSize: Metrics.rfv(12),
    fontWeight: "600",
    marginVertical: 10,
  },
  addition: {
    backgroundColor: "#dedee0",
    borderRadius: 20,
    paddingHorizontal: 5,
  },
});

export default PaymentMethods;
