import React, { useEffect, useState } from "react";
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
  alphabets,
  arrayValue,
  balanceString,
  betNumbers,
  betSize,
  chartData,
  chartStaticData,
  evenOddNumberList,
  fiveDStaticData,
  gameHistoryData,
  historyData,
  K3Timer,
  lotteryAlphabet,
  lotteryResult,
  notifications,
  participants,
  timers,
} from "../../../constant/data";
import KChart from "../../../Components/KChart";
import K3Winningtable from "../../../Components/K3Winningtable";
import AutoScroll from "@homielab/react-native-auto-scroll";
import GamesTitle from "../../../Components/GamesTitle";
import LinearGradient from "react-native-linear-gradient";
import CustomToast from "../../../Components/CustomToast";
import * as AudioHelper from "../../../service";

const { width, height } = Dimensions.get("window");
const FiveDGame = () => {
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  const [gameHistory, setGameHistory] = useState(true);
  const [chart, setChart] = useState(false);
  const [history, setHistory] = useState(false);
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [isTotal, setIsTotal] = useState(0);
  const [isClickedIndex, setIsClickedIndex] = useState(0);
  const [selectedTimer, setSelectedTimer] = useState(0);
  const navigation = useNavigation();
  const [betModal, setBetModal] = useState(false);
  const [rulesModal, setRulesModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [bigButton, setBigButton] = useState(false);
  const [smallButton, setSmallButton] = useState(false);
  const [evenButton, setEvenButton] = useState(false);
  const [oddButton, setOddButton] = useState(false);
  const [selectedValue, setSelectedValue] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [isShowAgain, setIsShowAgain] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [betSizeIndex, setBetSizeIndex] = useState(0);
  const [betSizeItem, setBetSizeItem] = useState("1");
  const [selectedItem, setSelectedItem] = useState("1");
  const [finalItem, setFinalItem] = useState(1);
  const [infoModal, setInfoModal] = useState(false);
  const [betFinal, setBetFinal] = useState(1);
  const [numberList, setNumberList] = useState(evenOddNumberList);
  const [timerCount, setTimer] = useState(60);
  const [showRemainingTime, setShowRemainingTime] = useState(false);
  const [selectedTime, setSelectedTime] = useState("30s");
  const [isToast, setIsToast] = useState(false);

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

  const GameHistoryData = ({ item }: ItemProps) => {
    let sum = 0;
    for (let i = 0; i < item.result.length; i++) {
      sum += item.result[i];
    }
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: Metrics.rfv(5),
        }}
      >
        <View style={styles.periodRow}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.historyPeriodNum}
          >
            {item.period}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: 180,
            justifyContent: "space-between",
          }}
        >
          {item.result.map((item) => (
            <View style={styles.resultRow}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={[styles.historyPeriodNum, { textAlign: "center" }]}
              >
                {item}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalNumber}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[styles.totalNUmberText]}
          >
            {sum}
          </Text>
        </View>
      </View>
    );
  };

  const game_history = () => {
    return (
      <View>
        <View style={styles.gameHistoryContainer}>
          <View style={styles.historyHeadings}>
            <Text style={styles.periodTitle}>Period</Text>
            <Text style={styles.periodTitle}>Result</Text>
            <Text style={styles.periodTitle}>Total</Text>
          </View>
        </View>
        <View style={styles.dataRow}>
          <FlatList
            data={gameHistoryData}
            renderItem={({ item }) => <GameHistoryData item={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    );
  };

  const render_chart = () => {
    return (
      <View style={{ marginVertical: Metrics.rfv(5) }}>
        <View
          style={{
            backgroundColor: "#fff",
            marginHorizontal: 10,
            borderRadius: 8,
            paddingVertical: 5,
          }}
        >
          <View style={styles.alphabetView}>
            {alphabets.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  setIsClickedIndex(index);
                  setSelectedValue(item);
                }}
                style={[
                  styles.alphabetContainer,
                  {
                    backgroundColor:
                      isClickedIndex === index ? "#962f2a" : "#B6BCC8",
                      marginTop:8,
                      marginBottom:0
                  },
                ]}
              >
                <Text style={styles.alphabetText}>{item}</Text>
              </TouchableOpacity>
            ))}
            
          </View>
          <View style={{ borderBottomColor: "#B6BCC8", borderBottomWidth: 1 }} />
          <Text style={styles.staticText}>Static (last 100 Periods)</Text>
          {fiveDStaticData.map((item, index) => (
            <View style={styles.dataTitle}>
              <View style={{ width: "30%" }}>
                <Text style={styles.winningInfo}>{item.title}</Text>
              </View>
              <View style={styles.periodText}>
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
        </View>
        <View style={styles.chartTitle}>
          <Text style={styles.periodTextTitle}>Period</Text>
          <Text style={styles.numberTitle}>Number</Text>
        </View>
        <FlatList
          data={chartData}
          style={{ backgroundColor: "#fff", marginHorizontal: 12 }}
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
                <View style={styles.lastColumn}>
                  <Text style={{ color: "#fff" }}>L</Text>
                </View>
                <View
                  style={[
                    styles.lastColumn,
                    { backgroundColor: "#FEAA57", marginLeft: 2 },
                  ]}
                >
                  <Text style={{ color: "#fff" }}>O</Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
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

  const NumberArray = ({ item }: ItemProps) => {
    return (
      <View style={styles.imagesView}>
        <TouchableOpacity
          onPress={(item, index) => {}}
          style={styles.numberImg}
        >
          <FastImage style={styles.images} source={{ uri: item.img }} />
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
            renderItem={({ item }) => <NumberArray item={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={[styles.betSizeView]}>
          <TouchableOpacity
            style={[styles.betSizeContainer, { backgroundColor: "#FEAA57" }]}
          >
            <Text numberOfLines={2} adjustsFontSizeToFit style={styles.bigBet}>
              Big{"\n"}2X
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
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
            <TouchableOpacity style={styles.oddNumberView}>
              <Text style={styles.oddNumberText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>{" "}
        <Text style={styles.matchingNumberView}>
          A pair of unique numbers: odds(13.54)
        </Text>
        <View style={styles.oddNumber}>
          {arrayValue.map((item) => (
            <TouchableOpacity
              style={[styles.oddNumberView, { backgroundColor: "#f4b2b0" }]}
            >
              <Text style={styles.oddNumberText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.singleNumber}>
          {arrayValue.map((item) => (
            <TouchableOpacity style={styles.singleNumberView}>
              <Text style={styles.oddNumberText}>{item}</Text>
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
          {arrayValue.map((item) => (
            <TouchableOpacity style={styles.oddNumberView}>
              <Text style={styles.oddNumberText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>{" "}
        <Text style={styles.matchingNumberView}>
          Any 3 of the same number: odds(13.54)
        </Text>
        <TouchableOpacity style={styles.sameNumberButton}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.numberButtonText}
          >
            Any 3 of the same number: odds
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const different_view = () => {
    return (
      <View style={styles.twoNumberContainer}>
        <Text style={styles.matchingNumberView}>
          3 different numbers: odds(13.54)
        </Text>
        <View style={styles.oddNumber}>
          {arrayValue.map((item) => (
            <TouchableOpacity style={styles.oddNumberView}>
              <Text style={styles.oddNumberText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>{" "}
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
          {arrayValue.map((item) => (
            <TouchableOpacity style={styles.oddNumberView}>
              <Text style={styles.oddNumberText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
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

  const onPressHandler = (id) => {
    let renderData = [...numberList];
    for (let data of renderData) {
      if (data.number == id) {
        data.selected = data.selected == null ? true : !data.selected;
        // data.count = data.selected == null ? data.count++ :  data.count--;
        break;
      }
    }

    // setIsTotal(count)
    setNumberList(renderData);
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
              {/* {selectedNumber == 0 || selectedNumber == 5 ? (
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
              ) : ( */}
              <View style={styles.alphabetView}>
                {lotteryAlphabet.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setIsClickedIndex(index);
                      setSelectedValue(item);
                    }}
                    style={[
                      styles.alphabetContainer,
                      {
                        backgroundColor:
                          isClickedIndex === index ? "#962f2a" : "#B6BCC8",
                      },
                    ]}
                  >
                    <Text style={styles.alphabetText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.evenOddBetContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setBigButton(!bigButton);
                    setSmallButton(false);
                    setEvenButton(false);
                    setOddButton(false);
                    console.log(
                      "-=-=-=-=-=-=-=-=-=-val-=-=-==-=-",
                      selectedItem,
                      finalItem,
                      betSizeItem,
                      betFinal,
                      isTotal
                    );

                    // setBetModal(true);
                  }}
                  style={[
                    styles.evenOddBetView,
                    { backgroundColor: bigButton ? "#FEAA57" : "#B6BCC8" },
                  ]}
                >
                  <Text style={styles.evenOddBetText}>Big1.98</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSmallButton(!smallButton);
                    setEvenButton(false);
                    setBigButton(false);
                    setOddButton(false);
                    // setBetModal(true);
                  }}
                  style={[
                    styles.evenOddBetView,
                    { backgroundColor: smallButton ? "#6EA8F4" : "#B6BCC8" },
                  ]}
                >
                  <Text style={styles.evenOddBetText}>Small1.98</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setEvenButton(!evenButton);
                    setBigButton(false);
                    setSmallButton(false);
                    setOddButton(false);
                    // setBetModal(true);
                  }}
                  style={[
                    styles.evenOddBetView,
                    { backgroundColor: evenButton ? "#962f2a" : "#B6BCC8" },
                  ]}
                >
                  <Text style={styles.evenOddBetText}>Even1.98</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setOddButton(!oddButton);
                    setSmallButton(false);
                    setBigButton(false);
                    setEvenButton(false);
                    // setBetModal(true);
                  }}
                  style={[
                    styles.evenOddBetView,
                    { backgroundColor: oddButton ? "#C86EFF" : "#B6BCC8" },
                  ]}
                >
                  <Text style={styles.evenOddBetText}>Odd1.98</Text>
                </TouchableOpacity>
              </View>
              {selectedValue != "SUM" ? (
                <View
                  style={[
                    styles.digitRow,
                    {
                      width: "100%",
                      alignSelf: "center",
                      alignContent: "flex-end",
                      height: 170,
                    },
                  ]}
                >
                  <FlatList
                    style={{ minWidth: "100%" }}
                    contentContainerStyle={styles.listContainer}
                    data={evenOddNumberList}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        onPress={() => {
                          setBigButton(false);
                          setSmallButton(false);
                          setEvenButton(false);
                          setOddButton(false);
                          onPressHandler(item.number);
                          if (item.selected) {
                            setIsTotal(isTotal + 1);
                            setIsItemSelected(true);
                          } else {
                            setIsTotal(isTotal - 1);
                            setIsItemSelected(false);
                          }
                          console.log(
                            "-=-=-=-=-=-=-=-=-=-selected-=-=-=-=-==-",
                            isTotal
                          );
                        }}
                        style={{ minWidth: "20%", alignSelf: "center" }}
                      >
                        <View
                          style={[
                            styles.evenOddNumber,
                            {
                              backgroundColor: item.selected
                                ? "#962f2a"
                                : "#fff",
                            },
                          ]}
                        >
                          <Text style={[styles.numberText]}>{item.number}</Text>
                        </View>
                        <Text style={styles.itemText}>{item.betNumber}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                  />
                </View>
              ) : (
                <View style={{ height: 170 }} />
              )}
              <View style={styles.balanceContainer}>
                <Text style={styles.balanceText}>Balance</Text>
                <View style={styles.betContainer}>
                  {balanceString.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        setBetSizeIndex(index);
                        setBetSizeItem(item);
                        let betSize = betSizeItem * 10;
                        let total = isTotal * betSize * quantity * selectedItem;
                        console.log(
                          "-=-=-=-=-=-=betSize-=-=-=-betSize-=-=-=-",
                          betSize,
                          total
                        );
                        setBetFinal(total);
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
                      let value = num * isTotal;
                      setBetFinal(value);
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
                      let value = num * isTotal;
                      setBetFinal(value);
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
                      setSelectedIndex(index);
                      setSelectedItem(item);
                      let final = parseInt(item) * parseInt(betSizeItem);
                      setBetFinal(final);
                      setQuantity(item);
                      console.log("-=-=-=-=-=-type-=-=-of-=-=-=-", item);
                    }}
                    style={[
                      styles.sizeBetText,
                      {
                        backgroundColor:
                          selectedIndex == index || quantity == item
                            ? "#18BB60"
                            : "#F7F8FF",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.sizeText,
                        {
                          color:
                            selectedIndex == index || quantity == item
                              ? "#fff"
                              : Colors.grey,
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
                    setBigButton(false);
                    setSmallButton(false);
                    setEvenButton(false);
                    setOddButton(false);
                    setBetModal(false);
                    setIsTotal(0);
                    evenOddNumberList.forEach(function (i) {
                      delete i.selected;
                    });
                    console.log(
                      "-=-=-=-=-evenOddNumberList-==-=-=-",
                      numberList
                    );
                    // setNumberList(numberList)
                    // setNumberList(evenOddNumberList)
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
                    isTotal *
                    quantity *
                    betSizeItem
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
                height: Dimensions.get("screen").height / 3,
              }}
            >
              <Text style={styles.infoText}>5D lottery game rules</Text>
              <Text style={[styles.infoText, { fontSize: Metrics.rfv(16) }]}>
                Draw instructions
              </Text>
              <Text style={styles.infoText}>
                5-digit number (00000-99999) will be drawn randomly in each
                period
              </Text>
              <Text style={styles.infoText}>for example：</Text>
              <Text style={styles.infoText}>
                The draw number for this Period is 12345
              </Text>
              <Text style={styles.infoText}>A=1</Text>
              <Text style={styles.infoText}>B=2</Text>
              <Text style={styles.infoText}>C=3</Text>
              <Text style={styles.infoText}>D=4</Text>
              <Text style={styles.infoText}>E=5</Text>
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

   const formatTime = () => {
    // const hours = Math.floor(this.state.timer / 3600);
    const minutes = Math.floor((timerCount % 3600) / 60);
    const seconds = timerCount % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
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
                    setSelectedTimer(index);
                    setSelectedTime(item.time);
                  }}
                  style={[
                    styles.timerView,
                    {
                      backgroundColor:
                        selectedTimer === index ? "#962f2a" : "#fff",
                    },
                  ]}
                >
                  <FastImage
                    resizeMode="contain"
                    source={
                      selectedTimer === index
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
                      { color: selectedTimer === index ? "#fff" : "#000" },
                    ]}
                  >
                    5D {"\n"} {item.time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.lotteryResultContainer}>
            <Text style={styles.lotteryResultText}>Lottery{"\n"}results</Text>
            <View>
              <View style={styles.digitRow}>
                {lotteryResult.map((item) => (
                  <View style={styles.resultView}>
                    <Text style={styles.itemText}>{item}</Text>
                  </View>
                ))}
                <Text style={{ fontSize: Metrics.rfv(17) }}>=</Text>
              </View>
              <View style={styles.digitRow}>
                {alphabets.map((item) => (
                  <View style={styles.resultNumber}>
                    <Text style={styles.resultItem}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View
              style={[
                styles.resultView,
                {
                  backgroundColor: "#F95959",
                  width: 50,
                  height: 50,
                  borderRadius: 50 / 2,
                },
              ]}
            >
              <Text style={styles.resultText}>17</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: Metrics.rfv(10),
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

              <Text style={styles.remainingTime}>TIme remaining</Text>
            </View>
            <View style={styles.periodTimer}>
              <Text style={styles.periodNumber}>76567565765755</Text>
              <View style={styles.winGoTime}>
                <Text style={[styles.runningTime,{letterSpacing:8}]}>{formatTime()}</Text>
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
            <View style={styles.diceContainer}>
              <View style={styles.diceImgView}>
                {/* <AutoScroll delay={1} duration={1000} vertical={true} style={styles.scrolling1}>
          <FastImage
            style={styles.image}
            delay={1}
            duration={100}
            source={{uri:"https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907921/luck_spin_banner_bbgfxm.png"}}
          />
        </AutoScroll> */}
              </View>
              <View style={styles.diceImgView}></View>
              <View style={styles.diceImgView}></View>
            </View>
            <View style={styles.alphabetView}>
              {lotteryAlphabet.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setIsClickedIndex(index);
                  }}
                  style={[
                    styles.alphabetContainer,
                    {
                      backgroundColor:
                        isClickedIndex === index ? "#962f2a" : "#B6BCC8",
                    },
                  ]}
                >
                  <Text style={styles.alphabetText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.evenOddBetContainer}>
              <TouchableOpacity
                onPress={() => {
                  setBigButton(!bigButton);
                  setBetModal(true);
                }}
                style={[
                  styles.evenOddBetView,
                  { backgroundColor: bigButton ? "#FEAA57" : "#B6BCC8" },
                ]}
              >
                <Text style={styles.evenOddBetText}>Big1.98</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSmallButton(!smallButton);
                  setBetModal(true);
                }}
                style={[
                  styles.evenOddBetView,
                  { backgroundColor: smallButton ? "#6EA8F4" : "#B6BCC8" },
                ]}
              >
                <Text style={styles.evenOddBetText}>Small1.98</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setEvenButton(!evenButton);
                  setBetModal(true);
                }}
                style={[
                  styles.evenOddBetView,
                  { backgroundColor: evenButton ? "#962f2a" : "#B6BCC8" },
                ]}
              >
                <Text style={styles.evenOddBetText}>Even1.98</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setOddButton(!oddButton);
                  setBetModal(true);
                }}
                style={[
                  styles.evenOddBetView,
                  { backgroundColor: oddButton ? "#C86EFF" : "#B6BCC8" },
                ]}
              >
                <Text style={styles.evenOddBetText}>Odd1.98</Text>
              </TouchableOpacity>
              {showRemainingTime && renderTimerView()}
            </View>
            <View
              style={[
                styles.digitRow,
                {
                  width: "100%",
                  alignSelf: "center",
                  alignContent: "flex-end",
                },
              ]}
            >
              <FlatList
                style={{ minWidth: "100%" }}
                contentContainerStyle={styles.listContainer}
                data={evenOddNumberList}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setBetModal(true);
                    }}
                    style={{ minWidth: "20%", alignSelf: "center" }}
                  >
                    <View style={styles.evenOddNumber}>
                      <Text style={[styles.numberText]}>{item.number}</Text>
                    </View>
                    <Text style={styles.itemText}>{item.betNumber}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
            {/* <View style={styles.diceTypeView}>
              <TouchableOpacity
                onPress={() => {
                  setTwoSame(false);
                  setThreeSame(false);
                  setDifferent(false);
                  setIsTotal(true);
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
                  style={[styles.diceTable,{color: threeSame ? "#fff" : "#768096"}]}
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
                  style={[styles.diceTable,{color: different ? "#fff" : "#768096"}]}
                >
                  Different
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>
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
        {gameHistory && game_history()}
        {chart && render_chart()}
        {history && render_history()}
        {betModal && renderBetModal()}
        {rulesModal && preSaleRules()}
        {infoModal && renderGameInfo()}

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
    margin: 10,
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
    padding: Metrics.rfv(10),
    flexDirection: "row",
    alignItems: "center",
    // marginTop: Metrics.rfv(15),
    alignSelf: "center",
    backgroundColor: "#163b28",
  },
  diceImg: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  diceImgView: {
    width: Dimensions.get("screen").width / 3.5,
    height: 100,
  },
  diceTypeView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Metrics.rfv(15),
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
    marginTop: Metrics.rfv(15),
  },
  twoNumberContainer: {
    backgroundColor: "#fff",
    marginHorizontal: Metrics.rfv(15),
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
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
  },
  oddNumberView: {
    backgroundColor: "#ddb9fb",
    paddingHorizontal: Metrics.rfv(15),
    paddingVertical: Metrics.rfv(15),
    borderRadius: 10,
    marginHorizontal: Metrics.rfv(2),
  },
  oddNumberText: {
    color: "#fff",
    fontSize: Metrics.rfv(18),
    fontWeight: "700",
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
    padding: Metrics.rfv(15),
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
  lotteryResultContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
  },
  lotteryResultText: {
    color: "#768096",
    fontSize: Metrics.rfv(17),
    textAlign: "center",
  },
  resultView: {
    backgroundColor: "#F6F6F6",
    width: 40,
    height: 40,
    borderRadius: Metrics.rfv(40 / 2),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
  },
  resultNumber: {
    width: 40,
    height: 40,
    borderRadius: Metrics.rfv(40 / 2),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
  },
  itemText: {
    textAlign: "center",
    fontSize: Metrics.rfv(17),
    width: 50,
  },
  resultItem: {
    textAlign: "center",
    fontSize: Metrics.rfv(17),
    // padding:Metrics.rfv(13)
  },
  digitRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  resultText: {
    color: "#fff",
    fontSize: Metrics.rfv(17),
  },
  image: {
    width: 200,
    height: 200,
  },
  scrolling1: {
    width: 400,
    padding: 10,
    marginBottom: 10,
  },
  alphabetView: {
    flexDirection: "row",
    alignItems: "center",
  },
  alphabetContainer: {
    backgroundColor: "#B6BCC8",
    paddingVertical: Metrics.rfv(5),
    paddingHorizontal: Metrics.rfv(10),
    marginVertical: Metrics.rfv(10),
    marginHorizontal: Metrics.rfv(5),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  alphabetText: {
    color: "#fff",
    fontSize: Metrics.rfv(24),
    fontWeight: "700",
  },
  evenOddBetContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  evenOddBetView: {
    backgroundColor: "#B6BCC8",
    padding: Metrics.rfv(10),
    borderRadius: 8,
  },
  evenOddBetText: {
    color: "#fff",
    fontSize: Metrics.rfv(15),
    fontWeight: "900",
  },
  evenOddNumber: {
    borderColor: "#D3D3D3",
    borderWidth: 1,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: "center",
    // marginHorizontal: Metrics.rfv(10),
    marginTop: Metrics.rfv(10),
  },
  numberText: {
    color: "#B6BCC8",
    textAlign: "center",
    fontSize: Metrics.rfv(18),
    fontWeight: "700",
  },
  historyHeadings: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  periodTitle: {
    color: "#fff",
    fontSize: Metrics.rfv(16),
    fontWeight: "700",
  },
  gameHistoryContainer: {
    margin: Metrics.rfv(10),
    backgroundColor: "#962f2a",
    padding: Metrics.rfv(10),
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: Metrics.rfv(12),
  },
  periodRow: {},
  historyPeriodNum: {
    color: "#000",
    fontSize: Metrics.rfv(12),
  },
  resultRow: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    borderColor: "#000",
    borderWidth: 1,
  },
  totalNumber: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: "#962f2a",
    alignItems: "center",
    justifyContent: "center",
  },
  totalNUmberText: {
    textAlign: "center",
    color: "#fff",
    fontSize: Metrics.rfv(16),
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
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  infoText: {
    color: "#000",
    fontSize: Metrics.rfv(14),
    lineHeight: 40,
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
  chartDataCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: Metrics.rfv(15),
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
    marginTop: 8,
  },
  periodTextTitle: {
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
  staticText: {
    marginLeft: Metrics.rfv(18),
    fontSize: Metrics.rfv(12),
    color: "#000",
    backgroundColor: "#fff",
    marginTop: Metrics.rfv(5),
  },
  dataTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "90%",
    // marginLeft: Metrics.rfv(10),
    marginVertical: Metrics.rfv(3),
    alignSelf: "center",
  },
  periodText: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
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
});

export default FiveDGame;
