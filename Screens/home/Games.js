import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import PageWrapperView from "../../Components/PageWrapperView";
// import Header from '../../Components/Header';
import { Colors } from "../../Helpers/Colors";
import Metrics from "../../Helpers/Metrics";
import { games, News_array } from "./wingo/data";
import FontAwesome5 from "react-native-vector-icons/FontAwesome";
import { array, Fonts } from "../../constant/data";
import LinearGradient from "react-native-linear-gradient";
import Images from "../../constant/images/Images";
import HeaderComponent from "../../Components/Header";
import HeaderTitleComponent from "../../Components/HeaderTitle";
import { useNavigation } from "@react-navigation/native";
import GameLose from "../../Components/GameLose";
import FastImage from "react-native-fast-image";
const Games = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [isShowAgain, setIsShowAgain] = useState(false);
  

  const rowLen = array.length;
  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={()=>{

      navigation.navigate(item.screen) 
      }} style={styles.gamesContainer}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#d35c50", "#ba4940", "#9e342e"]}
        style={styles.linearGradient}
      >
        <View style={{ width: "70%", paddingTop: 5 }}>
          <Text style={styles.firstGame}>{item.name}</Text>
          <Text style={styles.number}>Guess Number</Text>
          <Text style={styles.options}>
            {item.color}
            {index == 0 || rowLen === index + 1 ? " to win" : ""}
          </Text>
        </View>
        <View style={{ width: "30%",height:100 }}>
          <FastImage
            resizeMode="contain"
            style={styles.lotteryImage}
            source={{ uri: item.img, priority: FastImage.priority.low, }}
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <PageWrapperView statusBar={{ background: Colors.white }}>
      <View style={styles.container}>
        <HeaderTitleComponent
          goBack={() => navigation.goBack()}
          title={"Games"}
          mainStyle={styles.mainHeaderStyle}
          style={{paddingBottom:8}}
        />
        {/* <View style={{marginBottom: Metrics.rfv(100)}}> */}
        <FlatList
          data={array}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
        />
        <GameLose
          isModalOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onCheckPress={()=>{setChecked(checked)}}
          onSetTimerPress={()=>{
            setIsShowAgain(!isShowAgain)
          }}
          isShowAgain={isShowAgain}

        />
        {/* </View> */}
      </View>
    </PageWrapperView>
  );
};

export default Games;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: Metrics.rfv(10),
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.rfv(10),
    padding: Metrics.rfv(15),
    paddingVertical: Metrics.rfv(20),
    marginBottom: Metrics.rfv(10),
  },
  cardHeader: {
    fontSize: Metrics.rfv(17),
    color: Colors.black,
    marginBottom: Metrics.rfv(5),
    marginLeft: Metrics.rfv(10),
    fontFamily: Fonts.Roboto400,
  },
  cardMessage: {
    fontSize: Metrics.rfv(12),
    color: Colors.secoundary_200,
    fontFamily: Fonts.Roboto400,
    marginVertical: Metrics.rfv(10),
  },
  cardDate: {
    fontSize: Metrics.rfv(12),
    color: Colors.textMuted,
    textAlign: "left",
    color: Colors.secoundary_100,
    fontFamily: Fonts.Roboto400,
  },

  gamesContainer: {
    width: "100%",
    // paddingHorizontal: 15,
    marginVertical: 7,
  },
  linearGradient: {
    width: "100%",
    borderRadius: 15,
    paddingHorizontal: 15,
    // paddingVertical: 10,
    flexDirection: "row",
  },
  firstGame: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  number: {
    color: "#fff",
    fontSize: 14,
    // paddingVertical: 5,
  },
  options: {
    color: "#fff",
    fontSize: 14,
  },
  lotteryImage: {
    width: "100%",
    height: '100%',
  },
  mainHeaderStyle: {
    backgroundColor: "transparent",
  },
});
