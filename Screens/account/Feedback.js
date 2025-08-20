import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import HeaderTitleComponent from '../../Components/HeaderTitle';
import Button from '../../Components/Button';
import Metrics from '../../Helpers/Metrics';
import { Fonts } from '../../constant/data';
import { Colors } from '../../Helpers/Colors';

const Feedback = ({navigation}) => {
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  const shareFeedback = () => {
    if (feedback === '') {
      console.log('-=-=-=-=-=-=-=-', feedback);
      
      setError('please enter your feedback.');
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <HeaderTitleComponent
        title={'Feedback'}
        goBack={() => navigation.goBack()}
        mainStyle={styles.mainHeaderStyle}
        style={{paddingBottom:8}}
      />
      <View style={{flex:1}}>
        <View style={{flex:0.8,}}>
          <TextInput
          onFocus={() => {
            setError('');
          }}
          multiline
          style={styles.input}
          placeholder="Welcome to feedback. Please explain your problem which troubles you in detail, while providing feedback, preferably attach a screenshot of the problem. We will immediatly process your feedback!"
          onChangeText={text => {
            setError('');
            setFeedback(text);
          }}
          onBlur={() => {}}
          value={feedback}
          keyboardType="email-address"
          textAlignVertical="top"
        />
        {error && (
        <Text
          style={{
            ...styles.errorText,
            marginTop: Metrics.rfv(5),
            fontFamily: Fonts.Roboto400,
            marginLeft: Metrics.rfv(15),
          }}>
          {error}
        </Text>
        )} 
        <Text style={styles.rewardText}>
          Send helpful feedback{`\n`} chance to win Mystery Rewards
        </Text>
        </View>
        <View style={{flex:0.2, justifyContent:"center"}}>
          <Button
          buttonTitleStyle={styles.buttonText}
          // disabled={!isValid}
          full={true}
          buttonTitle="Send"
          buttonStyle={styles.ButtonView}
          onButtonPress={() => {
            shareFeedback();
          }} // Use Formik's handleSubmit
        />
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: Dimensions.get('screen').height/4,
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    padding: 15,
    // borderColor:Colors.grey,
    // borderWidth:1, 
    margin:Metrics.rfv(10),
    borderRadius:8,
    elevation:10
  },
  rewardText: {
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 25,
    paddingVertical: 20,
  },
  ButtonView: {
    backgroundColor: '#962f2a',
    borderRadius: 10,
    paddingVertical: 13,
    margin: 10,
    paddingHorizontal: 15,
    width:"30%",
    alignSelf:"center",
    
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    fontSize: Metrics.rfv(12),
  },
});

export default Feedback;
