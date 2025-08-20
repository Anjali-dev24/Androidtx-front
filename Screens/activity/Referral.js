import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  Share,
  Modal,
} from 'react-native';
// import {depositData} from '../../Components/componentData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Metrics from '../../Helpers/Metrics';
import { Colors } from '../../Helpers/Colors';
import { Fonts, games, gamesData } from '../../constant/data';
import HeaderTitleComponent from '../../Components/HeaderTitle';
import LinearGradient from 'react-native-linear-gradient';
import Toast from "react-native-simple-toast";
import Images from '../../constant/images/Images';
import Clipboard from '@react-native-clipboard/clipboard';
import Button from '../../Components/Button';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import CustomToast from '../../Components/CustomToast';


const { width: screenWidth } = Dimensions.get('window');

const textData = [
  'Exclusive for the first recharge of the account. There is only one chance. The more you recharge, the more rewards you will receive. The highest reward is ₹8,888.00; Activities cannot be participated in repeatedly;',
  'Rewards can only be claimed manually on IOS, Android, H5, and PC;',
  'The bonus (excluding the principal) given in this event requires times the coding turnover (i.e. valid bets) before it can be withdrawn, and the coding does not limit the platform;',
  'This event is limited to normal human operations by the account owner. It is prohibited to rent, use plug-ins, robots, gamble with different accounts, brush each other, arbitrage, interfaces, protocols, exploit loopholes, group control or other technical means to participate, otherwise it will be canceled or Rewards will be deducted, frozen, or even blacklisted;',
  'In order to avoid differences in text understanding, the platform reserves the right of final interpretation of this event.',
];

const Item = ({ title }: ItemProps) => (
  // <View style={styles.item}>
  //   <Text style={styles.title}>{title}</Text>
  // </View>
  <View style={styles.luckSpinBanner}>
    <View style={{ width: '100%', height: 180 }}>
      <FastImage
        resizeMode="cover"
        style={styles.spinBanner}
        source={[title.image,{ priority: FastImage.priority.low,}]}
      />
    </View>
    <Text style={styles.luckSpin}>{title.title}</Text>
  </View>
);

const onShare = async (referral) => {
  try {
    const result = await Share.share({
      message:
        `I am inviting you to use tx, a simple and interesting games. Here's my referral code ${referral}`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error: any) {
    Alert.alert(error.message);
  }
};
const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64,
};

const Referral = ({ navigation }) => {
  const { t } = useTranslation();
  const [referral, setReferral] = useState('GVD36EVG')
  const [isToast, setIsToast] = useState(false);

  



  return (
    <View style={styles.container}>
      <HeaderTitleComponent
        // style={{ backgroundColor: "#962f2a" }}
        title={t('titles.referral')}
        goBack={() => navigation.goBack()}
        mainStyle={styles.mainHeaderStyle}
        style={{paddingBottom:8}}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1,  }}>
        {/* <Text style={{fontSize: 96}}>Scroll me plz</Text> */}
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={['#962f2a', '#ba4940', '#d35c50']}
          style={styles.mainContainer}>
          <FastImage style={styles.friendsImg} source={{ uri: 'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907877/referral_ggkjf3.png', priority: FastImage.priority.low, }} />

          <View style={{ paddingHorizontal: 15, }}>
            <Text style={[styles.title, { fontSize: 25 }]}>{t('referralScreen.title')}</Text>
            <View style={styles.rowView}>
              <View style={styles.refView}>
                <Text style={styles.title}>A345SGH</Text>
                <TouchableOpacity onPress={() => {setIsToast(true), setTimeout(() => {
                  setIsToast(false)
                }, 3000); }}>
                  <FastImage style={styles.copyImg} source={{ uri: 'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907872/copy_uoq8ic.png',  priority: FastImage.priority.low, }} />
                </TouchableOpacity>
              </View>
              <Button
                buttonTitleStyle={styles.buttonText}
                // disabled={!isValid}
                full={true}
                buttonTitle={t('referralScreen.share')}
                buttonStyle={styles.ButtonView}
                onButtonPress={() => {
                  onShare(referral)
                }} // Use Formik's handleSubmit
              />

            </View>
            <Text style={styles.offers}>{t('referralScreen.steps')}</Text>
            <View style={styles.offerView}>
              <View style={styles.rules}>
                <Text style={styles.firstRule}>1</Text>
              </View>

              <View>
                <Text style={styles.firstRuleText}>{t('referralScreen.inviteFriend')}</Text>
                <Text style={[styles.firstRuleText, { color: 'rgba(255,255,255,0.5)' }]}>{t('referralScreen.shareCode')}</Text>
              </View>

            </View>
            <View style={styles.verticleLine} />
            <View style={styles.offerView}>
              <View style={styles.rules}>
                <Text style={styles.firstRule}>2</Text>
              </View>
              <View>
                <Text style={styles.firstRuleText}>{t('referralScreen.newSignup')}</Text>
                <Text style={[styles.firstRuleText, { color: 'rgba(255,255,255,0.5)' }]}>{t('referralScreen.freshUser')}</Text>
              </View>

            </View>
            <View style={styles.verticleLine} />
            <View style={styles.offerView}>
              <View style={styles.rules}>
                <Text style={styles.firstRule}>3</Text>
              </View>
              <View>
                <Text style={styles.firstRuleText}>{t('referralScreen.offers')}</Text>
                <Text style={[styles.firstRuleText, { color: 'rgba(255,255,255,0.5)' }]}>{t('referralScreen.askFriend')}</Text>
              </View>

            </View>
          </View>
          {isToast && <CustomToast isToast={isToast} onRequestClose={()=>{setIsToast(false)}}/>}
        </LinearGradient>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  mainContainer: {
    flexGrow: 1,
    paddingBottom:20
    // padding: 15,
    // backgroundColor:"red",
    // minHeight: '100%',
  },
  shareStyle: {
    textAlign: "center",
    fontSize: 15,
    color: "#89CFF0"
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  refView: {
    // borderColor: '#fff',
    // borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 13,
    // marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: "70%",
    justifyContent: "space-between"

  },
  modalContainer: {
    backgroundColor: "transparent",
    justifyContent: "center",
    marginBottom: 20,
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    top: 0,
  },
  gameButton: {
    padding: 15,
  },
  subTitle: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  activityOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  awardImg: {
    width: 50,
    height: 50,
  },
  awardStyle: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
  },
  awrdView: {
    marginHorizontal: 15,
  },
  giftRedeemImg: {
    width: '100%',
    height: 103,
    overflow: 'hidden',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  redeemContainer: {
    width: 185,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 20,
  },
  giftText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    padding: 10,
  },
  giftTitle: {
    color: '#000',
    fontSize: 12,
    fontWeight: '400',
    paddingHorizontal: 10,
    paddingBottom: 25,
  },
  giftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spinBanner: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  luckSpinBanner: {
    backgroundColor: '#fff',
    borderRadius: 8,
    flex: 1,
    marginVertical: 10,
    // height:'50%'
  },
  luckSpin: {
    color: '#000',
    fontSize: 16,
    padding: 10,
  },
  friendsImg: {
    width: '70%',
    height: 250,
    alignSelf: "center"
  },
  copyImg: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 15,
    alignSelf: "center"
  },
  ButtonView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 13,
    margin: 10,
    paddingHorizontal: 15
  },
  buttonText: {
    color: "#962f2a",
    textAlign: "center",
    fontWeight: "500"
  },
  offers: {
    color: '#fff',
    padding: 10,
  },
  rules: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent:"center",
    marginHorizontal: 10,
  },
  firstRule: {
    borderColor: '#fff',
    borderWidth: 1,
    padding: 10,
    color: "#fff",
    borderRadius: 25,
    // width: "15%",
    textAlign: "center",
    fontSize: 20,
    // marginHorizontal: 10,
    // marginVertical:10
  },
  offerView: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: "100%",
  },
  firstRuleText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: '500'
  },
  verticleLine: {
    // height: '8%',
    borderLeftWidth: 2,
    borderLeftColor: '#fff',
    borderStyle: 'dashed',
    marginLeft: Metrics.rfv(28),
    alignSelf: "flex-start",
    paddingVertical: Metrics.rfv(10),
  }
});

export default Referral;
