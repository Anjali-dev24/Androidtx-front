import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import PageWrapperView from "../../Components/PageWrapperView";
import Metrics from "../../Helpers/Metrics";
import Toast from "react-native-simple-toast";
import { Colors } from "../../Helpers/Colors";
import { appHitSlop } from "../../Helpers/Thems";
import Sheet from "../../Components/Sheet";
// import FilterBottomSheet from './FilterBottomSheet';
import { Fonts, Payment_Type, WithDraw_STATUS } from "../../constant/data";
import Ionicons from "react-native-vector-icons/Ionicons";
import Svg, { Path, Rect, SvgUri } from "react-native-svg";
import Clipboard from "@react-native-clipboard/clipboard";
import { useTranslation } from "react-i18next";
import FastImage from "react-native-fast-image";
import CustomToast from "../../Components/CustomToast";
import { get_deposit_history } from "../../APIs/commonAPIsStructure";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
const DepositHistory = ({ navigation }) => {
  const { t } = useTranslation();
  const [isToast, setIsToast] = useState(false);
  const bottomSheetRef = useRef();  
  const [historyData, setHistoryData] = useState();
  

  const deposit_history = async () => {
    try {
      const token = await AsyncStorage.getItem("userInfo");
      let parseToken = JSON.parse(token);
      console.log("-=-=-=-=-parseToken-=-=-=-", parseToken);
      const history = await get_deposit_history(
        parseToken?.token,
      );
      console.log('-=-=-=--history=-=-=-history=-=-=-1212=-=-=-', history?.data?.deposits);
      setHistoryData(history?.data?.deposits)
    } catch (error) {
      console.log("-=-=-=-err-=-=-=-", error);
    }
  };

  useEffect(() => {
    deposit_history();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            ...styles.text,
            fontWeight: "600",
            color: Colors.black,
          }}
        >
          {t("historyScreens.withdrawScreen.orderId")}{" "}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ width: 15, height: 15, marginRight: 5 }}
            onPress={() => {
              setIsToast(true),
                setTimeout(() => {
                  setIsToast(false);
                }, 3000);
            }}
          >
            <SvgUri
            preserveAspectRatio='xMinYMin slice'
              style={{ marginHorizontal: 1 }}
              color={"#C2C2C2"}
              width={"100%"}
              height={"100%"}
              uri={
                "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123453/svgviewer-output_25_eyiofv.svg"
              }
            ></SvgUri>
          </TouchableOpacity>
          <Text style={styles.text}>{`${item.orderId.substring(0,10)}***${item.orderId.substr(item.orderId.length-10)}`}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: Metrics.rfv(3),
        }}
      >
        <Text
          style={{
            ...styles.text,
            fontWeight: "600",
            color: Colors.black,
          }}
        >
          {t("historyScreens.withdrawScreen.time")}
        </Text>
        <Text style={styles.text}>{moment(item.createdAt).format("hh:mm:a")}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: Metrics.rfv(3),
        }}
      >
        <Text
          style={{
            ...styles.text,
            fontWeight: "600",
            color: Colors.black,
          }}
        >
          {t("historyScreens.withdrawScreen.type")}
        </Text>
        <Text style={styles.text}>{item.type}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: Metrics.rfv(3),
        }}
      >
        <Text
          style={{
            ...styles.text,
            fontWeight: "600",
            color: Colors.black,
          }}
        >
         {t("historyScreens.withdrawScreen.amount")}{" "}
        </Text>
        <Text
          style={{
            fontSize: Metrics.rfv(16),
            fontWeight: "bold",
            color:
              item.status === "Rejected"
                ? Colors.Primary_100
                : item.status === "Approved"
                ? "green"
                : Colors.secoundary_100,
            textAlign: "center", // Center-align text horizontally
            textDecorationLine:
              item.status === "Rejected" ? "line-through" : "none", // Apply strikethrough if status is 'Failed'
          }}
        >
          {item.amount}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingTop: Metrics.rfv(3),
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            ...styles.text,
            fontWeight: "600",
            color: Colors.black,
          }}
        >
          {t("historyScreens.withdrawScreen.remark")}
        </Text>
        <Text style={styles.text}>{item.remark}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: Metrics.rfv(3),
        }}
      >
        <Text
          style={{
            ...styles.text,
            fontWeight: "600",
            color: Colors.black,
          }}
        >
         {t("historyScreens.withdrawScreen.status")}{" "}
        </Text>
        <Text
          style={{
            fontSize: Metrics.rfv(15),
            fontWeight: "bold",
            color:
              item.status === "Rejected"
                ? Colors.Primary_100
                : item.status === "Approved"
                ? "green"
                : Colors.secoundary_100,
          }}
        >
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <PageWrapperView statusBar={{ background: "#a32324" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Svg
              color={"#fff"}
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="text-white w-6 h-6"
              height="25em"
              width="25em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                fill-rule="evenodd"
                d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                clip-rule="evenodd"
              ></Path>
            </Svg>
          </TouchableOpacity>
          <Text style={styles.headerText}>{t("historyScreens.depositScreen.deposit")}</Text>
          <View />
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <View style={{ width: 20, height: 20, marginLeftj: 5 }}>
              <SvgUri
                preserveAspectRatio='xMinYMin slice'
                style={{ marginHorizontal: 1 }}
                color={"#C2C2C2"}
                width={"100%"}
                height={"100%"}
                uri={
                  "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123453/svgviewer-output_24_m2g4vk.svg"
                }
              ></SvgUri>
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder={t("historyScreens.withdrawScreen.searchFilter")}
              placeholderTextColor={Colors.grey}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              // bottomSheetRef.current.open();
            }}
            hitSlop={appHitSlop(10, 10, 10, 10)}
          >
            <FastImage
              source={require("../../Assets/filter.png")}
              style={styles.filterIcon}
            />
          </TouchableOpacity>
        </View>
        {/* <View style={{flexGrow:1}}> */}
        <FlatList
          data={historyData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        {/* </View> */}
        {isToast && <CustomToast isToast={isToast} onRequestClose={()=>{setIsToast(false)}}/>}
      </View>
      {/* <FilterBottomSheet
        bottomSheetRef={bottomSheetRef}
        STATUS={WithDraw_STATUS}
        Type={Payment_Type}
      /> */}
    </PageWrapperView>
  );
};

export const WithDraw_data = [
  {
    id: "1",
    orderId: "ORD12345678901234567890",
    time: "2024-08-30 12:30:00",
    type: "Bank Transfer",
    amount: "$100",
    remark: "Success",
    status: "Completed",
  },
  {
    id: "2",
    orderId: "ORD23456789012345678901",
    time: "2024-08-30 14:15:00",
    type: "PayPal",
    amount: "$50",
    remark: "Pending",
    status: "In Progress",
  },
  {
    id: "3",
    orderId: "ORD34567890123456789012",
    time: "2024-08-30 16:45:00",
    type: "Crypto Wallet",
    amount: "$150",
    remark: "Rejected",
    status: "Rejected",
  },
  {
    id: "4",
    orderId: "ORD45678901234567890123",
    time: "2024-08-30 18:20:00",
    type: "Bank Transfer",
    amount: "$200",
    remark: "Success",
    status: "Completed",
  },
  {
    id: "5",
    orderId: "ORD56789012345678901234", // Ensured uniqueness
    time: "2024-08-30 18:20:00",
    type: "Bank Transfer",
    amount: "$200",
    remark: "Success",
    status: "Completed",
  },
  {
    id: "6",
    orderId: "ORD67890123456789012345", // Ensured uniqueness
    time: "2024-08-30 18:20:00",
    type: "Bank Transfer",
    amount: "$200",
    remark: "Success",
    status: "Completed",
  },
  {
    id: "7",
    orderId: "ORD78901234567890123456", // Ensured uniqueness
    time: "2024-08-30 ß18:20:00",
    type: "Bank Transfer",
    amount: "$200",
    remark: "Success",
    status: "Completed",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
  },
  title: {
    fontSize: Metrics.rfv(24),
    fontWeight: "bold",
    marginBottom: Metrics.rfv(10),
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: Metrics.rfv(15),
    marginHorizontal: Metrics.rfv(10),
    marginBottom: Metrics.rfv(8),
    borderRadius: Metrics.rfv(8),
    borderWidth: Metrics.rfv(0.5),
    borderColor: "#000",
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: Metrics.rfv(10),
    backgroundColor: "#efefef",
    width: "95%",
  },
  searchBox: {
    borderWidth: 0.5,
    borderColor: "grey",
    borderWidth: Metrics.rfv(0.5),
    borderColor: Colors.black,
    width: "85%",
    borderRadius: Metrics.rfv(5),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginRight: Metrics.rfv(10),
    paddingLeft: 5,
  },
  searchIcon: {
    marginTop: -7,
    marginLeft: Metrics.rfv(5),
  },
  searchInput: {
    width: "90%",
    fontSize: Metrics.rfv(15),
  },
  filterIcon: {
    width: Metrics.rfv(25),
    height: Metrics.rfv(25),
    marginLeft: Metrics.rfv(15),
  },
  header: {
    backgroundColor: "#962f2a",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Metrics.rfv(6),
    alignItems: "center",
  },
  headerText: {
    fontSize: Metrics.rfv(20),
    color: "#fff",
    fontWeight: "bold",
    fontFamily: Fonts.Roboto400,
    textAlign: "center",
    // width: '90%',
    paddingBottom: Metrics.rfv(8),
    // paddingTop: Metrics.rfv(20),
  },
  text: {
    fontSize: Metrics.rfv(13),
    color: Colors.secoundary_100,
    fontFamily: Fonts.Roboto400,
  },
});

export default DepositHistory;
