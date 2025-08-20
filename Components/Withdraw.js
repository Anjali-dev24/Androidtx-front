import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
// import UPI from '../Components/UPI';
// import Bank from '../Components/Bank';
import PageWrapperView from './PageWrapperView';
import Metrics from '../Helpers/Metrics';
import {Colors} from '../Helpers/Colors';
import {Fonts} from '../constant/data';
import FastImage from 'react-native-fast-image';

const Withdraw = () => {
  const navigation = useNavigation();
  const [paymentOption, setPaymentOption] = useState('Crypto');

  return (
    <PageWrapperView
      topSafeArea
      dark={true}
      style={styles.pageWrapper}
      statusBar={{background: '#a32324'}}>
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back-ios"
          color={'#fff'}
          size={35}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Withdraw</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.balanceContainer}>
          <View style={styles.balanceTextContainer}>
            <FontAwesome5 name="wallet" color={'#a32324'} size={30} />
            <Text style={styles.balanceText}>Winning Balance :</Text>
          </View>
          <Text style={styles.balanceAmount}>₹0</Text>
        </View>

        <Text style={styles.withdrawToText}>Select Withdraw to :</Text>
        <View style={styles.paymentOptionsContainer}>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              {
                borderBottomColor:
                  paymentOption === 'Crypto' ? '#a32324' : '#efefef',
              },
            ]}
            onPress={() => setPaymentOption('Crypto')}>
            <FastImage
              style={{height: Metrics.rfv(45), width: Metrics.rfv(50)}}
              source={[require('../Assets/wallet/Crypto.png'),{priority: FastImage.priority.low,}]}
              resizeMode="cover"
            />
            {/* <Text
              style={{
                ...styles.paymentOptionText,
                color: paymentOption === 'Crypto' ? '#a32324' : Colors.black,
              }}>
              Crypto
            </Text> */}
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={[
              styles.paymentOption,
              {
                borderBottomColor:
                  paymentOption === 'bank' ? '#a32324' : '#efefef',
              },
            ]}
            onPress={() => setPaymentOption('bank')}>
            <Image
              style={{height: Metrics.rfv(45), width: Metrics.rfv(50)}}
              source={require('../Assets/wallet/Bank.png')}
              resizeMode="cover"
            /> */}
            {/* <Text
              style={{
                ...styles.paymentOptionText,
                color: paymentOption === 'bank' ? '#a32324' : Colors.black,
              }}>
              Bank Account
            </Text> */}
            {/* <Image
              style={{height: Metrics.rfv(20), width: Metrics.rfv(20)}}
              source={require('../Assets/wallet/Bank.png')}
              resizeMode="cover"
            /> */}
          {/* </TouchableOpacity> */}
        </View>

        {/* {paymentOption === 'Crypto' ? (
          <UPI navigation={navigation} itemKey={'FromWithdraw'} />
        ) : (
          <Bank navigation={navigation} itemKey={'FromWithdraw'} />
        )} */}
        <Text style={styles.amountToWithdrawText}>Amount to withdraw</Text>
        <View style={styles.amountInputContainer}>
          <Text style={styles.currencyText}>₹</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="Please enter amount"
          />
        </View>
        <View
          style={{
            marginTop: Metrics.rfv(20),

            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#a32324',
              paddingHorizontal: 30,
              paddingVertical: 7,
              marginTop: 10,
              borderRadius: 5,
            }}
            onPress={() => {}}>
            <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
              Withdraw
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </PageWrapperView>
  );
};

export default Withdraw;

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 0,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#a32324',
    flexDirection: 'row',
    width: '100%',
    paddingBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerText: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: Fonts.Roboto400,
    width: '90%',
  },
  container: {
    padding: 10,
    width: '100%',
    height: '100%',
    backgroundColor: '#efefef',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  balanceTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceText: {
    marginLeft: 10,
    fontSize: Metrics.rfv(16),
    fontWeight: '400',
    fontFamily: Fonts.Roboto400,
    color: Colors.black,
  },
  balanceAmount: {
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
    fontFamily: Fonts.Roboto400,
  },
  withdrawToText: {
    borderLeftWidth: 1,
    borderColor: '#a32324',
    fontSize: 20,
    paddingLeft: 5,
    fontFamily: Fonts.Roboto400,
    marginVertical: 10,
    color: '#484848',
    fontWeight: 'bold',
  },
  paymentOptionsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  paymentOption: {
    width: '50%',
    borderBottomWidth: 2,
    paddingVertical: 5,
    alignItems: 'center',
  },
  paymentOptionText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.black,
    fontFamily: Fonts.Roboto400,
    fontSize: 20,
  },
  amountToWithdrawText: {
    color: '#a6a6a6',
    fontSize: 15,
    fontFamily: Fonts.Roboto400,
    marginLeft: Metrics.rfv(10),
  },
  amountInputContainer: {
    borderWidth: 0.5,
    marginTop: Metrics.rfv(10),
    marginHorizontal: Metrics.rfv(10),
    marginRight: Metrics.rfv(10),
    borderColor: 'grey',
    width: '95%',
    borderRadius: 5,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  currencyText: {
    fontSize: 20,
    color: Colors.black,
  },
  amountInput: {
    borderLeftWidth: 1,
    borderColor: '#a32324',
    width: '90%',
    fontSize: 18,
    paddingLeft: 5,
    color: Colors.black,
    fontFamily: Fonts.Roboto400,
  },
});
