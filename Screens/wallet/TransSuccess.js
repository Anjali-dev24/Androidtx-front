import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import HeaderTitleComponent from "../../Components/HeaderTitle";
import Button from "../../Components/Button";
import { SvgUri } from "react-native-svg";
import Metrics from "../../Helpers/Metrics";

const TransSuccess = ({ navigation, route }) => {
  const getCoinImg = () => {
    switch (route.params.coinName) {
      case "Ethereum":
        return "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110023/ETH_osd0bt.svg";
        break;
      case "Binance":
        return "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110022/BNB_aiahme.svg";
        break;
      case "Tron":
        return "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110023/TRX_dp0qhv.svg";
        break;
      case "Bitcoin":
        return "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110023/BTC_gscysz.svg";
        break;
      default:
        break;
    }
  };

  return (
    <LinearGradient
      colors={["#962f2a", "#ba4940", "#d35c50"]}
      style={styles.container}
    >
      <HeaderTitleComponent
        style={{ backgroundColor: "#962f2a" }}
        wallet={false}
        onCurrencyClick={() => {}}
        goBack={() => navigation.goBack()}
        title={"Deposit"}
      />
      <View style={styles.mainContainer}>
        <View style={styles.barcode}></View>
        <View style={styles.coinData}>
          <View style={{ width: 20, height: 20 }}>
            <SvgUri
              preserveAspectRatio="xMinYMin slice"
              width={"100%"}
              height={"100%"}
              uri={getCoinImg()}
            ></SvgUri>
          </View>

          <Text style={styles.coinName}>{route.params.coinName}</Text>
        </View>
        <Text style={styles.address}>
          Adsfdsgfc6576t765765uygu65576576576576ty
        </Text>
      </View>
      <Button
        buttonTitleStyle={styles.buttonText}
        // disabled={!isValid}
        full={true}
        buttonTitle="Copy Address"
        buttonStyle={styles.ButtonView}
        onButtonPress={() => {
          navigation.navigate("TransSuccess", {
            coinName: route?.params?.title,
          });
        }} // Use Formik's handleSubmit
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coinName: {
    color: "#962f2a",
    fontSize: 14,
    textAlign: "left",
    marginLeft: 5,
  },
  mainContainer: {
    backgroundColor: "#dedee0",
    padding: 15,
    margin: 15,
    borderRadius: 8,
  },
  barcode: {
    backgroundColor: "#fff",
    borderRadius: 8,
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  coinImg: {
    width: "100%",
    height: "100%",
  },
  coinData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  address: {
    color: "#000",
    fontSize: 12,
    paddingHorizontal: 15,
    // backgroundColor:"#fff",
    marginHorizontal: 15,
    textAlign: "left",
    paddingVertical: 10,
    borderRadius: 8,
  },
  ButtonView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 13,
    margin: 10,
    paddingHorizontal: 15,
    marginTop: "auto",
    marginBottom: Metrics.rfv(30),
    borderColor: "#fff",
    borderWidth: 1,
  },
  buttonText: {
    color: "#962f2a",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default TransSuccess;
