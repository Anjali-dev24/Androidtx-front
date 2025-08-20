import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Modal,
  Image,
  Dimensions,
} from "react-native";
import { Formik } from "formik";
import Button from "../../Components/Button";
import * as Yup from "yup";
import Metrics from "../../Helpers/Metrics";
import { Colors } from "../../Helpers/Colors";
import { currencies, Fonts } from "../../constant/data";
import HeaderTitleComponent from "../../Components/HeaderTitle";
import Svg, { G, Path, SvgUri } from "react-native-svg";
import Images from "../../constant/images/Images";
import FastImage from "react-native-fast-image";
import { available_currencies, get_wallet_balance } from "../../APIs/commonAPIsStructure";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CommonActions,
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import CustomToast from "../../Components/CustomToast";
import Loader from "../../Components/Loader";
import { connectSocket, listenForWalletUpdates } from "../../Socket/socketInit";

const Wallet = ({}) => {
  const [currencyModal, setCurrencyModal] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState(false);
  const [currency, setCurrency] = useState("");
  const [userData, setUserData] = useState();
  const [token, setToken] = useState();
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const navigation = useNavigation();
  const [isToast, setIsToast] = useState(false);
  const [loading, setLoading] = useState(false);

 const fetch_token=async()=>{
  const token = await AsyncStorage.getItem("userInfo");
      let parseToken = JSON.parse(token);
      return parseToken
  }

  useEffect(() => {
    const onFocus = navigation.addListener("focus", () => {
      fetch_token().then(token=>{
        console.log('-=-=-=-=-=-=-=-token-=-=-=-=-=-=00000-=-=-=-', token.token);
        setToken(token.token)
      })
      
      
      // setToken(parseToken)
    })
    return onFocus;
  }, [])

   useEffect(() => {
        const onBlur = navigation.addListener("onBlur", () => {
          console.log("-=-=-=-on wallet blur-=-=-=-");
        });
    
        return onBlur;
      }, []);

  useEffect(() => {
    setLoading(true)
    AsyncStorage.getItem("userInfo")
      .then((res) => {
        let parseData = JSON.parse(res);
        connectSocket(parseData?.user?._id);
        listenForWalletUpdates((walletData)=>{
          console.log('-=-=-=-=-walletData-=-=-=-', walletData?.bonusBalance);
          setUserData(walletData)
          setLoading(false)
        })
      })
      .catch((err) => {
        console.log("-=-=-=-socket-=-=-err-=-=-", err);
      });
  }, []);

  const fetch_wallet_bal = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("userInfo");
      let parseToken = JSON.parse(token);
      const data = await get_wallet_balance(parseToken?.token);
      console.log(
        "-=-=-=-=-=-=-=-=-data-=-=-=-=-=-=-",
        data.message == "Session expired. Please log in again."
      );
      setUserData(data?.walletDetail);
      setLoading(false);
      if (data.message == "Session expired. Please log in again.") {
        AsyncStorage.multiRemove([
          "userInfo",
          "dialCode",
          "userData",
          "userCountryData",
          "NoMoreReminders",
        ]);

        setIsToast(true);
        setTimeout(() => {
          global.isLoggedIn = false;
          setIsToast(false);
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "Login", params: { isExpired: true } }],
            })
          );
        }, 2000);
      }
      setUserData(data?.walletDetail);
      return data;
    } catch (error) {
      setLoading(false);
      console.log("-=-=-=-=-=-=-=-=-data-=err-=-=-=-=-=-", error);
      return error;
    }
  };



  // useEffect(() => {
  //   const onFocus = navigation.addListener("focus", () => {
  //     AsyncStorage.getItem("userInfo")
  //     .then((res) => {
  //       let parseData = JSON.parse(res);
  //       connectSocket(parseData?.user?._id);
  //       listenForWalletUpdates((walletData)=>{
  //         console.log('-=-=-=-=-walletData-=-=-=-', walletData?.bonusBalance);
  //         setUserData(walletData)
  //       })
  //     })
  //     .catch((err) => {
  //       console.log("-=-=-=-socket-=-=-err-=-=-", err);
  //     });
  //   })
  //   return onFocus;
  // }, []);

  const renderItem = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={currencyModal}
        onRequestClose={() => {
          setCurrencyModal(false);
          // Prevent the modal from closing when pressing back button
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.languageTitle}>
              <View />
              <Text style={styles.modalText}>Select Currency</Text>
              <TouchableOpacity
                onPress={() => {
                  setCurrencySymbol(currency);
                  setCurrencyModal(false);
                }}
              >
                <FastImage
                  style={styles.closeImage}
                  source={{
                    uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907850/close_y7vfld.png",
                    priority: FastImage.priority.low,
                  }}
                />
              </TouchableOpacity>
            </View>

            <FlatList
              data={currencies}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    setCurrencySymbol(item.currency);
                    console.log("==============item----", currencies, item);
                  }}
                  style={styles.selectedLanguage}
                >
                  <Text style={styles.selectedText}>{item.currency}</Text>
                  {item.currency == currencySymbol && (
                    <FastImage
                      style={styles.forwordIcon}
                      source={{
                        uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907849/tick_ctsqt5.png",
                        priority: FastImage.priority.low,
                      }}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => {
                setCurrency(currencySymbol);

                // i18next.changeLanguage(selectedCurrency),
                setCurrencyModal(false);
              }}
              style={styles.selectLanguageButton}
            >
              <Text style={styles.selectText}>Select</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const methodToFetchCurrenciesList =()=>{
    console.log('-=-=-=-=-=-==-=-token-=-=-=-=-=-', token, userData);
    
    available_currencies(token)
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeaderTitleComponent
        style={{ paddingBottom: 10, paddingHorizontal: 5 }}
        children={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.currency}>
              {currency ? currency : userData?.currency}
            </Text>
            <Svg
              style={{ transform: [{ rotate: "90deg" }] }}
              color={"#fff"}
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              version="1.1"
              viewBox="0 0 17 17"
              class="text-lg text-slate-500"
              height="15em"
              width="15em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <G></G>
              <Path d="M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z"></Path>
            </Svg>
          </View>
        }
        wallet={true}
        onCurrencyClick={() => {
          setCurrencyModal(true);
        }}
        goBack={() => navigation.goBack()}
        title={"Wallet"}
      />
      <ScrollView style={styles.container}>
        {loading && <Loader />}
        <View style={styles.personalInfo}>
          <Text style={styles.balance}>Total Balance</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.userBalance}>
              {userData?.currency} {userData?.totalBalance}
            </Text>
            <TouchableOpacity
              onPress={() => fetch_wallet_bal()}
              style={{ width: 20, height: 20 }}
            >
              <SvgUri
                color={"#C2C2C2"}
                width={"100%"}
                height={"100%"}
                uri={
                  "https://res.cloudinary.com/dwtdpelrp/image/upload/v1740651857/refresh_otqubh.svg"
                }
              />
            </TouchableOpacity>
          </View>

          <Button
            buttonStyle={styles.depositButton}
            full={false}
            buttonTitleStyle={styles.depositTitle}
            buttonTitle="Deposit"
            onButtonPress={() => {
              methodToFetchCurrenciesList()
              navigation.navigate("PaymentMethods");
            }}
          />
          <View style={styles.bottomBorder} />
          <View style={styles.infoText}>
            <Text style={styles.unutilizedAmt}>Amount Unutilized</Text>
            <Svg
              color={Colors.grey}
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              class="w-4 h-4 cursor-pointer"
              height="20em"
              width="20em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path d="M235.4 172.2c0-11.4 9.3-19.9 20.5-19.9 11.4 0 20.7 8.5 20.7 19.9s-9.3 20-20.7 20c-11.2 0-20.5-8.6-20.5-20zm1.4 35.7H275V352h-38.2V207.9z"></Path>
              <Path d="M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"></Path>
            </Svg>
          </View>

          <Text style={styles.Amount}>$ {userData?.totalDepositAmount}</Text>
          <View style={styles.bottomBorder} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "50%" }}>
              <View style={styles.infoText}>
                <Text style={styles.unutilizedAmt}>Winnings</Text>
                <Svg
                  color={Colors.grey}
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  class="w-4 h-4 cursor-pointer"
                  height="20em"
                  width="20em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path d="M235.4 172.2c0-11.4 9.3-19.9 20.5-19.9 11.4 0 20.7 8.5 20.7 19.9s-9.3 20-20.7 20c-11.2 0-20.5-8.6-20.5-20zm1.4 35.7H275V352h-38.2V207.9z"></Path>
                  <Path d="M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"></Path>
                </Svg>
              </View>

              <Text style={styles.Amount}>$ {userData?.winningBalance}</Text>
            </View>

            <Button
              buttonStyle={styles.withdrawButton}
              full={false}
              buttonTitleStyle={styles.withdrawTitle}
              buttonTitle="Withdraw"
              onButtonPress={() => {
                // navigation.navigate('Register');
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("WithdrawHistory", {
              amount: userData?.totalBalance,
              currency: userData?.currency,
            });
          }}
          style={styles.historyContainer}
        >
          <Text style={styles.historyButton}>Withdraw History</Text>
          <Svg
            color={Colors.grey}
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            version="1.1"
            viewBox="0 0 17 17"
            class="text-lg text-slate-500"
            height="20em"
            width="20em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <G></G>
            <Path d="M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z"></Path>
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DepositHistory");
          }}
          style={[styles.historyContainer, { marginVertical: 0 }]}
        >
          <Text style={styles.historyButton}>Deposit History</Text>
          <Svg
            color={Colors.grey}
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            version="1.1"
            viewBox="0 0 17 17"
            class="text-lg text-slate-500"
            height="20em"
            width="20em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <G></G>
            <Path d="M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z"></Path>
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("GameHistory");
          }}
          style={styles.historyContainer}
        >
          <Text style={styles.historyButton}>Game History</Text>
          <Svg
            color={Colors.grey}
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            version="1.1"
            viewBox="0 0 17 17"
            class="text-lg text-slate-500"
            height="20em"
            width="20em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <G></G>
            <Path d="M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z"></Path>
          </Svg>
        </TouchableOpacity>
        {/* {isToast && (
          <CustomToast
            isToast={isToast}
            sessionExpired={true}
            textStyle={{ fontSize: Metrics.rfv(16) }}
            downloadImg={true}
            downloadImgUrl={`Session has expired.\n Please login again`}
            onRequestClose={() => {
              setIsToast(false);
            }}
          />
        )} */}
        <View style={styles.instructionView}>
          <Text style={styles.rulesTitle}>Instructions for deposit</Text>
          <Text
            style={styles.rules}
          >{`\u2023 The account is only valid for a single deposit; please do not make any subsequent deposit to avaoid potential loss of funds.`}</Text>
          <Text
            style={styles.rules}
          >{`\u2023 Please ensure that the deposited amount matches the originally applied amount, as any discrepancy may result in a failed transaction or loss of funds.`}</Text>
          <Text
            style={styles.rules}
          >{`\u2023 You may pay through any app for the given UPI ID.`}</Text>
          <Text
            style={styles.rules}
          >{`\u2023 Complete the transaction in 5 mins or the money may LOST.`}</Text>
          <Text
            style={styles.rules}
          >{`\u2023 If, within 24 hours, 5 deposit attempts fail to complete a successful payment, your ID will be temporarily suspended for a 24-hour period.`}</Text>
          <Text
            style={styles.rules}
          >{`\u2023 Kindly note that we cannot be held responsible for any losses incurred if you did not adhere to the aforementioned guidelines.`}</Text>
        </View>
        {currencyModal && renderItem()}
        <View style={{ height: Metrics.rfv(35) }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f7f8fe",
  },
  container: {
    flexGrow: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  currency: {
    color: "#fff",
    fontWeight: "600",
    marginRight: 5,
  },
  balance: {
    color: Colors.grey,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
  },
  userBalance: {
    color: "#000",
    fontSize: 18,
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    fontWeight: "700",
  },
  winAmount: {
    color: Colors.grey,
    fontSize: 13,
    textAlign: "center",
    marginBottom: 10,
  },
  depositButton: {
    backgroundColor: "#16A34A",
    alignSelf: "center",
    paddingVertical: Metrics.rfv(8),
    paddingHorizontal: Metrics.rfv(20),
    borderRadius: 8,
    // borderRadius: 8,
  },
  withdrawButton: {
    backgroundColor: "#962f2a",
    alignSelf: "center",
    paddingVertical: Metrics.rfv(8),
    paddingHorizontal: Metrics.rfv(20),
    borderRadius: 8,
  },
  withdrawTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  depositTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  personalInfo: {
    borderColor: Colors.grey,
    borderWidth: 0.5,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  bottomBorder: {
    borderBottomColor: "#dedee0",
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  unutilizedAmt: {
    color: Colors.grey,
    marginRight: 5,
  },
  Amount: {
    fontSize: 18,
    color: "#000",
  },
  infoText: {
    flexDirection: "row",
    alignItems: "center",
  },
  historyContainer: {
    flexDirection: "row",
    alignItems: "center",
    // alignSelf:"center",
    borderColor: Colors.grey,
    borderWidth: 0.5,
    marginVertical: 8,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    paddingVertical: 14,
    backgroundColor: "#fff",
  },
  historyButton: {
    fontSize: 16,
    fontWeight: "500",
    color:"#757575"
  },
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignSelf: "center",
    height: Dimensions.get("screen").height,
    minWidth: Dimensions.get("screen").width,
  },
  subInnerView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 5,
    padding: 15,
    margin: 15,
    overflow: "hidden",
    height: Dimensions.get("screen").height / 2,
    width: Dimensions.get("screen").width / 1.3,
    alignSelf: "center",
  },
  closeImage: {
    width: 25,
    height: 25,
  },
  selectedText: {
    color: "#000",
    fontSize: 15,
  },
  selectedLanguage: {
    padding: 15,
    borderBottomColor: "#dedee0",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectLanguageButton: {
    backgroundColor: "#a32324",
    width: "30%",
    alignSelf: "center",
    marginTop: 15,
    borderRadius: 12,
  },
  selectText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    padding: 10,
  },
  forwordIcon: {
    width: 20,
    height: 20,
  },
  languageTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginVertical: 15,
  },
  modalText: {
    color: "#000",
    fontSize: Metrics.rfv(18),
    fontWeight: "bold",
    // paddingBottom: 15,
    // marginTop:Metrics.rfv(25)
  },
  instructionView: {
    padding: 15,
    backgroundColor: "#fff",
    marginVertical: 15,
    borderRadius: 8,
    borderColor: Colors.grey,
  },
  rules: {
    color: Colors.black,
    fontSize: Metrics.rfv(13),
    fontWeight: "500",
    marginTop: Metrics.rfv(8),
  },
  rulesTitle: {
    color: Colors.black,
    fontSize: Metrics.rfv(18),
    textAlign: "left",
    fontWeight: "700",
    marginBottom: Metrics.rfv(15),
    textDecorationLine: "underline",
  },
});

export default Wallet;
