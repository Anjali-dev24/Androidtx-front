import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import PageWrapperView from "../../Components/PageWrapperView";
// import Header from '../../Components/Header';
import { Colors } from "../../Helpers/Colors";
import Metrics from "../../Helpers/Metrics";
import { News_array } from "./wingo/data";
import FontAwesome5 from "react-native-vector-icons/FontAwesome";
import { Fonts } from "../../constant/data";
import Images from "../../constant/images/Images";
import Svg, { Path, SvgUri } from "react-native-svg";
import HeaderTitleComponent from "../../Components/HeaderTitle";
import FastImage from "react-native-fast-image";
import io from "socket.io-client";

import { connectSocket, listenForNotifications, listenForWalletUpdates } from "../../Socket/socketInit";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Notification = ({ navigation }) => {  
  const [loading, setLoading] = useState(false);

  // const sendMessage = async () => {
  //   const userId = await AsyncStorage.getItem("userInfo");
  //   let parseId = JSON.parse(userId);
  //   return parseId
  // };

  useEffect(() => {
    setLoading(true)
    console.log('-=-=-=-=-walletData-=-111=-=-', );
    AsyncStorage.getItem("userInfo")
      .then((res) => {
        console.log('-=-=-=-=-walletData-=222-=-=-', );
        let parseData = JSON.parse(res);
        connectSocket(parseData?.user?._id);
        listenForNotifications((notification)=>{
          console.log('-=-=-=-=-walletData-=-333=-=-', notification);
          // setUserData(walletData)
          setLoading(false)
        })
      })
      .catch((err) => {
        console.log("-=-=-=-socket-=-=-err-=-=-", err);
      });
  }, []);

  

  // const SOCKET_URL = "wss://9tx.online";

  const renderItem = ({ item }) => (
    // <View style={styles.card}>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginRight: Metrics.rfv(10),
        width: "100%",
        backgroundColor: "#fff",
        padding: 10,
        marginVertical: 10,
        borderColor: Colors.grey,
        borderRadius: 8,
        justifyContent: "space-between",
      }}
    >
      <View style={styles.notificationView}>
        <FastImage
          style={styles.bellIcon}
          source={{
            uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907871/bell_veqrqg.png",
            priority: FastImage.priority.low,
          }}
        />
      </View>

      {/* <Text style={styles.cardHeader}>{item.header}</Text> */}
      {/* </View> */}
      <View style={{ width: "80%" }}>
        <Text numberOfLines={2} style={styles.cardMessage}>
          {item.message}
        </Text>
        <Text style={styles.cardDate}>{item.date}</Text>
      </View>
      <TouchableOpacity style={{ width: 25, height: 25 }}>
        <SvgUri
          preserveAspectRatio="xMinYMin slice"
          style={{ marginHorizontal: 1 }}
          color={"#000"}
          width={"100%"}
          height={"100%"}
          uri={
            "https://res.cloudinary.com/dwtdpelrp/image/upload/v1736003386/svgviewer-output_u19eun.svg"
          }
        ></SvgUri>
      </TouchableOpacity>
      {/* <Svg
      color={'#000'}
        stroke="currentColor"
        fill="none"
        stroke-width="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
        height="30em"
        width="30em"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 5l7 7-7 7"></Path>
      </Svg> */}
    </View>
  );

  return (
    <PageWrapperView statusBar={{ background: Colors.white }}>
      <View style={styles.container}>
        <HeaderTitleComponent
          goBack={() => navigation.goBack()}
          mainStyle={styles.mainHeaderStyle}
          title="Notifications"
          style={{paddingBottom:8}}
        />
        <View style={{ marginBottom: Metrics.rfv(100) }}>
          {/* <Button
            title="send"
            onPress={ () => {
              const wallet =  listenForWalletUpdates();
              console.log('-=-=-=-=-=-=-wallet-=-=-=-=-', wallet);
              
              return wallet
            }}
          /> */}
          <FlatList
            data={News_array}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </View>
    </PageWrapperView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: Metrics.rfv(10),
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.rfv(10),
    padding: Metrics.rfv(15),
    paddingVertical: Metrics.rfv(20),
    marginBottom: Metrics.rfv(10),
  },
  notificationView: {
    //  backgroundColor:Colors.grey,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25 / 2,
  },
  bellIcon: {
    width: "100%",
    height: "100%",
  },
  cardHeader: {
    fontSize: Metrics.rfv(17),
    color: Colors.black,
    marginBottom: Metrics.rfv(5),
    marginLeft: Metrics.rfv(10),
    fontFamily: Fonts.Roboto400,
  },
  cardMessage: {
    fontSize: Metrics.rfv(12),
    color: Colors.secoundary_200,
    fontFamily: Fonts.Roboto400,
    marginVertical: Metrics.rfv(10),
    // width:330,
    marginLeft: 10,
  },
  cardDate: {
    fontSize: Metrics.rfv(12),
    color: Colors.textMuted,
    textAlign: "right",
    color: Colors.secoundary_100,
    fontFamily: Fonts.Roboto400,
  },
});
