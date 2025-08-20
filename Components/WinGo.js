import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import Metrics from "../Helpers/Metrics";
import Button from "../Components/Button";
import { betSize, gameNumber, timers, winNumber } from "../constant/data";
import { Colors } from "../Helpers/Colors";

const WinGoComponent = (props) => {
  const renderTimerView = () => {
    console.log(
      "-=-=-=-=-props.showRemainingTime-=-=-=-",
      props.timer
    );

    return (
      <View style={styles.timerContainer}>
        <Text style={[styles.remainingTime, { marginRight: Metrics.rfv(15) }]}>
          {0}
        </Text>
        <Text style={[styles.remainingTime, { marginLeft: Metrics.rfv(15) }]}>
        {props.timer.toString().slice(-1)}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.betTimings}>
        {timers.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                props?.selectedTimer(item, index);
              }}
              style={[
                styles.timerView,
                {
                  backgroundColor:
                    props.isSelected === index ? "#962f2a" : "#fff",
                },
              ]}
            >
              <FastImage
                resizeMode="contain"
                source={
                  props.isSelected === index
                    ? {
                        uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110030/time_a-f83ed4c7_ozzbwh.png",
                      }
                    : {
                        uri: item.image,
                      }
                }
                style={styles.timer}
              />
              <Text
                style={[
                  styles.timerText,
                  { color: props.isSelected === index ? "#fff" : "#000" },
                ]}
              >
                Win Go {"\n"} {item.time}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <ImageBackground
        tintColor={"#962f2a"}
        resizeMode="stretch"
        style={styles.timeInfo}
        source={{
          uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907486/timerBackImage_jtua3o.png",
        }}
      >
        <View style={styles.playInstructions}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", width: "35%" }}
            onPress={props.onInfoPress}
          >
            <Text style={styles.playHow}>How to play</Text>
          </TouchableOpacity>
          <Text style={styles.timeLeft}>Time remaining</Text>
        </View>
        <View style={styles.liveTimer}>
          <Text style={styles.winGo}>Win Go {props.selectedTime}</Text>
          <View style={styles.winGoTime}>
            <Text style={[styles.runningTime,{letterSpacing:8}]}>{props.timer}</Text>
            {/* <Text style={styles.runningTime}>{props.timer1}</Text>
            <Text style={styles.runningTime}>{props.timer2}</Text>
            <Text style={styles.runningTime}>:</Text>
            <Text style={[styles.runningTime]}>{props.timer3}</Text>
            <Text style={[styles.runningTime]}>{props.timer4}</Text> */}
            {/* <Text style={styles.runningTime}>{props.timer}</Text> */}
          </View>
          {/* <Text style={styles.timeLeft}>Time remaining</Text> */}
        </View>
        <View style={styles.numberRow}>
          <View style={styles.winNumber}>
            {winNumber.map((item, index) => {
              return (
                <FastImage
                  resizeMode="contain"
                  style={styles.winImg}
                  source={{ uri: item.img }}
                />
              );
            })}
          </View>
          <Text style={styles.userIdStyle}>8767867676767678676</Text>
        </View>
      </ImageBackground>

      <View style={styles.gameContainer}>
        <View style={styles.betOptionsView}>
          <Button
            buttonStyle={[
              styles.gameButton,
              {
                backgroundColor: "#18B660",
                borderTopRightRadius: Metrics.rfv(8),
                borderBottomLeftRadius: Metrics.rfv(8),
              },
            ]}
            full={false}
            buttonTitleStyle={styles.gameButtonTitle}
            buttonTitle="Green"
            onButtonPress={props.greenPress}
          />
          <Button
            buttonStyle={[
              styles.gameButton,
              { backgroundColor: "#C86EFF", borderRadius: 8 },
            ]}
            full={false}
            buttonTitleStyle={styles.gameButtonTitle}
            buttonTitle="Violet"
            onButtonPress={props.voiletPress}
          />
          <Button
            buttonStyle={[
              styles.gameButton,
              {
                borderTopLeftRadius: Metrics.rfv(8),
                borderBottomRightRadius: Metrics.rfv(8),
              },
            ]}
            full={false}
            buttonTitleStyle={styles.gameButtonTitle}
            buttonTitle="Red"
            onButtonPress={props.redPress}
          />
        </View>
        <View style={styles.betNumberRow}>
          {gameNumber.map((item, index) => (
            <TouchableOpacity
              onPress={() => props.gameNumberPress(item, index)}
              style={styles.betNumbers}
            >
              <Animated.View
                style={[{ transform: [{ scale: props.animatedScale }] }]}
              >
                <FastImage
                  resizeMode="contain"
                  style={styles.numberImg}
                  source={{
                    uri: item.img,
                  }}
                />
              </Animated.View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.betSize}>
          <TouchableOpacity
            onPress={props.randomPress}
            style={[
              styles.betSizeText,
              { borderColor: "#962f2a", borderWidth: 1 },
            ]}
          >
            <Text style={styles.randomText}>Random</Text>
          </TouchableOpacity>
          <View style={styles.randomBetSizeView}>
            {betSize.map((item, index) => (
              <TouchableOpacity
                onPress={() => props?.onBetSizeClick(item, index)}
                style={[
                  styles.sizeBetText,
                  {
                    backgroundColor:
                      props?.betSizeIndex == index ? "#18BB60" : "#F7F8FF",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.sizeText,
                    {
                      color:
                        props?.betSizeIndex == index ? "#fff" : Colors.grey,
                    },
                  ]}
                >
                  X{item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            marginTop: Metrics.rfv(8),
          }}
        >
          <TouchableOpacity
            onPress={props.bigPress}
            style={{
              backgroundColor: "#FEAA57",
              padding: Metrics.rfv(8),
              width: "45%",
              borderTopLeftRadius: Metrics.rfv(30),
              borderBottomLeftRadius: Metrics.rfv(30),
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: Metrics.rfv(22),
                color: "#fff",
                fontWeight: "600",
              }}
            >
              Big
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={props.smallPress}
            style={{
              backgroundColor: "#6EA8F4",
              padding: Metrics.rfv(8),
              width: "45%",
              borderTopRightRadius: Metrics.rfv(30),
              borderBottomRightRadius: Metrics.rfv(30),
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: Metrics.rfv(22),
                color: "#fff",
                fontWeight: "600",
              }}
            >
              Small
            </Text>
          </TouchableOpacity>
        </View>
        {props.showRemainingTime && renderTimerView()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 8,
  },
  betTimings: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    justifyContent: "space-between",
    // marginHorizontal:Metrics.rfv(10),
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  timer: {
    width: 50,
    height: 50,
    alignSelf: "center",
  },
  timerView: {
    paddingVertical: Metrics.rfv(12),
    backgroundColor: "#962f2a",
    borderRadius: 10,
    width: "25%",
  },
  timerText: {
    color: "#000",
    fontSize: Metrics.rfv(16),
    fontWeight: "600",
    textAlign: "center",
  },
  timeInfo: {
    width: "98%",
    alignSelf: "flex-end",
    height: 150,
    marginVertical: Metrics.rfv(15),
  },
  playInstructions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    marginTop: Metrics.rfv(10),
  },
  playHow: {
    borderColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: Metrics.rfv(5),
    borderRadius: Metrics.rfv(15),
    paddingVertical: Metrics.rfv(5),
    textAlign: "center",
    color: "#fff",
    fontSize: Metrics.rfv(14),
  },
  timeLeft: {
    color: "#fff",
    fontSize: Metrics.rfv(16),
    fontWeight: "700",
  },
  liveTimer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    // marginTop: Metrics.rfv(5),
  },
  winNumber: {
    flexDirection: "row",
    alignItems: "center",
  },
  winGo: {
    color: "#fff",
    fontSize: Metrics.rfv(14),
    marginTop: Metrics.rfv(15),
  },
  winGoTime: {
    flexDirection: "row",
  },
  runningTime: {
    backgroundColor: "#fff",
    padding: 5,
    marginHorizontal: 2,
    fontWeight: "900",
    fontSize: Metrics.rfv(24),
  },
  winImg: {
    width: 30,
    height: 30,
    marginHorizontal: Metrics.rfv(3),
  },
  numberRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: Metrics.rfv(10),
    paddingHorizontal: Metrics.rfv(10),
  },
  userIdStyle: {
    color: "#fff",
    fontSize: Metrics.rfv(14),
    fontWeight: "700",
  },
  betOptionsView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Metrics.rfv(5),
  },
  gameButton: {
    backgroundColor: "#962f2a",
    alignSelf: "center",
    paddingVertical: Metrics.rfv(8),

    width: "30%",
  },
  gameButtonTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  gameContainer: {
    padding: Metrics.rfv(8),
    borderRadius: Metrics.rfv(8),
    marginHorizontal: Metrics.rfv(10),
    backgroundColor: "#fff",
    // height: 300,
  },
  betNumbers: {
    width: "20%",
    height: 65,
    marginTop: Metrics.rfv(10),
  },
  betNumberRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    flexWrap: "wrap",
    // height:300,
    justifyContent: "center",
  },
  numberImg: {
    width: "100%",
    height: "100%",
  },
  betSize: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: Metrics.rfv(6),
  },
  betSizeView: {
    borderColor: "#962f2a",
    borderWidth: 1,
    paddingHorizontal: Metrics.rfv(10),
    borderRadius: Metrics.rfv(8),
    paddingVertical: Metrics.rfv(5),
  },
  randomText: {
    color: "#962f2a",
    fontSize: Metrics.rfv(18),
  },
  sizeText: {
    color: "#962f2a",
    fontSize: Metrics.rfv(12),
    fontWeight: "500",
  },
  randomBetSizeView: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  betSizeText: {
    paddingHorizontal: Metrics.rfv(6),
    borderRadius: 8,
    paddingVertical: Metrics.rfv(5),
    marginHorizontal: Metrics.rfv(3),
  },
  sizeBetText: {
    paddingHorizontal: Metrics.rfv(7),
    borderRadius: 8,
    paddingVertical: Metrics.rfv(7),
    marginHorizontal: Metrics.rfv(3),
  },
  timerContainer: {
    backgroundColor: "rgba(0,0,0,0.8)",
    position: "absolute",
    zIndex: 2,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  remainingTime: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: Metrics.rfv(150),
    backgroundColor: "#fff",
    paddingHorizontal: Metrics.rfv(25),
    color: "#962f2a",
    borderRadius: 15,
  },
});

export default WinGoComponent;
