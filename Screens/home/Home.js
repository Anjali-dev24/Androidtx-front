import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import winningInformationData from "../../Components/winningInformationData";
import { bonusList, userList } from "../../constant/data";
import {
  LazyloadScrollView,
  LazyloadView,
  LazyloadImage,
} from "react-native-lazyload";
import LinearGradient from "react-native-linear-gradient";
import FastImage from "react-native-fast-image";
// import {styles} from './wingo/Style';
import { LazyLoadImage } from "react-lazy-load-image-component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, { G, parse, Path } from "react-native-svg";
import Button from "../../Components/Button";
import CarouselComponent from "../../Components/Carousel";
import HeaderComponent from "../../Components/Header";
import Images from "../../constant/images/Images";
import Metrics from "../../Helpers/Metrics";
import AuthStore from "../../reduxToolkit/AuthStore";
import { Image } from "react-native-elements";
import { Marquee } from "@animatereactnative/marquee";
import Cookies from "universal-cookie";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import { date } from "yup";
import { useTranslation } from "react-i18next";
import { requestCameraPermission } from "../../reduxToolkit/Permissions";

const Home = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { logout } = AuthStore();
  const [isVisible, setIsVisible] = useState(true);
  const [isDepositVisible, setIsDepositVisible] = useState(true);
  const [loginError, setLoginError] = useState(true);
  const [listItem, setListItem] = useState(11);

  const [checked, setChecked] = useState(false);
  const [userInfo, setUserInfo] = useState("");

  const [isShowAgain, setIsShowAgain] = useState(false);
  const [isPickerClick, setIsPickerClick] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { width } = Dimensions.get("window");
  const { popupShow, setPopupShow } = AuthStore();
  const [key, setKey] = useState(1);
  const cookies = new Cookies();
  const flatListRef = useRef();
  const [index, setIndex] = useState(0);

  const data = [
    "Due to unstable conditions in the bank, India will have delays or failed payments...",
    "Our customer service never sends a link to the member...",
    "If your deposit is not received, please send it directly to 91CLUB Self-service Center...",
    "Be cautious of counterfeit websites mimicking our 91CLUB official site...",
  ];

  const isTablet = width >= 768;

  const handleCheckBoxToggle = async () => {
    setPopupShow(!checked);
    setChecked(!checked);
  };
  const handleDepositToggle = () => {
    setIsDepositVisible(!isDepositVisible);
    if (checked) {
      console.log("fdfdfd");
      setPopupShow(false);
    }
  };
  const NavigateToActivity = async () => {
    setIsDepositVisible(false);
    navigation.navigate("Activity");
  };
  const handleNavigateToMainNAvigation = async () => {
    setIsDepositVisible(false);
    navigation.navigate("MainNotification");
  };

  const ondetailsClick = () => {
    navigation.navigate("Notification");
  };

  const handlePress = (item) => {
    navigation.navigate(item);
    // console.log(item);
    console.log("FAB Pressed");
  };
  const winnerlist = [
    {
      id: 3,
      name: "abc****123",
      image:
        "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907466/c2_jd0iyj.jpg",
      amount: "2,97,09,987",
    },
    {
      id: 4,
      name: "xyz****0987",
      image:
        "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907466/c2_jd0iyj.jpg",
      amount: "9,98,27.987",
    },
  ];

  useEffect(() => {
    AsyncStorage.getItem("NoMoreReminders").then((item) => {
      if (item === "true") {
        setIsPickerClick(false);
        setShowNotification(false);
      } 
      else {
        setIsPickerClick(true);
        setShowNotification(true);
      }
    });
  }, [])
  

  useEffect(() => {
    const remember = navigation.addListener("focus", () => {
      
       AsyncStorage.getItem("NoMoreReminders").then((item) => {
      let parseData= JSON.parse(item)
      console.log('-=-=-=-=-parseData-=-=-=-', parseData, parseData === true);
      
      if (parseData == false) {
        setIsPickerClick(false);
      }
      else{
         setIsPickerClick(true);
      }
    });
    })
    return remember;
  }, [isPickerClick]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      AsyncStorage.getItem("token").then((token) => {
        console.log("=-=-=-=-==token-=-=-=", token);
      });
    });

    return unsubscribe;
  }, []);



  const renderItem = (item, index) => {
    return (
      <View style={styles.userWinCard}>
        <View style={styles.userView}>
          <View style={styles.imgBack}>
            <FastImage
              resizeMode="cover"
              style={styles.profileImg}
              source={{ uri: item.img, priority: FastImage.priority.low }}
            />
          </View>
          <Text style={styles.username}>{item.name}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.imgWin}>
            <FastImage
              source={{
                uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907488/trophy_hq3tmq.png",
                priority: FastImage.priority.low,
              }}
              style={styles.winImg}
            />
          </View>
          <View>
            <Text style={styles.RecieveAmount}>Recieve $27.00</Text>
            <Text style={styles.winningAmt}>Winning Amount</Text>
          </View>
        </View>
      </View>
    );
  };

  const Item = ({ title }: ItemProps) => (
    // <View style={styles.item}>
    //   <Text style={styles.title}>{title}</Text>
    // </View>
    <View
      onPress={(item, index) => {
        console.log("-=-=-==-item-=-=-country-=-=-=-", title);
      }}
      style={styles.selectedLanguage}
    >
      <View style={styles.bonusView}>
        <Text style={[styles.title]}>
          {title.title}
          <Text style={{ color: "#FEAA57" }}>{title.bonus}</Text>
        </Text>
        <Text style={[styles.title, { color: "#FEAA57" }]}>{title.rupees}</Text>
      </View>
      <Text style={[styles.message]}>{title.message}</Text>
      <View style={styles.totalBonusView}>
        <View style={styles.totalBonus}>
          <Text style={styles.receivedBonus}>
            {title.receivedBonus}/{title.bonus}
          </Text>
        </View>
        <Button
          buttonStyle={styles.bonusButton}
          full={false}
          buttonTitleStyle={styles.buttonText}
          buttonTitle={"Done"}
          onButtonPress={() => {
            setIsPickerClick(false);
          }}
        />
      </View>
    </View>
  );

  const notifications = () => {
    // console.log("=-=-=-=-countries-=-=-", bonusList, "==", data);

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
          <View style={[styles.modalView, { height: 400 }]}>
            <View style={styles.notificationHeader}>
              <Text style={styles.bonusTitle}>Deposit Bonus</Text>
            </View>
            <View style={styles.mainContainer}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={bonusList}
                renderItem={({ item }) => <Item title={item} />}
                keyExtractor={(item) => item.id}
              />
              <View style={styles.bottomView}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() => {
                      
                      setIsShowAgain(!isShowAgain);
                     console.log('-=-=-=-=-isShowAgain-=-=-=-isShowAgain=-=-=-', isShowAgain ==true,isShowAgain);
                     
                      AsyncStorage.setItem("NoMoreReminders", JSON.stringify(isShowAgain));
                    }}
                    style={styles.tickBorder}
                  >
                    {isShowAgain  ? (
                      <FastImage
                        style={styles.rememberIcon}
                        source={{
                          uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907849/tick_ctsqt5.png",
                          priority: FastImage.priority.low,
                        }}
                      />
                    ) : null}
                  </TouchableOpacity>
                  <Text
                    style={{ textAlign: "right", fontSize: Metrics.rfv(10) }}
                  >
                    No more reminder today
                  </Text>
                </View>

                <Button
                  buttonStyle={styles.ActivityButton}
                  full={false}
                  buttonTitleStyle={styles.ActivityButtonText}
                  buttonTitle={"Activity"}
                  onButtonPress={() => {
                    setIsPickerClick(false),
                      navigation.navigate("FirstDepositBonus");
                  }}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setIsPickerClick(false);
            }}
            style={styles.closeView}
          >
            <FastImage
              style={styles.closeImage}
              source={{
                uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110049/clean-82487515_k0eiy0.png",
                priority: FastImage.priority.low,
              }}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const renderNotifications = () => {
    // console.log('=-=-=-=-countries-=-=-', countries, '==', data);

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showNotification}
        onRequestClose={() => {
          // Prevent the modal from closing when pressing back button
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.notificationHeader}>
              <Text style={styles.bonusTitle}>Notification</Text>
            </View>
            <View style={styles.mainContainer}>
              <Text style={styles.TxNotification}>Welcome to 9TX</Text>
              <Text style={styles.notifyMsg}>
                Keep yourself safe, beware of fake{"\n"}websites mimic 91CLUB{" "}
                <FastImage
                  style={styles.pinImg}
                  source={{
                    uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907479/pin_edkk1l.png",
                    priority: FastImage.priority.low,
                  }}
                />
              </Text>
              <Text style={styles.notifyMsg}>
                Do not send money to anyone claiming to be an agent. ❌
              </Text>
              <Text style={[styles.notifyMsg, { fontWeight: "700" }]}>
                Do not share proof receipts or UTR{"\n"}numbers.
              </Text>
              <Text style={styles.notifyMsg}>
                Use barcode or PAYTM for quicker transactions, as PhonePe may
                have{"\n"}delays.
              </Text>
              <Text style={styles.notifyMsg}>
                Check on activity page for exiciting{"\n"}bonus!
              </Text>
              <Text style={styles.notifyMsg}>
                And become an agent to unlock special benefits with plenty of
                bonuses!
              </Text>
              <Button
                buttonStyle={styles.satetyView}
                // full={false}
                buttonTitleStyle={styles.gameText}
                buttonTitle={"Confirm"}
                onButtonPress={() => {
                  setShowNotification(false);
                }}
              />
            </View>
          </View>
          {/* <TouchableOpacity onPress={()=>{setIsPickerClick(false)}} style={styles.closeView}>
            <Image style={styles.closeImage} source={Images.close} />
          </TouchableOpacity> */}
        </View>
      </Modal>
    );
  };

  const getUserInfo = async () => {
    console.log("-=-=-=-=000000-=-=4444-=-=-=");
    let userInfo = await AsyncStorage.getItem("userInfo");
    let parseData = JSON.parse(userInfo);
    let startDate = new date();
    const updateDateTime = moment(
      parseData.user.lastLogin.setHours(
        parseData.user.lastLogin.getHours() + 24
      )
    ).format("LT");
    console.log("-=-=-=-=-=-=-userInfo-=-=-=-=-=-", startDate);
    // AsyncStorage.getItem("userInfo").then((res) => {
    //   const userInfo = JSON.parse(res);
    //   if (userInfo) {
    //     // let starttym = moment(userInfo.user.lastLogin).format('LT')
    //     const updateDateTime = moment(
    //       userInfo.user.lastLogin.setHours(
    //         userInfo.user.lastLogin.getHours() + 24
    //       )
    //     ).format("LT");
    //     console.log("-=-=-=-=-=-=-time_out-=-=-=-=-", updateDateTime);
    //     // var timeStart = new Date("01/01/2007 " + starttym).getHours();
    //     // var timeEnd = new Date("01/01/2007 " + valuestop).getHours();

    //     var hourDiff = timeEnd - timeStart;
    //     //  let newDate= moment(diff).format("hh:mm a")

    //     if (diff <= 0) {
    //       // console.log("-=-=-=-=-=-=-time_out-=-=-=-=-");
    //     } else {
    //       // console.log("-=-=-=-=-=-=-time_left-=-=-=-=-");
    //     }
    //   }else{
    //     console.log("-=-=-=-=000000-=-=-=-=-=");
    //   }
    // });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (listItem <= 0) {
        setListItem(11);
      } else {
        setListItem(listItem - 1);
      }
      scrollToItem();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [listItem]);

  const scrollToItem = () => {
    flatListRef?.current?.scrollToIndex({
      animated: true,
      item: listItem,
      index: "" + listItem,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f7f8fe", position: "relative" }}>
      <HeaderComponent
        onBellPress={() => {
          navigation.navigate("Notification");
        }}
      />
      <ScrollView style={{ flexGrow: 1 }}>
        <View style={{ flex: 0.35 }}>
          <CarouselComponent />
        </View>
        <View style={styles.batView}>
          <View style={styles.imgView}>
            <FastImage
              tintColor={"#962f2a"}
              resizeMode="contain"
              style={styles.speakerImg}
              source={{
                uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1738829365/speaker_hng9rl.png",
                priority: FastImage.priority.low,
              }}
            />
          </View>
          <Marquee
            direction="vertical"
            style={{ width: 250}}
            spacing={9}
            speed={0.3}
            
          >
            <Text style={styles.batStyles}>{t("homeScreen.banner")}</Text>
          </Marquee>
          {/* <Text style={styles.batStyles}>Welcome to 9TX bat 1</Text> */}
          <TouchableOpacity
            onPress={() => navigation.navigate("NotificationAccount")}
            style={styles.detailButton}
          >
            <Text style={styles.detailButtonText}>{t("Buttons.Detail")}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Games");
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#d35c50", "#ba4940", "#9e342e"]}
            style={styles.gameButton}
          >
            <Text style={styles.gameText}>{t("homeScreen.lottery")}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <FastImage
                style={{ width: 200, height: 200 }}
                source={{ uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110045/feedbackImg-b7a3bd03_tpzwkm.png" }}
                resizeMode={FastImage.resizeMode.contain}
              /> */}
              <FastImage
                style={[styles.lotteryStyles]}
                source={{
                  uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907875/lottery_aj0xzv.png",
                  priority: FastImage.priority.low,
                }}
                PlaceholderContent={<ActivityIndicator />}
              />
              <Svg
                color={"#fff"}
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1.1"
                viewBox="0 0 17 17"
                class="text-lg text-slate-500"
                height="20em"
                width="20em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <G></G>
                <Path d="M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z"></Path>
              </Svg>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Games");
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#d35c50", "#ba4940", "#9e342e"]}
            style={styles.gameButton}
          >
            <Text style={styles.gameText}>{t("homeScreen.cricket")}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FastImage
                style={styles.lotteryStyles}
                source={{
                  uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907467/cricket_bdft8h.png",
                  priority: FastImage.priority.low,
                }}
              />
              <Svg
                color={"#fff"}
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1.1"
                viewBox="0 0 17 17"
                class="text-lg text-slate-500"
                height="20em"
                width="20em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <G></G>
                <Path d="M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z"></Path>
              </Svg>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Games");
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#d35c50", "#ba4940", "#9e342e"]}
            style={styles.gameButton}
          >
            <Text style={styles.gameText}>{t("homeScreen.drawGiveaway")}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FastImage
                resizeMode="contain"
                style={styles.lotteryStyles}
                source={{
                  uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907477/gift_m9n5he.png",
                  priority: FastImage.priority.low,
                }}
              />
              <Svg
                color={"#fff"}
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1.1"
                viewBox="0 0 17 17"
                class="text-lg text-slate-500"
                height="20em"
                width="20em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <G></G>
                <Path d="M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z"></Path>
              </Svg>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Games");
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#d35c50", "#ba4940", "#9e342e"]}
            style={styles.gameButton}
          >
            <Text style={styles.gameText}>{t("homeScreen.tradeline")}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FastImage
                style={styles.lotteryStyles}
                source={{
                  uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907478/lottery-coin_slg9vu.png",
                  priority: FastImage.priority.low,
                }}
              />
              <Svg
                color={"#fff"}
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1.1"
                viewBox="0 0 17 17"
                class="text-lg text-slate-500"
                height="20em"
                width="20em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <G></G>
                <Path d="M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z"></Path>
              </Svg>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Games");
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#d35c50", "#ba4940", "#9e342e"]}
            style={styles.gameButton}
          >
            <Text style={styles.gameText}>{t("homeScreen.captain")}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FastImage
                resizeMode="contain"
                style={styles.lotteryStyles}
                source={{
                  uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110088/gamecategory_20240311141522uvco_iaj1qj.png",
                  priority: FastImage.priority.low,
                }}
              />
              <Svg
                color={"#fff"}
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1.1"
                viewBox="0 0 17 17"
                class="text-lg text-slate-500"
                height="20em"
                width="20em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <G></G>
                <Path d="M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z"></Path>
              </Svg>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* <Button
          buttonStyle={styles.gameButton}
          full={false}
          buttonTitleStyle={styles.gameText}
          buttonTitle={'Select Game'}
          onButtonPress={() => {
            // navigation.navigate('Register');
          }}
        /> */}
        {/* {array.map((item, index) => {
          const rowLen = array.length;
          return (
            <TouchableOpacity style={styles.gamesContainer}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#d35c50', '#ba4940', '#9e342e']}
                style={styles.linearGradient}>
                <View style={{width: '70%', paddingVertical: 10}}>
                  <Text style={styles.firstGame}>{item.name}</Text>
                  <Text style={styles.number}>Guess Number</Text>
                  <Text style={styles.options}>
                    {item.color}
                    {index == 0 || rowLen === index + 1 ? ' to win' : ''}
                  </Text>
                </View>
                <View style={{width: '30%'}}>
                  <Image
                    resizeMode="stretch"
                    style={styles.lotteryImage}
                    source={item.img}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          );
        })} */}
        <View style={styles.winInfo}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#d35c50", "#ba4940", "#9e342e"]}
            style={styles.dot}
          />
          <Text style={styles.info}>{t("homeScreen.winningInfo")}</Text>
        </View>
        <FlatList
          ref={flatListRef}
          scrollsToTop
          // ref={(ref) => {flatListRef = ref; }}
          data={userList}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item) => item.id}
          style={{ height: 400 }}
          // getItemLayout={getItemLayout}
        />
        {/* <Button
          buttonStyle={styles.gameButton}
          full={false}
          buttonTitleStyle={styles.gameText}
          buttonTitle={'Select Game'}
          onButtonPress={() => {
           scrollToItem()
          }}
        />  */}
        <View style={styles.winInfo}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#d35c50", "#ba4940", "#9e342e"]}
            style={styles.dot}
          />
          <Text style={[styles.info, ]}>
            {t("homeScreen.todayEarning")}
          </Text>
        </View>
        <View style={styles.winnersContainer}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={["#b3bada", "#a0a7c8", "#7f88aa"]}
            style={styles.secWinner}
          >
            <Text style={styles.secWin}>{t("homeScreen.member")}</Text>
            <Text style={styles.earnings}>$ Member</Text>
            <View style={styles.trapezoid}>
              <View style={[styles.userProfile, { right: 20 }]}>
                <View style={styles.winProfile}>
                  <FastImage
                    resizeMode="cover"
                    style={styles.crownImg}
                    source={{
                      uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907469/crown_2_xdxv7v.png",
                      priority: FastImage.priority.low,
                    }}
                  />
                  <FastImage
                    resizeMode="cover"
                    style={styles.userAvatar}
                    source={{
                      uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907466/c2_jd0iyj.jpg",
                      priority: FastImage.priority.low,
                    }}
                  />
                  <View style={styles.bannerContainer}>
                    <FastImage
                      style={styles.bannerOne}
                      resizeMode="contain"
                      source={{
                        uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907481/rank_2_badge_acfgel.png",
                        priority: FastImage.priority.low,
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={["#ed857b", "#e9766e", "#e4615c"]}
            style={styles.firstWinner}
          >
            <Text style={styles.secWin}>{t("homeScreen.member")}</Text>
            <Text style={styles.earnings}>$ Member</Text>
            <View style={[styles.trapezoidFirst]}>
              <View style={[styles.userProfile]}>
                <View style={styles.winProfile}>
                  <FastImage
                    resizeMode="cover"
                    style={styles.crownImg}
                    source={{
                      uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907469/crown_1_d2upeh.png",
                      priority: FastImage.priority.low,
                    }}
                  />
                  <FastImage
                    resizeMode="cover"
                    style={styles.userAvatar}
                    source={{
                      uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907466/c2_jd0iyj.jpg",
                      priority: FastImage.priority.low,
                    }}
                  />
                  <View style={styles.bannerContainer}>
                    <FastImage
                      style={styles.bannerOne}
                      resizeMode="contain"
                      source={{
                        uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907480/rank_1_badge_cz7kf7.png",
                        priority: FastImage.priority.low,
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={["#f0ac77", "#e3925b", "#cf6831"]}
            style={styles.thirdWinner}
          >
            <Text style={styles.secWin}>{t("homeScreen.member")}</Text>
            <Text style={styles.earnings}>$ Member</Text>
            <View style={styles.trapezoidSec}>
              <View style={[styles.userProfile]}>
                <View style={styles.winProfile}>
                  <FastImage
                    resizeMode="cover"
                    style={styles.userAvatar}
                    source={{
                      uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907466/c2_jd0iyj.jpg",
                      priority: FastImage.priority.low,
                    }}
                  />
                  <FastImage
                    resizeMode="cover"
                    style={styles.crownImg}
                    source={{
                      uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907469/crown_3_ybi5hp.png",
                      priority: FastImage.priority.low,
                    }}
                  />
                  <View style={styles.bannerContainer}>
                    <FastImage
                      style={styles.bannerOne}
                      resizeMode="contain"
                      source={{
                        uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907482/rank_3_badge_zbrutk.png",
                        priority: FastImage.priority.low,
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
        {winnerlist.map((item) => {
          return (
            <View style={styles.winnerList}>
              <View style={styles.userInf}>
                <Text style={styles.serialNum}>{item.id}</Text>
                <FastImage
                  style={styles.winAvatar}
                  source={{ uri: item.image, priority: FastImage.priority.low }}
                />
                <Text style={styles.winName}>{item.name}</Text>
              </View>

              <View style={styles.winAmtContainer}>
                <Text style={styles.winAmt}>{item.amount}</Text>
              </View>
            </View>
          );
        })}
        <View style={{ height: 30 }} />
      </ScrollView>
      <View style={{ backgroundColor: "red" }}>
        {isPickerClick && notifications()}
        {showNotification && renderNotifications()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gamesContainer: {
    width: "100%",
    paddingHorizontal: 15,
    marginVertical: 7,
  },
  pinImg: {
    width: 20,
    height: 20,
  },
  winAvatar: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    marginHorizontal: 5,
  },
  serialNum: {
    marginHorizontal: Metrics.rfv(8),
    fontSize: Metrics.rfv(14),
    fontWeight: "700",
  },
  gameButton: {
    backgroundColor: "#962f2a",
    // paddingVertical: Metrics.rfv(10),
    paddingHorizontal: Metrics.rfv(15),
    borderRadius: 8,
    width: "95%",
    margin: 5,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  gameText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  winAmt: {
    color: "#fff",
    fontSize: Metrics.rfv(15),
    fontWeight: "600",
  },
  winName: {
    marginHorizontal: 15,
    fontSize: Metrics.rfv(17),
    fontWeight: "700",
  },
  winAmtContainer: {
    backgroundColor: "#9f342f",
    paddingHorizontal: Metrics.rfv(20),
    borderRadius: 15,
    paddingVertical: Metrics.rfv(5),
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
    paddingVertical: 5,
  },
  options: {
    color: "#fff",
    fontSize: 14,
  },
  lotteryImage: {
    width: "100%",
    height: 96,
  },
  detailButton: {
    backgroundColor: "#A32324",

    paddingVertical: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  batStyles: {
    color: "#000",
    fontSize: 14,
  },
  batView: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    justifyContent: "space-between",
    // paddingHorizontal: 15,
    paddingVertical: 10,
    alignSelf:"center"
  },
  detailButtonText: {
    color: "#fff",
  },
  dot: {
    backgroundColor: "#000",
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    marginRight: 5,
  },
  info: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 2,
  },
  winInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    backgroundColor:"#D3D3D3",
    alignSelf:"flex-start",
    // marginVertical:5,
  },
  imgBack: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    overflow: "hidden",
  },
  profileImg: {
    width: "100%",
    height: "100%",
  },
  userWinCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  userView: {
    flexDirection: "row",
    alignItems: "center",
  },
  winImg: {
    width: "70%",
    height: "70%",
  },
  imgWin: {
    width: 50,
    height: 50,
  },
  RecieveAmount: {
    color: "#000",
    fontSize: 16,
    marginBottom: 10,
  },
  winningAmt: {
    color: "#000",
    fontSize: 12,
    fontWeight: "300",
  },
  username: {
    color: "#000",
    fontSize: Metrics.rfv(15),
    paddingLeft: Metrics.rfv(12),
    fontWeight: "700",
  },
  winnersContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 15,
    height: 230,
  },
  secWinner: {
    width: "30%",
    height: 80,
    alignItems: "center",
    marginBottom: 8,
    justifyContent: "center",
    // height:"100%",
  },
  thirdWinner: {
    width: "30%",
    height: 80,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  firstWinner: {
    width: "40%",
    height: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  secWin: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  earnings: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
    color: "#fff",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  trapezoid: {
    width: 130,
    height: 0,
    borderBottomWidth: 30,
    borderBottomColor: "#d2d8f3",
    borderLeftWidth: 20,
    borderLeftColor: "transparent",
    borderRightWidth: 0,
    borderRightColor: "transparent",
    borderStyle: "solid",
    position: "absolute",
    backgroundColor: "transparent",
    left: 0,
    top: -30,
  },
  trapezoidFirst: {
    width: "100%",
    height: 0,
    borderBottomWidth: 30,
    borderBottomColor: "#f3b9bb",
    borderLeftWidth: 20,
    borderLeftColor: "transparent",
    borderRightWidth: 20,
    borderRightColor: "transparent",
    borderStyle: "solid",
    position: "absolute",
    backgroundColor: "transparent",
    left: 0,
    top: -30,
  },
  trapezoidSec: {
    width: 125,
    height: 0,
    borderBottomWidth: 30,
    borderBottomColor: "#f7dbb9",
    borderLeftWidth: 0,
    borderLeftColor: "transparent",
    borderRightWidth: 20,
    borderRightColor: "transparent",
    borderStyle: "solid",
    position: "absolute",
    backgroundColor: "transparent",
    left: 0,
    top: -30,
  },
  bannerOne: {
    width: "100%",
    height: "100%",
  },
  bannerContainer: {
    width: 60,
    height: 30,
    position: "absolute",
    bottom: -10,
    // backgroundColor:"red",
    alignSelf: "center",
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  crownImg: {
    width: 40,
    height: 40,
    position: "absolute",
    left: -10,
    top: -20,
  },
  winProfile: {
    width: 60,
    height: 60,
    backgroundColor: "#f7ceab",
    borderRadius: 60 / 2,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    alignItems: "center",
  },
  userProfile: {
    position: "absolute",
    top: -40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  winnerList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 5,
  },
  userInf: {
    flexDirection: "row",
    alignItems: "center",
  },
  lotteryStyles: {
    width: 70,
    height: 70,
    // borderRadius: 45 / 2,
  },
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    minHeight: "100%",
    position: "absolute",
    left: 0,
    right: 0,
  },
  imageView: {
    width: 400,
    height: 400,
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
    // padding: 15,
    marginHorizontal: 35,
    // width:300
  },
  closeImage: {
    width: "100%",
    height: "100%",
  },
  notificationHeader: {
    backgroundColor: "#962f2a",
    padding: Metrics.rfv(10),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  bonusTitle: {
    color: "#fff",
    textAlign: "center",
    fontSize: Metrics.rfv(25),
    fontWeight: "500",
  },
  bonusSubtitle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 12,
    marginTop: 15,
  },
  mainContainer: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal:10
  },
  selectedLanguage: {
    backgroundColor: "#F6F6F6",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    width: "100%",
  },
  title: {
    fontSize: 14,
  },
  message: {
    fontSize: 11,
    color: "#768096",
    marginVertical: 5,
  },
  bonusView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalBonusView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalBonus: {
    backgroundColor: "#D8D8D8",
    borderRadius: 20,
    width: 150,
  },
  receivedBonus: {
    paddingVertical: 3,
    textAlign: "center",
  },
  bonusButton: {
    backgroundColor: "transparent",
    borderColor: "#FEAA57",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FEAA57",
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
    borderColor: "#FEAA57",
    borderWidth: 1,
    marginHorizontal: 10,
    // marginTop: 5,
  },
  ActivityButton: {
    backgroundColor: "#962f2a",
    fontSize: 14,
    width: "25%",
    borderRadius: 30 / 2,
    padding: 6,
    marginRight: 10,
  },
  ActivityButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  bottomView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    marginTop:Metrics.rfv(10)
  },
  // closeImage: {
  //   width: 25,
  //   height: 25,
  // },
  closeView: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    // borderColor: '#962f2a',
    // borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: Metrics.rfv(100),
  },
  TxNotification: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  notifyMsg: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
    marginVertical: Metrics.rfv(8),
  },
  satetyView: {
    backgroundColor: "#962f2a",
    paddingVertical: Metrics.rfv(10),
    paddingHorizontal: Metrics.rfv(35),
    borderRadius: 8,
    // width: '50%',
    margin: 8,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imgView: {
    width: 20,
    height: 20,
    marginRight:Metrics.rfv(5)
  },
  speakerImg: {
    width: "100%",
    height: "100%",
  },
});

// const mapStateToProp = (state) => {
//   return {};
// };

// export default connect(mapStateToProp, {  })(Home);

export default Home;
