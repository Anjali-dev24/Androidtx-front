import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import HeaderTitleComponent from '../../Components/HeaderTitle';
import LinearGradient from 'react-native-linear-gradient';
import Metrics from '../../Helpers/Metrics';
import Button from '../../Components/Button';
import {Colors} from '../../Helpers/Colors';

const CryptoDeposit = ({navigation, route}) => {
  const [deposit, setDeposit] = useState('');
  const [receive, setReceive] = useState('');

  useEffect(() => {
    console.log('-=-=-=-=-method-=212313-=-=-=-',  route.params.title);
  }, []);

  return (
    <LinearGradient
      colors={['#962f2a', '#ba4940', '#d35c50']}
      style={styles.container}>
      <HeaderTitleComponent
        style={{backgroundColor: '#962f2a'}}
        wallet={false}
        onCurrencyClick={() => {}}
        goBack={() => navigation.goBack()}
        title={'Deposit'}
      />
      <View style={styles.mainContainer}>
        <Text
          style={styles.title}>
          {route?.params?.title}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          onChangeText={text => {
            setDeposit(text);
          }}
          value={deposit}
          keyboardType="email-address"
        />
        <Text
          style={styles.title}>
          INR
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          onChangeText={text => {
            setReceive(text);
          }}
          value={receive}
          keyboardType="email-address"
        />
      </View>

      {/* <Text
          style={styles.addressName}>
         Top-Up Address
        </Text>
        <Text
          style={styles.address}>
         Adsfdsgfc6576t765765uygu6567576576576576576ty
        </Text> */}
      <Button
          buttonTitleStyle={styles.buttonText}
          // disabled={!isValid}
          full={true}
          buttonTitle="Deposit"
          buttonStyle={styles.ButtonView}
          onButtonPress={() => {
            console.log('-=-=-=-=-==-=-6666-=-=-=-=-=-=-');
            
            navigation.navigate("TransSuccess",{
              coinName:route?.params?.title
            })
          }} // Use Formik's handleSubmit
        />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    padding: 15,
    backgroundColor: '#dedee0',
    margin: 15,
    borderRadius: 8,
  },
  input: {
    height: Metrics.rfv(50),
    borderColor: '#C2C2C2',
    borderWidth: 1,
    borderRadius: Metrics.rfv(10),
    marginBottom: Metrics.rfv(10),
    paddingHorizontal: Metrics.rfv(10),
    fontSize: Metrics.rfv(16),
  },
  title:{
    fontSize: Metrics.rfv(15),
    fontWeight: 'bold',
    marginVertical: Metrics.rfv(10),
    color: Colors.black,
  },
  ButtonView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 13,
    margin: 10,
    // paddingHorizontal: 15,
    marginTop:"auto",
    marginBottom:Metrics.rfv(30),
    borderColor:"#fff",
    borderWidth:1,
    width:"30%",
    alignSelf:"center"
  },
  buttonText: {
    color: '#962f2a',
    textAlign: 'center',
    fontWeight: '700',
    fontSize:16
  },
  addressName:{
    color:"#fff",
    fontSize:14,
    padding:15
  },
  address:{
    color:"#000",
    fontSize:12,
    paddingHorizontal:15,
    backgroundColor:"#fff",
    marginHorizontal:15,
    textAlign:"left",
    paddingVertical:10,
    borderRadius:8
  }
});

export default CryptoDeposit;
