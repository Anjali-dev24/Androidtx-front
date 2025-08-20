import React, { createRef, useEffect, useRef, useState } from "react";
import {
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
import { SvgUri } from "react-native-svg";
import Button from "../../../Components/Button";
import { Colors } from "../../../Helpers/Colors";
import { Marquee } from "@animatereactnative/marquee";
import FastImage from "react-native-fast-image";
import { color } from "react-native-elements/dist/helpers";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import {
  arrayValue,
  balanceString,
  betNumbers,
  betSize,
  diceImg,
  historyData,
  K3Timer,
  notifications,
  numberPair,
  participants,
  threeOddNum,
  timers,
} from "../../../constant/data";
import KChart from "../../../Components/KChart";
import K3Winningtable from "../../../Components/K3Winningtable";
import GamesTitle from "../../../Components/GamesTitle";
import LinearGradient from "react-native-linear-gradient";
import CustomToast from "../../../Components/CustomToast";
import GameLose from "../../../Components/GameLose";
import * as AudioHelper from "../../../service";
import { create } from "zustand";

const screenHeight = Dimensions.get('window').height;
const { width, height } = Dimensions.get("window");
const K3Game = () => {
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  const [gameHistory, setGameHistory] = useState(true);
  const [chart, setChart] = useState(false);
  const [history, setHistory] = useState(false);
  const [isTotal, setIsTotal] = useState(true);
  const [twoSame, setTwoSame] = useState(false);
  const [threeSame, setThreeSame] = useState(false);
  const [different, setDifferent] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState(0);
  const navigation = useNavigation();
  const [infoModal, setInfoModal] = useState(false);
  const [timerCount, setTimer] = useState(60);
  const [showRemainingTime, setShowRemainingTime] = useState(false);
  const [rulesModal, setRulesModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [balanceIndex, setBalanceIndex] = useState(0);
  const [checked, setChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [betSizeItem, setBetSizeItem] = useState("1");
  const [selectedItem, setSelectedItem] = useState("1");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [pairNum, setPairNum] = useState("");
  const [singleNum, setSingleNum] = useState("");
  const [singleNumIndex, setSingleNumIndex] = useState();
  const [pairNumIndex, setPairNumIndex] = useState();
  const [betModal, setBetModal] = useState(false);
  const [title, setTitle] = useState();
  const [numberIndex, setNumberIndex] = useState();
  const [quantity, setQuantity] = useState(1);
  const [betSizeIndex, setBetSizeIndex] = useState(0);
  const [anyThree, setAnyThree] = useState(false);
  const [isShowAgain, setIsShowAgain] = useState(false);
  const [isSizeButton, setIsSizeButton] = useState(false);
  const [pairButton, setPairButton] = useState(false);
  const [isToast, setIsToast] = useState(false);
  const [numberList, setNumberList] = useState(threeOddNum);
  const [list, setList] = useState([]);
  const [selectedOddNum, setSelectedOddNum] = useState(0);
  const flatListRef = React.createRef()
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
let index=0;
const totalIndex = diceImg.length - 1;

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

  const Item = ({ item }: ItemProps) => (
    <TouchableOpacity
      onPress={(item, index) => {}}
      style={styles.selectedLanguage}
    >
      <Text style={styles.selectedText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const RenderList = ({ item }: ItemProps) => {
    return (
      <View style={styles.listView}>
        <Text style={[styles.textContainer, { width: "33%" }]}>
          {item.period}
        </Text>
        <Text
          style={[
            styles.textContainer,
            { width: "22%", fontSize: Metrics.rfv(33) },
          ]}
        >
          {item.number}
        </Text>
        <Text style={[styles.textContainer, { width: "22%" }]}>
          {item.size}
        </Text>
        <Text
          style={[
            styles.textContainer,
            { width: "22%", fontSize: Metrics.rfv(33) },
          ]}
        >
          {item.color}
        </Text>
      </View>
    );
  };

 useEffect(() => {
    const interval = setInterval(() => {
      var numeric = parseInt(selectedTimer);
      if (timerCount == 1) {
        switch (numeric) {
          case 1:
            setTimer("60");
            break;
          case 3:
            setTimer("180");
            break;
          case 5:
            setTimer("300");
            break;
          case 10:
            setTimer("600");
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

  const game_history = () => {
    return (
      <View>
        <K3Winningtable />
      </View>
    );
  };

  const render_chart = () => {
    return (
      <View style={{ marginVertical: Metrics.rfv(15) }}>
        <KChart />
        {/* <K3Winningtable/> */}
        {/* <K3/> */}
      </View>
    );
  };

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

  const NumberArray = ({ item, index }: ItemProps) => {
    return (
      <View style={styles.imagesView}>
        <TouchableOpacity
          onPress={() => {
            setBetModal(true),
              index % 2 ? setSelectedColor("Red") : setSelectedColor("Green"),
              setTitle(item.number);
          }}
          style={styles.numberImg}
        >
          {index % 2 ? (
            <FastImage
              style={styles.images}
              source={{
                uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110152/redBall-fd34b99e_jjuyce.png",
              }}
            />
          ) : (
            <FastImage
              style={styles.images}
              source={{
                uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110151/greenBall-b7685130_mryrs2.png",
              }}
            />
          )}
          <Text
            style={[
              styles.numberText,
              {
                color: index % 2 ? "#d23f3e" : "#18BB60",
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                textAlign: "center",
                textAlignVertical: "center",
              },
            ]}
          >
            {item.number}
          </Text>
        </TouchableOpacity>
        <Text style={styles.sizeText}>{item.size}</Text>
      </View>
    );
  };

  const total_dice = () => {
    return (
      <View>
        <View
          style={{ flexDirection: "row", width: "95%", alignSelf: "center" }}
        >
          <FlatList
            numColumns={4}
            data={betNumbers}
            renderItem={({ item, index }) => (
              <NumberArray item={item} index={index} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={[styles.betSizeView]}>
          <TouchableOpacity
            onPress={() => {
              setBetModal(true), setSelectedColor("yellow");
              setTitle("Big");
              setIsSizeButton(true);
            }}
            style={[styles.betSizeContainer, { backgroundColor: "#FEAA57" }]}
          >
            <Text numberOfLines={2} adjustsFontSizeToFit style={styles.bigBet}>
              Big{"\n"}2X
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setBetModal(true), setSelectedColor("blue");
              setTitle("Small");
              setIsSizeButton(true);
            }}
            style={[
              styles.betSizeContainer,
              {
                borderLeftColor: "#fff",
                borderLeftWidth: 1,
                backgroundColor: "#6EA8F4",
              },
            ]}
          >
            <Text numberOfLines={2} adjustsFontSizeToFit style={styles.bigBet}>
              Small{"\n"}2X
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setBetModal(true), setSelectedColor("Red");
              setTitle("Odd");
              setIsSizeButton(true);
            }}
            style={[
              styles.betSizeContainer,
              {
                borderLeftColor: "#fff",
                borderLeftWidth: 1,
                backgroundColor: "#FB5B5B",
              },
            ]}
          >
            <Text numberOfLines={2} adjustsFontSizeToFit style={styles.bigBet}>
              Odd{"\n"}2X
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setBetModal(true), setSelectedColor("Green");
              setTitle("Even");
              setIsSizeButton(true);
            }}
            style={[
              styles.betSizeContainer,
              {
                borderLeftColor: "#fff",
                borderLeftWidth: 1,
                backgroundColor: "#18B660",
              },
            ]}
          >
            <Text numberOfLines={2} adjustsFontSizeToFit style={styles.bigBet}>
              Even{"\n"}2X
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const two_same = () => {
    return (
      <View style={styles.twoNumberContainer}>
        <Text style={styles.matchingNumberView}>
          2 matching numbers: odds(13.54)
        </Text>
        <View style={styles.oddNumber}>
          {arrayValue.map((item) => (
            <TouchableOpacity
              onPress={() => {
                setBetModal(true), setSelectedColor("Violet");
                setTitle(item);
              }}
              style={styles.oddNumberView}
            >
              <Text style={styles.oddNumberText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.matchingNumberView}>
          A pair of unique numbers: odds(13.54)
        </Text>
        <View style={styles.oddNumber}>
          {arrayValue.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                // console.log('-=-=-=-=--firstChar-=-=-=-firstChar-=-=-', firstChar, firstChar!=singleNum,  secValue);
                if (singleNum) {
                  let firstChar = item.charAt(0);
                  if (firstChar != singleNum) {
                    setBetModal(true);
                  } else {
                    setSingleNum("");
                    setSingleNumIndex();
                  }
                }
                // singleNum && firstChar!=singleNum && setBetModal(true)
                setPairButton(true),
                  setPairNum(item),
                  // singleNum && setBetModal(true);
                  setPairNumIndex(index);
              }}
              style={[
                styles.oddNumberView,
                {
                  backgroundColor:
                    pairNumIndex == index ? "#962f2a" : "#f4b2b0",
                },
              ]}
            >
              <Text style={styles.oddNumberText}>{item}</Text>
              {pairNumIndex == index && (
                <View style={styles.tickImg}>
                  <FastImage
                    tintColor={"#962f2a"}
                    style={{ width: "80%", height: "80%" }}
                    source={{
                      uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1736847312/toastTick_eiwrtj.png",
                    }}
                  />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.singleNumber}>
          {numberPair.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                setPairButton(true), setSingleNum(item);

                if (pairNum) {
                  let secValue = pairNum.charAt(0);
                  console.log(
                    "-=-=-=-=--item-=-=-=-firstChar-=-=-",
                    pairNum,
                    pairNum.charAt(0)
                  );
                  if (item != secValue) {
                    setBetModal(true);
                  } else {
                    setPairNum("");
                    setPairNumIndex();
                  }
                }
                // pairNum && item!=pairNum && setBetModal(true)
                setSingleNumIndex(index);
              }}
              style={[
                styles.oddNumberView,
                {
                  backgroundColor:
                    singleNumIndex == index ? "#18BB60" : "#aad9b4",
                },
              ]}
            >
              <Text style={styles.oddNumberText}>{item}</Text>
              {singleNumIndex == index && (
                <View style={styles.tickImg}>
                  <FastImage
                    tintColor={"#aad9b4"}
                    style={{ width: "80%", height: "80%" }}
                    source={{
                      uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1736847312/toastTick_eiwrtj.png",
                    }}
                  />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const three_same = () => {
    return (
      <View style={styles.twoNumberContainer}>
        <Text style={styles.matchingNumberView}>
          3 of the same number: odds: odds(13.54)
        </Text>
        <View style={styles.oddNumber}>
          {arrayValue.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                setBetModal(true);
                setTitle(item);
                setPairNumIndex(index);
              }}
              style={[
                styles.oddNumberView,
                {
                  backgroundColor:
                    pairNumIndex == index ? "#C86EFF" : "#ddb9fb",
                },
              ]}
            >
              <Text style={styles.oddNumberText}>{item}</Text>
              {pairNumIndex == index && (
                <View style={styles.tickImg}>
                  <FastImage
                    tintColor={"#962f2a"}
                    style={{ width: "80%", height: "80%" }}
                    source={{
                      uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1736847312/toastTick_eiwrtj.png",
                    }}
                  />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.matchingNumberView}>
          Any 3 of the same number: odds(13.54)
        </Text>
        <TouchableOpacity
          onPress={() => {
            setBetModal(true);
            setTitle("Any 3 of the same number: odds");
            setAnyThree(true);
          }}
          style={[
            styles.sameNumberButton,
            { backgroundColor: anyThree ? "#962f2a" : "#f4b2b0" },
          ]}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.numberButtonText}
          >
            Any 3 of the same number: odds
          </Text>
          {anyThree && (
            <View style={styles.tickImg}>
              <FastImage
                tintColor={"#962f2a"}
                style={{ width: "80%", height: "80%" }}
                source={{
                  uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1736847312/toastTick_eiwrtj.png",
                }}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const onPressHandler = (id) => {
    let renderData = [...numberList];
    for (let data of renderData) {
      if (data.id == id) {
        data.selected = data.selected == null ? true : !data.selected;
        // data.count = data.selected == null ? data.count++ :  data.count--;
        break;
      }
    }
    const count = renderData.filter((value) => value.selected).length;
    count >= 3 && setBetModal(true);
    // var index = renderData.findIndex(function(person) {
    //   return person.selected == true
    // });
    console.log(
      "-=-=-=-=-=-renderData-=-=-=-renderData=-=-=-=-=-",
      count,
      renderData
    );

    // setIsTotal(count)
    setSelectedOddNum(count);
    setNumberList(renderData);
  };

  const different_view = () => {
    return (
      <View style={styles.twoNumberContainer}>
        <Text style={styles.matchingNumberView}>
          3 different numbers: odds(13.54)
        </Text>
        <View style={styles.oddNumber}>
          {threeOddNum.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                // setBetModal(true);
                setNumberIndex(index);
                setTitle(item.number);
                onPressHandler(item.id);
                const result = threeOddNum.filter((word) => word.selected);
                console.log("-=1111111-==", result, list.length>0);
                setList(result);
              }}
              style={[
                styles.oddNumberView,
                { backgroundColor: item.selected ? "#C86EFF" : "#ddb9fb",  },
              ]}
            >
              <Text style={styles.oddNumberText}>{item.id}</Text>
              {item.selected && (
                <View style={styles.tickImg}>
                  <FastImage
                    tintColor={"#C86EFF"}
                    style={{ width: "80%", height: "80%" }}
                    source={{
                      uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1736847312/toastTick_eiwrtj.png",
                    }}
                  />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.matchingNumberView}>
          3 continuous numbers: odds(13.54)
        </Text>
        <TouchableOpacity style={styles.sameNumberButton}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.numberButtonText}
          >
            3 continuous numbers
          </Text>
        </TouchableOpacity>
        <Text style={styles.matchingNumberView}>
          2 different numbers: odds(13.54)
        </Text>
        <View style={styles.oddNumber}>
          {numberPair.map((item) => (
            <TouchableOpacity style={styles.oddNumberView}>
              <Text style={styles.oddNumberText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
              <Text style={styles.infoText}>Sum Value</Text>
              <Text style={[styles.infoText, { fontSize: Metrics.rfv(16) }]}>
                Place a bet on the sum of three numbers
              </Text>
              <Text style={styles.infoText}>Choose 3 same number all</Text>
              <Text style={styles.infoText}>
                For all the same three numbers（111、222、…、666）Make an
                all-inclusive bet
              </Text>
              <Text style={styles.infoText}>Choose 3 same number single</Text>
              <Text style={styles.infoText}>
                From all the same three numbers（111、…、666）Choose a group of
                numbers in any of them to place bets
              </Text>
              <Text style={styles.infoText}>Choose 2 Same Multiple</Text>
              <Text style={styles.infoText}>
                Place a bet on two designated same numbers and an arbitrary
                number among the three numbers
              </Text>
              <Text style={styles.infoText}>Choose 2 Same Single</Text>
              <Text style={styles.infoText}>
                Place a bet on two designated same numbers and a designated
                different number among the three numbers
              </Text>
              <Text style={styles.infoText}>3 numbers different</Text>
              <Text style={styles.infoText}>
                Place a bet on three different numbers
              </Text>
              <Text style={styles.infoText}>2 numbers different</Text>
              <Text style={styles.infoText}>
                Place a bet on two designated different numbers and an arbitrary
                number among the three numbers
              </Text>
              <Text style={styles.infoText}>
                Choose 3 Consecutive number all
              </Text>
              <Text style={styles.infoText}>
                For all three consecutive numbers（123、234、345、456）Place a
                bet
              </Text>
              <Text style={styles.infoText}>
                Description of winning and odds:
              </Text>
              <Text style={styles.infoText}>Sum Value</Text>
              <Text style={styles.infoText}>
                A bet with the same opening number and value is the winning
              </Text>
              <Text style={styles.infoText}>Choose 3 same number all</Text>
              <Text style={styles.infoText}>
                If the opening numbers are any three of the same number, it is
                the winning
              </Text>
              <Text style={styles.infoText}>Choose 3 same number single</Text>
              <Text style={styles.infoText}>
                A bet that is exactly the same as the opening number is the
                winning
              </Text>
              <Text style={styles.infoText}>Choose 2 Same Multiple</Text>
              <Text style={styles.infoText}>
                The same number as the two same numbers in the opening number
                (except for the three same numbers) is the winning
              </Text>
              <Text style={styles.infoText}>Choose 2 Same Single</Text>
              <Text style={styles.infoText}>
                A bet that is exactly the same as the opening number is the
                winning
              </Text>
              <Text style={styles.infoText}>3 numbers different</Text>
              <Text style={styles.infoText}>
                A bet that is exactly the same as the opening number is the
                winning
              </Text>
              <Text style={styles.infoText}>2 numbers different</Text>
              <Text style={styles.infoText}>
                The same as the two arbitrary numbers in the opening number is
                the winning
              </Text>
              <Text style={styles.infoText}>
                Choose 3 Consecutive number all
              </Text>
              <Text style={styles.infoText}>
                If the opening numbers are any three consecutive numbers, it is
                the winning
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

  const renderTimerView = () => {
    return (
      <View style={styles.timerContainer}>
        <Text style={[styles.remainingTimer, { marginRight: Metrics.rfv(15) }]}>
          {timerCount.toString().length > 1
            ? timerCount?.toString()?.substring(0, 1)
            : "0"}
        </Text>
        <Text style={[styles.remainingTimer, { marginLeft: Metrics.rfv(15) }]}>
          {timerCount % 10}
        </Text>
      </View>
    );
  };

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
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              colors={["#962f2a", "#ba4940"]}
              style={{
                padding: Metrics.rfv(10),
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                backgroundColor: "#962f2a",
              }}
            >
              <Text style={styles.rulesTitle}>Pre-Sale rules</Text>
            </LinearGradient>

            <ScrollView style={{ height: Dimensions.get("screen").height / 2 }}>
              <Text style={styles.preSalesRule}>
                "In order to protect the legitimate rights and interests of
                users participating in the pre-sale and maintain the normal
                operating order of the pre-sale, these rules are formulated in
                accordance with relevant agreements and laws and regulations.
                country Chapter 1 Definition1.1 Pre-sale definition: refers to a
                sales model in which a seller offers a bundle of a product or
                service, collects consumer orders through product tools before
                selling, and makes it available to customers. consumers of goods
                and/or services by prior agreement1.2 Presale mode is "deposit"
                mode. "Consignment" refers to the pre-delivery of a fixed number
                of items prior to sale. "Deposit" Scam Join mini games for a
                chance to win more deposits. Deposits can be exchanged directly
                for goods. Deposit is not refundable.1.3 Pre-sale product: A
                product that is shipped by the seller using the pre-sale product
                tool. Only highlight the word presale on the product name or
                product detail page, and products that do not use the presale
                product tool are not presale. 1.4 Pre-sale system: refers to the
                system product tool that helps sellers to sell samples before
                selling.1.5 Product price before selling: is the selling price
                of the product before selling. The price of pre-sale items
                consists of two parts: deposit and final payment. "
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

  // useEffect(() => {
  //   if (countdownStarted && eventDate) {
  //     const countdownInterval = setInterval(() => {
  //       const currentTime = new Date().getTime();
  //       const eventTime = new Date(eventDate).getTime();
  //       let remainingTime = eventTime - currentTime;

  //       if (remainingTime <= 0) {
  //         remainingTime = 0;
  //         clearInterval(countdownInterval);
  //         alert("Countdown complete!");
  //       }

  //       setTimeRemaining(remainingTime);
  //     }, 1000);

  //     return () => clearInterval(countdownInterval);
  //   }
  // }, [countdownStarted, eventDate, timeRemaining]);

  // const formatTime = (time) => {
  //   const seconds = Math.floor((time / 1000) % 60);
  //   const minutes = Math.floor((time / (1000 * 60)) % 60);
  //   const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  //   const days = Math.floor(time / (1000 * 60 * 60 * 24));

  //   return (
  //     <div className="countdown-display">
  //       <div className="countdown-value">
  //         {days.toString().padStart(2, "0")} <span>days</span>
  //       </div>
  //       <div className="countdown-value">
  //         {hours.toString().padStart(2, "0")} <span> hours</span>
  //       </div>
  //       <div className="countdown-value">
  //         {minutes.toString().padStart(2, "0")} <span>minutes</span>
  //       </div>
  //       <div className="countdown-value">
  //         {seconds.toString().padStart(2, "0")} <span>seconds</span>
  //       </div>
  //     </div>
  //   );
  // };

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
              <View style={styles.greenButton}>
                <Text style={[styles.greenText, {}]}>Total :</Text>
              </View>
              {pairNum && singleNum ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={[
                      styles.doubleNumStyle,
                      {
                        backgroundColor: "#962f2a",
                        borderTopLeftRadius: 8,
                        borderBottomLeftRadius: 8,
                        marginLeft: 10,
                      },
                    ]}
                  >
                    <Text style={[styles.greenText, { color: "#fff" }]}>
                      {pairNum}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.doubleNumStyle,
                      {
                        backgroundColor: "#18BB60",
                        borderTopRightRadius: 8,
                        borderBottomEndRadius: 8,
                        marginRight: 10,
                      },
                    ]}
                  >
                    <Text style={[styles.greenText, { color: "#fff" }]}>
                      {singleNum}
                    </Text>
                  </View>
                </View>
              ) : anyThree ? (
                <View
                  style={[
                    styles.betSizeModalTitle,
                    {
                      backgroundColor: "#962f2a",
                    },
                  ]}
                >
                  <Text style={[styles.greenText, { color: "#fff" }]}>
                    {title}
                  </Text>
                </View>
              ) : list.length>0?<View>
              <Text style={styles.matchingNumberView}>
                3 different numbers: odds(13.54)
              </Text>
              <View style={styles.listNum}>
                {list.map((item, index) => (
                  <View style={[styles.listNumView]}>
                    <Text style={styles.listNumText}>{item.id}</Text>
                  </View>
                ))}
              </View>
            </View>:(
                <View
                  style={[
                    !isSizeButton
                      ? styles.betModalTitle
                      : styles.betSizeModalTitle,
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
                  <Text style={[styles.greenText, { color: "#fff" }]}>
                    {title}
                  </Text>
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
                            balanceIndex == index ? "#962f2a" : "#F7F8FF",
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
                      // setSelectedIndex(-1);
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
                      // setSelectedIndex(-1);
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
                          betSizeIndex == index ? "#962f2a" : "#F7F8FF",
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
                    setIsSizeButton(false);
                    setPairNum(false);
                    setSingleNum(false);
                    setPairNumIndex();
                    setSingleNumIndex();
                    setAnyThree(false);
                    threeOddNum.forEach(function (i) {
                      delete i.selected;
                    });
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
                        setTimeout(() => {
                          setIsModalOpen(true);
                        }, 2000);
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

  const RPH = (percentage) => {
    return (percentage / 100) * screenHeight; 
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

        <View style={{ paddingHorizontal: Metrics.rfv(10) }}>
          <View style={styles.betTimings}>
            {K3Timer.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    var numeric = parseInt(item.time);
                    switch (numeric) {
                      case 1:
                        setTimer("60");
                        break;
                      case 3:
                        setTimer("180");
                        break;
                      case 5:
                        setTimer("300");
                        break;
                      case 10:
                        setTimer("600");
                        break;
                      default:
                        break;
                    }
                    console.log('-=-=-=-=-=-=-=-=-=-000000-=-=-=-=-=-=-=-',numeric, index, item.time );
                    
                    setSelectedIndex(index);
                    setSelectedTimer(item.time)
                  }}
                  style={[
                    styles.timerView,
                    {
                      backgroundColor:
                      selectedIndex === index ? "#962f2a" : "#fff",
                    },
                  ]}
                >
                  <FastImage
                    resizeMode="contain"
                    source={
                      selectedIndex === index
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
                      { color: selectedIndex === index ? "#fff" : "#000" },
                    ]}
                  >
                    K3 Lotre {"\n"} {item.time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: Metrics.rfv(10),
              marginTop:Metrics.rfv(8),
              borderRadius:Metrics.rfv(10),
              paddingVertical:5
            }}
          >
            <View style={styles.k3Period}>
              <Text style={styles.period}>Period</Text>
              <TouchableOpacity
                onPress={() => {
                  setInfoModal(true);
                }}
                style={styles.instructionView}
              >
                <Text style={styles.instruction}>How to play</Text>
              </TouchableOpacity>

              <Text style={styles.remainingTime}>Time remaining</Text>
            </View>
            <View style={styles.periodTimer}>
              <Text style={styles.periodNumber}>76567565765755</Text>
              <View style={styles.winGoTime}>
                <Text style={[styles.runningTime,{letterSpacing:8}]}>{formatTime()}</Text>
              {/* {formatTime(timeRemaining)} */}
                {/* <Text style={styles.runningTime}>0</Text>
                <Text style={styles.runningTime}>0</Text>
                <Text style={styles.runningTime}>:</Text>
                <Text style={styles.runningTime}>
                  {timerCount.toString().length > 1
                    ? timerCount?.toString()?.substring(0, 1)
                    : "0"}
                </Text>
                <Text style={styles.runningTime}>{timerCount % 10}</Text> */}
              </View>
            </View>
            <View style={[styles.diceContainer,{height:140}]}>
              {/* <FlatList
                 numColumns={3}
                 data={diceImg}
                 renderItem={({ item, index }) => (
                  <View style={styles.diceImgView}>
                  <FastImage
                    resizeMode="contain"
                    style={styles.diceImg}
                    source={{
                      uri: item.img,
                      priority: FastImage.priority.low,
                    }}
                  />
                </View>
                 )}
                 keyExtractor={(item) => item.id}
              /> */}
              <View style={styles.diceImgView}>
                <FastImage
                  resizeMode="contain"
                  style={styles.diceImg}
                  source={{
                    uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110156/num4-6bed6212_rjkqnf.png",
                    priority: FastImage.priority.low,
                  }}
                />
              </View>
              <View
                style={[
                  styles.diceImgView,
                  { marginHorizontal: Metrics.rfv(5) },
                ]}
              >
                <FastImage
                  resizeMode="contain"
                  style={styles.diceImg}
                  source={{
                    uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110157/num2-96e175aa_ugewtt.png",
                    priority: FastImage.priority.low,
                  }}
                />
              </View>
              <View style={styles.diceImgView}>
                <FastImage
                  resizeMode="contain"
                  style={styles.diceImg}
                  source={{
                    uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110157/num1-9f16525b_dbc9yy.png",
                    priority: FastImage.priority.low,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: Metrics.rfv(10),
            backgroundColor: "#fff",
            marginHorizontal: 10,
            marginVertical: 8,
            borderRadius: 10,
          }}
        >
          <View style={styles.diceTypeView}>
            <TouchableOpacity
              onPress={() => {
                setTwoSame(false);
                setThreeSame(false);
                setDifferent(false);
                setIsTotal(true);
                setList([])
              }}
              style={[
                styles.diceTableView,
                { backgroundColor: isTotal ? "#F95959" : "#C2C2C2" },
              ]}
            >
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={[
                  styles.diceTable,
                  { color: isTotal ? "#fff" : "#768096" },
                ]}
              >
                Total
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsTotal(false);
                setThreeSame(false);
                setDifferent(false);
                setTwoSame(true);
                setList([])
              }}
              style={[
                styles.diceTableView,
                {
                  borderLeftColor: "#fff",
                  borderLeftWidth: 1,
                  backgroundColor: twoSame ? "#F95959" : "#C2C2C2",
                },
              ]}
            >
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={[
                  styles.diceTable,
                  { color: twoSame ? "#fff" : "#768096" },
                ]}
              >
                2 same
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsTotal(false);
                setDifferent(false);
                setTwoSame(false);
                setThreeSame(true);
                 setList([])
              }}
              style={[
                styles.diceTableView,
                {
                  borderLeftColor: "#fff",
                  borderLeftWidth: 1,
                  backgroundColor: threeSame ? "#F95959" : "#C2C2C2",
                },
              ]}
            >
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={[
                  styles.diceTable,
                  { color: threeSame ? "#fff" : "#768096" },
                ]}
              >
                3 same
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsTotal(false);
                setThreeSame(false);
                setTwoSame(false);
                setDifferent(true);
              }}
              style={[
                styles.diceTableView,
                {
                  borderLeftColor: "#fff",
                  borderLeftWidth: 1,
                  backgroundColor: different ? "#F95959" : "#C2C2C2",
                },
              ]}
            >
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={[
                  styles.diceTable,
                  { color: different ? "#fff" : "#768096" },
                ]}
              >
                Different
              </Text>
            </TouchableOpacity>
          </View>
          {isTotal && total_dice()}
          {twoSame && two_same()}
          {threeSame && three_same()}
          {different && different_view()}
          {showRemainingTime && renderTimerView()}
        </View>

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
        <GameLose
          isModalOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onCheckPress={() => {
            setChecked(checked);
          }}
          onSetTimerPress={() => {
            setIsShowAgain(!isShowAgain);
          }}
          isShowAgain={isShowAgain}
        />
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
    height: height * 0.45,
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
    fontSize: Metrics.rfv(40),
    color: "#fff",
    fontWeight: "bold",
  },
  xText: {
    fontSize: Metrics.rfv(30),
    color: "#a32324",
    fontWeight: "bold",
    marginTop: Metrics.rfv(-5),
  },
  xView: {
    backgroundColor: "#fff",
    width: Metrics.rfv(35),
    height: Metrics.rfv(35),
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Metrics.rfv(5),
  },
  walletContainer: {
    backgroundColor: Colors.white,
    padding: Metrics.rfv(10),
    margin: Metrics.rfv(10),
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
    marginVertical: 20,
  },
  notificationView: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    height: 50,
    paddingHorizontal: Metrics.rfv(10),
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
  historyDataView: {
    backgroundColor: "#fff",
    marginVertical: Metrics.rfv(5),
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
    fontSize: Metrics.rfv(12),
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
    fontSize: Metrics.rfv(16),
    fontWeight: "400",
    color: "#000",
    textAlign: "center",
    paddingVertical: Metrics.rfv(15),
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
    marginTop: Metrics.rfv(20),
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
  betTimings: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
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
    width: "100%",
    alignSelf: "center",
    height: 150,
    marginVertical: Metrics.rfv(15),
  },
  k3Period: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    // marginTop: Metrics.rfv(10),
    // paddingHorizontal:Metrics.rfv(10)
  },
  periodTimer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width: "100%",
    // marginTop: Metrics.rfv(10),
  },
  period: {
    color: "#768096",
    fontSize: Metrics.rfv(16),
  },
  instruction: {
    color: "#962f2a",
    fontSize: Metrics.rfv(14),
  },
  remainingTime: {
    color: "#768096",
    fontSize: Metrics.rfv(16),
  },
  remainingTimer: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: Metrics.rfv(150),
    backgroundColor: "#fff",
    paddingHorizontal: Metrics.rfv(25),
    color: "#962f2a",
    borderRadius: 15,
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
  instructionView: {
    borderWidth: 1,
    borderColor: "#962f2a",
    paddingHorizontal: Metrics.rfv(15),
    paddingVertical: Metrics.rfv(5),
    borderRadius: Metrics.rfv(20),
  },
  periodNumber: {
    color: "#000",
    fontSize: Metrics.rfv(24),
    fontWeight: "700",
    marginVertical: Metrics.rfv(10),
    textAlign: "left",
  },
  winGoTime: {
    flexDirection: "row",
    alignItems: "center",
  },
  runningTime: {
    backgroundColor: "#fff",
    padding: 5,
    marginHorizontal: 2,
    fontWeight: "900",
    fontSize: Metrics.rfv(24),
  },
  diceContainer: {
    borderColor: "#00B977",
    borderWidth: 10,
    padding: Metrics.rfv(8),
    flexDirection: "row",
    alignItems: "center",
    // marginTop: Metrics.rfv(15),
    alignSelf: "center",
    backgroundColor: "#163b28",
    justifyContent: "space-between",
    
  },
  diceImg: {
    width: "90%",
    height: "90%",
    alignSelf: "center",
  },
  diceImgView: {
    width: Dimensions.get("screen").width / 3.8,
    height: 100,
    backgroundColor: "grey",
    borderRadius: Metrics.rfv(8),
  },
  diceTypeView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Metrics.rfv(10),
    width: "100%",
  },
  diceTable: {
    fontSize: Metrics.rfv(14),
    color: "#768096",
    textAlign: "center",
    fontWeight: "700",
  },
  bigBet: {
    fontSize: Metrics.rfv(14),
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
  diceTableView: {
    padding: Metrics.rfv(15),
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: "25%",
  },
  betSizeContainer: {
    backgroundColor: "#C2C2C2",
    padding: Metrics.rfv(15),
    borderRadius: 8,
    width: "25%",
  },
  numberImg: {
    width: 60,
    height: 60,
  },
  images: {
    width: "100%",
    height: "100%",
  },
  numberText: {
    fontSize: Metrics.rfv(23),
    fontWeight: "700",
  },
  imagesView: {
    width: "25%",
    alignItems: "center",
    padding: Metrics.rfv(10),
  },
  sizeText: {
    textAlign: "center",
    color: "#768096",
    fontWeight: "700",
    fontSize: Metrics.rfv(14),
  },
  betSizeView: {
    margin: Metrics.rfv(10),
    width: "93%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginTop: Metrics.rfv(15),
  },
  twoNumberContainer: {
    backgroundColor: "#fff",
    // marginHorizontal: Metrics.rfv(15),
    paddingVertical: Metrics.rfv(10),
    borderRadius: 8,
  },
  matchingNumberView: {
    color: "#000",
    fontSize: Metrics.rfv(17),
    fontWeight: "500",
    marginHorizontal: Metrics.rfv(10),
  },
  oddNumber: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Metrics.rfv(10),
    width: "100%",
    alignSelf: "flex-start",
    justifyContent: "center",
  },
  listNum: {
    flexDirection: "row",
    alignItems: "center",
    margin: Metrics.rfv(10),
    // width: "100%",
    alignSelf: "flex-start",
    justifyContent: "center",
  },
  listNumView: {
    backgroundColor: "#C86EFF",
    borderRadius: 10,
    marginHorizontal: Metrics.rfv(2),
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  oddNumberView: {
    backgroundColor: "#ddb9fb",
    // paddingHorizontal: Metrics.rfv(15),
    // paddingVertical: Metrics.rfv(15),
    borderRadius: 10,
    marginHorizontal: Metrics.rfv(2),
    width: 55,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  oddNumberText: {
    color: "#fff",
    fontSize: Metrics.rfv(18),
    fontWeight: "700",
  },
  listNumText: {
    color: "#fff",
    fontSize: Metrics.rfv(16),
    fontWeight: "700",
  },
  tickImg: {
    width: 17,
    height: 17,
    backgroundColor: "#fff",
    borderRadius: 17 / 2,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 2,
    right: 2,
  },
  singleNumber: {
    flexDirection: "row",
    alignItems: "center",
    // marginVertical: Metrics.rfv(5),
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
  },
  // f4b2b0
  singleNumberView: {
    backgroundColor: "#aad9b4",
    paddingHorizontal: Metrics.rfv(15),
    paddingVertical: Metrics.rfv(15),
    borderRadius: 10,
    marginHorizontal: Metrics.rfv(2),
  },
  sameNumberButton: {
    paddingVertical: Metrics.rfv(8),
    backgroundColor: "#f4b2b0",
    margin: Metrics.rfv(10),
    borderRadius: 8,
  },
  numberButtonText: {
    color: "#fff",
    fontSize: Metrics.rfv(18),
    textAlign: "center",
    fontWeight: "700",
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
  closeButtonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
    textAlign: "center",
  },
  infoText: {
    color: "#000",
    fontSize: Metrics.rfv(14),
    lineHeight: 40,
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
  betContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  decreaseButton: {
    backgroundColor: "#962f2a",
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
    lineHeight:40
  },
  rulesTitle: {
    color: "#000",
    fontSize: Metrics.rfv(21),

    textAlign: "center",
    fontWeight: "500",
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
  sizeBetText: {
    paddingHorizontal: Metrics.rfv(7),
    borderRadius: 8,
    paddingVertical: Metrics.rfv(7),
    marginHorizontal: Metrics.rfv(3),
  },
  sizeContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: Metrics.rfv(8),
  },
  betModalTitle: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  doubleNumStyle: {
    width: 40,
    height: 40,

    alignItems: "center",
    justifyContent: "center",
  },
  betSizeModalTitle: {
    // width: 60,
    height: 40,
    borderRadius: 8,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    alignSelf: "flex-start",
  },
  greenButton: {
    backgroundColor: "#fff",
    width: "100%",
    alignSelf: "center",
    borderRadius: Metrics.rfv(5),
    padding: Metrics.rfv(2),
    marginVertical: Metrics.rfv(5),
    paddingHorizontal: 10,
  },
  greenText: {
    textAlign: "left",
    color: "#000",
    fontWeight: "700",
    fontSize: Metrics.rfv(18),
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
});

export default K3Game;
