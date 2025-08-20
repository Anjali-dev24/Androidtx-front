import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  ImageBackground,
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
import * as AudioHelper from "../../../service";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import WinGoComponent from "../../../Components/WinGo";
import KChart from "../../../Components/KChart";
import K3Winningtable from "../../../Components/K3Winningtable";
import {
  balanceString,
  betSize,
  chartData,
  gameNumber,
  historyData,
  notifications,
  participants,
  trxWingGoArray,
  winNumber,
} from "../../../constant/data";
import GamesTitle from "../../../Components/GamesTitle";
import LinearGradient from "react-native-linear-gradient";
import CustomToast from "../../../Components/CustomToast";
// import K3 from "../../../Components/K3";
const { width, height } = Dimensions.get("window");
const TrxWinGo = () => {
  const animatedScale = useRef(new Animated.Value(0)).current;
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  const [gameHistory, setGameHistory] = useState(true);
  const [chart, setChart] = useState(false);
  const [history, setHistory] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState(0);
  const navigation = useNavigation();
  const [betSizeIndex, setBetSizeIndex] = useState(0);
  // const [balanceIndex, setbalanceIndeB] = useState(0)
  const [infoModal, setInfoModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState("30s");
  const [showRemainingTime, setShowRemainingTime] = useState(false);
  const [timerCount, setTimer] = useState(60);
  const [colorArr, setColorArr] = useState();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [betModal, setBetModal] = useState(false);
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [balanceIndex, setBalanceIndex] = useState(0);
  const [activeCity, setActiveCity] = useState(0);
  const [betSizeItem, setBetSizeItem] = useState("1");
  const [selectedItem, setSelectedItem] = useState("1");
  const [isShowAgain, setIsShowAgain] = useState(false);
  const [rulesModal, setRulesModal] = useState(false);
  const [isToast, setIsToast] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const Item = ({ item }: ItemProps) => (
    <TouchableOpacity
      onPress={(item, index) => {}}
      style={styles.selectedLanguage}
    >
      <Text style={styles.selectedText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const checkItemColor = () => {};

  const RenderList = ({ item }: ItemProps) => {
    var numb = item.hashValue.match(/\d/g);
    numb = numb.join("");
    var lastDigit = numb % 10;
    console.log("-=-=-=-=-=numb-=-=-=--", numb % 10);

    return (
      <View style={styles.listView}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={[styles.textContainer, { width: "20%" }]}
        >
          {`${item.period.substring(0, 2)}***${item.period.substr(
            item.period.length - 2
          )}`}
          {/* {item.period} */}
        </Text>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={[
            styles.textContainer,
            { width: "20%", fontSize: Metrics.rfv(16) },
          ]}
        >
          {`${item.height.substring(0, 2)}***${item.height.substr(
            item.height.length - 2
          )}`}
          {/* {item.height} */}
        </Text>
        <Text style={[styles.textContainer, { width: "20%" }]}>
          {item.time}
        </Text>
        <Text
          style={[
            styles.textContainer,
            { width: "20%", fontSize: Metrics.rfv(16) },
          ]}
        >
          {`**${item.hashValue.substr(item.hashValue.length - 4)}`}
        </Text>
        <Text
          style={[
            styles.digits,
            { backgroundColor: lastDigit % 2 == 0 ? "#962f2a" : "#18B660" },
          ]}
        >
          {lastDigit}
        </Text>
        <Text
          style={[
            styles.textContainer,
            { width: "13%", fontSize: Metrics.rfv(16) },
          ]}
        >
          {item.result}
        </Text>
      </View>
    );
  };

  const game_history = () => {
    return (
      <View>
        <View style={styles.participantsList}>
          <Text
            style={[styles.headings, { width: "20%", textAlign: "center" }]}
          >
            Period
          </Text>
          <Text
            style={[styles.headings, { width: "20%", textAlign: "center" }]}
          >
            Block height
          </Text>
          <Text
            style={[styles.headings, { width: "20%", textAlign: "center" }]}
          >
            Block time
          </Text>
          <Text
            style={[styles.headings, { width: "20%", textAlign: "center" }]}
          >
            Hash value
          </Text>
          <Text
            style={[styles.headings, { width: "20%", textAlign: "center" }]}
          >
            Result
          </Text>
        </View>
        <FlatList
          data={trxWingGoArray}
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
          <Text style={styles.periodTextTitle}>Period</Text>
          <Text style={styles.numberTitle}>Number</Text>
        </View>
        <View style={{backgroundColor:"#fff", marginHorizontal:Metrics.rfv(10)}}>
          <Text style={styles.staticText}>Static (last 100 Periods)</Text>
        <Text style={styles.staticText}>Winning number</Text>
        <FlatList
          data={chartData}
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerCount == 1) {
        setTimer(30);
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

  const renderTimerView = () => {
    return (
      <View style={styles.timerContainer}>
        <Text style={[styles.remainingTime, { marginRight: Metrics.rfv(15) }]}>
          {timerCount.toString().length > 1
            ? timerCount?.toString()?.substring(0, 1)
            : "0"}
        </Text>
        <Text style={[styles.remainingTime, { marginLeft: Metrics.rfv(15) }]}>
          {timerCount % 10}
        </Text>
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
              <Text style={styles.infoText}>What is a hash value?</Text>
              <Text style={[styles.infoText, { fontSize: Metrics.rfv(16) }]}>
                A person of Bitcoin's fundamental value is exposed to one
                knowledge, one hash value.
              </Text>
              <Text style={styles.infoText}>
                Hash is a value algorithm calculated with a hash function (or
                hash function/hash), and we can also translate it into a hash,
                so the hash value is also called a hash value. . To understand
                hash values, you must understand hash functions. A hash function
                can computationally transform an input of arbitrary length into
                an output of fixed length.
              </Text>
              <Text style={styles.infoText}>
                Functions all have the property that if the input value is the
                same, the output hash value is the same. If the input value is
                different, the output hash value is usually different, but if
                the event is extremely small. If the hash value is solved when
                the input value changes, the hash function has a hash value that
                is non-reversible and easy to verify, and if there is indeed a
                derived value, if it is possible to achieve the hash value of
                the output input value, you can Hash value for immediate
                verification.
              </Text>
              <Text style={styles.infoText}>
                The value of each block is unique, eternal and unrevealable,
                undeniable at the time, the awards circulating in the blockchain
                are automatically tampered with, and the records cannot be
                tampered with.
              </Text>
              <Text style={styles.infoText}>USDT have how many type?</Text>
              <Text style={styles.infoText}>
                1. Based on Bitcoin platform Omni-USDT, deposit address is
                Bitcoin address, withdrawal is bitcoin network.
              </Text>
              <Text style={styles.infoText}>
                2. Bases on Ethereum platform ERC20 protocol, deposit address is
                based on ETH address, withdrawal also based on ETH network.
              </Text>
              <Text style={styles.infoText}>
                3. Based on TRC20-USDT, TRC20 protocal and TRX Network, deposit
                address using TRON address, withdrawal using TRON network.
              </Text>
              <Text style={styles.infoText}>
                Trx WinGo is based on TRC20 Protocal and TRX network
                (TRC20-USDT) Block hash last 1 digit to giving the result, (Can
                click the Block Height to check the Block Hash)
              </Text>
              <Text style={styles.infoText}>How To Play:</Text>
              <Text style={styles.infoText}>
                1. 1 minute 1 game, within 55 second need to place bet, before 5
                second unable to place bet
              </Text>
              <Text style={styles.infoText}>
                2. After the betting close, latest has value will be the result
              </Text>
              <Text style={styles.infoText}>
                3. Bet for whole day, One day total bet is 1440 time.
              </Text>
              <Text style={styles.infoText}>
                4. If you bet of 100, will deduct 2 fee, so your betting amount
                will be 98
              </Text>
              <Text style={styles.infoText}>
                5. 3 minute 1 time, 5 minute 1 time, 10 minute 1 time rule same
                as the 1 minute 1 time, except open result time not same.
              </Text>
              <Text style={styles.infoText}>
                6)Block hash last digit will be the result:
              </Text>
              <Text style={styles.infoText}>Example:</Text>

              <Text style={styles.infoText}>
                Hash Value **b569, result will be 9
              </Text>
              <Text style={styles.infoText}>
                Hash Value **d14c, result will be 4
              </Text>
              <Text style={styles.infoText}>
                -When you bet on Green: If the result either 1,3,7,9, you will
                get (98*2)=196, if the result is 5, you will get (98*1.5)=147
              </Text>
              <Text style={styles.infoText}>
                -When you bet on Red: If the result either 2,4,6,8, you will get
                (98*2)=196, if the result is 0, you will get (98*1.5)=147
              </Text>

              <Text style={styles.infoText}>
                -When you bet on Purple/Violet: If the result either 0 or 5, you
                will get (98*4.5)=441
              </Text>
              <Text style={styles.infoText}>
                -When you bet on Number bet: When the result is same as your
                bet, you will get (98*9)882
              </Text>
              <Text style={styles.infoText}>
                -When you bet on Big: When the result showing either 5,6,7,8,9,
                you will get (98x2)=196
              </Text>
              <Text style={styles.infoText}>
                -When you bet on Small: When the result showing either
                0,1,2,3,4, you will get (98x2)=196
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
        <View style={styles.container}>
          <View style={styles.betTimings}>
            <View style={[styles.timerView]}>
              <FastImage
                resizeMode="contain"
                source={{
                  uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110030/time_a-f83ed4c7_ozzbwh.png",
                  priority: FastImage.priority.low,
                }}
                style={styles.timer}
              />
              <Text
                numberOfLines={2}
                adjustsFontSizeToFit
                style={[styles.timerText]}
              >
                Trx Win Go{"\n"}1 min
              </Text>
            </View>
          </View>
          <FastImage
            tintColor={"#962f2a"}
            resizeMode="stretch"
            style={styles.timeInfo}
            source={{
              uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110125/trxbg-83ff5c79_ft1wyp.png",
              priority: FastImage.priority.low,
            }}
          >
            <View style={styles.playInstructions}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "35%",
                }}
                onPress={() => {
                  setInfoModal(true);
                }}
              >
                <Text style={styles.playHow}>How to play</Text>
              </TouchableOpacity>

              <Text style={styles.timeLeft}>Time remaining</Text>
            </View>
            <View style={styles.liveTimer}>
              <Text style={styles.winGo}>Win Go 1m</Text>
              <View style={styles.winGoTime}>
                <Text style={styles.runningTime}>0</Text>
                <Text style={styles.runningTime}>0</Text>
                <Text style={styles.runningTime}>:</Text>
                <Text style={styles.runningTime}>
                  {timerCount.toString().length > 1
                    ? timerCount?.toString()?.substring(0, 1)
                    : "0"}
                </Text>
                <Text style={styles.runningTime}>{timerCount % 10}</Text>
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
          </FastImage>

          <View style={styles.gameContainer}>
            <View style={styles.betOptionsView}>
              <Button
                buttonStyle={[
                  styles.gameButton,
                  { backgroundColor: "#18B660" },
                ]}
                full={false}
                buttonTitleStyle={styles.gameButtonTitle}
                buttonTitle="Green"
                onButtonPress={() => {
                  console.log(
                    "-=-=-=-=-=-=-colorArr=-=-=-=-=-colorArr==-=-=-",
                    colorArr
                  );
                  setSelectedNumber();
                  setSelectedColor("Green");
                  setBetModal(true);
                  setTitle("Green");
                }}
              />
              <Button
                buttonStyle={[
                  styles.gameButton,
                  { backgroundColor: "#C86EFF" },
                ]}
                full={false}
                buttonTitleStyle={styles.gameButtonTitle}
                buttonTitle="Violet"
                onButtonPress={() => {
                  setSelectedColor("Violet");
                  setBetModal(true);
                  setTitle("Violet");
                }}
              />
              <Button
                buttonStyle={[styles.gameButton]}
                full={false}
                buttonTitleStyle={styles.gameButtonTitle}
                buttonTitle="Red"
                onButtonPress={() => {
                  setSelectedColor("Red");
                  setBetModal(true);
                  setTitle("Red");
                }}
              />
            </View>
            <View style={styles.betNumberRow}>
              {gameNumber.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
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
                  style={styles.betNumbers}
                >
                  <Animated.View
                    style={[{ transform: [{ scale: animatedScale }] }]}
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
                onPress={randomNumber}
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
                    onPress={() => {
                      setBetSizeIndex(index);
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
                        { color: betSizeIndex == index ? "#fff" : Colors.grey },
                      ]}
                    >
                      X{item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.sizeContainer}>
              <TouchableOpacity
                onPress={() => {
                  setBetModal(true);
                  setSelectedNumber();
                  setSelectedSize("Big");
                  setSelectedColor("yellow");
                  setTitle(`Big`);
                }}
                style={styles.bigSizeContainer}
              >
                <Text style={styles.bigSizeText}>Big</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setBetModal(true);
                  setSelectedNumber();
                  setSelectedSize("Small");
                  setSelectedColor("blue");
                  setTitle(`Small`);
                }}
                style={styles.smallSizeContainer}
              >
                <Text style={styles.smallSizeText}>Small</Text>
              </TouchableOpacity>
            </View>
            {showRemainingTime && renderTimerView()}
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
    paddingVertical: Metrics.rfv(5),
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
    padding: Metrics.rfv(8),
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
    // marginLeft: Metrics.rfv(15),
  },
  timerText: {
    color: "#fff",
    fontSize: Metrics.rfv(16),
    fontWeight: "600",
    textAlign: "center",
  },
  timeInfo: {
    width: "99%",
    alignSelf: "center",
    height: 160,
    marginTop: Metrics.rfv(5),
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
    width: "100%",
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
    // backgroundColor:"red",
    width: Dimensions.get("screen").width / 2.3,
    // flexWrap:"wrap"
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
    flex: 1,
    width: 30,
    height: 30,
    resizeMode: "contain",
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
    borderRadius: 8,
    width: "30%",
  },
  gameButtonTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  gameContainer: {
    paddingHorizontal: Metrics.rfv(15),
    borderRadius: Metrics.rfv(8),
    marginHorizontal: Metrics.rfv(10),
    backgroundColor: "#fff",
    paddingVertical: Metrics.rfv(8),
    marginVertical: Metrics.rfv(5),
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
    // flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  betSize: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: Metrics.rfv(16),
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
  },
  randomBetSizeView: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  betSizeText: {
    borderColor: "#962f2a",
    borderWidth: 1,
    paddingHorizontal: Metrics.rfv(6),
    borderRadius: Metrics.rfv(8),
    paddingVertical: Metrics.rfv(5),
    marginHorizontal: Metrics.rfv(3),
  },
  digits: {
    width: 25,
    fontSize: Metrics.rfv(14),
    backgroundColor: "red",
    height: 25,
    borderRadius: 25 / 2,
    textAlign: "center",
    color: "#fff",
    marginLeft: Metrics.rfv(5),
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
  sizeContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: Metrics.rfv(8),
  },
  bigSizeContainer: {
    backgroundColor: "#FEAA57",
    padding: Metrics.rfv(8),
    width: "45%",
    borderTopLeftRadius: Metrics.rfv(30),
    borderBottomLeftRadius: Metrics.rfv(30),
  },
  bigSizeText: {
    textAlign: "center",
    fontSize: Metrics.rfv(22),
    color: "#fff",
    fontWeight: "600",
  },
  smallSizeContainer: {
    backgroundColor: "#6EA8F4",
    padding: Metrics.rfv(8),
    width: "45%",
    borderTopRightRadius: Metrics.rfv(30),
    borderBottomRightRadius: Metrics.rfv(30),
  },
  smallSizeText: {
    textAlign: "center",
    fontSize: Metrics.rfv(22),
    color: "#fff",
    fontWeight: "600",
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
  closeButtonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
    textAlign: "center",
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
  staticText: {
    marginLeft: Metrics.rfv(18),
    fontSize: Metrics.rfv(12),
    color: "#000",
    backgroundColor: "#fff",
    marginTop: Metrics.rfv(5),
  },
  
});

export default TrxWinGo;
