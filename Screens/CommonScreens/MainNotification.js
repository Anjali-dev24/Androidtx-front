import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import PageWrapperView from '../../Components/PageWrapperView';
// import Header from '../../Components/Header';
import {Colors} from '../../Helpers/Colors';
import Metrics from '../../Helpers/Metrics';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Fonts} from '../../constant/data';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {dateTimeArray} from '../home/wingo/data';
const MainNotification = ({navigation}) => {
  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: Metrics.rfv(10),
          width: '98%',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="stack-exchange"
            size={28}
            color={Colors.Primary_100}
          />
          <Text style={styles.cardHeader}>{'LOGIN NOTIFICATION'}</Text>
        </View>
        <AntDesign
          name="delete"
          color={Colors.Primary_100}
          size={25}
          //   style={{marginLeft: Metrics.rfv(10)}}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.cardDate}>{item.date}</Text>
        <Text style={{...styles.cardDate, marginLeft: Metrics.rfv(5)}}>
          {item.time}
        </Text>
      </View>
      <Text
        style={{
          ...styles.cardMessage,
          marginTop: Metrics.rfv(15),
          marginBottom: 0,
        }}>
        Your account is logged in {item.date} {item.time}
      </Text>
    </View>
  );

  return (
    <PageWrapperView statusBar={{background: Colors.Primary_100}}>
      <View style={styles.container}>
        {/* <Header
          title="Notification"
          onBackPress={() => navigation.goBack()}
          color={Colors.Primary_100}
          backColor={Colors.white}
        /> */}
        <View style={{marginBottom: Metrics.rfv(100)}}>
          <FlatList
            data={dateTimeArray}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </View>
    </PageWrapperView>
  );
};

export default MainNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: Metrics.rfv(10),
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.rfv(10),
    padding: Metrics.rfv(10),
    // paddingVertical: Metrics.rfv(20),
    marginBottom: Metrics.rfv(10),
  },
  cardHeader: {
    fontSize: Metrics.rfv(18),
    color: Colors.black,
    marginBottom: Metrics.rfv(5),
    marginLeft: Metrics.rfv(5),
    fontWeight: 'bold',
    fontFamily: Fonts.Roboto400,
  },

  cardMessage: {
    fontSize: Metrics.rfv(14),
    color: Colors.black,
    fontFamily: Fonts.Roboto400,
    // marginVertical: Metrics.rfv(10),
  },
  cardDate: {
    fontSize: Metrics.rfv(15),
    color: Colors.textMuted,
    textAlign: 'left',
    color: Colors.secoundary_100,
    fontFamily: Fonts.Roboto400,
    marginLeft: Metrics.rfv(5),
  },
});
