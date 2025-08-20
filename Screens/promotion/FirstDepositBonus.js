import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import HeaderTitleComponent from '../../Components/HeaderTitle';
import Button from '../../Components/Button';
import {firstDepositBonus} from '../../constant/data';
import Metrics from '../../Helpers/Metrics';
import { useTranslation } from 'react-i18next';

const FirstDepositBonus = ({navigation}) => {
  const { t } = useTranslation();
  const Item = ({title}) => (
    <View style={styles.bonusListView}>
      <View style={styles.listFirstView}>
        <Text style={styles.titleText}>
          First Deposit
          <Text style={{color: '#FEAA57', fontWeight: '500'}}>
            {title.deposit}
          </Text>
        </Text>
        <Text style={styles.receivedText}>
            +{title.received}</Text>
      </View>
      <Text
        style={
          styles.subTitle
        }>{`Deposit ${title.deposit} for the first time and you will receive ${title.received} bonus`}</Text>
      <View style={styles.bottomView}>
        <Text style={styles.currentDeposit}>
          {title.currentBal}/{title.deposit}
        </Text>
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
  );

  return (
    <View style={styles.container}>
      <HeaderTitleComponent
        title={'Deposit Bonus'}
        goBack={() => navigation?.goBack()}
        mainStyle={styles.mainHeaderStyle}
        style={{paddingBottom:8}}
      />
      <ScrollView>
         <FlatList
        nestedScrollEnabled
        data={firstDepositBonus}
        renderItem={({item}) => <Item title={item} />}
        keyExtractor={item => item.id}
      />
        <View style={{padding: 15}}>
        <Text style={[styles.rulesTitle]}>{`Activity Rules`}</Text>
        <Text
          style={
            styles.rules
          }>{`\u2023 ${t("rules.activityRules.rule1")}`}</Text>
        <Text
          style={
            styles.rules
          }>{`\u2023 ${t("rules.activityRules.rule12")}`}</Text>
        <Text
          style={
            styles.rules
          }>{`\u2023 ${t("rules.activityRules.rule3")}`}</Text>
        <Text
          style={
            styles.rules
          }>{`\u2023 ${t("rules.activityRules.rule4")}`}</Text>
      <Text
          style={
            styles.rules
          }>{`\u2023 ${t("rules.activityRules.rule5")}`}</Text>
           <Text
          style={
            styles.rules
          }>{`\u2023 ${t("rules.activityRules.rule6")}`}</Text>
      </View>
      </ScrollView>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  bonusListView: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 8,
    marginVertical: 5,
    elevation:10
  },
  listFirstView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
  },
  receivedText: {
    color: '#FEAA57',
    fontSize: 13,
  },
  subTitle: {
    color: '#768096',
    fontSize: 11,
    marginVertical:10
  },
  currentDeposit: {
    backgroundColor: '#D8D8D8',
    textAlign:"center",
width:'70%',
borderRadius:8
  },
  buttonText: {
    color: '#FEAA57',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  ButtonView: {
    backgroundColor: 'transparent',
    paddingVertical: Metrics.rfv(5),
    paddingHorizontal: Metrics.rfv(25),
    borderRadius: 8,
    borderColor: '#FEAA57',
    borderWidth: 1,
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"space-between"
  },
  rules: {
    marginVertical: 10,
    color: '#000',
  },
  rulesTitle: {
    marginVertical: 10,
    color: '#000',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default FirstDepositBonus;
