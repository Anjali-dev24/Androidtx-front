import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderTitleComponent from "../../Components/HeaderTitle";
import Button from "../../Components/Button";
import { SvgUri } from "react-native-svg";
import { Colors } from "../../Helpers/Colors";
import { useRoute } from "@react-navigation/native";
import Metrics from "../../Helpers/Metrics";
import { cryptoCurrencies } from "../../constant/data";
import LinearGradient from "react-native-linear-gradient";

const Deposit = ({ navigation, route }) => {
  // const route = useRoute();
  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState("100");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const array = [
    {
      amount: "100",
    },
    {
      amount: "500",
    },
    {
      amount: "1,000",
    },
    {
      amount: "2,000",
    },
  ];

  return (
    <LinearGradient
      colors={["#962f2a", "#ba4940", "#d35c50"]}
      style={styles.container}
    >
      <HeaderTitleComponent
        style={{ paddingBottom: 10, paddingHorizontal: 5 }}
        wallet={false}
        onCurrencyClick={() => {
          setCurrencyModal(true);
        }}
        goBack={() => navigation.goBack()}
        title={"Deposit"}
      />
      <ScrollView style={{flexGrow:1}} >
        <View style={styles.mainContainer}>
        <Text style={styles.title}>Deposit</Text>
        <Text style={styles.deposit}>Single deposit amount</Text>
        <Text style={styles.amount}>$500 - $50,000</Text>
        <View style={styles.depositType}>
          <Text style={styles.depositTypeName}>₹</Text>
          <View style={styles.verticleLine} />
          <Text style={styles.selectedAmount}>{amount}</Text>
        </View>
        <View style={styles.availableAmount}>
          {array.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                setAmount(item.amount);
                setSelectedIndex(index);
              }}
              style={[
                styles.firstAmount,
                {
                  backgroundColor:
                    selectedIndex == index ? "#962f2a" : Colors.grey,
                },
              ]}
            >
              <Text style={styles.depositAmount}>₹ {item.amount}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {route.params.title !== "CryptoCurrency" && (
          <Button
            buttonTitleStyle={styles.buttonText}
            // disabled={!isValid}
            full={true}
            buttonTitle="Pay"
            buttonStyle={styles.ButtonView}
            onButtonPress={() => {
              navigation.navigate("Payment");
              // shareFeedback();
            }} // Use Formik's handleSubmit
          />
        )}
      </View>
      <View style={styles.instructionView}>
        <Text style={styles.rulesTitle}>Instructions for deposit</Text>
        <Text
          style={styles.rules}
        >{`\u2023 The account is only valid for a single deposit; please do not make any subsequent deposit to avaoid potential loss of funds.`}</Text>
     <Text
          style={styles.rules}
        >{`\u2023 Please ensure that the deposited amount matches the originally applied amount, as any discrepancy may result in a failed transaction or loss of funds.`}</Text>
        <Text
          style={styles.rules}
        >{`\u2023 You may pay through any app for the given UPI ID.`}</Text>
        <Text
          style={styles.rules}
        >{`\u2023 Complete the transaction in 5 mins or the money may LOST.`}</Text>
        <Text
          style={styles.rules}
        >{`\u2023 If, within 24 hours, 5 deposit attempts fail to complete a successful payment, your ID will be temporarily suspended for a 24-hour period.`}</Text>
        <Text
          style={styles.rules}
        >{`\u2023 Kindly note that we cannot be held responsible for any losses incurred if you did not adhere to the aforementioned guidelines.`}</Text>
      </View>
      </ScrollView>
      
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  maincontainer: {
    padding: 15,
  },
  deposit: {
    fontSize: 12,
    marginTop: 10,
  },
  amount: {
    fontSize: 14,
  },
  depositTypeName: {
    fontSize: 18,
    fontWeight: "900",
    textAlign: "left",
  },
  selectedAmount: {
    fontSize: 18,
    // fontWeight:"900",
    textAlign: "left",
    marginLeft: 10,
  },
  firstAmount: {
    padding: 10,
    marginVertical: 15,
    borderRadius: 8,
  },
  depositType: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  verticleLine: {
    height: 25,
    borderLeftWidth: 1,
    borderLeftColor: "#C2C2C2",
    // borderStyle:'dashed',
    marginLeft: 15,
    alignSelf: "flex-start",
  },
  availableAmount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  depositAmount: {
    color: Colors.white,
  },
  ButtonView: {
    backgroundColor: "#962f2a",
    borderRadius: 10,
    paddingVertical: 13,
    margin: 10,
    paddingHorizontal: 15,
    // marginTop: "auto",
    // marginBottom: Metrics.rfv(30),
    width: "25%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  input: {
    height: Metrics.rfv(50),
    borderColor: "#C2C2C2",
    borderWidth: 1,
    borderRadius: Metrics.rfv(10),
    marginBottom: Metrics.rfv(10),
    paddingHorizontal: Metrics.rfv(10),
    fontSize: Metrics.rfv(16),
  },
  selectedLanguage: {
    backgroundColor: "#fff",
    padding: 15,
    width: "47%",
    // height:200,
    margin: 5,
    borderRadius: 8,
    flexDirection: "row",
  },
  selectedText: {
    textAlign: "left",
    paddingRight: 15,
  },
  mainContainer: {
    padding: 15,
    backgroundColor: "#dedee0",
    margin: 15,
    borderRadius: 8,
  },
  instructionView: {
    padding: 15,
    backgroundColor: "#dedee0",
    margin: 15,
    borderRadius: 8,
  },
  rules: {
    color: Colors.black,
    fontSize: Metrics.rfv(13),
    fontWeight: "500",
    marginTop:Metrics.rfv(8)
  },
  rulesTitle: {
    color: Colors.black,
    fontSize: Metrics.rfv(18),
    textAlign: "left",
    fontWeight: "700",
    marginBottom: Metrics.rfv(15),
    textDecorationLine:'underline',
  },
});

export default Deposit;
