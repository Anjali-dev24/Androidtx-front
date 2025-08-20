import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderTitleComponent from '../../Components/HeaderTitle';
import Svg, {Path, SvgUri} from 'react-native-svg';
import {ActivityIndicator} from 'react-native';
import Images from '../../constant/images/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';

const AboutUs = ({navigation, props}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer = setInterval(() => {
      if (loading) {
        setLoading(false), navigation.goBack();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [loading]);

  return (
    <View style={styles.container}>
      <HeaderTitleComponent
        title={'About Us'}
        goBack={() => navigation.goBack()}
        mainStyle={styles.mainHeaderStyle}
        style={{paddingBottom:10}}
      />
      {!loading ? (
        <View>
          <FastImage style={styles.aboutUsImg} source={{uri:'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907924/aboutUs_d5p9cs.jpg',priority: FastImage.priority.low,}} />
          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              AsyncStorage.setItem('isPrivacyOpened', 'true');
            }}
            style={[styles.avatarView, styles.settings]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FastImage style={styles.agreement} source={{uri:'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907915/agreement_sxqmou.png',priority: FastImage.priority.low,}} />
              <Text style={styles.passwordText}>Confidentiality Agreement</Text>
            </View>

            <View style={styles.changeStyle} onPress={() => {}}>
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
            </View>
          </TouchableOpacity>
          <View style={styles.border} />
          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              AsyncStorage.setItem('isPrivacyOpened', 'true');
            }}
            style={[styles.avatarView, styles.settings]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FastImage style={styles.agreement} source={{uri:'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907915/agreement_sxqmou.png',priority: FastImage.priority.low,}} />
              <Text style={styles.passwordText}>Risk Disclosure Agreement</Text>
            </View>
            <View style={styles.changeStyle} onPress={() => {}}>
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
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            style={{justifyContent: 'center', alignItems: 'center'}}
            size={'large'}
            color={'#962f2a'}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width:"100%",
  },
  settings: {
    marginVertical: 5,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 8,
  },
  changeStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    // width:'40%',
    justifyContent: 'flex-end',
  },
  aboutUsImg: {
    width: '100%',
    height: 200,
  },
  border: {
    borderBottomColor: '#dedee0',
    borderBottomWidth: 1,
    marginHorizontal: 25,
  },
  agreement: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
});

export default AboutUs;
