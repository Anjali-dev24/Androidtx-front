//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SvgUri } from "react-native-svg";

// create a component
const Loader = ({
  marginTop = 0,
  marginLeft = 0,
  buttonTitle,
  buttonStyle,
  buttonTitleStyle,
  onButtonPress,
  forwordIcon
}) => {
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  return (
    <TouchableOpacity style={buttonStyle} onPress={onButtonPress}>
      <Text style={buttonTitleStyle}>{buttonTitle}</Text>
      {forwordIcon &&<View style={{ width: 25, height: 25 }}>
        <SvgUri
          preserveAspectRatio="xMinYMin slice"
          style={{ marginHorizontal: 1 }}
          color={"#962f2a"}
          width={"100%"}
          height={"100%"}
          uri={
            "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735137648/svgviewer-output_27_i5sweu.svg"
          }
        ></SvgUri>
      </View>}
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default Loader;
