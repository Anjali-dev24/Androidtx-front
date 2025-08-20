import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Svg, {Polygon, Defs, LinearGradient, Stop} from 'react-native-svg';
import {Colors} from '../../Helpers/Colors';
import Images from '../../constant/images/Images';
import HeaderTitleComponent from '../../Components/HeaderTitle';
import Button from '../../Components/Button';
import {bonus, gamesData} from '../../constant/data';
import {color} from 'react-native-elements/dist/helpers';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import Metrics from '../../Helpers/Metrics';
// import { RewardRules } from '../../constant/data';

const TriColorTriangle = ({navigation}) => {
  const { t } = useTranslation();
  const {width} = Dimensions.get('window');
  const height = width / 3.5; // Adjust height based on your aspect ratio

  const Item = ({title}: ItemProps) => (
    <TouchableOpacity style={styles.selectedLanguage}>
      <View style={styles.giftRedeemImg}>
        <FastImage resizeMode='stretch' style={styles.imageView} source={{uri:title.image, priority: FastImage.priority.low,}}/>
      </View>
      <Text style={styles.gameTitle}>{title.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTitleComponent
        title={t('titles.Promotion')}
        goBack={() => navigation?.goBack()}
        mainStyle={styles.mainHeaderStyle}
        style={{paddingBottom:8}}
      />
      <View style={{padding: 10}}>
        <View style={styles.rewardCont}>
        <TouchableOpacity
            onPress={() => {
              navigation.navigate('Attendance');
            }}
            style={{alignItems: 'center', width:'25%'}}>
            <FastImage
              style={styles.activityRewardImg}
              source={{uri:'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907914/activityReward_ztj9qj.png', priority: FastImage.priority.low,}}
            />
            <Text style={{textAlign:"center"}}>{t("promotionScreen.attendance")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('FirstDepositBonus');
            }}
            style={{alignItems: 'center',width:'25%'}}>
            <FastImage
              style={styles.activityRewardImg}
              source={{uri:'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907912/invitationBonus_eaz2wf.png', priority: FastImage.priority.low}}
            />
            <Text  style={{textAlign:"center"}}>{t("promotionScreen.firstDeposit")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('InvitationRules');
            }}
            style={{alignItems: 'center',width:'25%'}}>
            <FastImage
              style={styles.activityRewardImg}
              source={{uri:'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907912/invitationBonus_eaz2wf.png', priority: FastImage.priority.low}}
            />
            <Text  style={{textAlign:"center"}}>{t("promotionScreen.invitationRule")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('InvitationRecords');
            }}
            style={{alignItems: 'center',width:'25%'}}>
            <FastImage
              style={styles.activityRewardImg}
              source={{uri:'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907914/activityReward_ztj9qj.png', priority: FastImage.priority.low}}
            />
            <Text  style={{textAlign:"center"}}>{t("promotionScreen.invitationRecord")}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={gamesData}
          renderItem={({item}) => <Item title={item} />}
          keyExtractor={item => item.id}
          style={{flexGrow:1}}
          ListFooterComponent={<View style={{height: 200}}/>}
        />
      </View>
    </SafeAreaView>
    // <Svg
    //   height={height}
    //   width={width}
    //   viewBox={`0 0 ${width} ${height}`}
    //   style={{transform: [{rotate: '180deg'}]}}>
    //   <Defs>
    //     <LinearGradient id="grad1" x1="-15%" y1="10%" x2="3%" y2="200%">
    //       <Stop offset="60%" style={{stopColor: 'purple', stopOpacity: 1}} />
    //       <Stop offset="60%" style={{stopColor: 'yellow', stopOpacity: 1}} />
    //     </LinearGradient>
    //   </Defs>
    //   <Polygon
    //     points={`0,${height} ${width / 2},0 ${width},${height}`}
    //     fill="url(#grad1)"
    //   />
    // </Svg>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  activityRewardImg: {
    width: 50,
    height: 50,
  },
  rewardCont: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: '500',
    justifyContent: 'space-evenly',
    // marginVertical: 15,
    width:"100%"
  },
  mainHeaderStyle: {
    height: '100%',
  },
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 5,
    padding: 10,
    borderRadius: 8,
  },
  rewardsView: {
    color: '#000',
    fontSize: 14,
  },
  bonusView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.green,
    padding: 10,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  rewardsView: {
    color: '#fff',
    fontSize: 10,
  },
  rewards: {
    backgroundColor: '#fff',
    padding: 3,
    borderRadius: 20,
    fontSize: 10,
    color: Colors.grey,
    marginRight: 15,
  },
  amount: {
    color: '#C78C06',
  },
  invitees: {
    color: '#000',
    fontSize: 12,
    fontWeight: '500',
  },
  ButtonView: {
    backgroundColor: '#962f2a',
    borderRadius: 10,
    paddingVertical: 7,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  border: {
    borderBottomColor: '#dedee0',
    borderBottomWidth: 1,
    marginVertical: 15,
    marginHorizontal: 10,
  },
  totalNumber: {
    color: '#C78C06',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  totalText: {
    color: Colors.grey,
    fontSize: 10,
    textAlign: 'center',
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: Colors.grey,
  },
  giftRedeemImg: {
    // width: 400,
    // height: 140,
    aspectRatio:2,
    borderTopLeftRadius:12,
    borderTopRightRadius:12,
    overflow:"hidden"
},
  imageView:{
    width:"100%",
    height:'100%'
  },
  gameTitle:{
    fontSize:14,
    fontWeight:"500",
    paddingVertical:10,
    paddingHorizontal:5,
    paddingBottom:10
  },
  selectedLanguage:{
    backgroundColor:'#dedee0',
    marginVertical:10,
    borderTopLeftRadius:12,
    borderTopRightRadius:12,
  }
});

export default TriColorTriangle;
