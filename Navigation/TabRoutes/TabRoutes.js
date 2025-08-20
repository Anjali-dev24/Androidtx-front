import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import ActiviteNavigation from '../ActiviteNavigation';
// import PromotionNavigation from '../PromotionNavigation';
import Svg, {Path, SvgUri} from 'react-native-svg';
import {Fonts} from '../../constant/data';
import useBottomTabStore from '../../reduxToolkit/bottomTabStore';
import Account from '../../Screens/account/Account';
import Activity from '../../Screens/activity/Referral';
import Home from '../../Screens/home/Home';
import Promotion from '../../Screens/promotion/Promotion';
import Wallet from '../../Screens/wallet/Wallet';
import CustomTabBarButton from './CustomTabBarButtom';
import Games from '../../Screens/home/Games';
import Referral from '../../Screens/activity/Referral';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

function BottomTabNavigator(props) {
  const navigation = useNavigation();
  const {bottomTabShow} = useBottomTabStore();
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      // tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({route}) => ({
        headerShown: false,
        
        tabBarStyle: {
          ...styles.tabBarStyle,
          display: bottomTabShow ? '' : 'none',
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: 'Arial',
          color: '#333',
          borderTopLeftRadius: 10,
        },

        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: '#c1c1c1',
        tabBarIcon: ({color, size, focused}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Activity') {
            iconName = 'featured-play-list';
          } else if (route.name === 'Promotion') {
            iconName = 'data-thresholding';
          } else if (route.name === 'WalletNavigation') {
            iconName = 'wallet';
          } else if (route.name === 'Account') {
            iconName = 'account-circle';
          }
          return (
            <View
              style={{
                width: '100%',
                borderRadius: 20,
                overflow: 'hidden',
              }}>
              {/* <HomeIcon/> */}
            </View>
            // <IconMaterial
            //   name={iconName}
            //   size={30}
            //   color={focused ? '#a32324' : '#768096'} // Change color based on focus
            // />
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarButton: props => (
            <CustomTabBarButton route="Home" {...props}>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <View style={styles.svgContainer}>
                  <SvgUri
                  preserveAspectRatio='xMinYMin slice'
                    style={{marginHorizontal: 1}}
                    color={
                      props.accessibilityState.selected ? '#a32324' : '#768096'
                    }
                    width={'100%'}
                    height={'100%'}
                    uri={
                      'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735140185/svgviewer-output_mjyst7.svg'
                    }></SvgUri>
                </View>

                <Text
                  style={{
                    fontFamily: Fonts.Roboto400,
                    color: props.accessibilityState.selected
                      ? '#a32324'
                      : '#768096',
                  }}>
                  {t("tabs.home")}
                </Text>
              </View>
            </CustomTabBarButton>
          ),
        }}
      />
      <Tab.Screen
        name="WalletNavigation"
        component={Wallet}
        options={{
          tabBarButton: props => (
            <CustomTabBarButton route="Wallet" {...props}>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <View style={styles.svgContainer}>
                <SvgUri
                preserveAspectRatio='xMinYMin slice'
                    style={{marginHorizontal: 1}}
                    color={
                      props.accessibilityState.selected ? '#a32324' : '#768096'
                    }
                    width={'100%'}
                    height={'100%'}
                    uri={
                      'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123447/svgviewer-output_2_eigipn.svg'
                    }></SvgUri>
                </View>

                <Text
                  style={{
                    fontFamily: Fonts.Roboto400,
                    color: props.accessibilityState.selected
                      ? '#a32324'
                      : '#768096',
                  }}>
                  {t("tabs.wallet")}
                </Text>
              </View>
            </CustomTabBarButton>
          ),
        }}
      />

      <Tab.Screen
        name="PromotionNavigation"
        component={Promotion}
        options={{
          tabBarButton: props => (
            <CustomTabBarButton route="PromotionNavigation" {...props}>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <View style={styles.svgContainer}>
              
              </View>

              <Text
                style={{
                  fontFamily: Fonts.Roboto400,
                  color: props.accessibilityState.selected
                    ? '#a32324'
                    : '#768096',
                }}>
                {t("tabs.promotion")}
              </Text>
            </View>
          </CustomTabBarButton>
          ),
        }}
      />
      <Tab.Screen
        name="Referral"
        component={Referral}
        // children={()=><Referral fromTab={true}/>}
        options={{
          tabBarButton: props => (
            <CustomTabBarButton route="Referral" {...props}>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <View style={styles.svgContainer}>
                <SvgUri
                preserveAspectRatio='xMinYMin slice'
                    style={{marginHorizontal: 1}}
                    color={
                      props.accessibilityState.selected ? '#a32324' : '#768096'
                    }
                    width={'100%'}
                    height={'100%'}
                    uri={
                      'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123447/svgviewer-output_3_ygzt3l.svg'
                    }></SvgUri>
                </View>
                <Text
                  style={{
                    fontFamily: Fonts.Roboto400,
                    color: props.accessibilityState.selected
                      ? '#a32324'
                      : '#768096',
                  }}>
                  {t("tabs.referral")}
                </Text>
              </View>
            </CustomTabBarButton>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Account}
        options={{
          tabBarButton: props => (
            <CustomTabBarButton route="Profile" {...props}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={styles.svgContainer}>
                  <SvgUri
                  preserveAspectRatio='xMinYMin slice'
                    style={{marginHorizontal: 1}}
                    color={
                      props.accessibilityState.selected ? '#a32324' : '#768096'
                    }
                    width={'100%'}
                    height={'100%'}
                    uri={
                      'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123450/svgviewer-output_4_cpxyzi.svg'
                    }></SvgUri>
                </View>
                <Text
                  style={{
                    fontFamily: Fonts.Roboto400,
                    color: props.accessibilityState.selected
                      ? '#a32324'
                      : '#768096',
                  }}>
                  {t("tabs.profile")}
                </Text>
              </View>
            </CustomTabBarButton>
          ),
        }}
      />
    
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: 'red',
    // position: 'absolute',
    borderTopWidth: 0,
    bottom: 0,
    right: 0,
    left: 0,
    height: 60,
    // borderRadius: 40,
    // marginBlockStart:'auto'
  },
  svgContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
