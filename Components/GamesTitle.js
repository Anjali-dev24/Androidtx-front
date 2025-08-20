import React from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Metrics from "../Helpers/Metrics";
import { SvgUri } from "react-native-svg";
import Button from "../Components/Button";
import FastImage from "react-native-fast-image";
import { Marquee } from "@animatereactnative/marquee";
import { Colors } from "../Helpers/Colors";
import { notifications } from "../constant/data";

const { width, height } = Dimensions.get("window");

const Item = ({ item }: ItemProps) => (
  <TouchableOpacity
    onPress={(item, index) => {}}
    style={styles.selectedLanguage}
  >
    <Text style={styles.selectedText}>{item.title}</Text>
  </TouchableOpacity>
);
const GamesTitle = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.backgroundContainer}></View>

      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={props.onBackPress}
          style={{ width: 25, height: 25 }}
        >
          <SvgUri
            preserveAspectRatio="xMinYMin slice"
            style={{ marginHorizontal: 1 }}
            color={"#fff"}
            width={"100%"}
            height={"100%"}
            uri={
              "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123454/svgviewer-output_hqtslg.svg"
            }
          ></SvgUri>
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.nineText}>9T</Text>
          <View style={styles.xView}>
            <Text style={styles.xText}>X</Text>
          </View>
        </View>
        <View />
      </View>
      <View style={styles.walletContainer}>
        <Text style={styles.balanceAmt}>$ user balance</Text>
        <Text style={styles.walletBal}>wallet balance</Text>
        <View style={styles.transButtons}>
          <Button
            buttonStyle={styles.withdrawButton}
            full={false}
            buttonTitleStyle={styles.withdrawTitle}
            buttonTitle="Withdraw"
            onButtonPress={() => {
              // navigation.navigate('Register');
            }}
          />
          <Button
            buttonStyle={styles.depositButton}
            full={false}
            buttonTitleStyle={styles.depositTitle}
            buttonTitle="Deposit"
            onButtonPress={()=>{
              props.onDepositPress
             }
            }
          />
        </View>
      </View>
      <View style={styles.notificationView}>
        <View style={styles.imgView}>
          <FastImage
            tintColor={"#962f2a"}
            resizeMode="contain"
            style={styles.speakerImg}
            source={{
              uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1738829365/speaker_hng9rl.png",
              priority: FastImage.priority.low,
            }}
          />
        </View>
        <Marquee
          direction="vertical"
          style={{ width: "60%", height: 40 }}
          speed={0.3}
        >
          <FlatList
            data={notifications}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.id}
          />
        </Marquee>
        <Button
          buttonStyle={styles.detailButton}
          full={false}
          buttonTitleStyle={styles.depositTitle}
          buttonTitle="Detail"
          onButtonPress={()=>{
            props.onDetailPress
           }
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  backgroundContainer: {
    height: height * 0.35,
    position: "absolute",
    borderBottomLeftRadius: Metrics.rfv(30),
    borderBottomRightRadius: Metrics.rfv(30),
    backgroundColor: "#962f2a",
    width: "100%",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: Metrics.rfv(20),
  },
  nineText: {
    fontSize: Metrics.rfv(30),
    color: "#fff",
    fontWeight: "bold",
  },
  xText: {
    fontSize: Metrics.rfv(25),
    color: "#a32324",
    fontWeight: "bold",
    marginTop: Metrics.rfv(-5),
  },
  xView: {
    backgroundColor: "#fff",
    width: Metrics.rfv(25),
    height: Metrics.rfv(25),
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Metrics.rfv(5),
  },
  walletContainer: {
    backgroundColor: Colors.white,
    paddingTop: Metrics.rfv(4),
    marginHorizontal: Metrics.rfv(10),
    borderRadius: 10,
  },
  balanceAmt: {
    textAlign: "center",
    fontSize: Metrics.rfv(20),
    fontWeight: "700",
  },
  walletBal: {
    textAlign: "center",
    fontSize: Metrics.rfv(17),
    fontWeight: "400",
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

  detailButton: {
    backgroundColor: "#962f2a",
    alignSelf: "center",
    paddingVertical: Metrics.rfv(5),
    paddingHorizontal: Metrics.rfv(20),
    borderRadius: Metrics.rfv(20),
  },
  depositButton: {
    backgroundColor: "#16A34A",
    alignSelf: "center",
    paddingVertical: Metrics.rfv(8),
    paddingHorizontal: Metrics.rfv(20),
    borderRadius: 8,
    // borderRadius: 8,
  },
  depositTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  transButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 10,
    marginTop: 5,
  },
  notificationView: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    // height: 50,
    paddingHorizontal: Metrics.rfv(3),
    margin: Metrics.rfv(15),
    alignSelf: "center",
    borderRadius: Metrics.rfv(30),
    justifyContent: "space-between",
  },
  imgView: {
    width: 30,
    height: 30,
  },
  speakerImg: {
    width: "100%",
    height: "100%",
  },
  selectedLanguage: {
    marginVertical: Metrics.rfv(10),
  },
  selectedText: {
    fontSize: Metrics.rfv(14),
    fontWeight: "600",
  },
});

export default GamesTitle;
