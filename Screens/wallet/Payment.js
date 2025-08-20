import React, { createRef, useEffect, useState } from "react";
import {
  Dimensions,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Image,
  CameraRoll,
  PermissionsAndroid,
  Platform,
  Alert,
} from "react-native";
import HeaderTitleComponent from "../../Components/HeaderTitle";
import { SvgUri } from "react-native-svg";
import { Colors } from "../../Helpers/Colors";
import Metrics from "../../Helpers/Metrics";
import FastImage from "react-native-fast-image";
import Button from "../../Components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fonts } from "../../constant/data";
import { PinchGestureHandler } from "react-native-gesture-handler";
import RNFetchBlob from "rn-fetch-blob";
import CustomToast from "../../Components/CustomToast";
import { useNavigation } from "@react-navigation/native";

const Payment = ({}) => {
  const [selectedIndex, setSelectedIndex] = useState();
  const [showImg, setShowImg] = useState(false);
  const [UTR, setUTR] = useState("");
  const scale = React.useRef(new Animated.Value(1)).current;
  const image: any = createRef();
  const [isToast, setIsToast] = useState(false);
  const navigation = useNavigation();
  const [timerCount, setTimer] = useState(60)

  const paymentMethods = [
    {
      name: "Paytm",
      uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1740486157/paytm_ixgbf4.svg",
    },

    {
      name: "PhonePe",
      uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735216324/svgviewer-output_1_bllch0.svg",
    },
    {
      name: "G Pay",
      uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1740486339/gpay_1_pwu9oh.svg",
    },
    {
      name: "Upi",
      uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110021/UPI_vcp3wz.svg",
    },
  ];
  var base64Icon =
    "data:image/webp;base64,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";
  // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=";

  const handlePinch = Animated.event([{ nativeEvent: { scale } }]);

  useEffect(() => {
    let interval = setInterval(() => {
        setTimer(lastTimerCount => {
            if (lastTimerCount == 0) {
                //your redirection to Quit screen
            } else {
                lastTimerCount <= 1 && clearInterval(interval)
                return lastTimerCount - 1
            }
        })
    }, 1000) //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval)
}, []);


  const render_utrImg = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showImg}
        ani
        onRequestClose={() => {
          setShowImg(false);
          // Prevent the modal from closing when pressing back button
        }}
      >
        <View style={styles.modalContainer}>
          {/* <View style={styles.modalView}> */}
          <View style={{ flex: 1 }}>
           
           
            <PinchGestureHandler onGestureEvent={handlePinch}>
              <Animated.Image
                resizeMode="contain"
                style={[styles.utrImageView, { transform: [{ scale }] }]}
                source={{
                  uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1740222812/utr_oibvvb.png",
                }}
              />
            </PinchGestureHandler>
            <TouchableOpacity onPress={()=>setShowImg(false)} style={styles.closeImg}>
               <FastImage style={styles.crossImg} source={{uri:"https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907467/close-icon_bjloca.png"}}/>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </View>
      </Modal>
    );
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        downloadImage();
      } else {
        console.log("Camera permission denied");
        // downloadImage();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const downloadImage = () => {
    var Base64Code = base64Icon.split("data:image/webp;base64,"); //base64Image is my image base64 string

    const dirs = RNFetchBlob.fs.dirs;

    var path = dirs.DCIMDir + "/image.png";

    RNFetchBlob.fs.writeFile(path, Base64Code[1], "base64").then((res) => {
      console.log("File : ", res);
      // Platform.OS === "ios"
      //   ? RNFetchBlob.ios.previewDocument(path)
      //   :
      RNFetchBlob.fs.scanFile([{ path: path, mime: "image/png" }]);
      // Platform.OS === "android" &&
      setIsToast(true),
        setTimeout(() => {
          setIsToast(false);
        }, 3000);
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.headerStyle}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{ width: 25, height: 25 }}
            >
              <SvgUri
                preserveAspectRatio="xMinYMin slice"
                color={"#fff"}
                width={"100%"}
                height={"100%"}
                uri={
                  "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123454/svgviewer-output_hqtslg.svg"
                }
              ></SvgUri>
            </TouchableOpacity>
            <View style={styles.paymentMethodSvg}>
              <SvgUri
                color={"#fff"}
                width={"100%"}
                height={"100%"}
                uri={
                  "https://res.cloudinary.com/dwtdpelrp/image/upload/v1740122683/svgviewer-output_1_olhata.svg"
                }
              ></SvgUri>
            </View>
          </View>

          <Text style={styles.rupees}>₹ 500.0</Text>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.firstRow}>
            <Text style={styles.transferText}>Step 1 - Transfer ₹500.0</Text>
            <View style={styles.timerView}>
              <Text style={styles.time}>00:{timerCount}</Text>
            </View>
          </View>
          <Text style={styles.scanQrCode}>
            Scan QR code or select a payment method to pay
          </Text>
          <Text style={styles.scanPayText}>SCAN & PAY</Text>
          <View style={styles.base64Img}>
            <FastImage
              resizeMode="contain"
              style={{
                width: "100%",
                height: "100%",
                borderWidth: 1,
                borderColor: "#C2C2C2",
              }}
              source={{ uri: base64Icon }}
            />
          </View>
          <Button
            buttonTitleStyle={styles.buttonText}
            // disabled={!isValid}
            full={true}
            buttonTitle="Download"
            buttonStyle={styles.ButtonView}
            onButtonPress={async () => {
              requestCameraPermission();
              console.log("-=-=-=--=-current-=-=-img-=-=-");

              // shareFeedback();
            }} // Use Formik's handleSubmit
          />
          <Text style={[styles.scanQrCode, { fontWeight: "700" }]}>
            Select a payment method to pay
          </Text>
          {paymentMethods.map((item, index) => (
            <View style={styles.paymentOptions}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={[
                    styles.upiImg,
                    item.name == "PhonePe" && { width: 20 },
                  ]}
                >
                  <SvgUri
                    color={"#fff"}
                    width={"100%"}
                    height={"100%"}
                    uri={item.uri}
                  ></SvgUri>
                </View>
                {item.name == "PhonePe" && (
                  <Text style={[styles.phonePeText, {}]}>PhonePe</Text>
                )}
              </View>
              <TouchableOpacity
                onPress={() => {
                  setSelectedIndex(index);

                  AsyncStorage.setItem("NoMoreReminders", "true");
                }}
                style={styles.tickBorder}
              >
                {index === selectedIndex ? (
                  <FastImage
                    style={styles.rememberIcon}
                    source={{
                      uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907849/tick_ctsqt5.png",
                      priority: FastImage.priority.low,
                    }}
                  />
                ) : null}
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.utrView}>
            <Text style={styles.utrContainer}>
              UTR{" "}
              <Text
                onPress={() => {
                  setShowImg(true);
                }}
                style={styles.utrText}
              >
                where is UTR?
              </Text>
            </Text>
            <TextInput
              placeholder="UTR / UPI Ref No / UPI Transaction ID"
              placeholderTextColor={"#C2C2C2"}
              style={styles.inputStyle}
              onChangeText={(text) => {
                setUTR(text);
              }}
              // onBlur={handleBlur('password')}
              value={UTR}
            />
            <Button
              buttonTitleStyle={[
                styles.submitText,
                { color: UTR == "" ? Colors.grey : "#fff" },
              ]}
              disabled={UTR == "" ? true : false}
              full={true}
              buttonTitle="Submit"
              buttonStyle={[
                styles.SubmitButton,
                UTR == ""
                  ? {
                      backgroundColor: "transparent",
                      borderColor: "#D3D3D3",
                      borderWidth: 1,
                    }
                  : { backgroundColor: "#962f2a" },
              ]}
              onButtonPress={() => {
                // shareFeedback();
              }} // Use Formik's handleSubmit
            />
          </View>
          <Button
            buttonTitleStyle={styles.doneText}
            // disabled={!isValid}
            full={true}
            buttonTitle="Done"
            buttonStyle={styles.doneButton}
            onButtonPress={() => {
              // shareFeedback();
            }} // Use Formik's handleSubmit
          />
        </View>
      </ScrollView>
      {isToast && (
        <CustomToast
          downloadImg={true}
          isToast={isToast}
          downloadImgUrl={"Image Downloaded"}
          onRequestClose={() => {
            setIsToast(false);
          }}
        />
      )}
      {showImg && render_utrImg()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paymentMethodSvg: {
    width: 70,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginLeft:Metrics.rfv(10)
  },
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#962f2a",
    justifyContent: "space-between",
    paddingRight: Metrics.rfv(10),
  },
  rupees: {
    color: Colors.white,
    fontSize: Metrics.rfv(20),
    fontWeight: "700",
  },
  mainContainer: {
    flex: 1,
    padding: Metrics.rfv(10),
  },
  transferText: {
    color: "#962f2a",
    fontSize: Metrics.rfv(13),
    fontWeight: "700",
    textAlign: "left",
  },
  firstRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // padding:Metrics.rfv(10)
  },
  timerView: {
    backgroundColor: "#517fbc",
    width: "25%",
    paddingVertical: Metrics.rfv(6),
    borderRadius: Metrics.rfv(8),
  },
  time: {
    color: "#fff",
    fontSize: Metrics.rfv(15),
    textAlign: "center",
  },
  scanQrCode: {
    fontSize: Metrics.rfv(11),
  },
  scanPayText: {
    color: "#000",
    fontSize: Metrics.rfv(15),
    fontWeight: "500",
    textAlign: "center",
    marginTop: Metrics.rfv(10),
  },
  base64Img: {
    alignSelf: "center",
    width: 200,
    backgroundColor: "#C2C2C2",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Metrics.rfv(5),
  },
  ButtonView: {
    backgroundColor: "#962f2a",
    borderRadius: 8,
    paddingVertical: 8,
    margin: 10,
    paddingHorizontal: 8,
    // marginTop:'auto',
    marginBottom: Metrics.rfv(30),
    width: "30%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  SubmitButton: {
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 10,
    paddingHorizontal: 8,
    // marginTop:'auto',
    // marginBottom: Metrics.rfv(30),
    width: "100%",
    alignSelf: "center",
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  rememberIcon: {
    width: 15,
    height: 15,
  },
  tickBorder: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    borderRadius: 20 / 2,
    borderColor: "#FEAA57",
    borderWidth: 1,
    marginHorizontal: 10,
    // marginTop: 5,
  },
  paymentOptions: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    borderColor: "#C2C2C2",
    borderWidth: 1,
    paddingHorizontal: Metrics.rfv(10),
    borderRadius: 5,
    marginTop: Metrics.rfv(10),
  },
  paytmText: {
    textAlign: "left",
  },
  upiImg: {
    width: 40,
    height: 40,
  },
  phonePeText: {
    fontSize: Metrics.rfv(10),
    fontWeight: "700",
    color: "#572998",
    marginLeft: Metrics.rfv(3),
  },
  utrText: {
    textDecorationLine: "underline",
    fontWeight: "400",
  },
  utrImageView: {
    width: "100%",
    height: "100%",
  },
  utrContainer: {
    fontWeight: "700",
    marginTop: Metrics.rfv(10),
    marginBottom: Metrics.rfv(10),
  },
  inputStyle: {
    paddingVertical: Metrics.rfv(10),
    paddingHorizontal: Metrics.rfv(12),
    color: Colors.black,
    fontFamily: Fonts.Roboto400,
    // marginLeft: 10,
    fontSize: Metrics.rfv(12),
    borderColor: "#C2C2C2",
    borderWidth: 1,
    borderRadius: 8,
  },
  utrView: {
    borderWidth: 1,
    borderColor: "#C2C2C2",
    padding: Metrics.rfv(10),
    marginVertical: Metrics.rfv(10),
    borderRadius: 8,
  },
  doneButton: {
    backgroundColor: "#962f2a",
    borderRadius: 8,
    paddingVertical: 8,
    margin: 10,
    paddingHorizontal: 8,
    marginTop: "auto",
    marginBottom: Metrics.rfv(30),
    width: "30%",
    alignSelf: "center",
  },
  doneText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignSelf: "center",
    height: Dimensions.get("screen").height,
    minWidth: Dimensions.get("screen").width,
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 5,
    padding: 15,
    margin: 15,
    overflow: "hidden",
    // height: 400,
    width: "100%",
    alignSelf: "center",
  },
  crossImg:{
    width:"100%",
    height:"100%"
  },
  closeImg:{
    width:30,
    height:30,
    // alignSelf:"flex-end",
    position:"absolute",
    bottom:Metrics.rfv(150),
    right:'45%',
    // left:Metrics.rfv(150),
    
    // alignSelf:"center"
  }
});

export default Payment;
