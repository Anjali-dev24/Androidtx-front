import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Swiper from 'react-native-swiper';
import Metrics from '../Helpers/Metrics';
import {Colors} from '../Helpers/Colors';
import {Fonts} from '../constant/data';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ScrollingTextSwiper = ({data, detailsClick}) => {
  return (
    <View style={styles.container}>
      <View style={styles.volumeVIew}>
        <TouchableOpacity onPress={{}}>
          <Ionicons
            name={'volume-medium-sharp'}
            size={Metrics.rfv(22)}
            color={Colors.Primary_100}
            style={styles.iconView}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.swiperContainer}>
        <Swiper
          style={styles.wrapper}
          autoplay
          autoplayTimeout={8}
          showsPagination={false}
          horizontal={true}
          loop>
          {data.map((item, index) => (
            <View style={styles.slide} key={index}>
              <Text style={styles.text} numberOfLines={2}>
                {item}
              </Text>
            </View>
          ))}
        </Swiper>
      </View>
      <TouchableOpacity onPress={detailsClick}>
        <View style={styles.detailsButton}>
          <Fontisto
            style={styles.iconStyle}
            name="fire"
            size={Metrics.rfv(12)}
            color={Colors.white}
          />
          <Text style={styles.detailsText}>Detail</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: Metrics.rfv(40),
    marginHorizontal: Metrics.rfv(10),
    flexDirection: 'row',
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: Metrics.rfv(20),
    marginBottom: 10,
  },
  iconView: {marginHorizontal: Metrics.rfv(4)},
  volumeVIew: {
    paddingLeft: Metrics.rfv(5),

    paddingBottom: Metrics.rfv(10),
    paddingTop: Metrics.rfv(10),
  },
  swiperContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  wrapper: {
    // Additional styling for the swiper wrapper can be added here
  },
  slide: {
    justifyContent: 'center',
    // alignItems: 'center',
    paddingVertical: Metrics.rfv(5),
    marginRight: Metrics.rfv(3),
  },
  text: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: Metrics.rfv(11),
    // marginTop: Metrics.rfv(5),
    fontFamily: Fonts.Roboto500,
  },
  detailsButton: {
    backgroundColor: Colors.Primary_300,
    borderRadius: Metrics.rfv(20),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Metrics.rfv(5),
    marginRight: Metrics.rfv(5),
  },
  iconStyle: {
    paddingLeft: Metrics.rfv(15),
  },
  detailsText: {
    paddingLeft: Metrics.rfv(5),
    paddingRight: Metrics.rfv(15),
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: Metrics.rfv(13),
    fontFamily: Fonts.Roboto500,
  },
});

export default ScrollingTextSwiper;
