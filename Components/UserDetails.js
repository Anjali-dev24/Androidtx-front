import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Metrics from '../Helpers/Metrics';
import Svg, { Path, SvgUri } from 'react-native-svg';

const UserDetails = props => {
  return (
    <TouchableOpacity
      key={props.label}
      style={styles.navItem}
      onPress={props.onClick}>
      <View style={styles.navItemRow}>
        {props.children}
        <Text style={styles.navText}>{props.label}</Text>
      </View>
      <View style={{width: 25, height: 25}}>
        <SvgUri
        preserveAspectRatio='xMinYMin slice'
          style={{marginHorizontal: 1}}
          color={'#000'}
          width={'100%'}
          height={'100%'}
          uri={
            'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735137648/svgviewer-output_27_i5sweu.svg'
          }></SvgUri>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    navItem: {
        width: '100%',
        padding: Metrics.rfv(10),
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      navItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      navText: {
        fontSize: Metrics.rfv(16),
        color: '#000',
        marginLeft: Metrics.rfv(10),
        // fontFamily: Fonts.Roboto400,
      },
});

export default UserDetails;
