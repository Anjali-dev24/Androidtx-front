import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Linking,
  ScrollView,
  Image,
  Modal,
  FlatList,
} from "react-native";
import Icon from "../../Assets/Icons";
// import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { useState, useRef, useEffect } from "react";
import Button from "../../Components/Button";
import _ from "lodash";
// import Input from '../../Components/Input';
import { CheckBox, Input } from "react-native-elements";
import PageWrapperView from "../../Components/PageWrapperView";
import Metrics from "../../Helpers/Metrics";
import RNPickerSelect from "react-native-picker-select";
import language from "../../Lang/language.json";

// import PhoneInput from '../../Components/CountryPicker';
import { Formik } from "formik";
import * as Yup from "yup";
import {
  forgot_password,
  forgotPassword,
  privacy_Policy,
  sendOtp,
  signupUser,
  verify_email,
  verifyOtp,
} from "../../APIs/commonAPIsStructure";
import AuthStore from "../../reduxToolkit/AuthStore";
import Loader from "../../Components/Loader";
import { Colors } from "../../Helpers/Colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { currencies, Fonts } from "../../constant/data";
import useLoading from "../../CustomHook/useLoading";
import PickerComponent from "../../Components/Picker";
import { Picker } from "@react-native-picker/picker";
import Svg, { Path, SvgUri } from "react-native-svg";
import Images from "../../constant/images/Images";
import i18next from "i18next";
import FastImage from "react-native-fast-image";
import TimeZoneComponent from "../../Components/TimeZoneComponent";
import AppTitle from "../../Components/AppTitle";
// import useLoading from '../../CustomHook/useLoading';
const ForgotPassword = ({ navigation }) => {
  const formRef = useRef();
  const pickerRef = useRef();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const { isLoading, setLoading } = useLoading();
  const [loginType, setLoginType] = useState(false);
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [disable, setDisable] = useState(true);
  const [otpIsVerifyed, setOtpVerified] = useState(false);
  const [showVerifyTitle, setShowVerifyTitle] = useState(false);
  const [resendOtpTitle, setResendOtpTitle] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const [currencyModal, setCurrencyModal] = useState(false);
  const [Verified, setVerified] = useState(false);
  const [OTPVisible, setOTPVisible] = useState(false);
  const setOtpResult = AuthStore((state) => state.setOtpResult);
  // const navigation = useNavigation();
  const [selectedCountry, setSelectedCountry] = useState();
  const otpResult = AuthStore((state) => state.otpResult);
  const countries = [
    {
      name: "India",
      code: "91",
    },
    {
      name: "Brazil",
      code: "55",
    },
    {
      name: "Bhutan",
      code: "975",
    },
  ];

  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let intervalId;
    if (timerActive && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setTimerActive(false); // Stop the timer when it reaches 0
    }

    return () => clearInterval(intervalId); // Cleanup the interval on unmount
  }, [timer, timerActive]);

  // Convert seconds to MM:SS format
  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    if (`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}` === "0:00") {
      setResendOtpTitle(true);
    } else {
      setResendOtpTitle(false);
    }
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const verifyOtpCall = async (otp) => {
    setLoading(true);
    try {
      const values = formRef?.current?.values;
      const PhoneNumber = `${selectedCountry.dialCode}${values.phoneNumber}`;
      const result = await verifyOtp(PhoneNumber, otpResult, otp);
      console.log("OTP Verification Result:", result);
      if (result.isOTPVerified) {
        setOtpVerified(true);
        Alert.alert(result.message);
      } else {
        setOtpVerified(false);
        Alert.alert("Otp is not Verified");
      }
      setLoading(false);
    } catch (error) {
      console.log("Failed to verify OTP:", error.message);
      Alert.alert("Verification Error", error.message);
      setLoading(false); // Show an alert with the error message
    }
  };

  const sendOtpCall = async () => {
    const values = formRef?.current?.values;
    const PhoneNumber = `${selectedCountry.dialCode}${values.phoneNumber}`;
    console.log(PhoneNumber);
    setLoading(true);
    try {
      const result = await forgotPassword(PhoneNumber);
      setLoading(false);
      Alert.alert("Successfully sent otp to your device");
      setShowVerifyTitle(true);
      setOtpOrderId(result?.orderId);
      setVisible(true);
    } catch (error) {
      Alert.alert(error.message);
      console.log("Failed to send OTP:", error.message);
      setLoading(false);
      // console.error('Failed to send OTP:', error);
    }
  };

  const handleForgotPassword = async () => {
    const values = formRef?.current?.values;
    const PhoneNumber = `${selectedCountry.dialCode}${values.phoneNumber}`;
    setLoading(true);
    try {
      const result = await signupUser(PhoneNumber, values.newPassword);
      console.log(result.message);
      setLoading(false);
      Alert.alert("User update the otp successfully");
      navigation.navigate("Login");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    // Handle result or update state
  };
  const handlePhoneNumberChange = (text) => {
    formRef?.current?.setFieldValue("phoneNumber", text);
    if (text.length === 10) {
      setVisible(true);
      setDisable(false);
    } else {
      setShowVerifyTitle(false);
      setOtpVerified(false);
      setVisible(false);
      setTimerActive(false);
    }
  };

  const startTimer = () => {
    setTimer(120); // Set the timer for 2 minutes (120 seconds)
    setTimerActive(true); // Start the timer
  };
  function open() {
    pickerRef?.current?.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  const validation = () => {
    let validEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    console.log("-=-=-=-=-=-loginType-=-=-", loginType);
    if (loginType) {
      if (email == "") {
        setEmailError("please enter email address.");
      } else if (email != "" && !validEmail.test(email)) {
        setEmailError("please enter a valid email address.");
      } else {
        forgotPassword();
      }
    } else {
      if (phoneNumber == "") {
        setPhoneNumberError("Please enter phone number.");
      } else {
        forgotPassword();
      }
    }
  };

  const forgotPassword = async () => {
    try {
      setLoading(true);
      const response = await verify_email(email);
      navigation.navigate("OTP", { email: email });
      setLoading(false);
    } catch (error) {
      setErrorMsg(response.message);
      setErrorAlert(true);
      setLoading(false);
    }
  };

  const renderAlertModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        // visible={true}
        visible={errorAlert}
        onRequestClose={() => {
          // Prevent the modal from closing when pressing back button
        }}
      >
        <View style={styles.imageView}>
          <View style={styles.alertMsg}>
            <Text
              numberOfLines={4}
              adjustsFontSizeToFit
              style={styles.alertMsgText}
            >
              {errorMsg}
            </Text>
            <Button
              buttonTitleStyle={styles.buttonText}
              // disabled={!isValid}
              full={true}
              buttonTitle="Ok"
              buttonStyle={styles.ButtonView}
              onButtonPress={() => {
                setErrorAlert(false);
              }} // Use Formik's handleSubmit
            />
          </View>
        </View>
      </Modal>
    );
  };

  const languageModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Prevent the modal from closing when pressing back button
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.languageTitle}>
              <View />
              <Text style={styles.modalText}>Select Language</Text>
              <TouchableOpacity onPress={() => {
                 setSelectedLanguage(null)
                 i18next.changeLanguage('en'),
                setModalVisible(false)}}>
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
              data={language.language}
              renderItem={({ item, index }) => (
                // console.log('-=-=-=-=-=-==-all-=-=-=-=-', item)
                <TouchableOpacity
                  onPress={() => {
                    setSelectedLanguage(item.value);
                    console.log("item----", item.value, index);
                  }}
                  style={styles.selectedLanguage}
                >
                  <Text style={styles.selectedText}>{item.label}</Text>
                  {item.value == selectedLanguage && (
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
                i18next.changeLanguage(selectedLanguage),
                  setModalVisible(false);
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

  return (
    <PageWrapperView
      topSafeArea
      dark={true}
      style={styles.mainView}
      statusBar={{ background: "#a32324" }}
    >
      <View style={{ justifyContent: "space-between", flex: 1 }}>
        {isLoading && <Loader />}
        <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: Metrics.rfv(5),
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={{ width: 25, height: 25 }}>
                  <SvgUri
                  preserveAspectRatio='xMinYMin slice'
                    style={{ marginHorizontal: 1 }}
                    color={"#fff"}
                    width={"100%"}
                    height={"100%"}
                    uri={
                      "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123452/svgviewer-output_20_mho6rp.svg"
                    }
                  ></SvgUri>
                </View>
              </TouchableOpacity>
             
              <AppTitle titleContainer={styles.titleContainer} />
              <TouchableOpacity
                style={{ width: 25, height: 25, marginRight: 10 }}
                onPress={() => {
                  console.log("-=-=-=-=-=-=-=-lang-=-=-=--==-=", language);

                  setModalVisible(true);
                  // i18next.changeLanguage(selectedLanguage);
                }}
              >
                <FastImage
                  style={styles.glabalIcon}
                  source={{
                    uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907834/language_w1bjos.png",
                 priority: FastImage.priority.low,
                  }}
                />
                <Text style={styles.selectedLangText}>{selectedLanguage?selectedLanguage?.toUpperCase():'EN'}</Text>
              </TouchableOpacity>
            </View>
        <Text style={styles.fPass}>Forgot Password</Text>
        <Text style={styles.plz}>
          Please retrieve/change your password through your mobile phone number
          or email.
        </Text>
        <View style={styles.subInnerView}>
          <TouchableOpacity
            style={{
              backgroundColor: !loginType ? "#a32324" : "#fff",
              paddingVertical: 13,
              width: "50%",
            }}
            onPress={() => {
              setEmail("");
              setEmailError("");
              setLoginType(false);
            }}
          >
            <View
              style={{
                // flexDirection: 'row',
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: Fonts.Roboto400,
                  color: !loginType ? "#fff" : "#a32324",
                  fontWeight: "bold",
                }}
              >
                Login with phone
              </Text>
              {/* <Text
                style={{
                  textAlign: 'center',
                  color: !loginType ? '#fff' : '#a32324',
                  fontWeight: 'bold',
                  marginLeft: 4,
                  fontFamily: Fonts.Roboto400,
                }}>
                phone
              </Text> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "50%",
              backgroundColor: !loginType ? "#fff" : "#a32324",
              paddingVertical: 13,
            }}
            onPress={() => {
              setPhoneNumber("");
              setPhoneNumberError("");
              setLoginType(true);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: !loginType ? "#a32324" : "#fff",
                  fontWeight: "bold",
                  fontFamily: Fonts.Roboto400,
                }}
              >
                Login with email
              </Text>
              {/* <Text
                style={{
                  textAlign: 'center',
                  fontFamily: Fonts.Roboto400,
                  color: !loginType ? '#a32324' : '#fff',
                  fontWeight: 'bold',
                  marginLeft: 5,
                }}>
                email
              </Text> */}
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View style={styles.LoginView}>
            <View style={styles.loginMain}>
              <View style={{ flex:0.5}}>
                {loginType ? (
                  <View>
                    <Text style={styles.phNoText}>Email</Text>

                    <TextInput
                      placeholder="abc@gmail.com"
                      placeholderTextColor={Colors.grey}
                      value={email}
                      onChangeText={(text) => {
                        setEmail(text);
                        setEmailError("");
                      }}
                      style={[
                        styles.inputStyle,
                        {
                          borderColor: "#dedee0",
                          borderWidth: 1,
                          borderRadius: Metrics.rfv(10),
                        },
                      ]}
                    />
                    {emailError && (
                      <Text
                        style={{
                          color: "red",
                          fontFamily: Fonts.Roboto400,
                          fontSize: Metrics.rfv(12),
                          marginTop: 5,
                        }}
                      >
                        {emailError}
                      </Text>
                    )}
                  </View>
                ) : (
                  <View>
                    <Text style={styles.phNoText}>Phone Number</Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <View style={styles.picker}>
                        <TimeZoneComponent
                          code={true}
                          data={countries}
                          title={selectedCountry}
                          selectedItem={
                            global.selectedCountry?.dialingCode
                              ? `+${global.selectedCountry?.dialingCode}`
                              : "+91"
                          }
                          // setSelectedItem={(itemValue) => {
                          //   let dialingCode= itemValue? itemValue:selectedCountry
                          //   console.log("-=-=-=-=-=-=item-=-=-=-=00000-", dialingCode);
                          //   AsyncStorage.setItem("dialCode", dialingCode);
                          //   setSelectedCountry(dialingCode);
                          // }}
                        />
                      </View>

                      <TextInput
                        placeholder="9876543234"
                        placeholderTextColor={Colors.grey}
                        value={phoneNumber}
                        keyboardType="number-pad"
                        onChangeText={(text) => {
                          setPhoneNumberError("");
                          setPhoneNumber(text);
                        }}
                        style={[
                          styles.inputStyle,
                          {
                            flex: 1,
                            borderColor: "#dedee0",
                            borderWidth: 1,
                            borderRadius: Metrics.rfv(10),
                          },
                        ]}
                      />
                    </View>
                    {phoneNumberError && (
                      <Text
                        style={{
                          color: "red",
                          fontFamily: Fonts.Roboto400,
                          fontSize: Metrics.rfv(12),
                          marginTop: 5,
                        }}
                      >
                        {phoneNumberError}
                      </Text>
                    )}
                  </View>
                )}
              </View>

              <View style={styles.resetView}>
                <Button
                  buttonTitleStyle={styles.buttonText}
                  // disabled={!isValid}
                  full={true}
                  buttonTitle="Continue"
                  buttonStyle={styles.ButtonView}
                  onButtonPress={() => {
                    validation();
                    // navigation.navigate('OTP', { email: email });
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        {/* )}
        </Formik> */}
        {renderAlertModal()}
        {modalVisible && languageModal()}
      </View>
    </PageWrapperView>
  );
};

export default ForgotPassword;

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 10,
    paddingHorizontal: 10,
    // paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    width: "100%",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: Metrics.rfv(16),
    fontFamily: Fonts.Roboto400,
  },
  alertMsg: {
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 15,
    width: 300,
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: Metrics.rfv(25),
    // height: 300,
  },
  alertMsgText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    width: 200,
    marginBottom: 15,
  },
  imageView: {
    minWidth: 500,
    minHeight: "100%",
    alignItems: "center",
    justifyContent: "center",
    // position:"absolute",
    backgroundColor: "rgba(0,0,0,0.8)",
    alignSelf: "center",
  },
  alertContainer: {
    height: "30%",
    position: "absolute",
    backgroundColor: "#fff",
    justifyContent: "center",
    width: 300,
    elevation: 20,
    borderRadius: 8,
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
    // marginTop: 15,
    borderRadius: 12,
  },
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignSelf: "center",
    height:Dimensions.get('screen').height,
    minWidth:Dimensions.get('screen').width
  },
  glabalIcon: {
    width: "100%",
    height: "100%",
  },
  subInnerView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: Metrics.rfv(20),
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 5,
    padding: 15,
    margin: 15,
    overflow: "hidden",
    height: 400,
    width:350,
    alignSelf:"center"
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
    paddingBottom: 10,
    // marginTop:Metrics.rfv(25)
  },
  picker: {
    width: "30%",
  },
  verificationView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    width: "100%",
    height: 52,
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    borderColor: "#dedee0",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Metrics.rfv(10),
    borderWidth: 1,
    marginBottom: Metrics.rfv(10),
    borderColor: "#dedee0",
  },
  inputStyle: {
    paddingVertical: Metrics.rfv(10),
    paddingHorizontal: Metrics.rfv(12),
    color: Colors.black,
    fontFamily: Fonts.Roboto400,
    marginLeft: 10,
    fontSize:Metrics.rfv(18)
  },
  checkText: {
    color: "#788298",
    marginLeft: Metrics.rfv(5),
    fontSize: Metrics.rfv(12),
    fontFamily: Fonts.Roboto400,
  },
  hunText: {
    marginTop: Metrics.rfv(20),
    height: 0,
    borderBottomWidth: Metrics.rfv(100),
    borderBottomColor: "#fff",
    borderLeftWidth: Metrics.rfv(70),
    borderLeftColor: "transparent",
    borderRightWidth: Metrics.rfv(70),
    borderRightColor: "transparent",
    borderStyle: "solid",
  },
  hunView: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: "23%",
  },
  verText: {
    fontSize: Metrics.rfv(18),
    fontWeight: "bold",
    marginBottom: Metrics.rfv(5),
    color: "#737373",
    fontFamily: Fonts.Roboto400,
  },
  resetView: {
    // justifyContent: 'center',
    // paddingTop: Metrics.rfv(40),
    alignItems: "center",
    marginBlockStart: "auto",
    flex:0.5,
    justifyContent:"center"
    // width:"100%"
  },
  sendView: {
    height: "100%",
    borderRadius: Metrics.rfv(8),
    alignItems: "center",
    justifyContent: "center",
    width: Metrics.rfv(80),
  },
  CheckView: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
  },
  sendText: {
    backgroundColor: "#a32324",
    height: "100%",
    borderRadius: Metrics.rfv(8),
    alignItems: "center",
    justifyContent: "center",
    width: Metrics.rfv(80),
  },
  verView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: Metrics.rfv(10),
    width: "100%",
    height: Metrics.rfv(52),
    borderWidth: Metrics.rfv(1),
    borderRadius: Metrics.rfv(10),
  },
  loginMain: {
    paddingHorizontal: Metrics.rfv(16),
    paddingVertical: Metrics.rfv(20),
    flexGrow: 1,
  },
  LoginView: {
    backgroundColor: "#fff",
    width: Dimensions.get("window").width,
    flexGrow: 1,
  },
  phone: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: Metrics.rfv(20),
    fontFamily: Fonts.Roboto400,
  },
  loginText: {
    width: "50%",
    paddingVertical: Metrics.rfv(10),
  },
  fPass: {
    fontWeight: "bold",
    fontSize: Metrics.rfv(20),
    paddingVertical: Metrics.rfv(5),
    color: "#fff",
    paddingHorizontal: Metrics.rfv(16),
    fontFamily: Fonts.Roboto400,
  },
  plz: {
    fontSize: Metrics.rfv(15),
    paddingBottom: Metrics.rfv(20),
    color: "#fff",
    paddingHorizontal: Metrics.rfv(16),
    fontWeight: "400",
    fontFamily: Fonts.Roboto400,
  },
  ninetVIew: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Distribute space between items
    paddingHorizontal: Metrics.rfv(20), // Optional: add padding for better spacing
  },
  nineText: {
    fontSize: Metrics.rfv(45),
    color: "#fff",
    fontWeight: "bold",
    fontFamily: Fonts.Roboto400,
  },
  veriText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: Colors.black,
    fontFamily: Fonts.Roboto400,
  },
  xText: {
    fontSize: Metrics.rfv(40),
    color: "#a32324",
    fontWeight: "bold",
    marginTop: Metrics.rfv(-10),
    fontFamily: Fonts.Roboto400,
  },
  xView: {
    backgroundColor: "#fff",
    width: Metrics.rfv(38),
    height: Metrics.rfv(38),
    borderRadius: Metrics.rfv(25),
    justifyContent: "center",
    alignItems: "center",
    marginTop: Metrics.rfv(12),
  },
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    // paddingTop: Metrics.rfv(10),
    backgroundColor: "#a32324",
    // paddingBottom: Metrics.rfv(20),
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: Metrics.rfv(12),
    fontFamily: Fonts.Roboto400,
    marginTop: -5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  ButtonView: {
    backgroundColor: "#962f2a",
    paddingVertical: Metrics.rfv(8),
    paddingHorizontal: Metrics.rfv(36),
    borderRadius: 8,
  },
  phNoText: {
    fontSize: Metrics.rfv(15),
    fontWeight: "bold",
    color: Colors.black,
    fontFamily: Fonts.Roboto400,
    marginBottom: 5,
  },
  selectedLangText:{
    marginRight: 10,
    fontSize:Metrics.rfv(12),
    color:"#fff",
    width:25,
    textAlign:"center"
  }
});
