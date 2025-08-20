
import {
  Alert,
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../Components/Button";
import Metrics from "../../Helpers/Metrics";
import {
  forgotPassword,
  reset_password,
  signupUser,
  verifyOtp,
} from "../../APIs/commonAPIsStructure";
import language from "../../Lang/language.json";

import { StackActions, useNavigation } from "@react-navigation/native";
import i18next from "i18next";
import FastImage from "react-native-fast-image";
import { SvgUri } from "react-native-svg";
import Loader from "../../Components/Loader";
import { currencies, Fonts } from "../../constant/data";
import useLoading from "../../CustomHook/useLoading";
import { Colors } from "../../Helpers/Colors";
import AuthStore from "../../reduxToolkit/AuthStore";
import PageWrapperView from "../../Components/PageWrapperView";

const OTP = ({ length = 6, onComplete, route,  }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputs = useRef([]);
  const otpResult = AuthStore((state) => state.otpResult);
  const formRef = useRef();
  let resetPasswordToken = route.params;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordCVisible, setPasswordCVisible] = useState(false);
  const { isLoading, setLoading } = useLoading();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [disable, setDisable] = useState(true);
  const [otpIsVerifyed, setOtpVerified] = useState(false);
  const [passwordToken, setPasswordToken] = useState();
  const [showVerifyTitle, setShowVerifyTitle] = useState(false);
  const [resendOtpTitle, setResendOtpTitle] = useState(false);
  const [otpVal, setOtpVal] = useState("");
  const [OTPError, setOTPError] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isToast, setIsToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currencyModal, setCurrencyModal] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [Verified, setVerified] = useState(false);
  const [OTPVisible, setOTPVisible] = useState(false);
  const setOtpResult = AuthStore((state) => state.setOtpResult);
  const navigation = useNavigation();
  const [selectedCountry, setSelectedCountry] = useState({
    name: "India",
    dialCode: "+91",
    isoCode: "IN",
    flag: "https://cdn.kcak11.com/CountryFlags/countries/in.svg",
  });

  const [timer, setTimer] = useState(0); // Timer state, initially set to 0
  const [timerActive, setTimerActive] = useState(false); // State to track if the timer is active

  useEffect(() => {
    console.log("phone====", route.params.email);

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

  // const languageModal = () => {
  //   return (
  //     <Modal
  //       animationType="slide"
  //       transparent={true}
  //       visible={modalVisible}
  //       onRequestClose={() => {
  //         // Prevent the modal from closing when pressing back button
  //       }}
  //     >
  //       <View style={styles.modalContainer}>
  //         <View style={styles.modalView}>
  //           <View style={styles.languageTitle}>
  //             <View />
  //             <Text style={styles.modalText}>Select Language</Text>
  //             <TouchableOpacity onPress={() => setModalVisible(false)}>
  //               <FastImage
  //                 style={styles.closeImage}
  //                 source={{
  //                   uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907850/close_y7vfld.png",
  //                   priority: FastImage.priority.low,
  //                 }}
  //               />
  //             </TouchableOpacity>
  //           </View>

  //           <FlatList
  //             data={language.language}
  //             renderItem={({ item, index }) => (
  //               // console.log('-=-=-=-=-=-==-all-=-=-=-=-', item)
  //               <TouchableOpacity
  //                 onPress={() => {
  //                   setSelectedLanguage(item.value);
  //                   console.log("item----", item.value, index);
  //                 }}
  //                 style={styles.selectedLanguage}
  //               >
  //                 <Text style={styles.selectedText}>{item.label}</Text>
  //                 {item.value == selectedLanguage && (
  //                   <FastImage
  //                     style={styles.forwordIcon}
  //                     source={{
  //                       uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907849/tick_ctsqt5.png",

  //                       priority: FastImage.priority.low,
  //                     }}
  //                   />
  //                 )}
  //               </TouchableOpacity>
  //             )}
  //           />
  //           <TouchableOpacity
  //             onPress={() => {
  //               i18next.changeLanguage(selectedLanguage),
  //                 setModalVisible(false);
  //             }}
  //             style={styles.selectLanguageButton}
  //           >
  //             <Text style={styles.selectText}>Select</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </Modal>
  //   );
  // };
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
              <TouchableOpacity onPress={() => setCurrencyModal(false)}>
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
                // console.log('-=-=-=-=-=-==-all-=-=-=-=-', item)
                <TouchableOpacity
                  onPress={() => {
                    setSelectedCurrency(item.currency);
                    console.log("item----", item.value, index);
                  }}
                  style={styles.selectedLanguage}
                >
                  <Text style={styles.selectedText}>{item.currency}</Text>
                  {item.currency == selectedCurrency && (
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

  const Validation = async () => {
    setLoading(true);
    if (password == "") {
      setPasswordError("Please enter new password");
    } else if (confirmPassword == "") {
      setNewPasswordError("Please confirm password");
    } else if (confirmPassword !== password) {
      setNewPasswordError("please enter same password");
    } else {
      try {
        const resp = await reset_password(passwordToken, confirmPassword);
        console.log("-=-=-=-=-=-eeeee-eee=-=-=-=-=-", resp);
        setIsToast(true), setLoading(false);
        setTimeout(() => {
          setIsToast(false);
          navigation.dispatch(StackActions.popToTop("Login"));
        }, 3000);
        // setTimeout(() => {
        //   navigation.dispatch(StackActions.popToTop("Login"));
        //   setLoading(false);
        // }, 3000);
      } catch (error) {
        console.log("-=-=-=-=-=-eeeee-=-=-=-=-=-", error);
        setLoading(false);
        console.log("-=-=-=-=-=-eeeee-=-=-=-=-=-", resp);
        setErrorMsg(resp.message);
        setErrorAlert(true);
      }
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

  const focusNext = (index) => {
    if (index < length - 1 && inputs.current[index + 1]) {
      inputs.current[index + 1].focus();
    }
  };

  const focusPrev = (index) => {
    if (index > 0 && inputs.current[index - 1]) {
      inputs.current[index - 1].focus();
    }
  };

  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text) {
      focusNext(index);
    }

    if (newOtp.every((val) => val !== "") && onComplete) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyPress = ({ nativeEvent: { key } }, index) => {
    if (key === "Backspace" && !otp[index]) {
      focusPrev(index);
    }
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
        <View style={{}}>
          <View style={styles.headerView}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={{ width: 25, height: 25 }}>
                <SvgUri
                  preserveAspectRatio="xMinYMin slice"
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

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.titleStyle}>9T</Text>
              <Text style={styles.xStyle}>X</Text>
            </View>
            <View style={{ marginRight: 25 }} />
          </View>
          <Text style={styles.fPass}>
            {otpIsVerifyed ? `Create New Password` : `Verification`}
          </Text>
          <Text style={styles.plz}>
            {otpIsVerifyed
              ? `Create new password for your account.`
              : `We've sent OTP to your mobile number at your mobile number or email. Please enter four digit code you receive.`}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
          }}
        >
          <View style={styles.LoginView}>
            {!otpIsVerifyed ? (
              <View style={styles.loginMain}>
                <View style={{ height: 100 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  >
                    {otp.map((value, index) => (
                      <TextInput
                        key={index}
                        ref={(ref) => (inputs.current[index] = ref)}
                        style={[
                          styles.input,
                          {
                            marginHorizontal:
                              index !== 0 || index !== length - 1 ? 10 : 0,
                          },
                        ]}
                        keyboardType="numeric"
                        maxLength={1}
                        onChangeText={(text) => {
                          handleChangeText(text.replace(/[^0-9]/g, ""), index);
                        }}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        value={value}
                      />
                    ))}
                  </View>
                  {OTPError && (
                    <Text
                      style={{
                        color: "red",
                        fontSize: Metrics.rfv(12),
                        fontFamily: Fonts.Roboto400,
                      }}
                    >
                      {OTPError}
                    </Text>
                  )}
                </View>
                <Text
                  style={{
                    color: "gray",
                    fontFamily: Fonts.Roboto400,
                    textAlign: "center",
                  }}
                >
                  {`Didn't receive code ?`}
                </Text>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        //   marginRight: 10,
                        marginTop: Metrics.rfv(5),
                        flex: 1,
                      }}
                    >
                      {timerActive ? (
                        <Text
                          style={{
                            color: resendOtpTitle ? "#1591ea" : "gray",
                            fontFamily: Fonts.Roboto400,
                          }}
                        >
                          {"Resend in "}
                        </Text>
                      ) : (
                        ""
                      )}
                      <Text
                        style={{
                          color: "black",
                          fontFamily: Fonts.Roboto400,
                        }}
                      >
                        {timerActive ? formatTime() : ""}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    disabled={!resendOtpTitle}
                    onPress={() => {
                      if (resendOtpTitle) {
                        sendOtpCall();
                        startTimer();
                      }
                    }}
                  >
                    <Text
                      style={{
                        color: resendOtpTitle ? "#1591ea" : "gray",
                        fontFamily: Fonts.Roboto400,
                        textAlign: "center",
                      }}
                    >
                      {"Resend OTP"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.resetView}>
                  <Button
                    buttonTitleStyle={styles.buttonText}
                    // disabled={!isValid}
                    full={true}
                    buttonTitle="Continue"
                    buttonStyle={styles.ButtonView}
                    onButtonPress={async () => {
                      try {
                        setLoading(true);
                        const verifyOtp = await verify_otp(
                          route.params.email,
                          OTP
                        );
                        if (verifyOtp?.success == true) {
                          setPasswordToken(verifyOtp?.user?.resetPasswordToken);
                          setOtpVerified(true);
                          setLoading(false);

                          console.log("-=-=-=-=-111-=-=-=-=--=-=-=", verifyOtp);
                        } else {
                          setErrorMsg(verifyOtp?.message);
                          setErrorAlert(true);
                          setOtpVerified(false);
                          setLoading(false);
                        }
                      } catch (error) {
                        console.log("-=-=-=-=-333-=-=-=-=--=-=-=", error);
                        setLoading(false);
                      }
                    }} // Use Formik's handleSubmit
                  />
                </View>
              </View>
            ) : (
              <View style={styles.loginMain}>
                <Text
                  style={{
                    fontSize: Metrics.rfv(15),
                    fontWeight: "bold",
                    marginTop: Metrics.rfv(10),
                    color: Colors.black,
                    marginBottom: Metrics.rfv(5),
                    fontFamily: Fonts.Roboto400,
                    textAlign: "left",
                  }}
                >
                  New Password
                </Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    title="New Password"
                    placeholder="*****"
                    placeholderTextColor={Colors.grey}
                    value={password}
                    onChangeText={(text) => {
                      setPasswordError("");
                      setPassword(text);
                    }}
                    error={passwordError}
                    secureTextEntry={!passwordVisible}
                    style={styles.inputStyle}
                  />
                  <TouchableOpacity
                    style={{ width: 20, height: 20, marginRight: 10 }}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <FastImage
                        style={styles.eyeIcon}
                        resizeMode="contain"
                        source={{
                          uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110164/eyeVisible-09720f5f_tnwwrq.png",
                          priority: FastImage.priority.low,
                        }}
                      />
                    ) : (
                      <FastImage
                        style={styles.eyeIcon}
                        resizeMode="contain"
                        source={{
                          uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110164/eyeInvisible-821d9d16_bhciqb.png",
                          priority: FastImage.priority.low,
                        }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                {passwordError && (
                  <Text style={styles.errorText}>{passwordError}</Text>
                )}
                <Text
                  style={{
                    fontSize: Metrics.rfv(15),
                    fontWeight: "bold",
                    marginTop: Metrics.rfv(10),
                    color: Colors.black,
                    fontFamily: Fonts.Roboto400,
                    marginBottom: Metrics.rfv(5),
                  }}
                >
                  Confirm Password
                </Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    title="Confirm Password"
                    placeholder="*****"
                    placeholderTextColor={Colors.grey}
                    value={confirmPassword}
                    onChangeText={(text) => {
                      setNewPasswordError("");
                      setConfirmPassword(text);
                      // if (text !== values.newPassword) {
                      //   setPasswordError('Passwords do not match');
                      // } else {
                      //   setPasswordError('');
                      // }
                    }}
                    error={newPasswordError}
                    secureTextEntry={!passwordCVisible}
                    style={styles.inputStyle}
                  />
                  <TouchableOpacity
                    style={{ width: 20, height: 20, marginRight: 10 }}
                    onPress={() => setPasswordCVisible(!passwordCVisible)}
                  >
                    {passwordCVisible ? (
                      <FastImage
                        style={styles.eyeIcon}
                        resizeMode="contain"
                        source={{
                          uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110164/eyeVisible-09720f5f_tnwwrq.png",
                          priority: FastImage.priority.low,
                        }}
                      />
                    ) : (
                      <FastImage
                        style={styles.eyeIcon}
                        resizeMode="contain"
                        source={{
                          uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110164/eyeInvisible-821d9d16_bhciqb.png",
                          priority: FastImage.priority.low,
                        }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                {newPasswordError && (
                  <Text style={styles.errorText}>{newPasswordError}</Text>
                )}
                <View style={styles.resetView}>
                  <Button
                    buttonTitleStyle={styles.buttonText}
                    full={true}
                    buttonTitle="Continue"
                    buttonStyle={styles.ButtonView}
                    onButtonPress={async () => {
                      if (OTP === "") {
                        setOTPError("Please enter received OTP");
                      } else {
                        Validation();
                      }
                    }}
                  />
                </View>
              </View>
            )}

            {/* </View> */}
          </View>
          {/* // ) : (
          
        // )} */}
        </View>
        {isToast && (
          <CustomToast
            isToast={isToast}
            onRequestClose={() => {
              setIsToast(false);
            }}
          />
        )}
        {errorAlert && renderAlertModal()}
        {currencyModal && renderItem()}
        {/* {modalVisible && languageModal()} */}
      </View>
    </PageWrapperView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  input: {
    borderWidth: 2,
    paddingBottom: 10,
    borderBottomColor: "#dedee0",
    width: 45,
    textAlign: "center",
    fontSize: 20,
    borderRadius: 8,
  },
  container: {
    width: "90%",
    // alignSelf: 'center',
    marginVertical: Metrics.rfv(30),
    // position:"absolute",
    // left:0
  },
  errorText: {
    color: "red",
    fontFamily: Fonts.Roboto400,
    fontSize: Metrics.rfv(12),
    marginTop: -5,
  },
  pinCodeContainer: {
    width: "15%",
    marginHorizontal: 5,
  },
  resetView: {
    // justifyContent: 'center',
    // paddingTop: Metrics.rfv(40),
    alignItems: "center",
    marginBlockStart: "auto",
    marginBottom: 10,
    // width:"100%"
  },
  loginMain: {
    // paddingHorizontal: Metrics.rfv(16),
    paddingVertical: Metrics.rfv(20),
    flexGrow: 1,
    // backgroundColor:"red"
  },
  LoginView: {
    backgroundColor: "#fff",
    width: Dimensions.get("window").width,
    flexGrow: 1,
    padding: 15,
    // alignItems:"center"
  },
  otpBoxesContainer: {
    flexDirection: "row",
  },
  otpBox: {
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 45,
    width: 45,
    textAlign: "center",
  },
  phone: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: Metrics.rfv(20),
    fontFamily: Fonts.Roboto400,
  },
  fPass: {
    fontWeight: "bold",
    fontSize: Metrics.rfv(20),
    // paddingVertical: Metrics.rfv(5),
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

  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    // paddingTop: Metrics.rfv(10),
    backgroundColor: "#a32324",
    // paddingBottom: Metrics.rfv(20),
    width: "100%",
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Metrics.rfv(6),
    alignItems: "center",
  },
  titleStyle: {
    fontSize: Metrics.rfv(45),
    color: "#fff",
    fontWeight: "bold",
  },
  xStyle: {
    fontSize: Metrics.rfv(20),
    color: "#a32324",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 8,
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
  glabalIcon: {
    width: "100%",
    height: "100%",
  },
  inputStyle: {
    flex: 1,
    paddingVertical: Metrics.rfv(10),
    paddingHorizontal: Metrics.rfv(12),
    color: Colors.black,
    fontFamily: Fonts.Roboto400,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Metrics.rfv(10),
    borderWidth: 1,
    marginBottom: Metrics.rfv(10),
    borderColor: "#dedee0",
  },
  eyeIcon: {
    width: "100%",
    height: "100%",
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
    backgroundColor: "transparent",
    justifyContent: "center",
    marginBottom: 20,

    // alignItems:"center",
    // flex: 1,
  },
  toastContainer: {
    backgroundColor: "transparent",
    justifyContent: "center",
    marginBottom: 20,
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    top: 0,
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 5,
    padding: 15,
    margin: 15,
    overflow: "hidden",
    height: "100%",
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
    // marginTop: 15,
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
    marginVertical: 15,
  },
  modalText: {
    color: "#000",
    fontSize: Metrics.rfv(16),
    fontWeight: "bold",
    paddingBottom: 15,
    // marginTop:Metrics.rfv(25)
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
  box: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: 40,
    // height: 40,
    margin: 10,
    textAlign: "center",
    fontSize: 20,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});

export default OTP;
