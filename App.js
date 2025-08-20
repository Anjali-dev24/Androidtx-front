import NetInfo from "@react-native-community/netinfo";
import { NavigationContainer, StackActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  Alert,
  AppState,
  BackHandler,
  Linking,
  LogBox,
  Modal,
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TabRoutes from "./Navigation/TabRoutes/TabRoutes";
import 'react-native-get-random-values'
import "./shim";
// Adjust the path to your store
import { useTranslation } from "react-i18next";
// import io from 'socket.io-client';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fonts } from "./constant/data";
import { Colors } from "./Helpers/Colors";
import Metrics from "./Helpers/Metrics";
import StackNavigation from "./Navigation/StackNavigation";
import AuthStore from "./reduxToolkit/AuthStore";
import SplashScreen from "./Screens/Splash/SplashScreen";
import moment from "moment";
import CustomToast from "./Components/CustomToast";
import { requestCameraPermission } from "./reduxToolkit/Permissions";
// import ReactNativeForegroundService from '@supersami/rn-foreground-service';
// const socket = io('wss://9tx.online');
const Stack = createStackNavigator();

// import moment from "moment";
import { Component } from "react";
// import {io, Socket } from "socket.io-client";
// import { Button, Text, View } from "react-native";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();
// const serverurl = io('wss://9tx.online')
function App() {
  const { t } = useTranslation();

  const languages = [
    { label: "English", value: "en" },
    { label: "Sinhala", value: "si" },

    // Add more languages as needed
  ];
  const isDarkMode = useColorScheme() === "dark";
  const { isLoggedIn, checkDeviceId, token } = AuthStore();
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const [appState, setAppState] = useState(AppState.currentState);
  const [isConnected, setIsConnected] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isNavigationIsReady, setNavigationIsReady] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [isToast, setIsToast] = useState(false);
  // const socket: Socket = io(serverurl);
  // const [connected, setconnected] = useState(socket.connected);
  const [minutes, setMinutes] = useState(300);
  let value = false;
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  // useEffect(() => {
  //   socket.on('connect', () => {
  //     setconnected(socket.connected);
  //     if (!ReactNativeForegroundService.is_running) {
  //       ReactNativeForegroundService.start({
  //         id: 80,
  //         title: 'Message from: ',
  //         message: "You're connected",
  //       });

  //       ReactNativeForegroundService.add_task(() => {}, {
  //         delay: 5000,
  //         onLoop: false,
  //         taskId: '80',
  //         onError: e => console.log('Error logging:', e),
  //       });
  //     }
  //   });
  //   socket.on('notification', data => {
  //     ReactNativeForegroundService.update({
  //       id: '80',
  //       message: data.message,
  //       title: `Message from ${data.user}`,
  //     });
  //   });

  //   return () => {
  //     ReactNativeForegroundService.stop();
  //   };
  // }, [socket]);

  useEffect(() => {
    if (isNavigationIsReady) {
      setTimeout(() => {
        setShowSplash(false);
      }, 2000);
    }
  }, []);

  useEffect(() => {
    const restoreState = async () => {
      try {
        // Check and set the device ID if necessary
        await checkDeviceId();

        // Delay to ensure the state is fully restored
        setIsLoading(false);
      } catch (e) {
        console.error("Failed to load the auth state:", e);
      }
    };

    restoreState();
  }, [checkDeviceId]);
  useEffect(() => {
    // Check internet connection when the app loads
    checkInternetConnection();

    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        setModalVisible(true); // Show the modal if no internet
      } else {
        setModalVisible(false); // Hide the modal if internet is available
      }
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, []);
  const checkInternetConnection = () => {
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        setModalVisible(true); // Show the modal if no internet
      } else {
        setModalVisible(false); // Hide the modal if internet is available
      }
    });
  };

  const checkPermission=async()=>{
    const permissions= await requestCameraPermission()
    console.log('-=-=-=-=-=-permissions-=-=-=-=-=-', permissions);
    if(permissions===false){
      Alert.alert('', 'AndroidTx needs permissions. Go to settings and enable all the permissions', [
        {
          text: 'Ask me later',
          onPress: () => BackHandler.exitApp(),
        },
        {
          text: 'Cancel',
          onPress: () => BackHandler.exitApp(),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => Linking.openSettings()},
      ]);

    }
  }

  useEffect(() => {
    // checkPermission()
  }, [])

  useEffect(() => {

    const handleAppStateChange = async (nextAppState) => {
      console.log('-=-=-=-=-nextAppState-=-=-=-=nextAppState-=-=-=-=-nextAppState-=-=-=-=', nextAppState);
      // checkPermission()
      if (nextAppState === "active") {
        // requestCameraPermission()
        // checkPermission()
        console.log("1"), await checkDeviceId();
        checkTimeDifference(INACTIVITY_LIMIT);

        // Check time difference when the app comes to foreground
      } else if (nextAppState === "background") {
        setPreviousTime(); // Store the current time when the app goes to background
        console.log("2");
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  // if (isLoading) {
  //   return (
  //     <SafeAreaView>
  //       <SplashScreen />
  //     </SafeAreaView>
  //   );
  // }

  const expiry_time = (loginTime) => {
    let mins = 1440;
    // const IDLE_LOGOUT_TIME_LIMIT = 1440 * 60 * 1000;
    let hours = Math.floor(mins / 60);
    let minutes = mins % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    // console.log("-=-=-=--IDLE_LOGOUT_TIME_LIMIT=-=-=-",minutes,hours, `${hours}hrs:${minutes}mins`);
    return hours;
  };

  const userData = async () => {
    try {
      let data = await AsyncStorage.getItem("userInfo");
      let parseData = JSON.parse(data);
      console.log("-=-=-=-=-=-=---=-userinfo-=-=-=-=-=-", parseData);

      // expiry_time(parseData?.user?.lastLogin);
      if (parseData) {
        console.log(
          "-=-=-=--data=-=-=-",
          parseData,
          moment(parseData?.user?.lastLogin).format("hh")
          // expiry_time()
        );
        global.isLoggedIn = true;
      } else {
        console.log("-=-=-=--data=11-=-=-", parseData);
      }
    } catch (error) {
      console.log("-=-=-=--data=1221-=-=-");
    }
  };
  // useEffect(() => {
  //   console.log('9-=-=-=-=-=-=-global.userLoggedIn-=-=-=-', global.userLoggedIn);
  //   setTimeout(() => {
  //     AsyncStorage.removeItem("userInfo")
  //     //  StackActions.popToTop("Login")
  //   }, 300);
  // }, [global.userLoggedIn])

  useEffect(() => {
    AsyncStorage.getItem("NoMoreReminders").then((item) => {
      if (item === "true") {
        // console.log("-=-=-=-aaaabbbb-=-=-=-=");
        setShowNotification(false), setIsPickerClick(false);
        // return
      }
    });

    userData();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar animated={true} backgroundColor="#962f2a" />
      <NavigationContainer onReady={() => setNavigationIsReady(true)}>
        {/* <SplashScreen /> */}
        {showSplash ? (
          <SplashScreen />
        ) : (
          <GestureHandlerRootView>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="StackNavigation"
                component={StackNavigation}
              />
              <Stack.Screen name="TabRoutes" component={TabRoutes} />
            </Stack.Navigator>
          </GestureHandlerRootView>
        )}
      </NavigationContainer>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>No Internet Connection</Text>
            <Text style={styles.modalText}>Please check your connection.</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={checkInternetConnection}
            >
              <Text style={styles.buttonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    // height:"50%",
    // position:"absolute",

    // bottom:200,
    // left:0,
    // right:0
  },
  modalView: {
    width: 350,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
    color: Colors.black,
    fontFamily: Fonts.Roboto300,
  },
  button: {
    backgroundColor: Colors.Primary_100,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: Fonts.Roboto300,
  },
  notificationHeader: {
    backgroundColor: "#962f2a",
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  bonusTitle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
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
    padding: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  selectedLanguage: {
    backgroundColor: "#F6F6F6",
    padding: 10,
    margin: 8,
    borderRadius: 8,
    width: "95%",
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
    marginTop: 5,
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
    marginVertical: 15,
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
});




// export default class Example extends Component {
//   constructor(props) {
//       super(props);
//       this.state = {
//           timer: 120,
//           timesup: false,
//           timing: true,
//           showWelcome: true,
//       };
//   }

//   componentDidMount() {
//       this.clockCall = setInterval(() => {
//           this.decrementClock();
//       }, 1000);
//   }

//   startTimer = () => {
//       this.setState({
//           timing: true,
//           timer: 30,
//           showWelcome: false
//       })
//   }


//   decrementClock = () => {
//       this.setState((prevstate) => ({
//           timer: prevstate.timer - 1
//       }), () => {
//           if (this.state.timer === 0) {
//               clearInterval(this.clockCall)
//               this.setState({
//                   timesup: true,
//                   timing: false,
//                   showWelcome: false,
//               })
//           }
//       })
//   }


//   componentWillUnmount() {
//       clearInterval(this.clockCall);
//   }
//    formatTime = () => {
//     // const hours = Math.floor(this.state.timer / 3600);
//     const minutes = Math.floor((this.state.timer % 3600) / 60);
//     const seconds = this.state.timer % 60;
//     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };


//   render() {
//       return (
//           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

//   {this.state.timesup && (
//       <Text style={{fontSize: 18, color: '#000'}}>
//       Time up
//       </Text>)}

//       <Text>{this.formatTime()}</Text>
//   {this.state.timing && (
//       <Text style={{fontSize: 18, color: '#000'}}>
//       {this.state.timer}
//       </Text>)}

//         {this.state.showWelcome && (
//           <Text style={{ fontSize: 20 }}>Welcome</Text>
//         )}

//         <Button onPress={this.startTimer.bind(this)} title='play' />
//       </View>
//       )
//   }
// }
