import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
// import language from "../../Lang/language.json";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../../Components/Button";
// import Input from '../../Components/Input';
import Metrics from "../../Helpers/Metrics";
// import PhoneInput from '../../Components/CountryPicker';
import {
  get_country_data,
  get_isd,
  privacy_Policy,
  sendOtp,
  signupUser,
  time_zone,
  verifyOtp,
} from "../../APIs/commonAPIsStructure";
import AuthStore from "../../reduxToolkit/AuthStore";
// import CommonWebview from '../../Components/CommonWebview';
import { Colors } from "../../Helpers/Colors";
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { SvgUri } from "react-native-svg";
import Loader from "../../Components/Loader";
import PageWrapperView from "../../Components/PageWrapperView";
import { currencies, Fonts } from "../../constant/data";
import Images from "../../constant/images/Images";
import useLoading from "../../CustomHook/useLoading";
import language from "../../Lang/language.json";

import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";
import TimeZoneComponent from "../../Components/TimeZoneComponent";
import FastImage from "react-native-fast-image";
import AppTitle from "../../Components/AppTitle";
const Register = ({ route }) => {
  const formRef = useRef();
  const [visible, setVisible] = useState(false);
  const [disable, setDisable] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordCVisible, setPasswordCVisible] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordCError, setPasswordCError] = useState("");
  const [otpOrderId, setOtpOrderId] = useState("");
  const [fileWebview, setFileWebview] = useState({ open: false });
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showVerifyTitle, setShowVerifyTitle] = useState(false);
  const [otpIsVerifyed, setOtpVerified] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [inviteCodeError, setInviteCodeError] = useState("");
  const [resendOtpTitle, setResendOtpTitle] = useState(false);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [timeZonesModal, settimeZonesModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("91");
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [currencyModal, setCurrencyModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [languages, setLanguage] = useState(null);
  const [country, setCountry] = useState();
  const [timeZones, setTimeZones] = useState();
  const [countryDetails, setCountryDetails] = useState();
  const [timeZonesError, setTimeZonesError] = useState();
  const [dialCode, setDialCode] = useState();

  const otpResult = AuthStore((state) => state.otpResult);

  // console.log('Stored OTP Result:', otpResult);

  // useEffect(() => {
  //   var timezones = require("timezones-list");
  //   console.log("=====timezone======", timezones.default);
  //   setTimeZones(timezones.default);
  // }, []);
  const initialValues = {
    email: "",
    emailError: "", // Either phone or email based on loginType
    newPassword: "",
    confirmPassword: "",
    verificationCode: "",
    termsAccepted: false,
    phoneNumber: "",
  };
  const { isLoading, setLoading } = useLoading();

  const isdCode = async () => {
    const isd = await get_isd();
    setDialCode(isd);
    return isd;
  };

  const handleRegister = async () => {
   setLoading(true);
    let countryId = route.params.user_country._id;
    try {
      const result = await signupUser(
        email,
        phoneNumber,
        confirmPassword,
        inviteCode,
        countryDetails?.country?._id
      );
      let userCredentials = {
        phoneNumber: phoneNumber,
        password: confirmPassword,
      };
      console.log("-=-=-=-signup-=-=-=-", result, countryDetails?.country?._id);
      AsyncStorage.setItem("userData", JSON.stringify(result));
      
      if (result.message == "User created successfully") {
        Keyboard.dismiss();
        setLoading(false);
        AsyncStorage.setItem("userInfo", JSON.stringify(result));
        AsyncStorage.setItem(
          "credentials",
          JSON.stringify(userCredentials)
        );
        navigation.navigate("Home");
      } else if(result.message=='User already exists with this number') {
        setLoading(false);
        Keyboard.dismiss();
        setErrorMsg(result.message);
        setErrorAlert(true);

      }else{
        setLoading(false);
        Keyboard.dismiss();
        setErrorMsg(result.message);
        setErrorAlert(true);
      }
    } catch (error) {
      console.log("-=-=-=--=-=res-=-=-=-err-=-=-=-=", error);
      Keyboard.dismiss();
      setLoading(false);
      setErrorMsg(err.message);
      setErrorAlert(true);
        }
  };

  const verifyOtpCall = async (otp) => {
    setLoading(true);
    try {
      const values = formRef?.current?.values;
      const PhoneNumber = `${selectedCountry.dialCode}${values.phoneNumber}`;
      const result = await verifyOtp(PhoneNumber, otpOrderId, otp);
      console.log("Result:", result);
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

  const handlePhoneNumberChange = (text) => {
    // console.log('text===', text);
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
  // console.log('visible------', visible);
  const sendOtpCall = async () => {
    const values = formRef?.current?.values;
    console.log("values", formRef.current?.values);
    const PhoneNumber = `${selectedCountry.dialCode}${values.phoneNumber}`;
    console.log("fullPhoneNumber==", PhoneNumber);
    setLoading(true);
    try {
      const result = await sendOtp(PhoneNumber);
      console.log("OTP Result====", result);
      setLoading(false);
      Alert.alert("Successfully sent otp to your device");
      setShowVerifyTitle(true);
      setOtpOrderId(result?.orderId);
      setVisible(true);
    } catch (error) {
      Alert.alert(error.message);
      console.log("Failed to send OTP:", error.message);
      setLoading(false);
    }
  };

  const toggleWebViewModal = () => {
    setFileWebview((prevState) => ({
      ...prevState,
      open: !prevState.open,
    }));
  };
  const startTimer = () => {
    setTimer(120); // Set the timer for 2 minutes (120 seconds)
    setTimerActive(true); // Start the timer
  };
  const renderWebview = () => {
    return (
      <Modal
        isVisible={fileWebview}
        onBackdropPress={() => toggleWebViewModal("")}
        onBackButtonPress={() => toggleWebViewModal("")}
      >
        {/* <CommonWebview
          data={{
            uri: Terms_url.url,
          }}
          style={{marginTop: Metrics.rfv(50)}}
        /> */}
        <TouchableOpacity
          onPress={() => toggleWebViewModal("")}
          style={styles.closeContainer}
        >
          <IconMC name={"close"} size={Metrics.rfv(22)} color={Colors.white} />
        </TouchableOpacity>
      </Modal>
    );
  };

  // useEffect(() => {
  // //  console.log('-=-=-=-=-=-userCountry-=-=-=-=-', route.params.user_country);

  // }, [])

  // useEffect(() => {
  //   let intervalId;
  //   if (timerActive && timer > 0) {
  //     intervalId = setInterval(() => {
  //       setTimer((prevTimer) => prevTimer - 1);
  //     }, 1000);
  //   } else if (timer <= 0) {
  //     setTimerActive(false); // Stop the timer when it reaches 0
  //   }
  //   return () => clearInterval(intervalId); // Cleanup the interval on unmount
  // }, [timer, timerActive]);

  // Convert seconds to MM:SS format
  // const formatTime = () => {
  //   const minutes = Math.floor(timer / 60);
  //   const seconds = timer % 60;
  //   console.log(
  //     "=s==s=s====",
  //     `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  //   );
  //   if (`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}` === "0:00") {
  //     setResendOtpTitle(true);
  //   } else {
  //     setResendOtpTitle(false);
  //   }
  //   return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  // };

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
              data={language?.language}
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
                i18next.changeLanguage(languages),
                setLanguage(selectedLanguage)
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

  const validation = async () => {
    let validEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (phoneNumber === "") {
      console.log("-=-=-=-=-phoneError-=-=-=-", phoneNumberError);
      setPhoneNumberError("Please enter phone number");
    } else if (email === "") {
      console.log("-=-=-=-=-email-=-=-=-", emailError, validEmail.test(!email));
      setEmailError("Please enter email address.");
    } else if (email !== "" && !validEmail.test(email)) {
      console.log("-=-=-=-=-email-validation=-=-=-", emailError, selectedTime);
      setEmailError("Please enter valid email address");
    } else if (timeZones === undefined) {
      console.log("-=-=-=-=-timezone=-=-=-", timeZonesError);
      setTimeZonesError("Please select time zone");
    } else if (password === "") {
      console.log("-=-=-=-=-passwordVisi=-=-=-", passwordError);
      setPasswordError("Please enter password");
    } else if (confirmPassword == "") {
      console.log("-=-=-=-=-passwordCVisi=-=-=-", passwordCError);
      setPasswordCError("Please confirm password");
    } else if (confirmPassword !== password) {
      console.log(
        "-=-=-=-=-same=-=-=-",
        passwordCError,
        validEmail.test(!email),
        email
      );
      setPasswordCError("Please enter same password");
    } else if (inviteCode === "") {
      console.log("-=-=-=-=-inviteCode=-=-=-", inviteCodeError);
      setInviteCodeError("please enter received invite code.");
    } else {
      handleRegister();
      // signupUser(
      //   email,
      //   phoneNumber,
      //   selectedCountry,
      //   confirmPassword,
      //   inviteCode
      // )
      //   .then(async(res) => {
      //     console.log("-=-=-=res-=-=-=-signup-=-=-=-", res);
      //     AsyncStorage.setItem('userData', JSON.stringify(res))
      //    navigation.goBack();
      //   })
      //   .catch((err) => {
      //     console.log("-=-=-=--=-=res-=-=-=-err-=-=-=-=", err);
      //     Alert.alert(err.message)
      //   });
      //
    }
  };

  const renderAlertModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        // visible={true}
        visible={errorAlert}
        onRequestClose={() => {}}
      >
        <View style={styles.imageView}>
        <View style={styles.alertMsg}>
          {/* <ImageBackground
            resizeMode="contain"
            source={{
              uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110078/empty-Cb98WcEH_xvbkrx.png",
            }}
            style={styles.imageView}
          > */}
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

  const getTimeZones = async () => {
    try {
      const time = await time_zone();
      console.log("-=-=-=-=-time-=-=-=-=-", time);
      setCountry(time);
    } catch (error) {
      console.log("-=-=-=-=-time-=error-=-=-=-", error);
    }
  };

  const getCountryData = async () => {
    let countryId = route.params.user_country._id;
    const getData = await get_country_data(countryId);
    console.log("-=-==-=-=-=-getDta-=-=-=-=-", countryId, getData);
    setTimeZones(getData?.timeZone);
    setCountryDetails(getData)
    setSelectedCountry(getData?.dialingCode);
    AsyncStorage.setItem("userCountryData", JSON.stringify(getData));
  };

  useEffect(() => {
    console.log('-=-=-=-=-global.selectedCountry-=-=-=', global.selectedCountry);
    
    getCountryData();
    isdCode();
    getTimeZones();
  }, []);

  return (
    <PageWrapperView
      topSafeArea
      dark={true}
      style={styles.mainView}
      statusBar={{ background: "#a32324" }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ height: "100%" }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flex: 1,
            backgroundColor: Colors.Primary_100,
          }}
        >
          {isLoading && <Loader />}
          <View style={styles.innerView}>
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
                  console.log("-=-=-=-=-=-=-=-lang-=-=-=--==-=", languages);

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
                <Text style={styles.selectedLangText}>{languages? languages?.toUpperCase():'EN'}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.subtitle1}>Register</Text>
            <Text style={styles.subtitle}>Please register by phone number</Text>
          </View>
          <ScrollView
            contentContainerStyle={{
              backgroundColor: "#fff",
              width: Dimensions.get("window").width,
              flexGrow: 1,
            }}
          >
            <View
              style={{
                paddingHorizontal: Metrics.rfv(16),
                paddingVertical: Metrics.rfv(20),
                flexGrow: 1,
                paddingBottom: Metrics.rfv(30),
              }}
            >
              <View>
                <View style={{ justifyContent: "space-around" }}>
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
                          data={dialCode}
                         
                          title={selectedCountry}
                          selectedItem={global.selectedCountry?`+${global.selectedCountry?.dialingCode}`:'---'}
                         
                        />
                      </View>
                      <TextInput
                        placeholder="9876543234"
                        placeholderTextColor={Colors.grey}
                        value={phoneNumber}
                        onChangeText={(text) => {
                          setPhoneNumberError("");
                          setPhoneNumber(text);
                        }}
                        keyboardType="number-pad"
                        error={phoneNumberError}
                        secureTextEntry={!phoneNumber}
                        style={[
                          styles.inputStyle,
                          {
                            borderColor: "#dedee0",
                            borderWidth: 1,
                            borderRadius: Metrics.rfv(10),
                          },
                        ]}
                      />
                    </View>
                    {phoneNumberError && (
                      <Text style={{ ...styles.errorText }}>
                        {phoneNumberError}
                      </Text>
                    )}
                  </View>
                  <Text
                    style={{
                      fontSize: Metrics.rfv(15),
                      fontWeight: "bold",
                      marginTop: Metrics.rfv(10),
                      color: Colors.black,
                      fontFamily: Fonts.Roboto400,
                    }}
                  >
                    Email address
                  </Text>
                  <View style={[styles.passwordContainer]}>
                    <TextInput
                      title="email"
                      placeholderemail
                      placeholderTextColor={Colors.grey}
                      value={email}
                      onChangeText={(text) => {
                        setEmailError("");
                        setEmail(text);
                      }}
                      error={emailError}
                      // secureTextEntry={!passwordVisible}
                      style={[styles.inputStyle, { color: Colors.grey }]}
                    />
                  </View>
                  {emailError && (
                    <Text style={{ ...styles.errorText }}>{emailError}</Text>
                  )}
                  <Text
                    style={{
                      fontSize: Metrics.rfv(15),
                      fontWeight: "bold",
                      marginTop: Metrics.rfv(10),
                      color: Colors.black,
                      fontFamily: Fonts.Roboto400,
                    }}
                  >
                    Select Time Zone
                  </Text>
                  <View style={styles.passwordContainer}>
                    <TimeZoneComponent
                    style={{borderColor:"transparent", borderWidth:0}}
                      isCurrency={true}
                      data={country}
                     
                      title={timeZones}
                      selectedItem={global.selectedCountry?.timeZone}
                      setSelectedItem={(itemValue) => {
                        setTimeZonesError("");
                        console.log("-=-=-=-=-=-=item-=-=-=-=-", itemValue);

                        setSelectedTime(itemValue);
                      }}
                    />
                  </View>
                  {timeZonesError && (
                    <Text style={{ ...styles.errorText }}>
                      {timeZonesError}
                    </Text>
                  )}
                  <Text
                    style={{
                      fontSize: Metrics.rfv(15),
                      fontWeight: "bold",
                      marginTop: Metrics.rfv(10),
                      color: Colors.black,
                      fontFamily: Fonts.Roboto400,
                    }}
                  >
                    Set Password
                  </Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      title="Set Password"
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
                      style={{ width: 20, height: 20, marginRight: 20 }}
                      onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                      {!passwordVisible ? (
                        <FastImage
                          resizeMode="contain"
                          style={{ width: "100%", height: "100%" }}
                          source={{
                            uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110164/eyeInvisible-821d9d16_bhciqb.png",
                          priority: FastImage.priority.low,
                          }}
                        />
                      ) : (
                        <FastImage
                          resizeMode="contain"
                          style={{ width: "100%", height: "100%" }}
                          source={{
                            uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110164/eyeVisible-09720f5f_tnwwrq.png",
                          priority: FastImage.priority.low,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  {passwordError && (
                    <Text style={{ ...styles.errorText }}>{passwordError}</Text>
                  )}
                  <Text
                    style={{
                      fontSize: Metrics.rfv(15),
                      fontWeight: "bold",
                      color: Colors.black,
                      marginTop: Metrics.rfv(10),
                      fontFamily: Fonts.Roboto400,
                    }}
                  >
                    Confirm Password
                  </Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      title="Confirm Password"
                      placeholderTextColor={Colors.grey}
                      placeholder="*****"
                      value={confirmPassword}
                      onChangeText={(text) => {
                        setPasswordCError("");
                        setConfirmPassword(text);
                        // if (text !== passwordVisible) {
                        //   setPasswordError('Passwords do not match');
                        // } else {
                        //   setPasswordError('');
                        // }
                      }}
                      // error={
                      //   passwordCError
                      // }
                      secureTextEntry={!passwordCVisible}
                      style={styles.inputStyle}
                    />

                    <TouchableOpacity
                      style={{ width: 20, height: 20, marginRight: 20 }}
                      onPress={() => setPasswordCVisible(!passwordCVisible)}
                    >
                      {!passwordCVisible ? (
                        <FastImage
                          resizeMode="contain"
                          style={{ width: "100%", height: "100%" }}
                          source={{
                            uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110164/eyeInvisible-821d9d16_bhciqb.png",
                         priority: FastImage.priority.low,
                          }}
                        />
                      ) : (
                        <FastImage
                          resizeMode="contain"
                          style={{ width: "100%", height: "100%" }}
                          source={{
                            uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110164/eyeVisible-09720f5f_tnwwrq.png",
                          priority: FastImage.priority.low,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  {passwordCError && (
                    <Text style={{ ...styles.errorText }}>
                      {passwordCError}
                    </Text>
                  )}
                  {/* <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}>
                        {touched.verificationCode &&
                          errors.verificationCode && (
                            <Text
                              style={{
                                ...styles.errorText,
                                marginTop: Metrics.rfv(5),
                              }}>
                              {errors.verificationCode}
                            </Text>
                          )}
                      </View> */}
                  <Text
                    style={{
                      fontSize: Metrics.rfv(15),
                      fontWeight: "bold",
                      color: Colors.black,
                      marginTop: Metrics.rfv(10),
                      fontFamily: Fonts.Roboto400,
                    }}
                  >
                    Invite Code
                  </Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      title="Invite Code"
                      placeholderTextColor={Colors.grey}
                      placeholder=""
                      value={inviteCode}
                      onChangeText={(text) => {
                        setInviteCodeError("");
                        setInviteCode(text);
                      }}
                      error={inviteCodeError}
                      style={styles.inputStyle}
                    />
                  </View>
                  {inviteCodeError && (
                    <Text style={styles.errorText}>{inviteCodeError}</Text>
                  )}
                </View>

                {/* <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}>
                      {touched.verificationCode && errors.verificationCode && (
                        <Text
                          style={{
                            ...styles.errorText,
                            marginTop: Metrics.rfv(5),
                          }}>
                          {errors.verificationCode}
                        </Text>
                      )}
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          marginRight: 10,
                          marginTop: Metrics.rfv(5),
                          flex: 1,
                        }}>
                        <TouchableOpacity
                          disabled={!resendOtpTitle}
                          onPress={() => {
                            if (resendOtpTitle) {
                              sendOtpCall();
                              startTimer();
                            }
                          }}>
                          <Text
                            style={{
                              color: resendOtpTitle ? '#1591ea' : 'gray',
                              fontFamily: Fonts.Roboto400,
                            }}>
                            {'Resend Otp '}
                          </Text>
                        </TouchableOpacity>
                        <Text
                          style={{color: 'black', fontFamily: Fonts.Roboto400}}>
                          {timerActive ? formatTime() : ''}
                        </Text>
                      </View>
                    </View> */}
                {/* <View style={styles.checkView}> */}
                <View style={styles.rowContainer}>
                  {/* <View> */}
                  <Text
                    style={{
                      color: Colors.black,
                      fontFamily: Fonts.Roboto400,
                      textAlign: "left",
                    }}
                  >
                    I have read and agree to all the{" "}
                  </Text>
                  {/* </View> */}
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(privacy_Policy);
                      }}
                    >
                      <Text style={styles.link}>terms and conditions</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: Colors.black,
                        fontFamily: Fonts.Roboto400,
                      }}
                    >
                      {" "}
                      &{" "}
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(privacy_Policy);
                      }}
                    >
                      <Text style={styles.link}>Privacy Policy</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* </View> */}
                {/* {touched.termsAccepted && errors.termsAccepted && (
                      <Text style={{color: 'red', fontFamily: Fonts.Roboto400}}>
                        {errors.termsAccepted}
                      </Text>
                    )} */}
              </View>

              <View style={styles.registerVIew}>
                <Button
                  buttonTitleStyle={styles.buttonText}
                  disabled={!isValid}
                  full={true}
                  buttonTitle="Register"
                  buttonStyle={styles.ButtonView}
                  onButtonPress={() => {
                    // getTimeZones()
                    validation();
                    // navigation.navigate('Home');
                  }}
                />
                <TouchableOpacity
                  style={styles.LoginView}
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                >
                  <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          {renderAlertModal()}
          {currencyModal && renderItem()}
          {fileWebview?.open ? renderWebview() : null}
          {modalVisible && languageModal()}
        </View>
      </ScrollView>
    </PageWrapperView>
  );
};

export default Register;

const styles = StyleSheet.create({
  subtitle1: {
    alignSelf: "flex-start",
    fontSize: Metrics.rfv(18),
    color: "#fff",
    paddingHorizontal: Metrics.rfv(16),
    fontWeight: "bold",
    marginBottom: Metrics.rfv(5),
    fontFamily: Fonts.Roboto400,
  },
  picker: {
    width: "30%",
  },
  rowContainer: {
    flexDirection: "row", // Ensures content is in a row
    alignItems: "center",
    // justifyContent: 'center',
    paddingVertical: Metrics.rfv(10),
    flexWrap: "wrap",
    // Aligns content vertically centered
  },
  alertMsg: {
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 15,
    width: 300,
    alignItems: "center",
    borderRadius: 8,
    paddingVertical:Metrics.rfv(25)
    // width:400
    // position: "absolute",

    // height:'100%',
    // justifyContent:"center",
    // alignItems:"center"
  },
  mLeft10: {
    marginLeft: 10,
    fontSize: 14,
    color: "#000", // Adjust as needed
  },
  phNoText: {
    fontSize: Metrics.rfv(15),
    fontWeight: "bold",
    color: Colors.black,
    fontFamily: Fonts.Roboto400,
    marginBottom: 5,
  },
  inputStyle: {
    flex: 1,
    paddingVertical: Metrics.rfv(10),
    paddingHorizontal: Metrics.rfv(12),
    color: Colors.black,
    fontFamily: Fonts.Roboto400,
    marginLeft: 10,
    fontSize:Metrics.rfv(18)
  },
  nineView: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // marginTop: Metrics.rfv(10),
    // height:Metrics.rfv(150)
  },
  xText: {
    fontSize: Metrics.rfv(30),
    color: "#a32324",
    fontWeight: "bold",
    marginTop: Metrics.rfv(-5),
    fontFamily: Fonts.Roboto400,
  },
  xView: {
    backgroundColor: "#fff",
    width: Metrics.rfv(45),
    height: Metrics.rfv(45),
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Metrics.rfv(5),
  },
  nineText: {
    fontSize: Metrics.rfv(45),
    color: "#fff",
    fontWeight: "bold",
    fontFamily: Fonts.Roboto400,
  },
  hundrendText: {
    marginTop: 20,
    width: 400,
    height: 0,
    borderBottomWidth: 100,
    borderBottomColor: "#fff",
    borderLeftWidth: 70,
    borderLeftColor: "transparent",
    borderRightWidth: 70,
    borderRightColor: "transparent",
    borderStyle: "solid",
  },
  hundrendView: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: "10%",
    marginBottom: Metrics.rfv(100),
  },
  timeZoneCont: {
    borderColor: "#dedee0",
    borderWidth: 1,
    borderRadius: Metrics.rfv(10),
    width: "100%",
    // height:Metrics.rfv(40),
    marginRight: Metrics.rfv(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  imgView: {
    width: 15,
    height: 15,
  },
  down_arrow: {
    width: "100%",
    height: "100%",
  },
  plzText: {
    fontSize: 16,
    paddingBottom: 20,
    color: "#fff",
    paddingHorizontal: 16,
  },
  alertMsgText: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    width: 200,
    marginBottom:15
  },
  linkText: {
    color: "#3c88ce",
    paddingTop: Metrics.rfv(10), // Adjust as needed
    textDecorationLine: "underline", // Optionally underline the links
  },
  loginText: {
    color: "#a32324",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  regText: {
    fontWeight: "bold",
    fontSize: 25,
    paddingBottom: 5,
    color: "#fff",
    paddingHorizontal: 16,
  },
  imageView: {
    minWidth: 500,
    minHeight: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf:"center",
    // position:"absolute",
    backgroundColor: "rgba(0,0,0,0.8)",
    // position:"absolute",
    // backgroundColor: "rgba(0,0,0,0.8)",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Metrics.rfv(10),
    borderWidth: 1,
    marginBottom: Metrics.rfv(5),
    marginTop: Metrics.rfv(5),
    backgroundColor: "#fff",
    borderColor: "#dedee0",
  },
  LoginView: {
    borderColor: "#962f2a",
    borderWidth: 1,
    paddingVertical: Metrics.rfv(8),
    paddingHorizontal: Metrics.rfv(45),
    borderRadius: 8,
    marginTop: Metrics.rfv(10),
  },
  registerVIew: {
    justifyContent: "center",
    paddingTop: 26,
    alignItems: "center",
    marginBlockStart: "auto",
  },
  ButtonView: {
    backgroundColor: "#962f2a",
    paddingVertical: Metrics.rfv(8),
    paddingHorizontal: Metrics.rfv(36),
    borderRadius: 8,
  },
  checkBoxClick: {
    margin: 0,
    width: 10,
    padding: 0,
    marginLeft: 0,
  },
  mLeft10: { marginLeft: 10 },
  checkView: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Metrics.rfv(15),
    paddingHorizontal: Metrics.rfv(16),
    // paddingTop: 10,
    // paddingRight: 10,
  },
  sendView: {
    height: "100%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 80,
  },
  link: {
    color: "#1591ea",
    fontFamily: Fonts.Roboto400,
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
  },
  veriText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: Colors.black,
    fontFamily: Fonts.Roboto400,
  },
  ninetVIew: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Distribute space between items
    paddingHorizontal: 20, // Optional: add padding for better spacing
  },
  nineText: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    fontFamily: Fonts.Roboto400,
  },
  xText: {
    fontSize: 30,
    color: "#a32324",
    fontWeight: "bold",
    marginTop: Metrics.rfv(-11),
    fontFamily: Fonts.Roboto400,
  },
  xView: {
    backgroundColor: "#fff",
    width: Metrics.rfv(25),
    height: Metrics.rfv(25),
    borderRadius: Metrics.rfv(25 / 2),
    justifyContent: "center",
    alignItems: "center",
    marginTop: Metrics.rfv(5),
  },
  innerView: {
    paddingBottom: Metrics.rfv(20),
  },
  subtitle: {
    alignSelf: "flex-start",
    fontSize: Metrics.rfv(14),
    fontWeight: "500",
    color: "#fff",
    paddingHorizontal: Metrics.rfv(16),
    marginBottom: Metrics.rfv(10),
    fontFamily: Fonts.Roboto400,
  },

  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    // paddingTop: 10,
    backgroundColor: "#a32324",
    // paddingBottom: 20,
    width: "100%",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: Metrics.rfv(16),
    fontFamily: Fonts.Roboto400,
  },
  glabalIcon: {
    width: "100%",
    height: "100%",
  },
  errorText: {
    color: "red",
    fontSize: Metrics.rfv(12),
    fontFamily: Fonts.Roboto400,
  },
  eyeIcon: {
    marginRight: Metrics.rfv(10),
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignSelf: "center",
    height:Dimensions.get('screen').height,
    minWidth:Dimensions.get('screen').width
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
    marginVertical: 5,
  },
  modalText: {
    color: "#000",
    fontSize: Metrics.rfv(18),
    fontWeight: "bold",
    // paddingBottom: 15,
    // marginTop:Metrics.rfv(25)
  },
  selectedLangText:{
    marginRight: 10,
    fontSize:Metrics.rfv(12),
    color:"#fff",
    width:25,
    textAlign:"center"
  }
});
