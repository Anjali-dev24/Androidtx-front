import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Fonts} from '../../constant/data';
import Images from '../../constant/images/Images';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

const CustomTabBarButton = props => {
  const {route, children, accessibilityState, onPress, focused} = props;

  if (route === 'PromotionNavigation') {
    return (
      // <View style={styles.btnWrapper}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={[
          styles.inactiveBtn,
          {
            borderTopLeftRadius: route === 'PromotionNavigation' ? 0 : 0,
            borderTopRightRadius: route === 'PromotionNavigation' ? 0 : 0,
          },
        ]}
        >
        {/* <LinearGradient colors={[Colors.mainPrimaryCiolor, '#e8554b']} style={styles.diamondBack}> */}
        {/* {children} */}
        <LinearGradient
          colors={[
            '#962f2a',
            '#fff'
          ]}
          start={{x: 0.0, y: 1.0}}
          end={{x: 1.0, y: 1.0}}
          style={styles.grediant}
          >
          <View style={styles.diamondBack}>
            <FastImage style={styles.diceImg} source={{uri:'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907473/dice_bemjkp.png',priority: FastImage.priority.low,}} />
          </View>
          
        </LinearGradient>
        {children}
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={[
          styles.inactiveBtn,
          {
            borderTopLeftRadius: route === 'PromotionNavigation' ? 0 : 0,
            borderTopRightRadius: route === 'PromotionNavigation' ? 0 : 0,
          },
        ]}>
        <Text
          style={{
            color: accessibilityState.selected ? '#a32324' : '#768096',
            fontFamily: Fonts.Roboto400,
          }}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
};

export default CustomTabBarButton;

const styles = StyleSheet.create({
  btnWrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  activeBtn: {
    flex: 1,
    position: 'absolute',
    top: -23,
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: 5,
  },
  inactiveBtn: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgGapFiller: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  diamondBack: {
    flex: 1.0,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    // width: 55,
    margin: 2,
    width: 50,
    height: 55,
    borderRadius: 55 / 2,
    alignItems: 'center',
    // position:"absolute",
    // top:-23,
    // elevation:20,

    // backgroundColor:"#fff",
  },
  diceImg: {
    height: 35,
    width: 35,
    backgroundColor: '#fff',
    borderRadius: 35 / 2,
  },
  grediant: {
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 55 / 2,
    position:"absolute",
    top:-23,
  },
});
