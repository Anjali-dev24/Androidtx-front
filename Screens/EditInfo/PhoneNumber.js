import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderTitleComponent from '../../Components/HeaderTitle';
import Svg, {Path, Use} from 'react-native-svg';
import Metrics from '../../Helpers/Metrics';
import {Fonts} from '../../constant/data';
import {Colors} from '../../Helpers/Colors';
import Button from '../../Components/Button';
import Images from '../../constant/images/Images';
import FastImage from 'react-native-fast-image';
import TimeZoneComponent from '../../Components/TimeZoneComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PhoneNumber = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [errorPhone, setErrorPhone] = useState('');
  const [newErrorPhone, setNewErrorPhone] = useState('');
  const [dialCode, setDialCode] = useState();
    const [showCreds, setShowCreds] = useState(false);
      const [saveData, setSaveData] = useState();
    
  
  

useEffect(() => {
 console.log('-=-=-=-global.userInfo-=-=-=-', global.userInfo);
 
}, [])

  const validations = () => {
    if (phoneNumber === '') {
      console.log('-=-=-=-=-=-login-=-=-=-', phoneNumber);

      setErrorPhone('Please enter previous phone number.');
    } else if (newPhoneNumber === '') {
      setNewErrorPhone('Please enter new phone number.');
    } else {
      navigation.navigate('OTP',{ email: global.userInfo?.user?.email })
    }
  };

  return (
    <View style={styles.container}>
      <HeaderTitleComponent
        title={'Change Phone Number'}
        goBack={() => navigation.goBack()}
        mainStyle={styles.mainHeaderStyle}
        style={{paddingBottom:8}}
      />
      <View style={styles.mainContainer}>
        <View style={styles.inputView}>
          <FastImage style={styles.loginPasswordStyle} source={{uri:'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907913/phone_v5jutl.png', priority: FastImage.priority.low,}} />
          <Text style={styles.loginTitle}>Old Number</Text>
        </View>
        <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "90%",
                    alignSelf:"center"
                  }}
                >
                  <View style={styles.picker}>
                    <TimeZoneComponent
                      code={true}
                      data={dialCode}
                      title={"+91"}
                      onIsdPress={() => {
                        console.log(
                          "-=-=-=-heloo-=-=",
                          dialCode?.length,
                          dialCode
                        );
                        if (dialCode?.length === undefined) {
                          setErrorAlert(true);
                          setErrorMsg("Network Error");
                        }
                      }}
                      selectedItem={global.selectedCountry?.dialingCode?`+${global.selectedCountry?.dialingCode}`:"+91"}
                      setSelectedItem={(itemValue) => {
                        console.log("-=-=-=-=-=-=item-=-=-=-=-", itemValue);
                        AsyncStorage.setItem("dialCode", itemValue);
                        setSelectedCountry(itemValue);
                      }}
                    />
                  </View>

                  <TextInput
                    onFocus={async () => {
                      const showCreds = await AsyncStorage.getItem(
                        "credentials"
                      );
                      console.log(
                        "-=-=-=-=-hi-=-=-0=-",
                        typeof phoneNumber,
                        showCreds
                      );
                      let parseData = JSON.parse(showCreds);
                      if (parseData) {
                        setShowCreds(true);
                        setSaveData(parseData);
                      }
                    }}
                    placeholder="old phone number"
                    placeholderTextColor={Colors.grey}
                    keyboardType="number-pad"
                    style={[
                      styles.inputStyle,
                      {
                        borderColor: "#dedee0",
                        borderWidth: 1,
                        borderRadius: Metrics.rfv(10),
                        marginTop: Metrics.rfv(15),
                      },
                    ]}
                    onChangeText={(text) => {
                      setShowCreds(false);
                      setErrorPhone("");
                      setPhoneNumber(text);
                    }}
                    // onBlur={handleBlur('phoneNumber')}
                    value={phoneNumber}
                  />
                  {/* {showCreds && phoneNumber == "" && credsToast()} */}
                  {/* {credsToast()} */}
                </View>
              
        {errorPhone && (
          <Text
            style={{
              ...styles.errorText,
              marginTop: Metrics.rfv(5),
              fontFamily: Fonts.Roboto400,
              marginLeft: Metrics.rfv(15),
            }}>
            {errorPhone}
          </Text>
        )}
        <View style={styles.inputView}>
          <FastImage style={styles.loginPasswordStyle} source={{uri:'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907913/phone_v5jutl.png', priority: FastImage.priority.low,}} />
          <Text style={styles.loginTitle}>New Number</Text>
        </View>
        <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "90%",
                    alignSelf:"center"
                  }}
                >
                  <View style={styles.picker}>
                    <TimeZoneComponent
                      code={true}
                      data={dialCode}
                      title={"+91"}
                      onIsdPress={() => {
                        console.log(
                          "-=-=-=-heloo-=-=",
                          dialCode?.length,
                          dialCode
                        );
                        if (dialCode?.length === undefined) {
                          setErrorAlert(true);
                          setErrorMsg("Network Error");
                        }
                      }}
                      selectedItem={global.selectedCountry?.dialingCode?`+${global.selectedCountry?.dialingCode}`:"+91"}
                      setSelectedItem={(itemValue) => {
                        console.log("-=-=-=-=-=-=item-=-=-=-=-", itemValue);
                        AsyncStorage.setItem("dialCode", itemValue);
                        setSelectedCountry(itemValue);
                      }}
                    />
                  </View>

                  <TextInput
                    onFocus={async () => {
                      const showCreds = await AsyncStorage.getItem(
                        "credentials"
                      );
                      console.log(
                        "-=-=-=-=-hi-=-=-0=-",
                        typeof phoneNumber,
                        showCreds
                      );
                      let parseData = JSON.parse(showCreds);
                      if (parseData) {
                        setShowCreds(true);
                        setSaveData(parseData);
                      }
                    }}
                    placeholder="new phone number"
                    placeholderTextColor={Colors.grey}
                    keyboardType="number-pad"
                    style={[
                      styles.inputStyle,
                      {
                        borderColor: "#dedee0",
                        borderWidth: 1,
                        borderRadius: Metrics.rfv(10),
                        marginTop: Metrics.rfv(15),
                      },
                    ]}
                    onChangeText={(text) => {
                      setShowCreds(false);
                      setNewErrorPhone("");
                      setNewPhoneNumber(text);
                    }}
                    // onBlur={handleBlur('phoneNumber')}
                    value={newPhoneNumber}
                  />
                  {/* {showCreds && phoneNumber == "" && credsToast()} */}
                  {/* {credsToast()} */}
                </View>
              
        {newErrorPhone && (
          <Text
            style={{
              ...styles.errorText,
              marginTop: Metrics.rfv(5),
              fontFamily: Fonts.Roboto400,
              marginLeft: Metrics.rfv(15),
            }}>
            {newErrorPhone}
          </Text>
        )}

        {/* <TouchableOpacity onPress={()=>{navigation.navigate('OTP',{ email: global.userInfo?.user?.email })}} style={styles.bottomInput}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FastImage style={styles.loginPasswordStyle} source={{uri:'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907913/phone_v5jutl.png', priority: FastImage.priority.low,}} />
            <Text style={styles.loginTitle}>Change Phone Number</Text>
          </View>

          <Svg
            color={'#000'}
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
            height="30em"
            width="30em"
            xmlns="http://www.w3.org/2000/svg">
            <Path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7"></Path>
          </Svg>
        </TouchableOpacity> */}
      
      </View>
      <View style={{flex:0.2, justifyContent:"center"}}>
        <Button
        buttonTitleStyle={styles.buttonText}
        // disabled={!isValid}
        full={true}
        buttonTitle="Change"
        buttonStyle={styles.ButtonView}
        onButtonPress={() => {
          validations();
        }} // Use Formik's handleSubmit
      />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex:0.8,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },

  bottomInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
    marginTop:15,
    backgroundColor:'#dedee0'
  },
  loginTitle: {
    fontSize: 16,
  },
  picker: {
    width: "30%",
    marginTop: Metrics.rfv(15),
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Metrics.rfv(10),
    borderWidth: 1,
    marginTop: Metrics.rfv(5),
    borderColor: '#dedee0',
    marginHorizontal: 15,
  },
  inputStyle: {
    flex: 1,
    paddingVertical: Metrics.rfv(10),
    paddingHorizontal: Metrics.rfv(12),
    color: Colors.black,
    fontFamily: Fonts.Roboto400,
    marginLeft: 10,
    fontSize: Metrics.rfv(18),
  },
  ButtonView: {
    backgroundColor: '#962f2a',
    borderRadius: 10,
    paddingVertical: 13,
    margin: 10,
    paddingHorizontal: 15,
    // marginTop: 'auto',
    width: '40%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  loginPasswordStyle: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    fontSize: Metrics.rfv(12),
  },
});

export default PhoneNumber;
