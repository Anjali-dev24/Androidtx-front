import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import HeaderTitleComponent from "../../Components/HeaderTitle";
import { notification } from "../../constant/data";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Svg, { Path, SvgUri } from "react-native-svg";
import { io } from "socket.io-client";

const NotificationAccount = ({ navigation }) => {
  const socket = io.connect("wss://9tx.online");
  const [receiveMessage, setReceiveMessage] = useState("");

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on("notification", (data) => {
      console.log("===-=-=-=user--=-=-=socket=-=-=-==", data); // Log the received message data to the console
      setReceiveMessage(data); // Set the received message data to state
    });

    // Cleanup the effect by removing the event listener when the component unmounts
    return () => {
      socket.off("notification");
    };
  }, []);
  const Item = ({ title }: ItemProps) => (
    <View
      style={{
        backgroundColor: "#fff",
        marginVertical: 10,
        padding: 10,
        borderRadius: 8,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ width: 25, height: 25 }}>
          <SvgUri
            preserveAspectRatio="xMinYMin slice"
            style={{ marginHorizontal: 1 }}
            color={"#962f2a"}
            width={"100%"}
            height={"100%"}
            uri={
              "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123449/svgviewer-output_13_gfhyjm.svg"
            }
          ></SvgUri>
        </View>
        <Text style={styles.title}>{title.title}</Text>
      </View>
      <Text>View Receive messages: {receiveMessage}</Text>
      <Text style={styles.subTitle}>{title.subTitle}</Text>
      <Text style={styles.date}>{title.date}</Text>
    </View>
  );

  return (
    <View style={{}}>
      <HeaderTitleComponent
        title={"Notification"}
        goBack={() => navigation.goBack()}
        mainStyle={styles.mainHeaderStyle}
      />
      <FlatList
        data={notification}
        renderItem={({ item }) => <Item title={item} />}
        keyExtractor={(item) => item.id}
        style={{ padding: 15 }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 5,
  },
  subTitle: {
    color: Colors.grey,
    fontSize: 14,
    marginVertical: 15,
  },
  date: {
    color: "#A9A9A9",
  },
});

export default NotificationAccount;
