import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import HeaderTitleComponent from '../../Components/HeaderTitle';
import { Fonts, RewardRules } from '../../constant/data';
import { Colors } from '../../Helpers/Colors';
import Metrics from '../../Helpers/Metrics';
import { useTranslation } from 'react-i18next';

const InvitationRules = ({navigation}) => {
  const { t } = useTranslation();
  const [rules, setRules] = useState('');

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={[
        styles.listView,
        {backgroundColor: index % 2 ? '#fff' : '#dedee0'},
      ]}>
      <Text style={styles.rewardsView}>{item.account}</Text>
      <Text style={styles.rewardsView}>{item.amount}</Text>
      <Text style={styles.rewardsView}>{item.bonus}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HeaderTitleComponent
        title={t('titles.invitationRules')}
        goBack={() => navigation.goBack()}
        mainStyle={styles.mainHeaderStyle}
      />
       <ScrollView>
         <TouchableOpacity style={styles.titleView}>
        <Text style={styles.title}>Invite account</Text>
        <Text style={styles.title}>Deposit amount</Text>
        <Text style={styles.title}>Bonus</Text>
      </TouchableOpacity>
      <FlatList
        data={RewardRules}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{flexGrow: 1}}
      />

      <View style={{padding: 15}}>
        <Text style={[styles.rulesTitle]}>{`Rules`}</Text>
        <Text
          style={
            styles.rules
          }>{`\u2023 ${t("rules.invitaionRules.rule1")}`}</Text>
        <Text
          style={
            styles.rules
          }>{`\u2023 ${t("rules.invitaionRules.rule2")}`}</Text>
        <Text
          style={
            styles.rules
          }>{`\u2023 ${t("rules.invitaionRules.rule3")}`}</Text>
        <Text
          style={
            styles.rules
          }>{`\u2023 ${t("rules.invitaionRules.rule4")}`}</Text>
      </View>
       </ScrollView>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: '100%',
    // marginVertical: 10,
    padding: 10,
  },
  rewardsView: {
    color: '#000',
    fontSize: 14,
  },
  titleView: {
    borderTopLeftRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#962f2a',
    width: '100%',
    // marginVertical: 10,
    padding: 15,
    marginTop: 15,
    borderTopRightRadius: 15,
  },
  title: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  input: {
    height: Metrics.rfv(50),
    borderColor: '#dedee0',
    borderWidth: 1,
    borderRadius: Metrics.rfv(10),
    // marginBottom: Metrics.rfv(10),
    paddingHorizontal: Metrics.rfv(10),
    fontFamily: Fonts.Roboto400,
    fontSize: Metrics.rfv(16),
    marginBottom: 20,
    marginHorizontal: 20,
  },
  phNoText: {
    fontSize: Metrics.rfv(15),
    fontWeight: 'bold',
    color: Colors.black,
    fontFamily: Fonts.Roboto400,
    marginBottom: 5,
    marginHorizontal: 20,
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

export default InvitationRules;
