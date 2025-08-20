import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../../../Components/Button";
import Metrics from "../../../Helpers/Metrics";
import HeaderTitleComponent from "../../../Components/HeaderTitle";
import { useNavigation } from "@react-navigation/native";

const HistoryDetail = () => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  const navigation = useNavigation();
  const historyData = [
    {
      period: "3765764576456754",
      lastLogin: "2025-02-07 13:51:23",
      result: "succeed",
      amount: "+$0.99",
    },
    {
      period: "3765764576456754",
      lastLogin: "2025-02-07 13:51:23",
      result: "succeed",
      amount: "+$0.99",
    },
  ];

  const render_details = () => {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Details</Text>
        <View style={styles.rowStyle}>
          <Text style={styles.rowTitle}>Order</Text>
          <Text style={styles.rowInfo}>72672676726726</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.rowTitle}>Period</Text>
          <Text style={styles.rowInfo}>72672676726726</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.rowTitle}>Purchase amount</Text>
          <Text style={styles.rowInfo}>$1.09</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.rowTitle}>Quantity</Text>
          <Text style={styles.rowInfo}>2</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.rowTitle}>Amount after tax</Text>
          <Text style={styles.rowInfo}>$2</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.rowTitle}>Tax</Text>
          <Text style={styles.rowInfo}>$6</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.rowTitle}>Result</Text>
          <Text style={styles.rowInfo}>3 Red Big</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.rowTitle}>Select</Text>
          <Text style={styles.rowInfo}>Red</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.rowTitle}>Status</Text>
          <Text style={styles.rowInfo}>Succeed</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.rowTitle}>Win/Lose</Text>
          <Text style={styles.rowInfo}>$9.09</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.rowTitle}>Order time</Text>
          <Text style={styles.rowInfo}>24-05-09</Text>
        </View>
      </View>
    );
  };

  const History = ({ item, index }: ItemProps) => (
    <View style={{marginTop:Metrics.rfv(5)}}>
      <TouchableOpacity
        onPress={() => {
          setDetailOpen(!detailOpen);
          setSelectedIndex(index)
          console.log('-=-=-=-=-=-setSelectedItem=-=-=-', item);
          
        }}
        style={styles.historyView}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.bgContainer} />
          <View style={styles.titleView}>
            <Text style={styles.periodView}>{item.period}</Text>
            <Text style={styles.lastLogin}>{item.lastLogin}</Text>
          </View>
        </View>

        <View style={styles.historyData}>
          <Text style={styles.result}>{item.result}</Text>
          <Text style={styles.amount}>{item.amount}</Text>
        </View>
      </TouchableOpacity>
      {detailOpen && selectedIndex===index && render_details()}
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderTitleComponent goBack={()=>{navigation.goBack()}} title={"WinGo"} />
      <FlatList
        style={styles.listView}
        data={historyData}
        renderItem={({ item, index }) => <History item={item} index={index} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listView:{
    padding:Metrics.rfv(10)
  },
  historyDataView: {
    backgroundColor: "#fff",
    marginVertical: Metrics.rfv(10),
  },
  detailButtonView: {
    backgroundColor: "transparent",
    alignSelf: "flex-end",
    paddingVertical: Metrics.rfv(5),
    paddingLeft: Metrics.rfv(8),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#962f2a",
    marginRight: Metrics.rfv(10),
    marginTop: Metrics.rfv(15),
    flexDirection: "row",
    alignItems: "center",
  },
  detailButtonTitle: {
    color: "#962f2a",
    fontWeight: "500",
    fontSize: 14,
  },
  historyView: {
    // margin: Metrics.rfv(15),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginVertical: Metrics.rfv(10),
    backgroundColor: "#fff",
    padding: Metrics.rfv(10),
    borderRadius:8
  },
  historyData: {
    alignItems: "flex-end",
  },
  result: {
    borderColor: "#18B660",
    borderWidth: 1,
    borderRadius: Metrics.rfv(8),
    paddingHorizontal: Metrics.rfv(10),
    paddingVertical: Metrics.rfv(4),
    color: "#18B660",
    fontSize: Metrics.rfv(10),
  },
  amount: {
    fontSize: Metrics.rfv(12),
    color: "#18B660",
    fontWeight: "700",
  },
  bgContainer: {
    backgroundColor: "#962f2a",
    width: 30,
    height: 30,
    borderRadius: 8,
  },
  titleView: {
    marginLeft: Metrics.rfv(10),
  },
  periodView: {
    fontSize: Metrics.rfv(12),
    color: "#000",
    fontWeight: "500",
  },
  lastLogin: {
    fontSize: Metrics.rfv(10),
    color: "#768096",
    fontWeight: "500",
  },
  title: {
    color: "#000",
    fontSize: Metrics.rfv(15),
    fontWeight: "600",

  },
  mainContainer: {
    paddingHorizontal: Metrics.rfv(10),
    backgroundColor:"#fff"
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
    width:"100%",
    justifyContent:"space-between",
    marginVertical:Metrics.rfv(5),
    backgroundColor:"#F6F6F6"
  },
  rowTitle:{
    color:"#1E2637",
    fontSize:Metrics.rfv(12),
    fontWeight:"500"
  },
  rowInfo:{
    color:"#768096",
    fontSize:Metrics.rfv(12),
    fontWeight:"500"
  }
});

export default HistoryDetail;
