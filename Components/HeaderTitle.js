import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Images from '../constant/images/Images';
import Metrics from '../Helpers/Metrics';
import Svg, {G, Path, SvgUri} from 'react-native-svg';
import {Colors} from '../Helpers/Colors';

const HeaderTitleComponent = props => (
  <View style={[styles.container, props.style]}>
    <TouchableOpacity onPress={props.goBack}>
      <View style={{width: 25, height: 25,}}>
        <SvgUri
        preserveAspectRatio='xMinYMin slice'
          color={'#fff'}
          width={'100%'}
          height={'100%'}
          uri={
            'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735123454/svgviewer-output_hqtslg.svg'
          }></SvgUri>
      </View>
    </TouchableOpacity>
    <Text
      style={[
        styles.titleStyle,
        props.wallet ? {marginLeft: 20} : {marginRight: 20},
      ]}>
      {props.title}
    </Text>
    <TouchableOpacity
      onPress={props.onCurrencyClick}
      style={[styles.mainContainer]}>
      {props.wallet && props.children}
    </TouchableOpacity>
    {/* <View/> */}
  </View>
);
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: '#962f2a',
    backgroundColor: '#962f2a',
    justifyContent: 'space-between',
    // padding: Metrics.rfv(15),
  },
  titleStyle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default HeaderTitleComponent;
