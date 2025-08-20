import React from 'react';
import { SafeAreaView } from 'react-native';
// import BottomTabNavigation from './BottomTabNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabRoutes from './TabRoutes/TabRoutes';
import Home from '../Screens/home/Home';
import Activity from '../Screens/activity/Referral';
import Account from '../Screens/account/Account';
import Wallet from '../Screens/wallet/Wallet';
import Games from '../Screens/home/Games';
const Stack = createNativeStackNavigator();
const RootNavigation = () => {
  React.useEffect(() => {
    // Simulate async check
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <NavigationContainer>
   
        <Stack.Navigator screenOptions={{headerShown: false}}>
         
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Activity" component={Activity} />
        <Stack.Screen name="AccountScreen" component={Account} />
        <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="Games" component={Games} />

        </Stack.Navigator>
        
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default RootNavigation;
