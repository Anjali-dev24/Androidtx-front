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
import React, { useRef, useState } from "react";
import PageWrapperView from "../../Components/PageWrapperView";
import Metrics from "../../Helpers/Metrics";
import { Colors } from "../../Helpers/Colors";
import { appHitSlop } from "../../Helpers/Thems";
import Toast from "react-native-simple-toast";
import Sheet from "../../Components/Sheet";
// import FilterBottomSheet from './FilterBottomSheet';
import { Fonts, Payment_Type, WithDraw_STATUS } from "../../constant/data";
import Ionicons from "react-native-vector-icons/Ionicons";
import Svg, { Path, Rect, SvgUri } from "react-native-svg";
import Clipboard from "@react-native-clipboard/clipboard";
import { useTranslation } from "react-i18next";
import FastImage from "react-native-fast-image";
const GameHistory = ({ navigation }) => {
  const [isToast, setIsToast] = useState(false);
const { t } = useTranslation();
  const bottomSheetRef = useRef();

  const customToast = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isToast}
        onRequestClose={() => {
          setIsToast(false);
          // Prevent the modal from closing when pressing back button
        }}
      >
        <View style={styles.modalContainer}>
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              alignSelf: "center",
              padding: Metrics.rfv(15),
              borderRadius: 10,
            }}
          >
            <FastImage
              style={{ width: 30, height: 30, alignSelf: "center" }}
              source={{
                uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1736847312/toastTick_eiwrtj.png",
              priority: FastImage.priority.low,
              }}
            />
            <Text style={{ textAlign: "center", color: "#fff" }}>Copied</Text>
          </View>
        </View>
      </Modal>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.userInfoCont}>
        <View>
          <Text style={styles.userName}>UserName</Text>
          <Text style={styles.time}>UserName</Text>
        </View>
        <View>
          <Text style={styles.winOrLose}>Win</Text>
          <Text style={styles.amount}>UserName</Text>
        </View>
      </View>
      <View style={styles.border} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            ...styles.text,
            fontWeight: "600",
            color: Colors.black,
          }}
        >
          {t("historyScreens.gameHistoryScreen.orderId")}{" "}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ width: 15, height: 15, marginRight: 5 }}
            onPress={() => {
              setIsToast(true);
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
          <Text style={styles.text}>{item.orderId}</Text>
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
          {t("historyScreens.gameHistoryScreen.period")}
        </Text>
        <Text style={styles.text}>{item.period}</Text>
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
          {t("historyScreens.gameHistoryScreen.select")}
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
          {t("historyScreens.gameHistoryScreen.quantity")}{" "}
        </Text>
        <Text
          style={{
            fontSize: Metrics.rfv(16),
            fontWeight: "bold",
            color:
              item.status === "Rejected"
                ? Colors.Primary_100
                : item.status === "Completed"
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
          {t("historyScreens.gameHistoryScreen.totalAmount")}
        </Text>
        <Text style={styles.text}>{item.total}</Text>
      </View>
      <View style={[styles.border, { borderStyle: "dashed" }]} />
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
          {t("historyScreens.gameHistoryScreen.handlingFee")}
        </Text>
        <Text
          style={{
            fontSize: Metrics.rfv(16),
            fontWeight: "bold",
            color:
              item.status === "Rejected"
                ? Colors.Primary_100
                : item.status === "Completed"
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
          {t("historyScreens.gameHistoryScreen.actualAmt")}
        </Text>
        <Text style={styles.text}>{item.total}</Text>
      </View>
      <View style={[styles.border, { borderStyle: "dashed" }]} />
      <View style={styles.badgeContainer}>
        <View style={styles.badgeView}>
          <View style={{}}>
            <Text style={styles.profitLoss}>{t("historyScreens.gameHistoryScreen.profit/loss")}</Text>
            <Text style={styles.ProfitLossAmount}>+$ 100</Text>
          </View>
          <View style={{}}>
            <Text style={[styles.profitLoss, { textAlign: "right" }]}>
            {t("historyScreens.gameHistoryScreen.result")}
            </Text>
            <Text style={[styles.ProfitLossAmount, { textAlign: "right" }]}>
              +$ 100
            </Text>
          </View>
        </View>

        <View style={styles.leftBadge} />
        <View style={styles.rightBadge} />
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
          <Text style={styles.headerText}>{t("historyScreens.gameHistoryScreen.gameHistory")}</Text>
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
              placeholder={t("historyScreens.gameHistoryScreen.searchFilter")}
              placeholderTextColor={Colors.grey}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              bottomSheetRef.current.open();
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
          data={WithDraw_data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        {/* </View> */}
        {isToast &&
          customToast()}
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
  modalContainer: {
    backgroundColor: "transparent",
    justifyContent: "center",
    marginBottom: 20,
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    top: 0,
  },
  userInfoCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: Metrics.rfv(24),
    fontWeight: "bold",
    marginBottom: Metrics.rfv(10),
  },
  itemContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: Metrics.rfv(15),
    marginHorizontal: Metrics.rfv(10),
    marginBottom: Metrics.rfv(8),
    borderRadius: Metrics.rfv(8),
    borderWidth: Metrics.rfv(0.5),
    borderColor: "#000",
    paddingVertical:Metrics.rfv(5)
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
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#A32324",
  },
  time: {
    color: Colors.grey,
    fontSize: 16,
  },
  winOrLose: {
    fontSize: 18,
    color: "#16A34A",
    textAlign: "right",
  },
  amount: {
    fontSize: 18,
    color: "#16A34A",
    textAlign: "right",
  },
  border: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
    marginVertical: 7,
  },
  leftBadge: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    borderTopColor: "transparent",
    borderTopWidth: 30,
    borderLeftWidth: 26,
    borderLeftColor: "#fff",
    borderBottomWidth: 30,
    borderBottomColor: "transparent",
  },
  rightBadge: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 0,
    height: 0,
    borderTopColor: "transparent",
    borderTopWidth: 30,
    borderRightWidth: 26,
    borderRightColor: "#fff",
    borderBottomWidth: 30,
    borderBottomColor: "transparent",
  },
  badgeContainer: {
    width: "100%",
    height: 60,
    backgroundColor: "#A32324",
    // marginVertical: 15,
  },
  badgeView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Metrics.rfv(30),
    width: "90%",
    justifyContent: "space-between",
    alignSelf: "center",
    paddingTop: 7,
  },
  profitLoss: {
    color: "#fff",
    fontSize: 18,

    // fontWeight:"500"
  },
  ProfitLossAmount: {
    color: "#fff",
    fontSize: 16,
  },
});

export default GameHistory;
