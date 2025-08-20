import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Metrics from "../../Helpers/Metrics";
import AuthStore from "../../reduxToolkit/AuthStore";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../Helpers/Colors";
import Moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";
import PageWrapperView from "../../Components/PageWrapperView";
import { Fonts } from "../../constant/data";
import LogoutModal from "../../Components/LogoutModal";
import HeaderTitleComponent from "../../Components/HeaderTitle";
import UserDetails from "../../Components/UserDetails";
import Svg, {
  Circle,
  Line,
  Path,
  Polyline,
  Rect,
  SvgUri,
} from "react-native-svg";
import Images from "../../constant/images/Images";
import i18next from "i18next";
import language from "../../Lang/language.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../../APIs/commonAPIsStructure";
import { CommonActions, StackActions, useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import CustomToast from "../../Components/CustomToast";
import Loader from "../../Components/Loader";

const { width, height } = Dimensions.get("window");

const Account = ({}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isToast, setIsToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogout = () => {
    // Perform logout logic here

    setIsModalVisible(false);
    console.log("Logged out", isModalVisible);
    method_logout();
  };

  const getUserInfo = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("userInfo");
      let parseData = JSON.parse(userInfo);
      global.user_info = parseData;
      console.log("-=-=-=-=-=-=-userInfo-=-=-=-=-", parseData);
      setUserInfo(parseData);
    } catch (error) {
      console.log("-=-=-=-=-=-=-userInfo-=-err=-=-=-", error);
    }
    // AsyncStorage.getItem("userInfo").then((res) => {
    //   const userInfo = JSON.parse(res);
    //   global.userInfo=userInfo
    //   console.log("-=-=-=-=-=-=-userInfo-=-=-=-=-", userInfo);
    //   if (userInfo) {
    //     setUserInfo(userInfo);
    //   }
    // });
  };

  useEffect(() => {
    getUserInfo();
    const onBlur = navigation.addListener("onBlur", () => {
      console.log("-=-=-=-onblur-=-=-=-");
    });

    return onBlur;
  }, [navigation]);

  useEffect(() => {
    const onFocus = navigation.addListener("focus", () => {
      AsyncStorage.getItem("isPrivacyOpened").then((item) => {
        if (item == "true") {
          alert("Loading Error");
          AsyncStorage.setItem("isPrivacyOpened", "false");
        }
      });
    });
    return onFocus;
  }, [navigation]);

  const languageModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Prevent the modal from closing when pressing back button
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.languageTitle}>
              <View />
              <Text style={styles.modalText}>Select Language</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <FastImage
                  style={styles.closeImage}
                  source={{
                    uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907850/close_y7vfld.png",
                    priority: FastImage.priority.low,
                  }}
                />
              </TouchableOpacity>
            </View>

            <FlatList
              data={language.language}
              renderItem={({ item, index }) => (
                // console.log('-=-=-=-=-=-==-all-=-=-=-=-', item)
                <TouchableOpacity
                  onPress={() => {
                    setSelectedLanguage(item.value);
                    console.log("item----", item.value, index);
                  }}
                  style={styles.selectedLanguage}
                >
                  <Text style={styles.selectedText}>{item.label}</Text>
                  {item.value == selectedLanguage && (
                    <FastImage
                      style={styles.forwordIcon}
                      source={{
                        uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907849/tick_ctsqt5.png",
                        priority: FastImage.priority.low,
                      }}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => {
                i18next.changeLanguage(selectedLanguage),
                  setModalVisible(false);
              }}
              style={styles.selectLanguageButton}
            >
              <Text style={styles.selectText}>Select</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const method_logout = async () => {
    try {
      setIsModalVisible(false);
      setLoading(true);
      let token = userInfo?.token;
      const logout_user = await logout(token);
      console.log(
        "-=-=-=-logout_user-=-=-=-=logout_user=-=-",
        logout_user,
        token
      );
      const rememberMe = await AsyncStorage.getItem('rememberMe')
      let data= JSON.parse(rememberMe)
      console.log('-=-=-=-=-rememberMe-=-=-=-=-', data);
      
      AsyncStorage.multiRemove([
        "deviceId",
        "isPrivacyOpened",
        "userInfo",
        "dialCode",
        "userCountryData",
        "NoMoreReminders",
      ]);
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "Login" }],
        })
      );
      // navigation.dispatch(StackActions.popToTop("Login"));
      setLoading(false);
    } catch (error) {
      setModalVisible(false);
      console.log("-=-=-=-logout_user-=-=-=-=errr=-=-", error);
      setLoading(false);
    }
  };

  return (
    <PageWrapperView statusBar={{ background: "#a32324" }}>
      {/* <HeaderTitleComponent
        goBack={() => navigation.goBack()}
        mainStyle={styles.mainHeaderStyle}
      /> */}
      {loading && <Loader />}
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        bounces={false}
      >
        <View style={styles.backgroundContainer}></View>
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <View>
              <View style={styles.profileHeader}>
                <FastImage
                  source={{
                    uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907465/c1_ebm7jm.jpg",
                    priority: FastImage.priority.low,
                  }}
                  style={styles.userIcon}
                />
                <View style={styles.profileTextContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      minWidth: "85%",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("PersonalDetails", {
                          userData: userInfo,
                        });
                      }}
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={styles.profileName}>
                        {userInfo?.user?.userName
                          ? userInfo?.user?.userName
                          : "UserName"}
                      </Text>
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
                    <TouchableOpacity
                      style={{ width: 25, height: 25, marginRight: 10 }}
                      onPress={() => {
                        console.log(
                          "-=-=-=-=-=-=-=-lang-=-=-=--==-=",
                          language
                        );

                        setModalVisible(true);
                        // i18next.changeLanguage(selectedLanguage);
                      }}
                    >
                      <FastImage
                        style={styles.glabalIcon}
                        source={{
                          uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907834/language_w1bjos.png",
                          priority: FastImage.priority.low,
                        }}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.uidContainer}>
                    <Text style={styles.profileDetail}>UID</Text>
                    <Text style={styles.profileDetail}>|</Text>
                    <Text style={styles.profileDetail}>
                      {userInfo?.user?.invitation_code
                        ? userInfo?.user?.invitation_code
                        : "---"}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setIsToast(true),
                          setTimeout(() => {
                            setIsToast(false);
                          }, 3000);
                      }}
                    >
                      <View style={{ width: 20, height: 20 }}>
                        <SvgUri
                          preserveAspectRatio="xMinYMin slice"
                          style={{ marginHorizontal: 1 }}
                          color={"#fff"}
                          width={"100%"}
                          height={"100%"}
                          uri={
                            "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123449/svgviewer-output_5_fnbjly.svg"
                          }
                        ></SvgUri>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.lastLogin}>
                    Last Login:{" "}
                    {Moment(userInfo?.user?.lastLogin).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.safeView}>
              <Text style={styles.cardTitle}>Safe Balance</Text>
              <View style={styles.secureView}>
                <View style={{ width: 20, height: 20 }}>
                  <SvgUri
                    preserveAspectRatio="xMinYMin slice"
                    style={{ marginHorizontal: 1 }}
                    color={"#000"}
                    width={"100%"}
                    height={"100%"}
                    uri={
                      "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123449/svgviewer-output_7_yyzzrm.svg"
                    }
                  ></SvgUri>
                </View>
                <Text style={styles.paddingLeft5}>Financial security</Text>
              </View>
            </View>
            <Text style={styles.safeBalanceText}>$1000</Text>
            <View style={styles.estimatedRevenueContainer}>
              <Text style={styles.estimatedRevenueText}>
                24-hr estimated revenue
              </Text>
              <Text style={styles.estimatedRevenueAmount}>0.00</Text>
            </View>
            <Text style={styles.dailyInterestText}>
              Daily interest rate 0.1% + VIP extra income safe, calculated every
              1 minute
            </Text>
          </View>

          <View style={styles.navCard}>
            <View style={styles.navOptions}>
              <UserDetails
                onClick={() => {}}
                children={
                  <View style={{ width: 30, height: 30 }}>
                    <SvgUri
                      preserveAspectRatio="xMinYMin slice"
                      style={{ marginHorizontal: 1 }}
                      color={"#962f2a"}
                      width={"100%"}
                      height={"100%"}
                      uri={
                        "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735304035/svgviewer-output_4_vb6sde.svg"
                      }
                    ></SvgUri>
                  </View>
                }
                label={"Payment Methods"}
              />
              <UserDetails
                children={
                  <View style={{ width: 30, height: 30 }}>
                    <SvgUri
                      preserveAspectRatio="xMinYMin slice"
                      style={{ marginHorizontal: 1 }}
                      color={"#962f2a"}
                      width={"100%"}
                      height={"100%"}
                      uri={
                        "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123448/svgviewer-output_6_ogzzgt.svg"
                      }
                    ></SvgUri>
                  </View>
                }
                onClick={() => {}}
                label={"VIP"}
              />
              <UserDetails
                children={
                  <View style={{ width: 30, height: 30 }}>
                    <SvgUri
                      preserveAspectRatio="xMinYMin slice"
                      style={{ marginHorizontal: 1 }}
                      color={"#962f2a"}
                      width={"100%"}
                      height={"100%"}
                      uri={
                        "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123447/svgviewer-output_9_uyimlg.svg"
                      }
                    ></SvgUri>
                  </View>
                }
                onClick={() => {
                  navigation.navigate("Notification");
                }}
                label={"Notifications"}
              />
              <UserDetails
                children={
                  <View style={{ width: 30, height: 30 }}>
                    <SvgUri
                      preserveAspectRatio="xMinYMin slice"
                      style={{ marginHorizontal: 1 }}
                      color={"#962f2a"}
                      width={"100%"}
                      height={"100%"}
                      uri={
                        "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123447/svgviewer-output_10_tbff9x.svg"
                      }
                    ></SvgUri>
                  </View>
                }
                onClick={() => {}}
                label={"Gifts"}
              />
            </View>
          </View>

          <View style={styles.serviceCenterCard}>
            <Text style={styles.serviceCenterTitle}>Service center</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Setting");
                }}
                style={styles.iconItem}
              >
                <View style={{ width: 25, height: 25 }}>
                  <SvgUri
                    preserveAspectRatio="xMinYMin slice"
                    style={{ marginHorizontal: 1 }}
                    color={"#962f2a"}
                    width={"100%"}
                    height={"100%"}
                    uri={
                      "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123447/svgviewer-output_11_yl1yov.svg"
                    }
                  ></SvgUri>
                </View>
                <Text style={styles.iconText}>{"Setting"}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Feedback")}
                style={styles.iconItem}
              >
                <View style={{ width: 25, height: 25 }}>
                  <SvgUri
                    preserveAspectRatio="xMinYMin slice"
                    style={{ marginHorizontal: 1 }}
                    color={"#962f2a"}
                    width={"100%"}
                    height={"100%"}
                    uri={
                      "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123449/svgviewer-output_12_ag1o7e.svg"
                    }
                  ></SvgUri>
                </View>
                <Text style={styles.iconText}>{"Feedback"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("NotificationAccount");
                }}
                style={styles.iconItem}
              >
                <View style={{ width: 25, height: 25 }}>
                  <SvgUri
                    preserveAspectRatio="xMinYMin slice"
                    style={{ marginHorizontal: 1 }}
                    color={"#962f2a"}
                    width={"100%"}
                    height={"100%"}
                    uri={
                      "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123449/svgviewer-output_13_gfhyjm.svg"
                    }
                  ></SvgUri>
                </View>
                <Text style={styles.iconText}>{"Info"}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconItem}>
                <View style={{ width: 25, height: 25 }}>
                  <SvgUri
                    preserveAspectRatio="xMinYMin slice"
                    style={{ marginHorizontal: 1 }}
                    color={"#962f2a"}
                    width={"100%"}
                    height={"100%"}
                    uri={
                      "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123450/svgviewer-output_14_wfxreq.svg"
                    }
                  ></SvgUri>
                </View>
                <Text style={styles.iconText}>{"24/7 Customer Service"}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconItem}>
                <View style={{ width: 25, height: 25 }}>
                  <SvgUri
                    preserveAspectRatio="xMinYMin slice"
                    style={{ marginHorizontal: 1 }}
                    color={"#962f2a"}
                    width={"100%"}
                    height={"100%"}
                    uri={
                      "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123450/svgviewer-output_15_ylvc9r.svg"
                    }
                  ></SvgUri>
                </View>
                <Text style={styles.iconText}>{`Beginner's Guide`}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("AboutUs"),
                    AsyncStorage.setItem("isPrivacyOpened", "false");
                }}
                style={styles.iconItem}
              >
                <View style={{ width: 25, height: 25 }}>
                  <SvgUri
                    preserveAspectRatio="xMinYMin slice"
                    style={{ marginHorizontal: 1 }}
                    color={"#962f2a"}
                    width={"100%"}
                    height={"100%"}
                    uri={
                      "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123451/svgviewer-output_16_tyczjt.svg"
                    }
                  ></SvgUri>
                </View>
                <Text style={styles.iconText}>{"About us"}</Text>
              </TouchableOpacity>
              {/* {[
                {label: 'Setting', icon: 'cog'},
                {label: 'Feedback', icon: 'comment'},
                {label: 'Notification', icon: 'bell'},
                {label: 'Activity', icon: 'history'},
                {label: 'Terms', icon: 'file-document'},
                {label: 'Questions', icon: 'help-circle'},
              ].map(({label, icon}, index) => (
                <TouchableOpacity key={index} style={styles.iconItem}>
                  <MaterialCommunityIcons
                    name={icon}
                    size={30}
                    color={Colors.Primary_100}
                    style={styles.icon}
                  />
                  <Text style={styles.iconText}>{label}</Text>
                </TouchableOpacity>
              ))} */}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(true);
            }}
          >
            <View style={styles.buttonView}>
              <View style={styles.rowView}>
                <View style={{ width: 25, height: 25 }}>
                  <SvgUri
                    preserveAspectRatio="xMinYMin slice"
                    style={{ marginRight: Metrics.rfv(25) }}
                    color={Colors.white}
                    width={"100%"}
                    height={"100%"}
                    uri={
                      "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123451/svgviewer-output_17_paoway.svg"
                    }
                  ></SvgUri>
                </View>
                <Text style={styles.logOutText}>Logout</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {modalVisible && languageModal()}
      {isToast && (
        <CustomToast
          isToast={isToast}
          onRequestClose={() => {
            setIsToast(false);
          }}
        />
      )}
      <LogoutModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onLogout={() => {
          handleLogout();
        }}
      />
    </PageWrapperView>
  );
};

const styles = StyleSheet.create({
  mainHeaderStyle: {
    backgroundColor: "transparent",
  },
  scrollViewContent: {
    paddingVertical: Metrics.rfv(20),
    paddingBottom: Metrics.rfv(50),
    // backgroundColor: Colors.Primary_100,
  },
  logOutText: {
    color: Colors.white,
    fontWeight: "700",
    paddingVertical: Metrics.rfv(10),
    fontSize: Metrics.rfv(15),
  },
  glabalIcon: {
    width: "100%",
    height: "100%",
  },
  rowView: { flexDirection: "row", alignItems: "center" },
  buttonView: {
    flexDirection: "row",
    borderWidth: 1,
    alignItems: "center",
    borderRadius: Metrics.rfv(8),
    // width: "40%",
    justifyContent: "center",
    borderColor: Colors.Primary_100,
    alignSelf: "center",
    paddingHorizontal: Metrics.rfv(15),
    backgroundColor: Colors.Primary_100,
  },
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
  },
  profileContainer: {
    marginBottom: Metrics.rfv(20),
    marginTop: Metrics.rfv(20),
  },
  backgroundContainer: {
    height: height * 0.25,
    position: "absolute",
    borderBottomLeftRadius: Metrics.rfv(30),
    borderBottomRightRadius: Metrics.rfv(30),
    backgroundColor: "#962f2a",
    width: "100%",
    alignItems: "center",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  profileTextContainer: {
    marginLeft: Metrics.rfv(20),
  },
  uidContainer: {
    backgroundColor: "#FEAA57",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Metrics.rfv(10),
    justifyContent: "space-evenly",
    width: "50%",
  },
  lastLogin: {
    fontSize: Metrics.rfv(12),
    fontWeight: "bold",
    marginLeft: Metrics.rfv(2),
    color: Colors.white,
    fontFamily: Fonts.Roboto400,
  },
  safeView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  secureView: {
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Metrics.rfv(10),
  },
  profileName: {
    color: Colors.white,
    fontSize: Metrics.rfv(24),
    fontWeight: "bold",
    fontFamily: Fonts.Roboto400,
  },
  profileDetail: {
    color: Colors.white,
    fontSize: Metrics.rfv(16),
    paddingVertical: Metrics.rfv(5),
    fontFamily: Fonts.Roboto400,
  },
  card: {
    backgroundColor: Colors.white,
    padding: Metrics.rfv(20),
    borderRadius: Metrics.rfv(10),
    marginBottom: Metrics.rfv(13),
    elevation: 4,
  },
  cardTitle: {
    color: Colors.grey,
    fontSize: Metrics.rfv(17),
    fontFamily: Fonts.Roboto400,
  },
  safeBalanceText: {
    fontWeight: "900",
    color: Colors.black,
    fontSize: Metrics.rfv(19),
    fontFamily: Fonts.Roboto500,
  },
  estimatedRevenueContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: Metrics.rfv(8),
    borderBottomColor: Colors.grey,
  },
  estimatedRevenueText: {
    color: Colors.grey,
    fontSize: Metrics.rfv(15),
    fontFamily: Fonts.Roboto400,
  },
  estimatedRevenueAmount: {
    marginLeft: Metrics.rfv(10),
    fontWeight: "900",
    color: Colors.black,
    fontSize: Metrics.rfv(19),
  },
  dailyInterestText: {
    color: Colors.black,
    paddingTop: Metrics.rfv(10),
    fontSize: Metrics.rfv(15),
    fontFamily: Fonts.Roboto400,
  },
  navCard: {
    padding: 0,
    backgroundColor: "#fff",
    elevation: 4,
    borderRadius: Metrics.rfv(10),
  },
  navOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  navItem: {
    width: "100%",
    padding: Metrics.rfv(10),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navItemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  navText: {
    fontSize: Metrics.rfv(16),
    color: "#000",
    marginLeft: Metrics.rfv(10),
    fontFamily: Fonts.Roboto400,
  },
  serviceCenterCard: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.rfv(10),
    padding: Metrics.rfv(20),
    marginBottom: Metrics.rfv(20),
    marginTop: Metrics.rfv(13),
    elevation: 4,
  },
  serviceCenterTitle: {
    fontWeight: "bold",
    fontSize: Metrics.rfv(20),
    marginBottom: Metrics.rfv(10),
    color: Colors.black,
    fontFamily: Fonts.Roboto400,
  },
  iconContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: Metrics.rfv(10),
  },
  iconItem: {
    width: "30%", // Adjust width to fit 3 items per row
    alignItems: "center",
    marginBottom: Metrics.rfv(20),
  },
  icon: {
    marginBottom: Metrics.rfv(10),
  },
  iconText: {
    fontSize: Metrics.rfv(12),
    textAlign: "center",
    color: Colors.black,
    fontFamily: Fonts.Roboto400,
  },
  securityIcon: {
    // marginTop: Metrics.rfv(10),
  },
  paddingLeft5: {
    paddingLeft: Metrics.rfv(5),
    color: Colors.black,
    paddingVertical: Metrics.rfv(5),
    fontFamily: Fonts.Roboto400,
  },
  userIcon: {
    width: Metrics.rfv(55),
    height: Metrics.rfv(55),
    borderRadius: Metrics.rfv(100),
  },
  icon: {
    marginBottom: Metrics.rfv(10),
  },
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    marginBottom: 20,
    alignSelf: "center",
    position: "absolute",
    // bottom: Dimensions.get("screen").height / 4.8,
    // top: Dimensions.get("screen").height / 4.8,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  toastModalContainer: {
    backgroundColor: "transparent",
    justifyContent: "center",
    marginBottom: 20,
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    top: 0,
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 5,
    padding: 15,
    margin: 15,
    overflow: "hidden",
    height: Dimensions.get("screen").height / 2,
  },
  closeImage: {
    width: 25,
    height: 25,
  },
  languageTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  modalText: {
    color: "#000",
    fontSize: Metrics.rfv(16),
    fontWeight: "bold",
    paddingBottom: 15,
    // marginTop:Metrics.rfv(25)
  },
  selectedText: {
    color: "#000",
    fontSize: 15,
  },
  selectedLanguage: {
    padding: 15,
    borderBottomColor: "#dedee0",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectLanguageButton: {
    backgroundColor: "#a32324",
    width: "30%",
    alignSelf: "center",
    // marginTop: 15,
    borderRadius: 12,
  },
  selectText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    padding: 10,
  },
  forwordIcon: {
    width: 20,
    height: 20,
  },
});

export default Account;
