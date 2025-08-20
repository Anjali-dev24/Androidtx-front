import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { bonus } from "../../constant/data";
import Button from "../../Components/Button";
import { Colors } from "../../Helpers/Colors";
import HeaderTitleComponent from "../../Components/HeaderTitle";
import { useTranslation } from "react-i18next";

const InvitationRecords = ({ navigation }) => {
  const { t } = useTranslation();

  const renderItem = ({ item, index }) => (
    <View style={styles.listContainer}>
      <View style={[styles.listView, { backgroundColor: "#fff" }]}>
        <View style={styles.bonusView}>
          <Text style={styles.rewardsView}>Bonus </Text>
          <Text style={styles.rewards}>11</Text>
        </View>
        <Text style={styles.amount}>$1768678</Text>
      </View>
      <View style={[styles.listView, { backgroundColor: "#dedee0", padding: 10, }]}>
        <Text style={styles.invitees}>Number of invitees</Text>
        <Text style={styles.invitees}>{item.number}</Text>
      </View>
      <View style={[styles.listView, { backgroundColor: "#dedee0", padding: 10,}]}>
        <Text style={styles.invitees}>Number of invitees</Text>
        <Text style={[styles.invitees, { color: Colors.red }]}>
          {item.recharge}
        </Text>
      </View>
      <View style={styles.border} />
      <View style={[styles.listView, { justifyContent: "space-evenly" }]}>
        <View style={[styles.totalInvitees]}>
          <Text style={styles.totalNumber}>
            {item.invitees}/{item.number}
          </Text>
          <Text style={styles.totalText}>Number of invitees </Text>
        </View>
        <View style={styles.verticleLine} />
        <View style={styles.totalInvitees}>
          <Text style={[styles.totalNumber, { color: Colors.red }]}>
            {item.invitees}/{item.number}
          </Text>
          <Text style={styles.totalText}>Deposit number </Text>
        </View>
      </View>
      <Button
        buttonTitleStyle={styles.buttonText}
        // disabled={!isValid}
        full={true}
        buttonTitle="Unfinished"
        buttonStyle={styles.ButtonView}
        onButtonPress={() => {
          navigation.navigate("OTP", {
            phone: values.phoneNumber,
          });
        }} // Use Formik's handleSubmit
      />
    </View>
  );
  return (
    <View style={styles.container}>
      <HeaderTitleComponent
        title={t("titles.invitationRecord")}
        goBack={() => navigation?.goBack()}
        mainStyle={styles.mainHeaderStyle}
        style={{paddingBottom:8}}
      />
      <FlatList
        data={bonus}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={<View style={{ height: 200 }} />}
        // contentContainerStyle={{flexGrow: 1}}
        // style={{flexGrow:1}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
    
    borderRadius: 8,
  },
  rewardsView: {
    color: "#000",
    fontSize: 14,
  },
  bonusView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.green,
    padding: 10,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  rewardsView: {
    color: "#fff",
    fontSize: 10,
  },
  rewards: {
    backgroundColor: "#fff",
    padding: 3,
    borderRadius: 20,
    fontSize: 10,
    color: Colors.grey,
    marginRight: 15,
  },
  amount: {
    color: "#C78C06",
  },
  invitees: {
    color: "#000",
    fontSize: 12,
    fontWeight: "500",
  },
  ButtonView: {
    backgroundColor: "#962f2a",
    borderRadius: 10,
    paddingVertical: 7,
    margin: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "500",
  },
  border: {
    borderBottomColor: "#dedee0",
    borderBottomWidth: 1,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  totalNumber: {
    color: "#C78C06",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
  totalText: {
    color: Colors.grey,
    fontSize: 10,
    textAlign: "center",
  },
  verticleLine: {
    height: "100%",
    width: 1,
    backgroundColor: Colors.grey,
  },
  listContainer: {
    // paddingTop: 5,
    elevation: 15,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8,
    padding: 5,
  },
});

export default InvitationRecords;
