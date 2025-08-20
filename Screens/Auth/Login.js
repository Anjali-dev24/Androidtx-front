import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  Dimensions,
  BackHandler,
  Linking,
} from "react-native";
import Toast from "react-native-simple-toast";
// import Clip from '../../Components/Clip';
// import {CheckBox} from 'react-native-elements';
import Button from "../../Components/Button";
import PageWrapperView from "../../Components/PageWrapperView";
import Metrics from "../../Helpers/Metrics";
import AuthStore from "../../reduxToolkit/AuthStore";
import FastImage from "react-native-fast-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import DeviceInfo from "react-native-device-info";
import { ScrollView } from "react-native-gesture-handler";
import { SvgUri } from "react-native-svg";
import { get_isd, loginUser } from "../../APIs/commonAPIsStructure";
import Loader from "../../Components/Loader";
import TimeZoneComponent from "../../Components/TimeZoneComponent";
import { Fonts } from "../../constant/data";
import Images from "../../constant/images/Images";
import useLoading from "../../CustomHook/useLoading";
import { Colors } from "../../Helpers/Colors";
import language from "../../Lang/language.json";
import { requestCameraPermission } from "../../reduxToolkit/Permissions";
import CustomToast from "../../Components/CustomToast";
const Login = ({ route }) => {
  const { t } = useTranslation();
  const deviceId = DeviceInfo.getDeviceId();
  const formRef = useRef();
  const { isLoading, setLoading } = useLoading();
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const rememberMe = AuthStore((state) => state.rememberMe);
  const setRememberMe = AuthStore((state) => state.setRememberMe);
  const { login, user, setLoginInfo, loginInfo, isLoggedIn } = AuthStore();
  const [checked, setChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [loginType, setLoginType] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [languages, setLanguages] = useState(null);
  const navigation = useNavigation();
  const [selectedCountry, setSelectedCountry] = useState();
  const [isToast, setIsToast] = useState(false);
  const [showCreds, setShowCreds] = useState(false);
  const [saveData, setSaveData] = useState();
  const [dialCode, setDialCode] = useState();

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

  useEffect(() => {
    const onFocus = navigation.addListener("focus", () => {
      console.log("-=-=-=-=-=-params-=-=-=-78787-=-=-=-=-", route.params);
      if (route.params?.isExpired) {
        setIsToast(true);
        setTimeout(() => {
          setIsToast(false);
        }, 2000);
      }

      // requestCameraPermission()
      AsyncStorage.getItem("rememberMe").then((res) => {
        let parseRes = JSON.parse(res);
        console.log("-=-=-=-=--focus-=-=-=-", res, parseRes);
        setPhoneNumber(parseRes?.phoneNumber);
        setPassword(parseRes?.password);
        setChecked(parseRes?.rememberMe);
      });
      // isdCode();

      setPhoneNumber("");
      setPassword("");
    });

    return onFocus;
  }, [navigation]);

  const checkPermission = async () => {
    const permissions = await requestCameraPermission();
    console.log("-=-=-=-=-=-permissions-=-=-=-=-=-", permissions);
    if (permissions === false) {
      Alert.alert(
        "",
        "AndroidTx needs permissions. Go to settings and enable all the permissions",
        [
          {
            text: "Ask me later",
            onPress: () => BackHandler.exitApp(),
          },
          {
            text: "Cancel",
            onPress: () => BackHandler.exitApp(),
            style: "cancel",
          },
          { text: "OK", onPress: () => Linking.openSettings() },
        ]
      );
    }
  };

  const validation = () => {
    if (phoneNumber == "") {
      setPhoneNumberError("Please enter phone number");
    } else if (password == "") {
      setPasswordError("Please enter password");
    } else {
      let userCredentials = {
        phoneNumber: phoneNumber,
        password: password,
        rememberMe: checked
      };
      setLoading(true);
      loginUser(phoneNumber, password)
        .then((res) => {
          setLoading(false);
          console.log("-=-=-res-=-=-=", res.data);
          if (res.data.message == "Logged in successfully") {
            Keyboard.dismiss();
            // setChecked(false);
            if (checked) {
              AsyncStorage.setItem(
                "rememberMe",
                JSON.stringify(userCredentials)
              );
            } else {
              AsyncStorage.removeItem("rememberMe");
            }

            navigation.navigate("Home");
            AsyncStorage.setItem("userInfo", JSON.stringify(res.data));
            AsyncStorage.setItem(
              "credentials",
              JSON.stringify(userCredentials)
            );
          } else {
            setLoading(false);
            Keyboard.dismiss();
            setErrorMsg(res.message);
            setErrorAlert(true);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log("-=-=-err-=-=-=", err);
          Keyboard.dismiss();
          setErrorMsg(err.message);
          setErrorAlert(true);
        });
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
              <TouchableOpacity
                onPress={() => {
                  setSelectedLanguage(languages);
                  setModalVisible(false);
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
                  setLanguages(selectedLanguage);
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

  const credsToast = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setShowCreds(false);
          console.log("-=-=-=-=-data-=-=-=-=-", saveData?.phoneNumber);
          setPhoneNumberError("");
          setPasswordError("");
          setPhoneNumber(saveData?.phoneNumber);
          setPassword(saveData?.password);
        }}
        style={styles.toastContainer}
      >
        <View style={styles.modalCont}>
          {/* <Image
            style={{ width: 30, height: 30, alignSelf: "center" }}
            source={{
              uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1736847312/toastTick_eiwrtj.png",
            }}
          /> */}
          <Text style={{ textAlign: "left", color: "#fff" }}>
            {saveData?.phoneNumber}
          </Text>
          <Text style={{ textAlign: "left", color: "#fff" }}>......</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    console.log("-=-=-=-true-=-=-=-=-", checked);
    // let userCredentials = {
    //   phoneNumber: phoneNumber,
    //   password: password,
    // };
    // if (checked) {
    //   console.log("-=-=-=-true-=-=-=-=-");
    //   AsyncStorage.setItem("rememberMe", JSON.stringify(userCredentials));
    // } else {
    //   AsyncStorage.removeItem("rememberMe");
    // }
  }, [checked]);

  return (
    <ScrollView
      bounces={false}
      keyboardShouldPersistTaps={"handled"}
      contentContainerStyle={{ height: "100%" }}
    >
      {/* {console.log('selectedLanguage===', selectedLanguage, t('forgot'))} */}
      <PageWrapperView
        topSafeArea
        dark={true}
        style={styles.mainView}
        statusBar={{ background: "#a32324" }}
      >
        <View style={styles.cView}>
          {isLoading && <Loader />}
          <View
            style={[
              styles.nineView,
              { justifyContent: "space-between", width: "100%" },
            ]}
          >
            <View style={{ width: "10%" }} />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.nineText}>9T</Text>
              <View style={styles.xView}>
                <Text style={styles.xText}>X</Text>
              </View>
            </View>

            <TouchableOpacity
              style={{ width: 25, height: 25, marginRight: 10 }}
              onPress={() => {
                console.log("-=-=-=-=-=-=-=-lang-=-=-=--==-=", language);
                setIsToast(true);
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
              {
                <Text style={styles.selectedLangText}>
                  {languages ? languages?.toUpperCase() : "EN"}
                </Text>
              }
            </TouchableOpacity>
          </View>
          <Text style={styles.LoginText}>{t("Buttons.Login")}</Text>
          <Text style={styles.textVIew}>{t("loginString.title")}</Text>
          <View style={styles.innerView}>
            <View
              style={{
                // justifyContent: "space-around",
                paddingHorizontal: Metrics.rfv(10),
                paddingTop: Metrics.rfv(20),
                flexGrow: 1,
              }}
            >
              <View
                style={{ marginTop: Metrics.rfv(10), backgroundColor: "grren" }}
              >
                <Text
                  style={{
                    fontSize: Metrics.rfv(18),
                    fontWeight: "bold",
                    color: Colors.black,
                    marginBottom: Metrics.rfv(3),
                    fontFamily: Fonts.Roboto400,
                  }}
                >
                  {t("loginString.phone")}
                </Text>
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
                      title={"+91"}
                      onIsdPress={() => {
                        console.log(
                          "-=-=-=-heloo-=-=",
                          dialCode?.length,
                          dialCode
                        );
                        if (dialCode?.length === undefined) {
                          setErrorAlert(true);
                          setErrorMsg("Network Error");
                        }
                      }}
                      selectedItem={
                        global.selectedCountry?.dialingCode
                          ? `+${global.selectedCountry?.dialingCode}`
                          : "+91"
                      }
                      setSelectedItem={(itemValue) => {
                        console.log("-=-=-=-=-=-=item-=-=-=-=-", itemValue);
                        AsyncStorage.setItem("dialCode", itemValue);
                        setSelectedCountry(itemValue);
                      }}
                    />
                  </View>

                  <TextInput
                    numberOfLines={1}
                    autoComplete="tel-device"
                    onFocus={async () => {
                      const showCreds = await AsyncStorage.getItem(
                        "credentials"
                      );
                      console.log(
                        "-=-=-=-=-hi-=-=-0=-",
                        typeof phoneNumber,
                        showCreds
                      );
                      let parseData = JSON.parse(showCreds);
                      if (parseData) {
                        setShowCreds(true);
                        setSaveData(parseData);
                      }
                    }}
                    placeholder="9876542342"
                    placeholderTextColor={Colors.grey}
                    keyboardType="number-pad"
                    style={[
                      styles.inputStyle,
                      {
                        borderColor: "#dedee0",
                        borderWidth: 1,
                        borderRadius: Metrics.rfv(10),
                        marginTop: Metrics.rfv(15),
                      },
                    ]}
                    onChangeText={(text) => {
                      setShowCreds(false);
                      setPhoneNumberError("");
                      setPhoneNumber(text);
                    }}
                    // onBlur={handleBlur('phoneNumber')}
                    value={phoneNumber}
                  />
                  {showCreds && phoneNumber == "" && credsToast()}
                  {/* {credsToast()} */}
                </View>
                {phoneNumberError && (
                  <Text
                    style={{
                      ...styles.errorText,
                      marginTop: Metrics.rfv(5),
                      fontFamily: Fonts.Roboto400,
                    }}
                  >
                    {phoneNumberError}
                  </Text>
                )}
                {/* <PhoneInput
                        value={values.phoneNumber}
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={handleBlur('phoneNumber')}
                        error={touched.phoneNumber && errors.phoneNumber}
                        onCountrySelect={setSelectedCountry}
                      /> */}
              </View>

              <View style={{ marginTop: Metrics.rfv(20) }}>
                <Text
                  style={{
                    marginTop: Metrics.rfv(3),
                    fontSize: Metrics.rfv(18),
                    fontWeight: "bold",
                    color: Colors.black,
                    marginBottom: Metrics.rfv(3),
                    fontFamily: Fonts.Roboto400,
                  }}
                >
                  {t("loginString.Password")}
                </Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    numberOfLines={1}
                    autoComplete="password"
                    placeholder="*****"
                    placeholderTextColor={Colors.grey}
                    secureTextEntry={!passwordVisible}
                    style={styles.inputStyle}
                    onChangeText={(text) => {
                      setPasswordError(""), setPassword(text);
                    }}
                    // onBlur={handleBlur('password')}
                    value={password}
                  />

                  <TouchableOpacity
                    disabled={password == "" ? true : false}
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
                  <Text
                    style={{
                      ...styles.errorText,
                      marginTop: Metrics.rfv(5),
                      fontFamily: Fonts.Roboto400,
                    }}
                  >
                    {passwordError}
                  </Text>
                )}
              </View>

              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  paddingTop: Metrics.rfv(10),
                  // marginTop: Metrics.rfv(50),
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (phoneNumber && password) {
                        checked ? setChecked(false) : setChecked(true);
                      } else {
                        setPhoneNumberError("Please enter phone number");
                        setPasswordError("Please enter password");
                      }
                    }}
                    style={{
                      width: 20,
                      height: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 5,
                    }}
                  >
                    {!checked ? (
                      <FastImage
                        style={styles.rememberIcon}
                        source={{
                          uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907813/remember_me_sarmul.png",
                          priority: FastImage.priority.low,
                        }}
                      />
                    ) : (
                      <FastImage
                        style={styles.rememberIcon}
                        source={{
                          uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907812/remember_wvkkzo.png",
                          priority: FastImage.priority.low,
                        }}
                      />
                    )}
                  </TouchableOpacity>

                  <Text
                    style={{
                      color: "#3c88ce",
                      size: Metrics.rfv(10),
                      fontFamily: Fonts.Roboto400,
                    }}
                  >
                    {t("loginString.remember")}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ForgotPassword");
                  }}
                >
                  <Text
                    style={{
                      color: "#3c88ce",
                      fontFamily: Fonts.Roboto400,
                    }}
                  >
                    {t("loginString.forgot")} ?
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  // paddingVertical: Metrics.rfv(25),
                  alignItems: "center",
                  marginTop: "auto",
                  marginBottom: Metrics.rfv(25),
                  // marginBottom: 5,
                  gap: 12,
                  // backgroundColor: 'green',
                }}
              >
                <Button
                  buttonTitleStyle={styles.buttonTextStyle}
                  buttonStyle={styles.loginButton}
                  buttonTitle={t("Buttons.Login")}
                  full={true}
                  onButtonPress={() => {
                    // global.userLoggedIn = true;
                    // setTimeout(() => {
                    //   global.userLoggedIn = false
                    //   console.log('-=-=-=-=-=-global.userLoggedIn = true-=-=-=-', global.userLoggedIn);
                    //   alert('ji')
                    // }, 10000);
                    validation();
                    // setIsActive(true)
                    // navigation.navigate("SplashScreen");
                  }}
                />
                <Button
                  buttonStyle={styles.registerButton}
                  full={false}
                  buttonTitleStyle={styles.regButtonText}
                  buttonTitle={t("Buttons.Register")}
                  onButtonPress={() => {
                    navigation.navigate("UserCountry");
                  }}
                />
              </View>
            </View>
            <View style={styles.bottomView}>
              <View style={{ width: 25, height: 25 }}>
                <SvgUri
                  preserveAspectRatio="xMinYMin slice"
                  style={{ marginHorizontal: 1 }}
                  color={"#fff"}
                  width={"100%"}
                  height={"100%"}
                  uri={
                    "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123449/svgviewer-output_7_yyzzrm.svg"
                  }
                ></SvgUri>
              </View>
              <Text style={styles.secureText}>
                {" "}
                100% {t("loginString.safe")}
              </Text>
            </View>
          </View>
          {true && (
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
          )}
          {/* {true && customToast()} */}
          {modalVisible && languageModal()}
          {renderAlertModal()}
        </View>
      </PageWrapperView>
    </ScrollView>
  );
};

export default Login;
const styles = StyleSheet.create({
  rText: {
    color: "#a32324",
    fontSize: Metrics.rfv(20),
    fontWeight: "bold",
    textAlign: "center",
  },
  glabalIcon: {
    width: "100%",
    height: "100%",
  },
  picker: {
    width: "30%",
    marginTop: Metrics.rfv(15),
  },
  toastContainer: {
    backgroundColor: "transparent",
    justifyContent: "center",
    // marginBottom: 20,
    alignSelf: "center",
    position: "absolute",
    left: 0,
    right: 0,
    // bottom: Dimensions.get("screen").height / 2,
    top: 70,
    zIndex: 2,
  },
  modalCont: {
    backgroundColor: "rgba(0,0,0,0.6)",
    alignSelf: "center",
    padding: Metrics.rfv(15),
    borderRadius: 10,
  },
  errorText: {
    color: "red",
    fontSize: Metrics.rfv(12),
  },
  rememberMeBox: {
    width: "80%",
    height: "80%",
    borderColor: "#3c88ce",
    borderWidth: 1,
    marginRight: 5,
  },
  rememberIcon: {
    width: "100%",
    height: "100%",
  },
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    // paddingTop: Metrics.rfv(5),
    backgroundColor: "#962f2a",
    // paddingBottom: Metrics.rfv(10),
  },
  Email: {
    borderRadius: Metrics.rfv(10),
    borderWidth: 1,
    padding: Metrics.rfv(10),
    color: Colors.black,
  },
  regiterView: {
    backgroundColor: "#fff",
    paddingVertical: Metrics.rfv(7),
    paddingHorizontal: Metrics.rfv(10),
    width: Metrics.rfv(175),
    borderRadius: Metrics.rfv(5),
    borderColor: "#a32324",
    borderWidth: 1,
    marginTop: Metrics.rfv(10),
  },
  subInnerView: {
    flexDirection: "row",
  },
  innerView: {
    backgroundColor: "#fff",
    // width: '100%',
    // paddingBottom: Metrics.rfv(40),
    marginTop: 20,
    flex: 1,
    // flex:0.2
  },
  textVIew: {
    fontSize: Metrics.rfv(15),
    paddingBottom: Metrics.rfv(20),
    color: "#fff",
    paddingHorizontal: Metrics.rfv(16),
    fontFamily: Fonts.Roboto400,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Metrics.rfv(10),
    borderWidth: 1,
    marginTop: Metrics.rfv(10),
    borderColor: "#dedee0",
  },
  LoginText: {
    fontWeight: "bold",
    fontSize: Metrics.rfv(20),
    paddingBottom: Metrics.rfv(5),
    color: "#fff",
    paddingHorizontal: Metrics.rfv(16),
    fontFamily: Fonts.Roboto400,
  },
  inputStyle: {
    flex: 1,
    paddingVertical: Metrics.rfv(10),
    paddingHorizontal: Metrics.rfv(12),
    color: Colors.black,
    fontFamily: Fonts.Roboto400,
    marginLeft: 10,
    fontSize: Metrics.rfv(18),
  },
  cView: {
    justifyContent: "space-between",
  },
  nineView: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // marginTop: Metrics.rfv(10),
    // height:Metrics.rfv(150)
  },
  ButtonView: {
    backgroundColor: "#962f2a",
    width: "70%",
    alignSelf: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: Metrics.rfv(25),
  },
  buttonText: {
    textAlign: "center",
    fontSize: 15,
    color: "#fff",
    fontWeight: "700",
  },
  alertMsgText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    width: 200,
    marginBottom: 15,
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
    width: Metrics.rfv(35),
    height: Metrics.rfv(35),
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Metrics.rfv(5),
  },
  nineText: {
    fontSize: Metrics.rfv(40),
    color: "#fff",
    fontWeight: "bold",
    fontFamily: Fonts.Roboto400,
  },
  eyeIcon: {
    paddingHorizontal: Metrics.rfv(10),
  },
  loginButton: {
    backgroundColor: "#962f2a",
    paddingVertical: Metrics.rfv(8),
    paddingHorizontal: Metrics.rfv(48),
    borderRadius: 8,
  },
  buttonTextStyle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  registerButton: {
    borderColor: "#962f2a",
    borderWidth: 1,
    paddingVertical: Metrics.rfv(8),
    paddingHorizontal: Metrics.rfv(35),
    borderRadius: 8,
  },
  regButtonText: {
    color: "#962f2a",
    fontWeight: "bold",
    fontSize: 18,
  },
  trapezoidTop: {
    // minWidthwidth: '100%',
    // height: 0,
    // borderBottomWidth: 60,
    borderBottomColor: "#fff",
    borderBottomWidth: 30,
    // borderBottomColor: "green",
    borderLeftWidth: 100,
    borderLeftColor: "transparent",
    borderRightWidth: 100,
    borderRightColor: "transparent",
    borderStyle: "solid",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#a32324",
    marginTop: "auto",
    position: "absolute",
    bottom: 45,
    zIndex: 1,
    left: 0,
    right: 0,
    paddingTop: 15,
    // paddingTop: 15,

    // bottom:'auto',
    // alignItems:'flex-end'
  },
  trapezoid: {
    // minWidthwidth: '100%',
    // height: 0,
    // borderBottomWidth: 60,
    borderTopColor: "#fff",
    borderTopWidth: 30,
    // borderBottomColor: "green",
    borderLeftWidth: 100,
    borderLeftColor: "transparent",
    borderRightWidth: 100,
    borderRightColor: "transparent",
    borderStyle: "solid",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#a32324",
    marginBlockStart: "auto",
    paddingBottom: 15,
    // paddingTop: 15,

    // bottom:'auto',
    // alignItems:'flex-end'
  },
  secureText: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "700",
    // position:"absolute",
    // zIndex:2,
    // top:0
  },
  shieldIcon: {
    // position:"absolute"
  },
  bottomView: {
    flexDirection: "row",
    justifyContent: "center",
    // position: "absolute",
    // bottom: Metrics.rfv(30),
    alignItems: "center",
    // zIndex: 2,
    backgroundColor: "#962f2a",
    marginTop: "auto",
    padding: 15,
  },
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    marginBottom: 20,
    alignSelf: "center",
    position: "absolute",
    bottom:0,
    top:0,
    left:0,
    right:0
    // bottom: Dimensions.get("screen").height / 4.8,
    // top: Dimensions.get("screen").height / 4.8,
    // left: 20,
    // right: 20,
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
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 5,
    padding: 15,
    margin: 15,
    overflow: "hidden",
    height: Dimensions.get('screen').height/2,
    width:Dimensions.get('screen').width/1.3,
    alignSelf:"center"
  },
  closeImage: {
    width: 25,
    height: 25,
  },
  languageTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: Metrics.rfv(5),
  },
  modalText: {
    color: "#000",
    fontSize: Metrics.rfv(18),
    fontWeight: "bold",
    // paddingBottom: 15,
    // marginTop:Metrics.rfv(25)
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
  selectedLangText: {
    marginRight: 10,
    fontSize: Metrics.rfv(12),
    color: "#fff",
    width: 25,
    textAlign: "center",
  },
});
