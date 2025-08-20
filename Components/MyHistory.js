import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Metrics from '../Helpers/Metrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../Helpers/Colors';
import {History_data} from '../Screens/wallet/data';
import {Fonts} from '../constant/data';
import {getDiceImages} from '../Screens/home/K3/K3Data';
import FastImage from 'react-native-fast-image';

// Sample data

const MyHistory = ({navigation, ItemKey}) => {
  // console.log(ItemKey);
  const [expandedItemId, setExpandedItemId] = useState('');

  const renderItem = ({item}) => {
    const isExpanded = item.orderNumber === expandedItemId;
    const diceNumbers = item.result.toString().split('').map(Number);

    // Check if any two dice are the same
    const isTwoSame =
      diceNumbers[0] === diceNumbers[1] ||
      diceNumbers[1] === diceNumbers[2] ||
      diceNumbers[0] === diceNumbers[2];
    const isThreeSame =
      diceNumbers[0] === diceNumbers[1] && diceNumbers[1] === diceNumbers[2];
    // Check if all three dice are different
    const isAllDifferent =
      diceNumbers[0] !== diceNumbers[1] &&
      diceNumbers[1] !== diceNumbers[2] &&
      diceNumbers[0] !== diceNumbers[2];
    // Get dice images for the number if ItemKey is 'FromK3'
    const diceImagesForNumber =
      ItemKey === 'FromK3' ? getDiceImages(item.result) : []; // Get dice images for the number if ItemKey is 'FromK3'

    const getColor = (value, label) => {
      if (label === 'Amount After Tax') return 'red';
      if (value === 'Succeed' || label === 'Win/Lose') return 'green';
      return 'black';
    };

    const renderDetailRow = (label, value) => {
      return (
        <View key={label} style={styles.row}>
          <Text style={[styles.extraDetailsText, styles.boldText]}>
            {label}
          </Text>

          <Text
            style={[styles.extraDetailsText, {color: getColor(value, label)}]}>
            {value}
          </Text>
        </View>
      );
    };

    const detailsData = [
      {label: 'Period', value: item.period},
      {label: 'Purchase Amount', value: item.purchaseAmount},
      {label: 'Quantity', value: item.quantity},
      {label: 'Amount After Tax', value: item.amountAfterTax},
      {label: 'Tax', value: item.tax},
      // { label: 'Result', value: item.result },
      {label: 'Status', value: item.status},
      {label: 'Order Time', value: item.orderTime},
      {label: 'Win/Lose', value: item.winLose},
    ];

    return (
      <TouchableOpacity
        onPress={() => setExpandedItemId(isExpanded ? null : item.orderNumber)}>
        <View style={styles.itemContainer}>
          <FastImage source={{uri: item.image,priority: FastImage.priority.low,}} style={styles.image} />
          <View style={styles.detailsContainer}>
            <View>
              <Text style={styles.title}>{item.orderNumber}</Text>
              <View style={styles.rowWithPadding}>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </View>
            <View>
              <Text
                style={[
                  styles.status,
                  {
                    borderColor: item.status === 'Succeed' ? 'green' : 'red',
                    color: item.status === 'Succeed' ? 'green' : 'red',
                  },
                ]}>
                {item.failed ? 'Failed' : 'Succeed'}
              </Text>
              <Text
                style={[
                  styles.amount,
                  styles.alignRight,
                  {
                    color: item.status === 'Succeed' ? 'green' : 'red',
                    fontFamily: Fonts.Roboto400,
                  },
                ]}>
                {item.winLose}
              </Text>
            </View>
          </View>
        </View>
        {isExpanded && (
          <View style={styles.detailsExtraContainer}>
            <View style={styles.row}>
              <Text style={[styles.extraDetailsText, styles.boldText]}>
                Order Number
              </Text>
              <View style={styles.row}>
                <TouchableOpacity onPress={() => {}}>
                  <Ionicons name="copy-outline" size={20} color="grey" />
                </TouchableOpacity>
                <Text style={styles.extraDetailsText}>{item.orderNumber}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={[styles.extraDetailsText, styles.boldText]}>
                Result
              </Text>
              {ItemKey === 'FromK3' ? (
                <View>
                  <View
                    style={{flexDirection: 'row', marginTop: Metrics.rfv(4)}}>
                    {/* Render dice images */}
                    {diceImagesForNumber.map((diceImage, index) => (
                      <FastImage
                        key={index}
                        source={[diceImage,{priority: FastImage.priority.low,}]} // Local image from assets
                        style={{
                          width: Metrics.rfv(20),
                          height: Metrics.rfv(20),
                          marginHorizontal: Metrics.rfv(3),
                        }}
                      />
                    ))}
                  </View>
                </View>
              ) : (
                <Text style={styles.extraDetailsText}>{item.result}</Text>
              )}
            </View>
            {detailsData.map(detail =>
              renderDetailRow(detail.label, detail.value),
            )}
            {ItemKey === 'FromK3' ? (
              <View style={styles.row}>
                <Text style={[styles.extraDetailsText, styles.boldText]}>
                  Select
                </Text>
                {isTwoSame && (
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.extraDetailsText}>
                      2 same and 1 different numbers
                    </Text>
                    <Text></Text>
                  </View>
                )}
                {isAllDifferent && (
                  <Text style={styles.extraDetailsText}>
                    All three dice are different!
                  </Text>
                )}
                {isThreeSame && (
                  <Text style={styles.extraDetailsText}>
                    All three dice are same!
                  </Text>
                )}
                {/* <Text style={styles.extraDetailsText}>{item.select}</Text> */}
              </View>
            ) : (
              <View style={styles.row}>
                <Text style={[styles.extraDetailsText, styles.boldText]}>
                  Select
                </Text>

                <Text style={styles.extraDetailsText}>{item.select}</Text>
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailsView}>
        <TouchableOpacity
          onPress={() => {
            ItemKey === 'FromK3'
              ? navigation.navigate('K3HistoryDetails')
              : navigation.navigate('HistroyDetails');
          }}>
          <View style={styles.detailsMainView}>
            <Text style={styles.textView}>{'Details'}</Text>
            <Ionicons
              name="chevron-forward-circle-outline"
              size={30}
              color="red"
              style={{marginRight: Metrics.rfv(5)}}
            />
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={History_data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default MyHistory;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
    marginTop: Metrics.rfv(20),
    backgroundColor: '#fff',
  },
  extraDetailsText: {
    color: Colors.black,
    paddingVertical: Metrics.rfv(5),
    fontSize: Metrics.rfv(14),

    paddingHorizontal: Metrics.rfv(3),
    fontFamily: Fonts.Roboto500,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Metrics.rfv(3),
    borderRadius: Metrics.rfv(10),
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
  },
  detailsExtraContainer: {
    paddingHorizontal: Metrics.rfv(20),
  },
  detailsView: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  textView: {
    color: 'red',
    paddingVertical: Metrics.rfv(8),
    paddingHorizontal: Metrics.rfv(10),
    fontSize: Metrics.rfv(15),
    fontFamily: Fonts.Roboto400,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: Metrics.rfv(10),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    marginBottom: Metrics.rfv(10),
    paddingVertical: Metrics.rfv(10),
    paddingHorizontal: Metrics.rfv(10),
  },
  image: {
    width: Metrics.rfv(50),
    height: Metrics.rfv(50),
    borderRadius: Metrics.rfv(18),
    marginRight: Metrics.rfv(10),
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    fontSize: Metrics.rfv(14),
    fontWeight: 'bold',
    color: '#000',
    fontFamily: Fonts.Roboto500,
  },
  detailsMainView: {
    marginTop: Metrics.rfv(15),
    marginBottom: Metrics.rfv(10),
    marginRight: Metrics.rfv(10),
    borderRadius: Metrics.rfv(10),
    borderColor: 'red',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    fontSize: Metrics.rfv(14),
    color: '#888',
    fontFamily: Fonts.Roboto400,
  },
  time: {
    fontSize: Metrics.rfv(14),
    color: '#888',
    fontFamily: Fonts.Roboto400,
  },
  status: {
    fontSize: Metrics.rfv(14),
    color: 'red',
    borderRadius: Metrics.rfv(12),
    fontFamily: Fonts.Roboto400,
    borderWidth: 1,
    borderColor: 'red',
    paddingHorizontal: Metrics.rfv(15),
    paddingVertical: Metrics.rfv(5),
  },
  amount: {
    fontSize: Metrics.rfv(16),
    fontWeight: 'bold',
    color: Colors.black,
    marginLeft: Metrics.rfv(10),
  },
});
