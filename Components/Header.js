import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Images from '../constant/images/Images';
import Metrics from '../Helpers/Metrics';
import FastImage from 'react-native-fast-image';

const HeaderComponent = (props) => (
  <View style={styles.container}>
    <View style={styles.headerStyle}>
      <Text style={styles.title}>9T</Text>
      <View style={styles.imageStyle}>
        <FastImage style={styles.image} source={{uri:"https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907487/title_tiqdsp.png", priority: FastImage.priority.low,}} />
      </View>
    </View>

    {/* <View style={styles.row}> */}
      <TouchableOpacity onPress={props.onBellPress} style={{}}>
        <FastImage tintColor={"#fff"} style={{width: 30, height: 30,}} source={{uri:'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907871/bell_veqrqg.png',priority: FastImage.priority.low,}} />
      </TouchableOpacity>
    {/* </View> */}
  </View>
);
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#962f2a',
    justifyContent: 'space-between',
    padding:Metrics.rfv(5)
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  xstyle: {
    backgroundColor: '#fff',
    paddingHorizontal: Metrics.rfv(8),
    // paddingVertical:Metrics.rfv(3),
    borderRadius: 15,
    fontSize: Metrics.rfv(15),
    color: '#962f2a',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: Metrics.rfv(30),
    fontWeight: 'bold',
    paddingRight: Metrics.rfv(3),
  },
  image: {
    width: Metrics.rfv(20),

    height: Metrics.rfv(20),
    padding: 10,
  },
  imageStyle: {
    backgroundColor: '#fff',
    width: Metrics.rfv(25),
    height: Metrics.rfv(25),
    borderRadius: Metrics.rfv(25 / 2),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HeaderComponent;
