import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Metrics from "../../../Helpers/Metrics";
import HeaderTitleComponent from "../../../Components/HeaderTitle";
import { SvgUri } from "react-native-svg";
import Button from "../../../Components/Button";
import { Colors } from "../../../Helpers/Colors";
import { Marquee } from "@animatereactnative/marquee";
import FastImage from "react-native-fast-image";
import { color } from "react-native-elements/dist/helpers";
import { LineChart } from "react-native-gifted-charts";
import { useNavigation } from "@react-navigation/native";
import WinGoComponent from "../../../Components/WinGo";
import CustomToast from "../../../Components/CustomToast";
import KChart from "../../../Components/KChart";
import K3Winningtable from "../../../Components/K3Winningtable";
import {
  balanceString,
  betSize,
  chartData,
  chartStaticData,
  gameNumber,
  historyData,
  notifications,
  numbers,
  participants,
} from "../../../constant/data";
import GamesTitle from "../../../Components/GamesTitle";
import BackgroundTimer from "react-native-background-timer";
import * as AudioHelper from "../../../service";
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";
// import K3 from "../../../Components/K3";
const { width, height } = Dimensions.get("window");
const winGo = () => {
  const animatedScale = useRef(new Animated.Value(0)).current;
  const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }];
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  const [gameHistory, setGameHistory] = useState(true);
  const [infoModal, setInfoModal] = useState(false);
  const [betModal, setBetModal] = useState(false);
  const [rulesModal, setRulesModal] = useState(false);
  const [chart, setChart] = useState(false);
  const [history, setHistory] = useState(false);
  const [showRemainingTime, setShowRemainingTime] = useState(false);
  const [index, setIndex] = useState(0);
  const [betSizeIndex, setBetSizeIndex] = useState(0);
  const [balanceIndex, setBalanceIndex] = useState(0);
  const [selectedTimer, setSelectedTimer] = useState(0);
  const [betSizeItem, setBetSizeItem] = useState("1");
  const [selectedItem, setSelectedItem] = useState("1");
  const [quantity, setQuantity] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCity, setActiveCity] = useState(0);
  const [selectedTime, setSelectedTime] = useState("30s");
  const navigation = useNavigation();
  const [timerCount, setTimer] = useState(30);
  const [isToast, setIsToast] = useState(false);
  const [isShowAgain, setIsShowAgain] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [colorArr, setColorArr] = useState();
  const [selectedNumber, setSelectedNumber] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    animatedScale.setValue(1);
  }, []);

  const handleOnPress = () => {
    animatedScale.setValue(0.8);
    Animated.loop(
      Animated.spring(animatedScale, {
        toValue: 1,
        bounciness: 24,
        speed: 5,
        useNativeDriver: true,
      }),
      {
        iterations: 2,
      }
    ).start();
  };

  // Sound.setCategory('Playback');
  const Item = ({ item }: ItemProps) => (
    <TouchableOpacity
      onPress={(item, index) => {}}
      style={styles.selectedLanguage}
    >
      <Text style={styles.selectedText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const randomNumber = (e) => {
    const len = gameNumber.length;
    setActiveCity(Math.floor(Math.random() * len));
    handleOnPress();
    setTimeout(() => {
      if (activeCity == 0) {
        let colors = ["#962f2a", "#C86EFF"];
        setColorArr(colors);
      } else if (activeCity == 5) {
        let colors = ["#18B660", "#C86EFF"];
        setColorArr(colors);
      } else if (activeCity % 2 == 0) {
        setSelectedColor("Red");
      } else {
        setSelectedColor("Green");
      }
      setSelectedNumber(activeCity);
      setBetModal(true);
      setTitle(`${activeCity}`);
    }, 3000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      var numeric = parseInt(selectedTime);
      if (timerCount == 1) {
        switch (numeric) {
          case 30:
                setTimer("30");
                break;
          case 1:
            setTimer("60");
            break;
          case 2:
            setTimer("120");
            break;
          case 3:
            setTimer("180");
            break;
          default:
            break;
        }
        console.log("-=-=-=-=-=numeric-=-=-=-=--numeric-=-=-=-", numeric);

        // setTimer(30);
        setShowRemainingTime(false);
      } else {
        // let minutes = Math.floor((seconds % (60 * 60)) / 60);
        // let seconds = seconds % 60;
        setTimer(timerCount - 1);
        if (timerCount <= 6) {
          setShowRemainingTime(true);
          setBetModal(false);
          if (timerCount == 2) {
            AudioHelper.finishSound();
          } else {
            AudioHelper.countDown();
          }
        }
      }
    }, 1000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [timerCount]);

  const preSaleRules = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        // visible={true}
        visible={rulesModal}
        onRequestClose={() => {
          // Prevent the modal from closing when pressing back button
        }}
      >
        <View style={[styles.rulesModalContainer]}>
          <View style={[styles.rulesModalView]}>
            <Text style={styles.rulesTitle}>Pre-Sale rules</Text>
            <ScrollView style={{ height: Dimensions.get("screen").height / 2 }}>
              <Text style={styles.preSalesRule}>
                "In order to protect the legitimate rights and interests of
                users participating in the pre-sale and maintain the normal
                operating order of the pre-sale, these rules are formulated in
                accordance with relevant agreements and laws and regulations.
                country Chapter 1 Definition1.{"\n"}1 Pre-sale definition:
                refers to a sales model in which a seller offers a bundle of a
                product or service, collects consumer orders through product
                tools before selling, and makes it available to customers.
                consumers of goods and/or services by prior agreement1.{"\n"}2
                Presale mode is "deposit" mode. "Consignment" refers to the
                pre-delivery of a fixed number of items prior to sale. "Deposit"
                Scam Join mini games for a chance to win more deposits. Deposits
                can be exchanged directly for goods. Deposit is not
                refundable.1.{"\n"}3 Pre-sale product: A product that is shipped
                by the seller using the pre-sale product tool. Only highlight
                the word presale on the product name or product detail page, and
                products that do not use the presale product tool are not
                presale. 1.{"\n"}4 Pre-sale system: refers to the system product
                tool that helps sellers to sell samples before selling.1.{"\n"}5
                Product price before selling: is the selling price of the
                product before selling. The price of pre-sale items consists of
                two parts: deposit and final payment. "
              </Text>
            </ScrollView>
            <Button
              forwordIcon={false}
              buttonStyle={styles.rulesButtonStyle}
              full={false}
              buttonTitleStyle={styles.rulesButtonText}
              buttonTitle="I Know"
              onButtonPress={() => {
                setRulesModal(false);
              }}
            />
            {/* </View> */}
          </View>
        </View>
      </Modal>
    );
  };

  const renderBetModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        // visible={true}
        visible={betModal}
        onRequestClose={() => {
          // Prevent the modal from closing when pressing back button
        }}
      >
        <View style={[styles.imageView, { minWidth: "100%" }]}>
          <View
            style={{
              marginTop: "auto",
            }}
          >
            <View
              style={[
                styles.modalVisible,
                { width: Dimensions.get("screen").width },
              ]}
            >
              {selectedNumber == 0 || selectedNumber == 5 ? (
                <LinearGradient
                  useAngle={true}
                  angle={170}
                  angleCenter={{ x: 0.5, y: 0.5 }}
                  locations={[0.5, 0.5]}
                  start={{ x: 0.25, y: 0.0 }}
                  end={{ x: 1.0, y: 0.5 }}
                  colors={colorArr}
                  style={[styles.titleCont]}
                >
                  <Text style={styles.infoTitle}>Win Go 5Min</Text>
                  <View style={styles.greenButton}>
                    <Text style={styles.greenText}>Select {title}</Text>
                  </View>
                </LinearGradient>
              ) : (
                <View
                  style={[
                    styles.titleCont,
                    {
                      backgroundColor:
                        selectedColor == "Green"
                          ? "#18BB60"
                          : selectedColor == "Violet"
                          ? "#C86EFF"
                          : selectedColor == "yellow"
                          ? "#FEAA57"
                          : selectedColor == "blue"
                          ? "#6EA8F4"
                          : "#962f2a",
                    },
                  ]}
                >
                  <Text style={styles.infoTitle}>Win Go 5Min</Text>
                  <View style={styles.greenButton}>
                    <Text style={styles.greenText}>Select {title}</Text>
                  </View>
                </View>
              )}
              <View style={styles.balanceContainer}>
                <Text style={styles.balanceText}>Balance</Text>
                <View style={styles.betContainer}>
                  {balanceString.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        setBalanceIndex(index);
                        setBetSizeItem(item);
                      }}
                      style={[
                        styles.sizeBetText,
                        {
                          backgroundColor:
                            balanceIndex == index ? "#18BB60" : "#F7F8FF",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.sizeText,
                          {
                            color: balanceIndex == index ? "#fff" : Colors.grey,
                          },
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.balanceContainer}>
                <Text style={styles.balanceText}>Quantity</Text>
                <View style={styles.betContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      let num = parseInt(quantity);
                      num > 1 && setQuantity(num - 1);
                      // let value = num * isTotal;
                      // setBetFinal(value);
                      setSelectedIndex(-1);
                    }}
                    style={styles.decreaseButton}
                  >
                    <Text style={styles.minus}>--</Text>
                  </TouchableOpacity>
                  <View style={styles.quantity}>
                    <Text style={styles.quantityNum}>{quantity}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      let num = parseInt(quantity);
                      setQuantity(num + 1);
                      // let value = num * isTotal;
                      // setBetFinal(value);
                      setSelectedIndex(-1);
                    }}
                    style={styles.decreaseButton}
                  >
                    <Text style={styles.minus}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={[styles.betContainer, { justifyContent: "flex-end" }]}
              >
                {betSize.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setBetSizeIndex(index);
                      setSelectedItem(item);
                      setQuantity(item);
                    }}
                    style={[
                      styles.sizeBetText,
                      {
                        backgroundColor:
                          betSizeIndex == index ? "#18BB60" : "#F7F8FF",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.sizeText,
                        {
                          color: betSizeIndex == index ? "#fff" : Colors.grey,
                        },
                      ]}
                    >
                      X{item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => {
                    setIsShowAgain(!isShowAgain);
                  }}
                  style={styles.tickBorder}
                >
                  {isShowAgain ? (
                    <FastImage
                      style={styles.rememberIcon}
                      source={{
                        uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907849/tick_ctsqt5.png",
                        priority: FastImage.priority.low,
                      }}
                    />
                  ) : null}
                </TouchableOpacity>
                <Text style={styles.agreeText}>I agree </Text>
                <TouchableOpacity
                  onPress={() => {
                    setRulesModal(true);
                  }}
                >
                  <Text
                    style={styles.preSaleText}
                  >{`  <<Pre-sale rules>>`}</Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.buttonView,
                  { width: "100%", marginTop: Metrics.rfv(10) },
                ]}
              >
                <Button
                  forwordIcon={false}
                  buttonStyle={styles.cancelbuttonStyle}
                  full={false}
                  buttonTitleStyle={styles.cancelButtonText}
                  buttonTitle="Cancel"
                  onButtonPress={() => {
                    setBetModal(false);
                    setBetSizeIndex(0);
                    setBalanceIndex(0);
                  }}
                />
                <Button
                  forwordIcon={false}
                  buttonStyle={[
                    styles.nextbuttonStyle,
                    selectedNumber == 0
                      ? { backgroundColor: "#962f2a" }
                      : selectedNumber == 5
                      ? { backgroundColor: "#18BB60" }
                      : {
                          backgroundColor:
                            selectedColor == "Green"
                              ? "#18BB60"
                              : selectedColor == "Violet"
                              ? "#C86EFF"
                              : selectedColor == "yellow"
                              ? "#FEAA57"
                              : selectedColor == "blue"
                              ? "#6EA8F4"
                              : "#962f2a",
                        },
                  ]}
                  full={false}
                  buttonTitleStyle={styles.nextButtonText}
                  buttonTitle={`Total amount ₹${(
                    quantity * betSizeItem
                  ).toLocaleString()}.00`}
                  onButtonPress={() => {
                    setBetModal(false);
                    setIsToast(true),
                      setTimeout(() => {
                        setIsToast(false);
                      }, 3000);
                    // setInfoModal(false);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderGameInfo = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        // visible={true}
        visible={infoModal}
        onRequestClose={() => {
          // Prevent the modal from closing when pressing back button
        }}
      >
        <View style={[styles.imageView, { alignSelf: "center" }]}>
          <View style={styles.modalVisible}>
            <View style={styles.titleCont}>
              <Text style={styles.infoTitle}>How To Play</Text>
            </View>
            <ScrollView
              style={{
                padding: Metrics.rfv(10),
                height: Dimensions.get("screen").height / 2,
              }}
            >
              <Text style={styles.infoText}>
                30 seconds, 1 issue, 25 seconds to order, 5 seconds waiting for
                the draw. It opens all day. The total number of trade is 2880
                issues. if you spend 100 to trade, after deducting service fee
                2%, contract amount : 98
              </Text>
              <Text style={[styles.infoText, { fontSize: Metrics.rfv(16) }]}>
                1. Select green: if the result shows 1,3,7,9 you will get
                (98*2)=196;If the result shows 5, you will get (98*1.5) 147
              </Text>
              <Text style={styles.infoText}>
                2. Select red: if the result shows 2,4,6,8 you will get ;If the
                result shows 0, you will get{" "}
              </Text>
              <Text style={styles.infoText}>
                3. Select violet: if the result shows 0 or 5, you will get
                (98*2)=196
              </Text>
              <Text style={styles.infoText}>
                4. Select number: if the result is the same as the number you
                selected, you will get (98*9)=882
              </Text>
              <Text style={styles.infoText}>
                5. Select big: if the result shows 5,6,7,8,9 you will get
                (98*2)=196
              </Text>
              <Text style={styles.infoText}>
                6. Select small: if the result shows 0,1,2,3,4 you will get
                (98*2)=196
              </Text>
              <Text style={{ margin: 10 }} />
            </ScrollView>
            <Button
              forwordIcon={false}
              buttonStyle={styles.closebuttonStyle}
              full={false}
              buttonTitleStyle={styles.closeButtonText}
              buttonTitle="Close"
              onButtonPress={() => {
                setInfoModal(false);
              }}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const RenderList = ({ item }: ItemProps) => {
    return (
      <View style={styles.listView}>
        <Text style={[styles.textContainer, { width: "33%" }]}>
          {item.period}
        </Text>
        <Text
          style={[
            styles.textContainer,
            {
              width: "22%",
              fontSize: Metrics.rfv(20),
              color: item.number % 2 == 0 ? "#962f2a" : "#18B660",
            },
          ]}
        >
          {item.number}
        </Text>
        <Text style={[styles.textContainer, { width: "22%" }]}>
          {item.size}
        </Text>
        {item.number == 0 || item.number == 5 ? (
          <View
            style={{
              width: "20%",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={[
                styles.colorStyle,
                {
                  backgroundColor: item.number % 2 == 0 ? "#962f2a" : "#18B660",
                },
              ]}
            />
            <View
              style={[
                styles.colorStyle,
                {
                  backgroundColor: item.number % 2 == 0 ? "#962f2a" : "#18B660",
                },
              ]}
            />
          </View>
        ) : (
          <View
            style={{
              width: "20%",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={[
                styles.colorStyle,
                {
                  backgroundColor: item.number % 2 == 0 ? "#962f2a" : "#18B660",
                },
              ]}
            />
          </View>
        )}
      </View>
    );
  };

  const game_history = () => {
    return (
      <View style={styles.gameHistoryContainer}>
        <View style={styles.participantsList}>
          <Text
            style={[styles.headings, { width: "33%", textAlign: "center" }]}
          >
            Period
          </Text>
          <Text
            style={[styles.headings, { width: "22%", textAlign: "center" }]}
          >
            Number
          </Text>
          <Text
            style={[styles.headings, { width: "22%", textAlign: "center" }]}
          >
            Big/Small
          </Text>
          <Text
            style={[styles.headings, { width: "22%", textAlign: "center" }]}
          >
            Color
          </Text>
        </View>
        <FlatList
          data={participants}
          renderItem={({ item }) => <RenderList item={item} />}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.pagination}>
          <TouchableOpacity
            disabled={nextPage ? false : true}
            style={[
              styles.backButton,
              { backgroundColor: nextPage ? "#962f2a" : "#C2C2C2" },
            ]}
            onPress={() => {}}
          >
            <View style={{ width: 25, height: 25 }}>
              <SvgUri
                preserveAspectRatio="xMinYMin slice"
                style={{ marginHorizontal: 1 }}
                color={"#fff"}
                width={"100%"}
                height={"100%"}
                uri={
                  "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123454/svgviewer-output_hqtslg.svg"
                }
              ></SvgUri>
            </View>
          </TouchableOpacity>
          <Text style={styles.paginationText}>{page}/10</Text>
          <TouchableOpacity
            disabled={page >= 10 ? true : false}
            style={styles.forwardButton}
            onPress={() => {
              setNextPage(true), setPage(page + 1);
            }}
          >
            <View style={{ width: 25, height: 25 }}>
              <SvgUri
                preserveAspectRatio="xMinYMin slice"
                style={{ marginHorizontal: 1 }}
                color={"#fff"}
                width={"100%"}
                height={"100%"}
                uri={
                  "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735137648/svgviewer-output_27_i5sweu.svg"
                }
              ></SvgUri>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const render_chart = () => {
    return (
      <View style={{ marginVertical: Metrics.rfv(15) }}>
        <View style={styles.chartTitle}>
          <Text style={styles.periodTitle}>Period</Text>
          <Text style={styles.numberTitle}>NUmber</Text>
        </View>
        <View style={{ backgroundColor: "#fff", marginHorizontal: 15 }}>
          <Text
            style={{
              marginLeft: Metrics.rfv(18),
              fontSize: Metrics.rfv(12),
              color: "#000",
              backgroundColor: "#fff",
              marginTop: Metrics.rfv(5),
            }}
          >
            Static (last 100 Periods)
          </Text>
          {chartStaticData.map((item, index) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: "90%",
                // marginLeft: Metrics.rfv(10),
                marginVertical: Metrics.rfv(3),
                alignSelf: "center",
              }}
            >
              <View style={{ width: "30%" }}>
                <Text style={styles.winningInfo}>{item.title}</Text>
              </View>
              <View
                style={{
                  width: "70%",
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                {item.numbers.map((item, index) => (
                  <View
                    style={[
                      styles.periodNum,
                      item.number == 0 && { backgroundColor: "#962f2a" },
                    ]}
                  >
                    <Text>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
          <View
            style={{
              borderColor: "#C2C2C2",
              borderWidth: 0.5,
              marginVertical: Metrics.rfv(5),
            }}
          />
          <FlatList
            data={chartData}
            style={{
              backgroundColor: "#fff",
              marginHorizontal: Metrics.rfv(10),
            }}
            renderItem={({ item }) => (
              <View style={styles.chartDataCont}>
                <Text style={styles.periodNumber}>{`${item.period.substring(
                  0,
                  5
                )}**${item.period.substr(item.period.length - 5)}`}</Text>
                <View style={styles.chartNumberRow}>
                  <View
                    style={[
                      styles.numberBorder,
                      item.number == 0 && { backgroundColor: "#962f2a" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.numbers,
                        item.number == 0 && { color: "#fff" },
                      ]}
                    >
                      0
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.numberBorder,
                      item.number == 1 && { backgroundColor: "#18BB60" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.numbers,
                        item.number == 1 && { color: "#fff" },
                      ]}
                    >
                      1
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.numberBorder,
                      item.number == 2 && { backgroundColor: "#962f2a" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.numbers,
                        item.number == 2 && { color: "#fff" },
                      ]}
                    >
                      2
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.numberBorder,
                      item.number == 3 && { backgroundColor: "#18BB60" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.numbers,
                        item.number == 3 && { color: "#fff" },
                      ]}
                    >
                      3
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.numberBorder,
                      item.number == 4 && { backgroundColor: "#962f2a" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.numbers,
                        item.number == 4 && { color: "#fff" },
                      ]}
                    >
                      4
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.numberBorder,
                      item.number == 5 && { backgroundColor: "#18BB60" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.numbers,
                        item.number == 5 && { color: "#fff" },
                      ]}
                    >
                      5
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.numberBorder,
                      item.number == 6 && { backgroundColor: "#962f2a" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.numbers,
                        item.number == 6 && { color: "#fff" },
                      ]}
                    >
                      6
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.numberBorder,
                      item.number == 7 && { backgroundColor: "#18BB60" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.numbers,
                        item.number == 7 && { color: "#fff" },
                      ]}
                    >
                      7
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.numberBorder,
                      item.number == 8 && { backgroundColor: "#962f2a" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.numbers,
                        item.number == 8 && { color: "#fff" },
                      ]}
                    >
                      8
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.numberBorder,
                      item.number == 9 && { backgroundColor: "#18BB60" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.numbers,
                        item.number == 9 && { color: "#fff" },
                      ]}
                    >
                      9
                    </Text>
                  </View>
                </View>
                <View style={styles.lastRows}>
                  <View
                    style={[
                      styles.lastColumn,
                      {
                        backgroundColor: title == "Big" ? "#FEAA57" : "#6EA8F4",
                      },
                    ]}
                  >
                    <Text style={{ color: "#fff" }}>
                      {title == "Big" ? "B" : "S"}
                    </Text>
                  </View>
                  {/* <View
                  style={[styles.lastColumn, { backgroundColor: "#FEAA57", marginLeft:2 }]}
                >
                  <Text style={{ color: "#fff" }}>O</Text>
                </View> */}
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* <View style={{}}> */}
        {/* <LineChart
        data={data}
        // height={250}
        width={Dimensions.get('screen').width}
        showValuesAsDataPointsText
        // showVerticalLines
        spacing={100}
        // initialSpacing={0}
        color1="skyblue"
        // color2="orange"
        // textColor1="green"
        dataPointsHeight={6}
        // dataPointsWidth={6}
        dataPointsColor1="grey"
        // dataPointsColor2="red"
        textShiftY={-2}
        // textShiftX={-5}
        textFontSize={13}
      /> */}
        {/* </View> */}
      </View>
    );
  };

  const History = ({ item }: ItemProps) => (
    <View style={styles.historyDataView}>
      <Button
        forwordIcon={true}
        buttonStyle={styles.detailButtonView}
        full={false}
        buttonTitleStyle={styles.detailButtonTitle}
        buttonTitle="Detail"
        onButtonPress={() => {
          navigation.navigate("historyDetail");
        }}
      />
      <View style={styles.historyView}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.bgContainer} />
          <View style={styles.titleView}>
            <Text style={styles.periodView}>{item.period}</Text>
            <Text style={styles.lastLogin}>{item.lastLogin}</Text>
          </View>
        </View>

        <View style={styles.historyData}>
          <Text style={styles.result}>{item.result}</Text>
          <Text style={styles.amount}>{item.amount}</Text>
        </View>
      </View>
    </View>
  );

  const render_history = () => {
    return (
      <View style={styles.historyContainer}>
        {historyData.length > 0 ? (
          <View>
            <FlatList
              data={historyData}
              renderItem={({ item }) => <History item={item} />}
              keyExtractor={(item) => item.id}
            />
            <View style={styles.pagination}>
              <TouchableOpacity
                disabled={nextPage ? false : true}
                style={[
                  styles.backButton,
                  { backgroundColor: nextPage ? "#962f2a" : "#C2C2C2" },
                ]}
                onPress={() => {
                  page > 0 && setPage(page - 1);
                }}
              >
                <View style={{ width: 25, height: 25 }}>
                  <SvgUri
                    preserveAspectRatio="xMinYMin slice"
                    style={{ marginHorizontal: 1 }}
                    color={"#fff"}
                    width={"100%"}
                    height={"100%"}
                    uri={
                      "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123454/svgviewer-output_hqtslg.svg"
                    }
                  ></SvgUri>
                </View>
              </TouchableOpacity>
              <Text style={styles.paginationText}>{page}/10</Text>
              <TouchableOpacity
                disabled={page >= 10 ? true : false}
                style={styles.forwardButton}
                onPress={() => {
                  setNextPage(true), setPage(page + 1);
                }}
              >
                <View style={{ width: 25, height: 25 }}>
                  <SvgUri
                    preserveAspectRatio="xMinYMin slice"
                    style={{ marginHorizontal: 1 }}
                    color={"#fff"}
                    width={"100%"}
                    height={"100%"}
                    uri={
                      "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735137648/svgviewer-output_27_i5sweu.svg"
                    }
                  ></SvgUri>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <FastImage
            tintColor={"#C2C2C2"}
            style={styles.noDataImg}
            resizeMode="contain"
            source={{
              uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110078/empty-Cb98WcEH_xvbkrx.png",
            }}
          />
        )}
      </View>
    );
  };

  const formatTime = () => {
    // const hours = Math.floor(this.state.timer / 3600);
    const minutes = Math.floor((timerCount % 3600) / 60);
    const seconds = timerCount % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        bounces={false}
      >
        <GamesTitle
          onBackPress={() => navigation.pop()}
          onDepositPress={() => navigation.navigate("PaymentMethods")}
          onDetailPress={() => {
            navigation.navigate("NotificationAccount");
          }}
        />
        <WinGoComponent
          animatedScale={animatedScale}
          randomPress={randomNumber}
          onInfoPress={() => {
            setInfoModal(true);
          }}
          timer={formatTime()}
          showRemainingTime={showRemainingTime}
          selectedTimer={(item, index) => {
            var numeric = parseInt(item.time);
            switch (numeric) {
              case 30:
                setTimer("30");
                break;
              case 1:
                setTimer("60");
                break;
              case 2:
                setTimer("120");
                break;
              case 3:
                setTimer("180");
                break;
              default:
                break;
            }
            console.log("-=-=-=-=-=-=-item0=-=-=-=-=-", numeric, timerCount);
            // setTimer(numeric)
            setSelectedTimer(index);
            setSelectedTime(item.time);
          }}
          timerBackground={{ selectedTimer }}
          isSelected={selectedTimer}
          textColor={{}}
          selectedTime={selectedTime}
          onBetSizeClick={(item, index) => {
            setIndex(index);
            // setBetModal(true);
            // setTitle(item)
          }}
          betSizeIndex={index}
          greenPress={() => {
            setSelectedNumber();
            setSelectedColor("Green");
            setBetModal(true);
            setTitle("Green");
          }}
          voiletPress={() => {
            setSelectedNumber();
            setSelectedColor("Violet");
            setBetModal(true);
            setTitle("Violet");
          }}
          redPress={() => {
            setSelectedNumber();
            setSelectedColor("Red");
            setBetModal(true);
            setTitle("Red");
          }}
          gameNumberPress={(item, index) => {
            if (index == 0) {
              let colors = ["#962f2a", "#C86EFF"];
              setColorArr(colors);
            } else if (index == 5) {
              let colors = ["#18B660", "#C86EFF"];
              setColorArr(colors);
            } else if (index % 2 == 0) {
              setSelectedColor("Red");
            } else {
              setSelectedColor("Green");
            }
            setSelectedNumber(index);
            setBetModal(true);
            setTitle(`${index}`);
          }}
          bigPress={() => {
            setBetModal(true);
            setSelectedNumber();
            setSelectedSize("Big");
            setSelectedColor("yellow");
            setTitle(`Big`);
            console.log("-=-=-=-=-colorArr-=-=-=-=-", colorArr);
          }}
          smallPress={() => {
            setBetModal(true);
            setSelectedNumber();
            setSelectedSize("Small");
            setSelectedColor("blue");
            setTitle(`Small`);
          }}
        />

        <View style={styles.userHistory}>
          <Button
            buttonStyle={[
              styles.ActivityButton,
              { backgroundColor: gameHistory ? "#962f2a" : "#fff" },
            ]}
            full={false}
            buttonTitleStyle={[
              styles.ActivityButtonText,
              { color: gameHistory ? "#fff" : "#962f2a" },
            ]}
            buttonTitle={"Game history"}
            onButtonPress={() => {
              setGameHistory(true), setChart(false), setHistory(false);
            }}
          />
          <Button
            buttonStyle={[
              styles.ActivityButton,
              { backgroundColor: chart ? "#962f2a" : "#fff" },
            ]}
            full={false}
            buttonTitleStyle={[
              styles.ActivityButtonText,
              { color: chart ? "#fff" : "#962f2a" },
            ]}
            buttonTitle={"Chart"}
            onButtonPress={() => {
              setGameHistory(false), setChart(true), setHistory(false);
            }}
          />
          <Button
            buttonStyle={[
              styles.ActivityButton,
              { backgroundColor: history ? "#962f2a" : "#fff" },
            ]}
            full={false}
            buttonTitleStyle={[
              styles.ActivityButtonText,
              { color: history ? "#fff" : "#962f2a" },
            ]}
            buttonTitle={"My history"}
            onButtonPress={() => {
              setGameHistory(false), setChart(false), setHistory(true);
            }}
          />
        </View>
        {gameHistory && game_history()}
        {chart && render_chart()}
        {history && render_history()}
        {infoModal && renderGameInfo()}
        {betModal && renderBetModal()}
        {rulesModal && preSaleRules()}
        {isToast && (
          <CustomToast
            sessionExpired={true}
            downloadImg={true}
            downloadImgUrl={"Bet Succeed"}
            isToast={isToast}
            onRequestClose={() => {
              setIsToast(false);
            }}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    // paddingVertical: Metrics.rfv(20),
    paddingBottom: Metrics.rfv(50),
    // backgroundColor: Colors.Primary_100,
  },
  historyContainer: {
    // marginTop: 20,
  },
  noDataImg: {
    width: "80%",
    height: "80%",
    alignSelf: "center",
  },
  headerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  backgroundContainer: {
    height: height * 0.35,
    position: "absolute",
    borderBottomLeftRadius: Metrics.rfv(30),
    borderBottomRightRadius: Metrics.rfv(30),
    backgroundColor: "#962f2a",
    width: "100%",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: Metrics.rfv(20),
  },
  nineText: {
    fontSize: Metrics.rfv(30),
    color: "#fff",
    fontWeight: "bold",
  },
  xText: {
    fontSize: Metrics.rfv(25),
    color: "#a32324",
    fontWeight: "bold",
    marginTop: Metrics.rfv(-5),
  },
  xView: {
    backgroundColor: "#fff",
    width: Metrics.rfv(25),
    height: Metrics.rfv(25),
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Metrics.rfv(5),
  },
  walletContainer: {
    backgroundColor: Colors.white,
    paddingTop: Metrics.rfv(4),
    marginHorizontal: Metrics.rfv(10),
    borderRadius: 10,
  },
  balanceAmt: {
    textAlign: "center",
    fontSize: Metrics.rfv(20),
    fontWeight: "700",
  },
  walletBal: {
    textAlign: "center",
    fontSize: Metrics.rfv(17),
    fontWeight: "400",
  },
  withdrawButton: {
    backgroundColor: "#962f2a",
    alignSelf: "center",
    paddingVertical: Metrics.rfv(8),
    paddingHorizontal: Metrics.rfv(20),
    borderRadius: 8,
  },
  withdrawTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },

  detailButton: {
    backgroundColor: "#962f2a",
    alignSelf: "center",
    paddingVertical: Metrics.rfv(5),
    paddingHorizontal: Metrics.rfv(20),
    borderRadius: Metrics.rfv(20),
  },
  depositButton: {
    backgroundColor: "#16A34A",
    alignSelf: "center",
    paddingVertical: Metrics.rfv(8),
    paddingHorizontal: Metrics.rfv(20),
    borderRadius: 8,
    // borderRadius: 8,
  },
  depositTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  transButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 10,
    marginTop: 5,
  },
  notificationView: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    // height: 50,
    paddingHorizontal: Metrics.rfv(3),
    margin: Metrics.rfv(15),
    alignSelf: "center",
    borderRadius: Metrics.rfv(30),
    justifyContent: "space-between",
  },
  imgView: {
    width: 30,
    height: 30,
  },
  speakerImg: {
    width: "100%",
    height: "100%",
  },
  selectedLanguage: {
    marginVertical: Metrics.rfv(10),
  },
  bgContainer: {
    backgroundColor: "#962f2a",
    width: 30,
    height: 30,
    borderRadius: 8,
  },
  detailButtonTitle: {
    color: "#962f2a",
    fontWeight: "500",
    fontSize: 14,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
    textAlign: "center",
  },
  historyDataView: {
    backgroundColor: "#fff",
    marginVertical: Metrics.rfv(5),
  },

  closebuttonStyle: {
    backgroundColor: "#962f2a",
    alignSelf: "center",
    paddingVertical: Metrics.rfv(8),
    paddingHorizontal: Metrics.rfv(15),
    borderRadius: 8,
    // borderWidth: 1,
    // borderColor: "#962f2a",
    marginRight: Metrics.rfv(10),
    marginTop: Metrics.rfv(5),
    marginBottom: Metrics.rfv(10),
    flexDirection: "row",
    alignItems: "center",
  },
  detailButtonView: {
    backgroundColor: "transparent",
    alignSelf: "flex-end",
    // paddingVertical: Metrics.rfv(5),
    paddingLeft: Metrics.rfv(8),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#962f2a",
    marginRight: Metrics.rfv(10),
    marginTop: Metrics.rfv(5),
    flexDirection: "row",
    alignItems: "center",
  },
  titleView: {
    marginLeft: Metrics.rfv(10),
  },
  periodView: {
    fontSize: Metrics.rfv(12),
    color: "#000",
    fontWeight: "500",
  },
  lastLogin: {
    fontSize: Metrics.rfv(10),
    color: "#768096",
    fontWeight: "500",
  },
  historyView: {
    margin: Metrics.rfv(15),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: Metrics.rfv(5),
    backgroundColor: "#fff",
    // padding: Metrics.rfv(15),
  },
  historyData: {
    alignItems: "flex-end",
  },
  result: {
    borderColor: "#18B660",
    borderWidth: 1,
    borderRadius: Metrics.rfv(8),
    paddingHorizontal: Metrics.rfv(10),
    paddingVertical: Metrics.rfv(4),
    color: "#18B660",
    fontSize: Metrics.rfv(10),
  },
  amount: {
    fontSize: Metrics.rfv(12),
    color: "#18B660",
    fontWeight: "700",
  },
  selectedText: {
    fontSize: Metrics.rfv(14),
    fontWeight: "600",
  },
  textContainer: {
    fontSize: Metrics.rfv(12),
    fontWeight: "400",
    color: "#000",
    textAlign: "center",
    // paddingVertical: Metrics.rfv(2),
  },
  userHistory: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  listView: {
    flexDirection: "row",
    alignItems: "center",
    width: "97%",
    backgroundColor: "#fff",
    alignSelf: "center",
    // justifyContent: "space-between",
  },
  ActivityButton: {
    backgroundColor: "#fff",
    fontSize: 14,
    width: "30%",
    borderRadius: 8,
    paddingVertical: 10,
    // marginRight: 10,
  },
  ActivityButtonText: {
    color: "#962f2a",
    textAlign: "center",
    fontWeight: "800",
    fontSize: Metrics.rfv(15),
  },
  game: {},
  participantsList: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#962f2a",
    marginTop: Metrics.rfv(8),
    marginHorizontal: Metrics.rfv(10),
    padding: Metrics.rfv(10),
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: "97%",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  headings: {
    color: "#fff",
    fontSize: Metrics.rfv(15),
    fontWeight: "700",
  },
  pagination: {
    backgroundColor: "#fff",
    padding: Metrics.rfv(20),
    margin: Metrics.rfv(10),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  paginationText: {
    color: "#000",
    fontSize: Metrics.rfv(16),
  },
  backButton: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Metrics.rfv(10),
    borderRadius: 8,
  },
  forwardButton: {
    backgroundColor: "#962f2a",
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Metrics.rfv(10),
    borderRadius: 8,
  },
  gameHistoryContainer: {},
  colorStyle: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
  },
  imageView: {
    minWidth: 500,
    minHeight: "100%",
    alignItems: "center",
    justifyContent: "center",
    // position:"absolute",
    backgroundColor: "rgba(0,0,0,0.8)",
    // alignSelf: "center",
  },
  modalVisible: {
    backgroundColor: "#fff",
    width: Dimensions.get("screen").width / 1.3,

    borderRadius: Metrics.rfv(8),
  },
  infoText: {
    color: "#000",
    fontSize: Metrics.rfv(14),
  },
  infoTitle: {
    color: "#fff",
    fontSize: Metrics.rfv(21),
    textAlign: "center",
    fontWeight: "700",
  },
  titleCont: {
    backgroundColor: "#962f2a",
    paddingVertical: Metrics.rfv(8),
    borderTopLeftRadius: Metrics.rfv(8),
    borderTopRightRadius: Metrics.rfv(8),
  },
  greenButton: {
    backgroundColor: "#fff",
    width: 250,
    alignSelf: "center",
    borderRadius: Metrics.rfv(5),
    padding: Metrics.rfv(2),
    marginVertical: Metrics.rfv(5),
  },
  greenText: {
    textAlign: "center",
    color: "#000",
    fontWeight: "700",
    fontSize: Metrics.rfv(18),
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: Metrics.rfv(8),
    paddingHorizontal: Metrics.rfv(5),
  },
  balanceText: {
    color: "#000",
    fontSize: Metrics.rfv(19),
    fontWeight: "600",
  },
  sizeBetText: {
    paddingHorizontal: Metrics.rfv(10),
    borderRadius: 8,
    paddingVertical: Metrics.rfv(5),
    marginHorizontal: Metrics.rfv(3),
  },
  sizeText: {
    color: "#962f2a",
    fontSize: Metrics.rfv(12),
    fontWeight: "500",
  },
  betContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  decreaseButton: {
    backgroundColor: "#18BB60",
    // paddingVertical:Metrics.rfv(),
    paddingHorizontal: Metrics.rfv(10),
    borderRadius: Metrics.rfv(5),
  },
  minus: {
    color: "#fff",
    fontSize: Metrics.rfv(20),
  },
  quantity: {
    backgroundColor: "#F2F2F2",
    paddingHorizontal: Metrics.rfv(20),
    paddingVertical: Metrics.rfv(2),
    marginHorizontal: Metrics.rfv(5),
    borderRadius: Metrics.rfv(5),
  },
  quantityNum: {
    fontSize: Metrics.rfv(17),
    color: "#000",
  },
  rememberIcon: {
    width: 15,
    height: 15,
  },
  tickBorder: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    borderRadius: 20 / 2,
    borderColor: "#962f2a",
    borderWidth: 1,
    marginHorizontal: 10,
    // marginTop: 5,
  },
  agreeText: {
    textAlign: "right",
    fontSize: Metrics.rfv(16),
    color: "#000",
  },
  preSaleText: {
    fontSize: Metrics.rfv(13),
    color: "#962f2a",
  },
  buttonView: {
    flexDirection: "row",
    alignItems: "center",
  },
  cancelbuttonStyle: {
    backgroundColor: "#F2F2F2",
    paddingHorizontal: Metrics.rfv(15),
    paddingVertical: Metrics.rfv(10),
    width: "30%",
  },
  cancelButtonText: {
    color: "#000",
    fontSize: Metrics.rfv(16),
    textAlign: "center",
    fontWeight: "600",
  },
  rulesButtonStyle: {
    backgroundColor: "#962f2a",
    paddingHorizontal: Metrics.rfv(15),
    paddingVertical: Metrics.rfv(10),
    width: "50%",
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 8,
  },
  rulesButtonText: {
    color: "#000",
    fontSize: Metrics.rfv(18),
    textAlign: "center",
    fontWeight: "500",
  },
  nextbuttonStyle: {
    backgroundColor: "#18BB60",
    paddingHorizontal: Metrics.rfv(15),
    paddingVertical: Metrics.rfv(10),
    width: "70%",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: Metrics.rfv(16),
    textAlign: "center",
    fontWeight: "600",
  },
  preSalesRule: {
    fontSize: Metrics.rfv(15),
    textAlign: "center",
    color: "#000",
    padding: 8,
    lineHeight: 40,
  },
  rulesTitle: {
    color: "#000",
    fontSize: Metrics.rfv(21),
    backgroundColor: "#962f2a",
    textAlign: "center",
    fontWeight: "500",
    padding: Metrics.rfv(10),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  rulesModalView: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginHorizontal: 35,
    // alignSelf:"center"
  },
  rulesModalContainer: {
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    minHeight: "100%",
    position: "absolute",
    left: 0,
    right: 0,
  },
  chartDataCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: Metrics.rfv(8),
    marginVertical: Metrics.rfv(10),
  },
  periodNumber: {
    textAlign: "left",
    fontSize: Metrics.rfv(14),
    color: "#000",
  },
  chartNumberRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  numbers: {
    // textAlign: "left",
    fontSize: Metrics.rfv(12),
  },
  numberBorder: {
    borderColor: "#C2C2C2",
    borderWidth: 1,
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    alignItems: "center",
    marginHorizontal: 1,
    // marginHorizontal: Metrics.rfv(2),
  },
  lastColumn: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    alignItems: "center",
    backgroundColor: "#6EA8F4",
  },
  lastRows: {
    flexDirection: "row",
    alignItems: "center",
  },
  chartTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  periodTitle: {
    backgroundColor: "#962f2a",
    padding: 15,
    width: "47%",
    textAlign: "center",
    color: "#fff",
    fontSize: Metrics.rfv(12),
    borderTopLeftRadius: 8,
  },
  numberTitle: {
    backgroundColor: "#962f2a",
    padding: 15,
    width: "47%",
    textAlign: "center",
    color: "#fff",
    fontSize: Metrics.rfv(12),
    borderTopRightRadius: 8,
  },
  winningInfo: {
    fontSize: Metrics.rfv(12),
    color: "#000",
  },
  periodNum: {
    borderColor: "#C2C2C2",
    borderWidth: 1,
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    alignItems: "center",
    marginHorizontal: 1,
    marginHorizontal: Metrics.rfv(2),
  },
});

export default winGo;
