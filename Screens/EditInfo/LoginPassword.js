import React, {useState} from 'react';
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

const LoginPassword = ({navigation}) => {
  const [loginPassword, setLoginPassword] = useState('');
  const [newLoginPassword, setNewLoginPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmLoginPassword, setConfirmLoginPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [newErrorPassword, setNewErrorPassword] = useState('');
  const [confirmErrorPassword, setConfirmErrorPassword] = useState('');

  const validations = () => {
    if (loginPassword === '') {
      console.log('-=-=-=-=-=-login-=-=-=-', loginPassword);

      setErrorPassword('Please enter previous login password.');
    } else if (newLoginPassword === '') {
      setNewErrorPassword('Please enter new login password.');
    } else if (confirmLoginPassword === '') {
      setConfirmErrorPassword('Please enter confirm login password');
    } else if (confirmLoginPassword != newLoginPassword) {
      setConfirmErrorPassword('Please enter same password');
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <HeaderTitleComponent
        title={'Change Login Password'}
        goBack={() => navigation.goBack()}
        mainStyle={styles.mainHeaderStyle}
        style={{paddingBottom:8}}
      />
      <View style={styles.mainContainer}>
        <View style={styles.inputView}>
          <FastImage
            style={styles.loginPasswordStyle}
            source={{uri:'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110047/ununlocked-b5a4c7d0_a0guft.png', priority: FastImage.priority.low,}}
          />
          <Text style={styles.loginTitle}>Login Password</Text>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            onFocus={() => {
              setErrorPassword('');
            }}
            placeholder="Login Password"
            placeholderTextColor={Colors.grey}
            secureTextEntry={!passwordVisible}
            style={styles.inputStyle}
            onChangeText={text => {
              setErrorPassword('');
              setLoginPassword(text);
            }}
            value={loginPassword}
          />
          <TouchableOpacity
            style={{width: 20, height: 20, marginRight: 20}}
            onPress={() => setPasswordVisible(!passwordVisible)}>
            {!passwordVisible ? (
               <FastImage
               resizeMode="contain"
               style={{width: '100%', height: '100%'}}
               source={{
                 uri: 'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110164/eyeInvisible-821d9d16_bhciqb.png',
              
              priority: FastImage.priority.low,  }}
             />
           ) : (
             <FastImage
               resizeMode="contain"
               style={{width: '100%', height: '100%'}}
               source={{
                 uri: 'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110164/eyeVisible-09720f5f_tnwwrq.png',
              priority: FastImage.priority.low,
                }}
             />
            )}
          </TouchableOpacity>
        </View>
        {errorPassword && (
          <Text
            style={{
              ...styles.errorText,
              marginTop: Metrics.rfv(5),
              fontFamily: Fonts.Roboto400,
              marginLeft: Metrics.rfv(15),
            }}>
            {errorPassword}
          </Text>
        )}
        {/* </View> */}

        <View style={styles.inputView}>
          <FastImage
            style={styles.loginPasswordStyle}
            source={{uri:'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110047/ununlocked-b5a4c7d0_a0guft.png', priority: FastImage.priority.low,}}
          />
          <Text style={styles.loginTitle}>New Login Password</Text>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            onFocus={() => {
              setNewErrorPassword('');
            }}
            placeholder="New Login Password"
            placeholderTextColor={Colors.grey}
            secureTextEntry={!newPasswordVisible}
            style={styles.inputStyle}
            onChangeText={text => {
              setNewErrorPassword('');
              setNewLoginPassword(text);
            }}
            value={newLoginPassword}
          />
          <TouchableOpacity
            style={{width: 20, height: 20, marginRight: 20}}
            onPress={() => setNewPasswordVisible(!newPasswordVisible)}>
            {!newPasswordVisible ? (
             <FastImage
             resizeMode="contain"
             style={{width: '100%', height: '100%'}}
             source={{
               uri: 'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110164/eyeInvisible-821d9d16_bhciqb.png',
             priority: FastImage.priority.low,
              }}
           />
         ) : (
           <FastImage
             resizeMode="contain"
             style={{width: '100%', height: '100%'}}
             source={{
               uri: 'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110164/eyeVisible-09720f5f_tnwwrq.png',
            priority: FastImage.priority.low,
              }}
           />
            )}
          </TouchableOpacity>
        </View>
        {newErrorPassword && (
          <Text
            style={{
              ...styles.errorText,
              marginTop: Metrics.rfv(5),
              fontFamily: Fonts.Roboto400,
              marginLeft: Metrics.rfv(15),
            }}>
            {newErrorPassword}
          </Text>
        )}
        <View style={styles.inputView}>
          <FastImage
            style={styles.loginPasswordStyle}
            source={{uri:'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110047/ununlocked-b5a4c7d0_a0guft.png', priority: FastImage.priority.low,}}
          />
          <Text style={styles.loginTitle}>Confirm Login Password</Text>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            onFocus={() => {
              setConfirmErrorPassword('');
            }}
            placeholder="Confirm Login Password"
            placeholderTextColor={Colors.grey}
            secureTextEntry={!confirmPasswordVisible}
            style={styles.inputStyle}
            onChangeText={text => {
              setConfirmErrorPassword('');
              setConfirmLoginPassword(text);
            }}
            value={confirmLoginPassword}
          />
          <TouchableOpacity
            style={{width: 20, height: 20, marginRight: 20}}
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            {!confirmPasswordVisible ? (
             <FastImage
             resizeMode="contain"
             style={{width: '100%', height: '100%'}}
             source={{
               uri: 'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110164/eyeInvisible-821d9d16_bhciqb.png',
            priority: FastImage.priority.low,
              }}
           />
         ) : (
           <FastImage
             resizeMode="contain"
             style={{width: '100%', height: '100%'}}
             source={{
               uri: 'https://res.cloudinary.com/dwtdpelrp/image/upload/v1735110164/eyeVisible-09720f5f_tnwwrq.png',
            priority: FastImage.priority.low,
              }}
           />
            )}
          </TouchableOpacity>
        </View>
        {confirmErrorPassword && (
          <Text
            style={{
              ...styles.errorText,
              marginTop: Metrics.rfv(5),
              fontFamily: Fonts.Roboto400,
              marginLeft: Metrics.rfv(15),
            }}>
            {confirmErrorPassword}
          </Text>
        )}
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
    flex:0.8
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  loginTitle: {
    fontSize: Metrics.rfv(18),
    fontWeight:"700"
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
    fontSize:Metrics.rfv(15)
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
    // marginBottom:Metrics.rfv(30)
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
    fontSize:Metrics.rfv(15)
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

export default LoginPassword;
