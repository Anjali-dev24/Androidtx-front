//import liraries
import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
} from "react-native";
import Button from "../Components/Button";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/Feather";
import Metrics from "../Helpers/Metrics";
import Images from "../constant/images/Images";
import { transformer } from "../metro.config";
import { SvgUri } from "react-native-svg";
import FastImage from "react-native-fast-image";

// create a component
const PickerComponent = (props) => {
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const [isPickerClick, setIsPickerClick] = useState(false);
  const countries = [
    {
      name: "India",
      code: "91",
    },
    {
      name: "Brazil",
      code: "55",
    },
    {
      name: "Bhutan",
      code: "975",
    },
  ];

  const Item = ({ title }: ItemProps) => (
    // <View style={styles.item}>
    //   <Text style={styles.title}>{title}</Text>
    // </View>
    <TouchableOpacity
      onPress={(item, index) => {
        console.log(
          "-=-=-==-item-=-=-country-=-=-=-",
          title,
          props.selectedItem
        );

        props.setSelectedItem(title);
        props.code && setIsPickerClick(false);
      }}
      style={styles.selectedLanguage}
    >
      <Text style={[styles.selectedText, props.itemStyle]}>
        {title.name ? title.name : title}
      </Text>
      {!props.isCurrency && (
        <Text style={styles.selectedText}>+{title.code}</Text>
      )}
      {title.name == props.selectedItem && props.isCurrency && (
        <FastImage
          style={styles.forwordIcon}
          source={{
            uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907849/tick_ctsqt5.png",
            priority: FastImage.priority.low,
          }}
        />
      )}
    </TouchableOpacity>
  );

  const renderItemList = () => {
    // console.log("=-=-=-=-countries-=-=-", props.data);

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isPickerClick}
        onRequestClose={() => {
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
            {!props.code && (
              <Button
              
                buttonStyle={styles.registerButton}
                full={false}
                buttonTitleStyle={styles.regButtonText}
                buttonTitle={"Done"}
                onButtonPress={() => {
                  setIsPickerClick(false);
                }}
              />
            )}
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <TouchableOpacity
      onPress={() => {
        setIsPickerClick(true);
      }}
      style={[
        styles.container,
        props.isCurrency
          ? { justifyContent: "space-between", paddingHorizontal: 20 }
          : { justifyContent: "space-evenly" },
      ]}
    >
      <Text>
        {props.selectedItem
          ? props.isCurrency
            ? props.selectedItem
            : `+${props.selectedItem}`
          : props.title}
      </Text>
      <View style={styles.imgView}>
        <SvgUri
        preserveAspectRatio='xMinYMin slice'
          style={{ marginHorizontal: 1, transform: [{ rotate: "180deg" }] }}
          color={"#fff"}
          width={"100%"}
          height={"100%"}
          uri={
            "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123452/svgviewer-output_20_mho6rp.svg"
          }
        ></SvgUri>
        {/* <Image style={styles.down_arrow} source={Images.down_arrow} /> */}
      </View>

      {isPickerClick && renderItemList()}
    </TouchableOpacity>
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
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 10,
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
    justifyContent: "space-between",
  },
  imgView: {
    width: 15,
    height: 15,
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
export default PickerComponent;
