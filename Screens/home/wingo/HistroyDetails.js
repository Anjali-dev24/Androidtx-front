import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Metrics from '../../../Helpers/Metrics';
import {Colors} from '../../../Helpers/Colors';
import {History_data} from '../../wallet/data';
import PageWrapperView from '../../../Components/PageWrapperView';
// import Header from '../../../Components/Header';
import {Fonts} from '../../../constant/data';
import FastImage from 'react-native-fast-image';

const HistroyDetails = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('win Go30s');
  const [expandedItemId, setExpandedItemId] = useState('');
  const handleTabPress = tab => {
    setSelectedTab(tab);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = History_data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(History_data.length / ITEMS_PER_PAGE);
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderItem = ({item}) => {
    const isExpanded = item.orderNumber === expandedItemId;
    const getColor = (value, label) => {
      if (label === 'Amount After Tax') return 'red';
      if (value === 'Succeed' || label === 'Win/Lose') return 'green';
      return 'black';
    };

    const renderDetailRow = (label, value) => (
      <View key={label} style={styles.row}>
        <Text style={[styles.extraDetailsText, styles.boldText]}>{label}</Text>
        <Text
          style={[styles.extraDetailsText, {color: getColor(value, label)}]}>
          {value}
        </Text>
      </View>
    );

    const detailsData = [
      {label: 'Period', value: item.period},
      {label: 'Purchase Amount', value: item.purchaseAmount},
      {label: 'Quantity', value: item.quantity},
      {label: 'Amount After Tax', value: item.amountAfterTax},
      {label: 'Tax', value: item.tax},
      {label: 'Result', value: item.result},
      {label: 'Status', value: item.status},
      {label: 'Order Time', value: item.orderTime},
      {label: 'Win/Lose', value: item.winLose},
    ];

    return (
      <TouchableOpacity
        onPress={() => setExpandedItemId(isExpanded ? null : item.orderNumber)}>
        <View style={styles.itemContainer}>
          <FastImage source={{uri: item.image, priority: FastImage.priority.low,}} style={styles.image} />
          <View style={styles.detailsContainer}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.title}>{item.orderNumber}</Text>
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
              </View>
              <View style={styles.rowWithPadding}>
                <Text style={styles.date}>{item.date}</Text>
                <Text
                  style={[
                    styles.amount,

                    {
                      color: item.status === 'Succeed' ? 'green' : 'red',
                      textAlign: 'right',
                    },
                  ]}>
                  {item.winLose}
                </Text>
              </View>
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
            {detailsData.map(detail =>
              renderDetailRow(detail.label, detail.value),
            )}
            <View style={styles.row}>
              <Text style={[styles.extraDetailsText, styles.boldText]}>
                Select
              </Text>
              <Text style={styles.extraDetailsText}>{item.select}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <PageWrapperView statusBar={{background: Colors.Primary_100}}>
      <View style={styles.container}>
        {/* <Header
          title="Win Go"
          onBackPress={() => navigation.goBack()}
          backColor={Colors.white}
        /> */}

        <View style={styles.tabContainer}>
          {['win Go30s', 'win Go1min', 'win Go3min', 'win Go5min'].map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => handleTabPress(tab)}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}>
              <Text style={styles.tabText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: Metrics.rfv(20)}}>
          {selectedTab === 'win Go30s' && (
            <View style={{marginTop: Metrics.rfv(20)}}>
              <FlatList
                data={paginatedData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View>
          )}

          <View style={styles.pagination}>
            <TouchableOpacity
              onPress={handlePrevPage}
              disabled={currentPage === 1}
              style={[
                styles.squareButton,
                {backgroundColor: currentPage === 1 ? 'white' : '#F95859'},
              ]}>
              <Text
                style={{
                  ...styles.pageButton,
                  color: currentPage == 1 ? '#768096' : '#fff',
                }}>
                {'<'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.pageNumber}>
              {currentPage}/{totalPages}
            </Text>

            <TouchableOpacity
              onPress={handleNextPage}
              disabled={currentPage === totalPages}
              style={[
                styles.squareButton,
                currentPage === totalPages && styles.disabledButton,
              ]}>
              <Text style={styles.pageButton}>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </PageWrapperView>
  );
};

export default HistroyDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Metrics.rfv(10),
    backgroundColor: Colors.Primary_100,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingVertical: Metrics.rfv(10),
    paddingHorizontal: Metrics.rfv(10),
  },
  detailsExtraContainer: {
    paddingHorizontal: Metrics.rfv(20),
  },
  extraDetailsText: {
    color: Colors.black,
    paddingVertical: Metrics.rfv(5),
    fontSize: Metrics.rfv(14),
    paddingHorizontal: Metrics.rfv(3),
    fontFamily: Fonts.Roboto400,
  },
  detailsView: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Metrics.rfv(10),
  },
  pageButton: {
    fontSize: Metrics.rfv(25),
    fontFamily: Fonts.Roboto400,
    color: Colors.black,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Metrics.rfv(3),
    borderRadius: Metrics.rfv(10),
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
  },
  pageNumber: {
    fontSize: Metrics.rfv(16),
    color: '#000',
    marginHorizontal: Metrics.rfv(20),
    fontFamily: Fonts.Roboto400,
  },
  squareButton: {
    width: Metrics.rfv(40), // Equal width and height for square shape
    height: Metrics.rfv(40),
    borderRadius: Metrics.rfv(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ddd',
  },
  boldText: {
    fontWeight: 'bold',
  },
  status: {
    borderWidth: 1,
    borderRadius: 5,
    padding: Metrics.rfv(5),
    marginTop: Metrics.rfv(10),
    marginLeft: Metrics.rfv(10),
  },
  amount: {
    fontSize: Metrics.rfv(16),
    textAlign: 'right',
    fontWeight: 'bold',
    marginRight: Metrics.rfv(20),
    fontFamily: Fonts.Roboto400,
  },
  rowWithPadding: {
    flexDirection: 'row',
    // padding: Metrics.rfv(5),
    justifyContent: 'space-between',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Metrics.rfv(10),
    backgroundColor: '#f1f1f1',
  },
  tab: {
    padding: Metrics.rfv(10),
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.Primary_100,
  },
  tabText: {
    fontSize: Metrics.rfv(16),
    color: Colors.black,
    fontFamily: Fonts.Roboto400,
  },
  title: {
    fontSize: Metrics.rfv(18),
    fontWeight: 'bold',
    fontFamily: Fonts.Roboto400,
    color: Colors.black,
  },
  date: {
    fontSize: Metrics.rfv(14),
    color: '#888',
  },
  time: {
    fontSize: Metrics.rfv(14),
    color: '#888',
  },
  image: {
    width: Metrics.rfv(50),
    height: Metrics.rfv(50),
    marginRight: Metrics.rfv(10),
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: Metrics.rfv(20),
    fontWeight: 'bold',
    color: '#fff',
  },
});
