import React, { useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import Images from "../../constant/images/Images";
import { useTranslation } from "react-i18next";
import Svg, { Path, SvgUri } from "react-native-svg";
import Metrics from "../../Helpers/Metrics";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FastImage from "react-native-fast-image";
import AppTitle from "../../Components/AppTitle";

const SplashScreen = () => {
  const { t } = useTranslation();

  return (
    <LinearGradient
      colors={["#ad2928", "#cd413b", "#e8554b"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.mainContainer}
    >
      <View style={styles.backgroundimg}>
        <View
          style={{
            position: "absolute",
            transform: [{ rotate: "35deg" }],
            opacity: 0.13,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={styles.firstImg}>
              <FastImage
                style={[styles.lotteryStyles]}
                source={{
                  uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907875/lottery_aj0xzv.png",
                  priority: FastImage.priority.low,
                }}
              />
            </View>
            <View
              style={[styles.firstImg, { marginHorizontal: Metrics.rfv(10) }]}
            >
              <FastImage
                style={[styles.lotteryStyles]}
                source={{
                  uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907875/lottery_aj0xzv.png",
                  priority: FastImage.priority.low,
                }}
              />
            </View>
            <View style={[styles.firstImg]}>
              <FastImage
                style={[styles.lotteryStyles]}
                source={{
                  uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110088/gamecategory_20240311141522uvco_iaj1qj.png",
                  priority: FastImage.priority.low,
                }}
              />
            </View>
            <View
              style={[styles.firstImg, { marginHorizontal: Metrics.rfv(10) }]}
            >
              <FastImage
                style={[styles.lotteryStyles]}
                source={{
                  uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907875/lottery_aj0xzv.png",
                  priority: FastImage.priority.low,
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: Metrics.rfv(15),
            }}
          >
            <View
              style={[styles.firstImg, { marginHorizontal: Metrics.rfv(10) }]}
            >
              <FastImage
                style={[styles.lotteryStyles]}
                source={{
                  uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907875/lottery_aj0xzv.png",
                  priority: FastImage.priority.low,
                }}
              />
            </View>
            <View style={[styles.firstImg]}>
              <FastImage
                style={[styles.lotteryStyles]}
                source={{
                  uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110086/gamecategory_202403111415086ujt_jg1shp.png",
                  priority: FastImage.priority.low,
                }}
              />
            </View>
            <View
              style={[styles.firstImg, { marginHorizontal: Metrics.rfv(10) }]}
            >
              <FastImage
                style={[styles.lotteryStyles]}
                source={{
                  uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110079/start-4688a3c2_sw94kf.png",
                  priority: FastImage.priority.low,
                }}
              />
            </View>
            <View style={[styles.firstImg]}>
              <FastImage
                style={[styles.lotteryStyles]}
                source={{
                  uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907875/lottery_aj0xzv.png",
                  priority: FastImage.priority.low,
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={[styles.firstImg, { marginHorizontal: Metrics.rfv(10) }]}
            >
              <FastImage
                style={[styles.lotteryStyles]}
                source={{
                  uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907875/lottery_aj0xzv.png",
                  priority: FastImage.priority.low,
                }}
              />
            </View>
            <View style={[styles.firstImg]}>
              <FastImage
                style={[styles.lotteryStyles]}
                source={{
                  uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907875/lottery_aj0xzv.png",
                  priority: FastImage.priority.low,
                }}
              />
            </View>
            <View
              style={[styles.firstImg, { marginHorizontal: Metrics.rfv(10) }]}
            >
              <FastImage
                style={[styles.lotteryStyles]}
                source={{
                  uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110078/vendorlogo_20231026192641c7m5_jwwa6v.png",
                  priority: FastImage.priority.low,
                }}
              />
            </View>
            <View style={[styles.firstImg]}>
              <FastImage
                style={[styles.lotteryStyles]}
                source={{
                  uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907875/lottery_aj0xzv.png",
                  priority: FastImage.priority.low,
                }}
              />
            </View>
          </View>
        </View>
        <AppTitle titleContainer={styles.titleContainer} />

        <View style={styles.bottomView}>
          <View
            style={styles.instrusctionsView}
          >
            <Text style={styles.eighteenPlus}>18+</Text>
          </View>
          <Text style={styles.playText}>Play{'\n'}Responsibly</Text>
        </View>
        <View style={styles.trapezoid}>
          <View style={styles.bottomSVGView}>
            <View style={{ width: 25, height: 25 }}>
              <SvgUri
                preserveAspectRatio="xMinYMin slice"
                style={{ marginHorizontal: 1 }}
                color={"#000"}
                width={"100%"}
                height={"100%"}
                uri={
                  "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123449/svgviewer-output_7_yyzzrm.svg"
                }
              ></SvgUri>
            </View>
            <Text style={styles.secureText}> 100% {t("safe")}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#962f2a",
  },
  backgroundimg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "rgba(0,0,0,0.7)"\
  },
  title: {
    color: "#fff",
    fontSize: 55,
    fontWeight: "bold",
  },
  xView: {
    color: "#962f2a",
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: "#fff",
    // height:60,
    // width:60,
    borderRadius: 60,
    textAlign: "center",
    paddingHorizontal: 10,
    // marginTop: Metrics.rfv(20),
    marginBottom: 10,
    // height:60,
    //
  },
  titleContainer: {
    flex: 0.5,
  },
  lotteryStyles: {
    width: 130,
    height: 130,
    // opacity: 0.2,
    alignSelf: "center",
    margin: 15,

    // borderRadius: 45 / 2,
  },
  cardsView: {
    width: 180,
    height: 180,
    position: "absolute",
    top: 0,
    left: 0,
  },
  bottomView: {
    flexDirection:"row",
    alignItems: "center",
    // width: "100%",
    marginTop: "auto",
    flex: 0.2,
    // alignItems:"center",
    // alignSelf:"center"
    // marginRight:Metrics.rfv(45)
  },
  playImg: {
    width: 100,
    height: 100,
  },
  restrictionImg: {
    width: 70,
    height: 70,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  trapezoid: {
    width: 420,
    // height: 0,
    borderBottomWidth: 60,
    borderBottomColor: "#fff",
    borderLeftWidth: 80,
    borderLeftColor: "transparent",
    borderRightWidth: 80,
    borderRightColor: "transparent",
    borderStyle: "solid",
    alignItems: "center",
  },
  bottomSVGView: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    top: Metrics.rfv(20),
    alignItems: "center",
    // paddingBottom:5,
  },
  secureText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",

    // position:"absolute"
  },
  instrusctions: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },
  textView: {
    padding: 10,
    borderColor: "#fff",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  secTextView: {
    padding: 10,
    borderColor: "#fff",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 30,
  },
  firstImg: {
    backgroundColor: "#fff",
    height: 150,
    width: 250,
    borderRadius: Metrics.rfv(10),

    alignItems: "center",
    justifyContent: "center",
  },
  eighteenPlus:{
    textAlign:"center",
    color:"#fff",
    fontWeight:"800",
    fontSize:Metrics.rfv(12)
  },
  playText:{
    textAlign:"left",
    color:"#fff",
    fontWeight:"400",
    fontSize:Metrics.rfv(20),
    marginLeft:Metrics.rfv(10)
  },
  instrusctionsView:{
    width: 40,
    height: 40,
    borderColor: "#fff",
    borderWidth: 3,
    borderRadius:40 / 2,
    alignItems:"center",
    justifyContent:"center"
  }
});

export default SplashScreen;
