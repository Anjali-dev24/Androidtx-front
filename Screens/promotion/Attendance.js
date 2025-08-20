import React, { useEffect } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../Components/Button';
import HeaderTitleComponent from '../../Components/HeaderTitle';
import { bonusBannar } from '../../constant/data';
import Images from '../../constant/images/Images';
import Metrics from '../../Helpers/Metrics';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';

const Attendance = ({navigation}) => {
  const { t } = useTranslation();
  useEffect(() => {
    console.log(
      '-=-=-=-=-==-bonusBannar.length/2-=-=-=-',
      bonusBannar.length % 2 == 0,
    );
  }, []);

  const renderItem = ({item, index}) => {
    return index === bonusBannar.length - 1 ? (
      <TouchableOpacity style={styles.lastItem}>
        <FastImage
          resizeMode="contain"
          style={styles.giftImg}
          source={{uri:'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907477/gift_m9n5he.png', priority: FastImage.priority.low,}}
        />
        <View style={{width: '30%'}}>
          <Text style={[styles.bonusAmount, {textAlign: 'center'}]}>
            {item.bonusAmount}
          </Text>
          <Text
            style={[
              styles.bonusAmount,
              {color: '#C2C2C2', textAlign: 'center'},
            ]}>
            {item.days}
          </Text>
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() => {}}
        style={[
          styles.itemContainer,

          index != bonusBannar.length - 1 && {alignItems: 'center'},
          index === bonusBannar.length - 1 && {paddingLeft: 15},
          // {
          //   alignItems:
          //     bonusBannar.length % 2 == 0 && index === bonusBannar.length - 1
          //      &&'flex-start',
          // },
        ]}>
        <Text
          style={[
            styles.bonusAmount,
            index != bonusBannar.length - 1 && {textAlign: 'center'},
          ]}>
          {item.bonusAmount}
        </Text>
        <FastImage
          resizeMode="contain"
          style={styles.avatar}
          source={{uri:'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907911/bonus_star_unvogz.png', priority: FastImage.priority.low,}}
        />
        <Text
          style={[
            styles.bonusAmount,
            {
              color: '#C2C2C2',
            },
          ]}>
          {item.days}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderTitleComponent
        title={t('titles.attendanceBonus')}
        goBack={() => navigation?.goBack()}
        mainStyle={styles.mainHeaderStyle}
        style={{paddingBottom:8}}
      />
      <ImageBackground source={{uri:'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110041/headerBg-c5504bca_bkbjwv.png'}} style={styles.mainContainer}>
        {/* <Image style={styles.attendanceImg} source={Images.attendance}/> */}
        <Text style={styles.title}>{t('attendanceScreen.attendanceBonus')}</Text>
        <Text style={styles.subTitle}>
        {t('attendanceScreen.subTitle')}
        </Text>
        <View style={styles.attendanceCons}>
          <View style={styles.rightBadge} />
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styles.attendanceText}>
            {t('attendanceScreen.attendanceConsecutively')}
          </Text>
          <View style={styles.dayView}>
            <Text style={styles.Totaldays}>0</Text>
            <Text style={styles.daysText}>Day</Text>
          </View>
        </View>
        <Text style={styles.bottomText}>{t('attendanceScreen.acumulated')}</Text>
        <Text style={styles.amount}>$ 0.00</Text>
        {/* <View style={styles.buttonView}>
          <Button
            buttonStyle={styles.gameButton}
            full={false}
            buttonTitleStyle={styles.gameText}
            buttonTitle={t('Buttons.gameRules')}
            onButtonPress={() => {
              // navigation.navigate('Register');
            }}
          />
          <Button
            buttonStyle={[styles.gameButton, {width: '50%'}]}
            full={false}
            buttonTitleStyle={styles.gameText}
            buttonTitle={t('Buttons.attendanceHistory')}
            onButtonPress={() => {
              // navigation.navigate('Register');
            }}
          />
        </View> */}
      </ImageBackground>
      <FlatList
        numColumns={3}
        // nestedScrollEnabled
        data={bonusBannar}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{width: '100%', padding: 10}}
        ListFooterComponent={<View style={{marginBottom: 20}} />}
      />

      <Button
        buttonStyle={[styles.gameButton, {width: '80%'}]}
        full={false}
        buttonTitleStyle={styles.gameText}
        buttonTitle={t('Buttons.attendance')}
        onButtonPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    // height: 250,
    backgroundColor: '#F54545',
    padding: 15,
  },
  attendanceImg: {
    width: 300,
    height: 300,
  },
  title: {
    color: '#fff',
    fontSize: 21,
    fontWeight: '600',
  },
  subTitle: {
    color: '#fff',
    fontSize: 12,
  },
  attendanceCons: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    width: 200,
    paddingVertical: 5,
    marginVertical: 15,
  },
  attendanceText: {
    color: '#F54545',
    fontSize: 14,
    fontWeight: '500',
  },
  Totaldays: {
    color: '#F54545',
    fontSize: 21,
    fontWeight: '700',
    textAlign: 'left',
  },
  daysText: {
    color: '#F54545',
    fontSize: 14,
    fontWeight: '400',
    paddingLeft: 5,
  },
  dayView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightBadge: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 29,
    borderRightWidth: 20,
    borderRightColor: '#F54545',
    borderBottomWidth: 29,
    borderBottomColor: 'transparent',
  },
  bottomText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  amount: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  gameButton: {
    backgroundColor: '#f09450',
    paddingVertical: Metrics.rfv(10),
    paddingHorizontal: Metrics.rfv(15),
    borderRadius: 8,
    width: '40%',
    margin: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  gameText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  itemContainer: {
    // alignItems: 'center',
    // width: '30%',
    // margin: 5,
    // height: 150,
    justifyContent: 'space-evenly',
    // borderRadius: 8,
    // backgroundColor: '#fff',
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    height: 150,
    borderRadius: 8,
  },
  lastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-evenly',
    borderRadius: 8,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  bonusAmount: {
    color: '#000',
    fontSize: 17,
  },
  giftImg: {
    width: 150,
    height: 150,
  },
});

export default Attendance;
