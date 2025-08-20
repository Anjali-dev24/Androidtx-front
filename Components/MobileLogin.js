import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {CheckBox} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
// import CountryPicker from './CountryPicker';
import Metrics from '../Helpers/Metrics';
import {Colors} from '../Helpers/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Add this import for the eye icon
import {Fonts} from '../constant/data';

const MobileLogin = () => {
  const [checked, setChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const navigation = useNavigation();
  const [SelectedCountry, setSelectedCountry] = useState({
    name: 'India',
    dialCode: '+91',
    isoCode: 'IN',
    flag: 'https://cdn.kcak11.com/CountryFlags/countries/in.svg',
  });

  const fetchCountry = data => {
    setSelectedCountry(data);
    // console.log(data);
  };

  return (
    <View style={{paddingHorizontal: 16, paddingVertical: 20}}>
      <View style={{height: 200, justifyContent: 'space-around'}}>
        <Text
          style={{
            fontSize: Metrics.rfv(15),
            fontWeight: 'bold',
            fontFamily: Fonts.Roboto300,
          }}>
          Phone Number
        </Text>
        {/* <CountryPicker fetchCountry={fetchCountry} value={SelectedCountry} /> */}
        <Text
          style={{
            fontSize: Metrics.rfv(15),
            fontFamily: Fonts.Roboto300,
            fontWeight: 'bold',
          }}>
          Password
        </Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="*****"
            secureTextEntry={!passwordVisible} // Toggle secureTextEntry based on state
            style={styles.inputStyle}
            placeholderTextColor={Colors.grey}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon
              name={passwordVisible ? 'visibility' : 'visibility-off'}
              size={24}
              color={Colors.grey}
              style={{marginRight: Metrics.rfv(10)}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox
            containerStyle={{margin: 0, width: 10, padding: 0, marginLeft: 0}}
            checked={checked}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text
            style={{
              color: '#3c88ce',
              fontFamily: Fonts.Roboto300,
              marginLeft: 5,
            }}>
            Remember me
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}>
          <Text style={{color: '#3c88ce', fontFamily: Fonts.Roboto300}}>
            Forgot password ?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MobileLogin;

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Metrics.rfv(10),
    borderWidth: 1,
    marginBottom: Metrics.rfv(10),
  },
  inputStyle: {
    flex: 1,
    paddingVertical: Metrics.rfv(10),
    paddingHorizontal: Metrics.rfv(12),
    color: Colors.black,
    fontFamily: Fonts.Roboto300,
  },
  dialCode: {
    fontSize: Metrics.rfv(16),
  },
});
