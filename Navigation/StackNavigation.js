import React, { useEffect, useState } from "react";
//stack navigation
import { createStackNavigator } from "@react-navigation/stack";
import PersonalDetails from "../Screens/account/PersonalDetails";
import ForgotPassword from "../Screens/Auth/ForgotPassword";
import Login from "../Screens/Auth/Login";
import OTP from "../Screens/Auth/OTP";
import Register from "../Screens/Auth/Register";
import DepositHistory from "../Screens/history/DepositHistory";
import GameHistory from "../Screens/history/GameHistory";
import WithdrawHistory from "../Screens/history/WithdrawHistory";
import Games from "../Screens/home/Games";
import AddBankBalnace from "../Screens/wallet/AddBankBalnace";
import TabRoutes from "./TabRoutes/TabRoutes";
import Notification from "../Screens/home/Notification";
import InvitationRules from "../Screens/promotion/InvitationRules";
import InvitationRecords from "../Screens/promotion/InvitationRecords";
import Setting from "../Screens/account/Setting";
import AboutUs from "../Screens/account/AboutUs";
import Feedback from "../Screens/account/Feedback";
import Guide from "../Screens/account/Guide";
import Service from "../Screens/account/Service";
import NotificationAccount from "../Screens/account/Notification";
import LoginPassword from "../Screens/EditInfo/LoginPassword";
import LoginPassward from "../Screens/EditInfo/LoginPassword";
import PhoneNumber from "../Screens/EditInfo/PhoneNumber";
import SplashScreen from "../Screens/Splash/SplashScreen";
import ChangeAvatar from "../Screens/Avatar/ChangeAvatar";
import Attendance from "../Screens/promotion/Attendance";
import FirstDepositBonus from "../Screens/promotion/FirstDepositBonus";
import UserCountry from "../Screens/Auth/UserCountry";
import Deposit from "../Screens/wallet/Deposit";
import PaymentMethods from "../Screens/wallet/PaymentMethods";

import CryptoDeposit from "../Screens/wallet/CryptoDeposit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import winGo from "../Screens/home/GameScreen/winGo";
import HistoryDetail from "../Screens/home/GameScreen/HistoryDetail";
import K3Game from "../Screens/home/GameScreen/K3";
import FiveDGame from "../Screens/home/GameScreen/5d";
import TrxWinGo from "../Screens/home/GameScreen/TrxWingGo";
import Payment from "../Screens/wallet/Payment";
import TransSuccess from "../Screens/wallet/TransSuccess";

const Stack = createStackNavigator();
const initial_screen = async() => {
  
};

const StackNavigation =  () => {
  const [initialPage, setInitialPage] = useState(false)
 
  useEffect(() => {
   
    console.log("-=-=-=--initial_screen-=-=-=-", global.isLoggedIn);

  }, [initialPage])

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={global.isLoggedIn?'Home':'Login'}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="InvitationRules" component={InvitationRules} />
      <Stack.Screen name="WithdrawHistory" component={WithdrawHistory} />
      <Stack.Screen name="DepositHistory" component={DepositHistory} />
      <Stack.Screen name="GameHistory" component={GameHistory} />
      <Stack.Screen name="AddBankBalance" component={AddBankBalnace} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="Guide" component={Guide} />
      <Stack.Screen name="Service" component={Service} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Attendance" component={Attendance} />
      <Stack.Screen name="FirstDepositBonus" component={FirstDepositBonus} />
      <Stack.Screen name="UserCountry" component={UserCountry} />
      <Stack.Screen name="Deposit" component={Deposit} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethods} />
      <Stack.Screen name="CryptoDeposit" component={CryptoDeposit} />

      <Stack.Screen name="Games" component={Games} />
      <Stack.Screen
        name="NotificationAccount"
        component={NotificationAccount}
      />
      <Stack.Screen name="LoginPassword" component={LoginPassword} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
      <Stack.Screen name="ChangeAvatar" component={ChangeAvatar} />

      <Stack.Screen name="Home" component={TabRoutes} />
      <Stack.Screen name="Notification" component={Notification} />

      <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
      <Stack.Screen name="InvitationRecords" component={InvitationRecords} />
      <Stack.Screen name="winGo" component={winGo} />
      <Stack.Screen name="HistoryDetail" component={HistoryDetail} />
      <Stack.Screen name="K3Game" component={K3Game} />
      <Stack.Screen name="FiveDGame" component={FiveDGame} />
      <Stack.Screen name="TrxWinGo" component={TrxWinGo} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="TransSuccess" component={TransSuccess} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
