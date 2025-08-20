import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import Metrics from "../Helpers/Metrics";

const CustomToast = (props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.isToast}
      onRequestClose={props.onRequestClose}
    >
      <View style={styles.toastModalContainer}>
        <View style={styles.modalContainer}>
         {!props.sessionExpired && <FastImage
            style={styles.image}
            source={{
              uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1736847312/toastTick_eiwrtj.png",
              priority: FastImage.priority.low,
            }}
          />}
          {props?.downloadImg?<Text style={[styles.text,props.textStyle]}>
            {props.downloadImgUrl}
          </Text>:
          <Text style={styles.text}>Copied</Text>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  toastModalContainer: {
    backgroundColor: "transparent",
    justifyContent: "center",
    marginBottom: 20,
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    top: 0,
  },
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.6)",
    alignSelf: "center",
    padding: Metrics.rfv(15),
    borderRadius: 10,
  },
  image: { width: 30, height: 30, alignSelf: "center" },
  text: { textAlign: "center", color: "#fff" },
});

export default CustomToast;
