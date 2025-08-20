import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  Text,
  Dimensions,
} from "react-native";
import Metrics from "../Helpers/Metrics";
import { Colors } from "../Helpers/Colors";
import FastImage from "react-native-fast-image";

const GameLose = (props) => {
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isModalOpen}
        onRequestClose={props.onRequestClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <ImageBackground
              resizeMode="contain"
              style={styles.backgroundImg}
              source={{
                uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110120/Lose_iucuhv.png",
              }}
            >
              <View style={{height:Dimensions.get('screen').height/2, width:"80%", justifyContent:"flex-end",  marginTop:Metrics.rfv(50)}}>
                <View style={{  height: "20%", justifyContent:"flex-end", }}>
                <Text style={styles.failedText}>Sorry</Text>
                <View style={styles.lotteryResultView}>
                  <Text style={styles.lotteryResult}>Lottery Result</Text>
                  <View style={styles.greenButton}>
                    <Text style={styles.colorCode}>Green</Text>
                  </View>
                  <View style={styles.numberView}>
                    <Text style={styles.colorCode}>9</Text>
                  </View>
                  <View style={styles.greenButton}>
                    <Text style={styles.colorCode}>Big</Text>
                  </View>
                </View>
              </View>

              {/* <View style={{ height: "5%",}} /> */}
              <View
                style={{
                  height: "30%",
                  width: "90%",
                  // marginTop: 40,
                  justifyContent:"flex-end",
                  alignSelf:"center"
                }}
              >
                <Text
                  style={[styles.failedText, { }]}
                >
                  Lose
                </Text>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={styles.periodText}
                >
                  Period: <Text>30 sec8763487262376</Text>
                </Text>
              </View>
              <View style={{height:Dimensions.get('screen').height/10,  flexDirection:"row", alignItems:"flex-end",marginBottom:25 }}>
              <TouchableOpacity
                    onPress={props.onSetTimerPress}
                    style={styles.tickBorder}
                  >
                    {props.isShowAgain ? (
                      <FastImage
                        style={styles.rememberIcon}
                        source={{
                          uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907849/tick_ctsqt5.png",
                          priority: FastImage.priority.low,
                        }}
                      />
                    ) : null}
                    </TouchableOpacity>
                <Text style={styles.autoCloseText}>3 Sec auto close</Text>
              </View>
              </View>
              
            </ImageBackground>
          </View>
          <TouchableOpacity
            onPress={props.onRequestClose}
            style={styles.closeView}
          >
            <FastImage
              style={styles.closeImage}
              source={{
                uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110029/close-862c6a4d_hlfosi.png",
                priority: FastImage.priority.low,
              }}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  modalView: {
    width: "90%",
    height: "90%",
  },
  backgroundImg: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  closeView: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    // borderColor: '#962f2a',
    // borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  closeImage: {
    width: "100%",
    height: "100%",
    marginBottom: Metrics.rfv(50),
  },
  failedText: {
    textAlign: "center",
    fontSize: Metrics.rfv(30),
    color: Colors.dark_sky_blue,
    fontWeight: "800",
    // height:200
  },
  periodText: {
    // width: "100%",
    fontSize: Metrics.rfv(15),
    color: Colors.dark_sky_blue,
    textAlign:"center",
  },
  lotteryResultView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: Metrics.rfv(15),
  },
  colorCode: {
    color: Colors.white,
    fontSize: Metrics.rfv(15),
  },
  greenButton: {
    backgroundColor: Colors.dark_sky_blue,
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 12,
  },
  numberView: {
    backgroundColor: Colors.dark_sky_blue,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 17,
  },

  lotteryResult: {
    color: Colors.dark_sky_blue,
    fontSize: Metrics.rfv(13),
    fontWeight: "700",
  },
  autoCloseText:{
    color:Colors.dark_sky_blue,
    fontSize:Metrics.rfv(15),
    marginLeft:10
  },
  tickBorder: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    // marginRight: 5,
    borderRadius: 20 / 2,
    borderColor:Colors.dark_sky_blue,
    borderWidth: 1,
    // marginHorizontal: 10,
    marginTop: 5,
    
  },
  rememberIcon: {
    width: 15,
    height: 15,
  },
});

export default GameLose;
