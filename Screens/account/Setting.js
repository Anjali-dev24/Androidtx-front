import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path, Rect, SvgUri } from "react-native-svg";
import { Colors } from "../../Helpers/Colors";
import Metrics from "../../Helpers/Metrics";
import { Fonts } from "../../constant/data";
import Images from "../../constant/images/Images";
import Clipboard from "@react-native-clipboard/clipboard";
import HeaderTitleComponent from "../../Components/HeaderTitle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";
import FastImage from "react-native-fast-image";
import CustomToast from "../../Components/CustomToast";
const { width, height } = Dimensions.get("window");

const Setting = ({ navigation }) => {
  const [userData, setUserData] = useState();
  const [isToast, setIsToast] = useState(false);

  useEffect(() => {
    console.log("-=-=-=-=-=-12121212=-=-=-=-", userData, global.user_info);
    const onFocus = navigation.addListener("focus", () => {
      AsyncStorage.getItem("userData").then((item) => {
        let parseData = JSON.parse(item);
        console.log("-=-=-=-=-=-userData=-=-=-=-", parseData);
        setUserData(parseData);
      });
    });
    return onFocus;
  }, [navigation]);


  return (
    <View style={{ flex: 1 }}>
      <View style={styles.backgroundContainer}></View>
      <HeaderTitleComponent
        title={"Setting Center"}
        goBack={() => navigation.goBack()}
        mainStyle={styles.mainHeaderStyle}
      />
      <View style={styles.profileContainer}>
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ChangeAvatar");
              console.log('-=-=-=-=-userData?.image-=-=-', userData?.image);
              
            }}
            style={styles.avatarView}
          >
            <FastImage
              source={
                userData
                  ? {uri:userData?.image,priority: FastImage.priority.low,}
                  : {
                      uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907465/c1_ebm7jm.jpg",
                      priority: FastImage.priority.low,
                    }
              }
              style={styles.userIcon}
            />
            <View style={styles.changeStyle}>
              <Text>Change avatar</Text>
              <View style={{ width: 25, height: 25 }}>
                <SvgUri
                preserveAspectRatio='xMinYMin slice'
                  style={{ marginHorizontal: 1 }}
                  color={"#000"}
                  width={"100%"}
                  height={"100%"}
                  uri={
                    "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735137648/svgviewer-output_27_i5sweu.svg"
                  }
                ></SvgUri>
              </View>
            </View>
          </TouchableOpacity>
          <View style={[styles.avatarView, { marginVertical: 15 }]}>
            <Text>Nickname</Text>
            <TouchableOpacity style={styles.changeStyle} onPress={() => {}}>
              <Text style={styles.name}>{global.user_info?.user?.userName}</Text>
              <View style={{ width: 25, height: 25 }}>
                <SvgUri
                preserveAspectRatio='xMinYMin slice'
                  style={{ marginHorizontal: 1 }}
                  color={"#000"}
                  width={"100%"}
                  height={"100%"}
                  uri={
                    "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735137648/svgviewer-output_27_i5sweu.svg"
                 
                  }
                ></SvgUri>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.avatarView]}>
            <Text>UID</Text>
            <TouchableOpacity style={styles.changeStyle} onPress={() => {}}>
              <Text style={styles.name}>{global.user_info?.user?._id}</Text>
              <TouchableOpacity
                onPress={() => {
                  setIsToast(true),
                  setTimeout(() => {
                    setIsToast(false)
                  }, 3000);
                 }}
              >

              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <View style={styles.verticleLine} />
          <Text style={styles.securityText}>Security Information</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("LoginPassword");
          }}
          style={[styles.avatarView, styles.settings]}
        >
          <Text style={styles.passwordText}>Login Password</Text>
          <View style={styles.changeStyle} onPress={() => {}}>
            <Text>Edit</Text>
            <View style={{ width: 25, height: 25 }}>
              <SvgUri
              preserveAspectRatio='xMinYMin slice'
                style={{ marginHorizontal: 1 }}
                color={"#000"}
                width={"100%"}
                height={"100%"}
                uri={
                  "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735137648/svgviewer-output_27_i5sweu.svg"
                }
              ></SvgUri>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PhoneNumber");
          }}
          style={[styles.avatarView, styles.settings]}
        >
          <Text style={styles.passwordText}>Phone Number</Text>
          <View style={styles.changeStyle} onPress={() => {}}>
            <Text>Edit</Text>
            <View style={{ width: 25, height: 25 }}>
              <SvgUri
              preserveAspectRatio='xMinYMin slice'
                style={{ marginHorizontal: 1 }}
                color={"#000"}
                width={"100%"}
                height={"100%"}
                uri={
                  "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735137648/svgviewer-output_27_i5sweu.svg"
                }
              ></SvgUri>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.avatarView, styles.settings, { marginVertical: 5 }]}
        >
          <Text style={styles.passwordText}>Updated Version</Text>
          <View style={styles.changeStyle} onPress={() => {}}>
            <Text style={{ color: "#9e9ee0" }}>0.0.1</Text>
            <View style={{ width: 25, height: 25 }}>
              <SvgUri
              preserveAspectRatio='xMinYMin slice'
                style={{ marginHorizontal: 1 }}
                color={"#000"}
                width={"100%"}
                height={"100%"}
                uri={
                  "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735137648/svgviewer-output_27_i5sweu.svg"
                }
              ></SvgUri>
            </View>
          </View>
        </TouchableOpacity>
        {isToast && <CustomToast isToast={isToast} onRequestClose={()=>{setIsToast(false)}}/>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    marginBottom: Metrics.rfv(20),
    marginTop: Metrics.rfv(20),
  },

  backgroundContainer: {
    height: height * 0.25,
    position: "absolute",
    borderBottomLeftRadius: Metrics.rfv(30),
    borderBottomRightRadius: Metrics.rfv(30),
    backgroundColor: Colors.Primary_100,
    width: "100%",
    alignItems: "center",
  },
  card: {
    backgroundColor: Colors.white,
    padding: Metrics.rfv(20),
    borderRadius: Metrics.rfv(10),
    margin: 15,
    // marginBottom: Metrics.rfv(20),
  },
  cardTitle: {
    color: Colors.grey,
    fontSize: Metrics.rfv(17),
    fontFamily: Fonts.Roboto400,
  },
  safeBalanceText: {
    fontWeight: "900",
    color: Colors.black,
    fontSize: Metrics.rfv(19),
    fontFamily: Fonts.Roboto500,
  },
  estimatedRevenueContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: Metrics.rfv(8),
    borderBottomColor: Colors.grey,
  },
  estimatedRevenueText: {
    color: Colors.grey,
    fontSize: Metrics.rfv(15),
    fontFamily: Fonts.Roboto400,
  },
  estimatedRevenueAmount: {
    marginLeft: Metrics.rfv(10),
    fontWeight: "900",
    color: Colors.black,
    fontSize: Metrics.rfv(19),
  },
  dailyInterestText: {
    color: Colors.black,
    paddingTop: Metrics.rfv(10),
    fontSize: Metrics.rfv(15),
    fontFamily: Fonts.Roboto400,
  },
  safeView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalContainer: {
    backgroundColor: "transparent",
    justifyContent: "center",
    marginBottom: 20,
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    top: 0,
  },
  secureView: {
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Metrics.rfv(10),
  },
  paddingLeft5: {
    paddingLeft: Metrics.rfv(5),
    color: Colors.black,
    paddingVertical: Metrics.rfv(5),
    fontFamily: Fonts.Roboto400,
  },
  userIcon: {
    width: Metrics.rfv(55),
    height: Metrics.rfv(55),
    borderRadius: Metrics.rfv(100),
  },
  avatarView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width:"100%",
  },
  settings: {
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  changeStyle: {
    flexDirection: "row",
    alignItems: "center",
    // width:'40%',
    justifyContent: "flex-end",
  },
  name: {
    color: "#000",
    fontWeight: "500",
  },
  copyImg: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  securityText: {
    fontWeight: "600",
    fontSize: 15,

    marginHorizontal: 10,
  },
  passwordText: {
    fontSize: 14,
    fontWeight: "500",
    width: "50%",
  },
  verticleLine: {
    height: "100%",
    borderLeftWidth: 3,
    borderLeftColor: "#962f2a",
    // borderStyle:'dashed',
    marginLeft: 15,
    alignSelf: "flex-start",
  },
});

export default Setting;
