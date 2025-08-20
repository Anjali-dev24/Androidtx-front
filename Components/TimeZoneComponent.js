//import liraries
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Metrics from "../Helpers/Metrics";
import Images from "../constant/images/Images";
import { SvgUri } from "react-native-svg";
import { Colors } from "../Helpers/Colors";
import FastImage from "react-native-fast-image";

// create a component
const TimeZoneComponent = (props) => {
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const [timeZonesModal, setTimeZonesModal] = useState(false);

  const Item = ({ title }: ItemProps) => (
    <TouchableOpacity
      onPress={() => {
        props.setSelectedItem(title);
        setTimeZonesModal(false);
      }}
      style={styles.selectedLanguage}
    >
      <Text style={styles.selectedText}>{title}</Text>
    </TouchableOpacity>
  );

  const renderTimeZones = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={timeZonesModal}
        onRequestClose={() => {
          setTimeZonesModal(false);
          // Prevent the modal from closing when pressing back button
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <FlatList
              data={props.data}
              renderItem={({ item }) => <Item title={item} />}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const dialingCode = props.selectedItem
    ? props.isCurrency
      ? props.selectedItem
      : `${props.selectedItem}`
    : props.title;
  return (
    <View
      // onPress={() => {
      //   props.data?.length >= 0
      //     ? setTimeZonesModal(true)
      //     : setTimeZonesModal(false);
      //   console.log("-=-=-==-=-=selectedItem-=-=-=-=-", props.selectedItem);
      //   props?.onIsdPress;
      // }}
      style={[
        styles.container,
        props.style,
        { justifyContent: props.isCurrency ? "flex-start" : "center" },
      ]}
    >
      {!props.isCurrency &&<View style={styles.imgView}>
        {global.selectedCountry?.country?.flagSvg?<SvgUri
          preserveAspectRatio="xMinYMin slice"
          style={{ marginHorizontal: 1, transform: [{ rotate: "180deg" }] }}
          color={"#fff"}
          width={"100%"}
          height={"100%"}
          uri={global.selectedCountry?.country?.flagSvg}
        ></SvgUri>:
        <FastImage style={styles.down_arrow} source={{uri:'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110119/IND_rnpkel.png'}} />}
      </View>}
      <Text numberOfLines={1} adjustsFontSizeToFit style={styles.isdCode}>
        {dialingCode == undefined ? "---" : dialingCode}
      </Text>
      {timeZonesModal && renderTimeZones()}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    borderColor: "#dedee0",
    borderWidth: 1,
    borderRadius: Metrics.rfv(10),
    width: "100%",
    // height:Metrics.rfv(40),
    marginRight: Metrics.rfv(10),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Metrics.rfv(10),
    paddingHorizontal: 10,
  },
  isdCode: {
    color: Colors.grey,
    fontSize: Metrics.rfv(18),
    textAlign: "center",
  },
  down_arrow: {
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    // alignItems:"center",
    flex: 1,
  },
  registerButton: {
    // borderColor: '#962f2a',
    // borderWidth: 1,
    paddingVertical: Metrics.rfv(8),
    paddingHorizontal: Metrics.rfv(25),
    borderRadius: 8,
    backgroundColor: "#962f2a",
    alignSelf: "center",
  },
  regButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 5,
    padding: 15,
    margin: 15,
  },
  closeImage: {
    width: 25,
    height: 25,
  },
  languageTitle: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    marginVertical: 15,
    alignItems: "center",
  },
  modalText: {
    color: "#000",
    fontSize: Metrics.rfv(16),
    fontWeight: "bold",
  },
  selectedText: {
    color: "#000",
    fontSize: 15,
  },
  selectedLanguage: {
    padding: 15,
    borderBottomColor: "#dedee0",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  imgView: {
    width: 30,
    height: 30,
    marginRight:Metrics.rfv(10)
  },
  picker: {
    width: "20%",
  },
  forwordIcon: {
    width: 20,
    height: 20,
  },
});

//make this component available to the app
export default TimeZoneComponent;
