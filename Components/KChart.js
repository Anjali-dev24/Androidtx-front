import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Appearance,
  Image,
} from 'react-native';
import Metrics from '../Helpers/Metrics';
import {Colors} from '../Helpers/Colors';
import {Fonts} from '../constant/data';
import {gameHistory_data, getDiceImages} from '../Screens/home/K3/K3Data';
import FastImage from 'react-native-fast-image';

// Function to break number into digits and map to dice

const ITEMS_PER_PAGE = 10;

const KChart = ({ItemKey}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setIsDarkMode(colorScheme === 'dark');

    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => subscription.remove();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = gameHistory_data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(gameHistory_data.length / ITEMS_PER_PAGE);

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

  const renderRow = ({item}) => {
    const diceImagesForNumber = getDiceImages(item.number); // Get dice images for the number

    // Extract the dice numbers for comparison (assuming diceImages contains numbered dice)
    const diceNumbers = item.number.toString().split('').map(Number);

    // Check if any two dice are the same
    const isTwoSame =
      diceNumbers[0] === diceNumbers[1] ||
      diceNumbers[1] === diceNumbers[2] ||
      diceNumbers[0] === diceNumbers[2];

    // Check if all three dice are different
    const isAllDifferent =
      diceNumbers[0] !== diceNumbers[1] &&
      diceNumbers[1] !== diceNumbers[2] &&
      diceNumbers[0] !== diceNumbers[2];

    return (
      <View style={styles.row}>
        {/* Period Text */}
        <Text
          style={[
            styles.cell,
            {
              width: '35%',
              color: isDarkMode ? '#000' : '#000',
              fontSize: Metrics.rfv(15),
              marginTop: Metrics.rfv(5),
              fontFamily: Fonts.Roboto400,
            },
          ]}>
          {item.period}
        </Text>

        {/* Dice Images */}
        <View
          style={[
            styles.cell,
            {width: '30%', marginTop: Metrics.rfv(10), alignItems: 'center'},
          ]}>
          <View style={{flexDirection: 'row', marginTop: Metrics.rfv(-4)}}>
            {diceImagesForNumber.map((diceImage, index) => (
              <FastImage
                key={index}
                source={diceImage} // Local image from assets
                style={{
                  width: Metrics.rfv(20),
                  height: Metrics.rfv(20),
                  marginHorizontal: Metrics.rfv(5),
                }}
              />
            ))}
          </View>
          {/* Display Text based on condition */}
        </View>

        {/* Number Text */}
        <Text
          style={[
            styles.cell,
            {
              width: '38%',
              color: isDarkMode ? '#000' : '#000',
              fontSize: Metrics.rfv(12),
              marginTop: Metrics.rfv(5),
              fontFamily: Fonts.Roboto400,
            },
          ]}>
          {isTwoSame
            ? '2 Same Numbers'
            : isAllDifferent
            ? '3 Different Numbers'
            : ''}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            width: '33%',
            color: '#fff',
            textTransform: 'capitalize',
            fontWeight: 'bold',
            alignItems: 'center',
            textAlign: 'center',
            fontSize: Metrics.rfv(15),
            fontFamily: Fonts.Roboto700,
            // marginLeft: 20,
          }}>
          Period
        </Text>

        <Text style={[styles.headerCell, {width: '33%'}]}>Result</Text>
        <Text style={[styles.headerCell, {width: '33%'}]}>Number</Text>
      </View>
      <FlatList
        data={paginatedData}
        renderItem={renderRow}
        keyExtractor={item => item.period.toString()}
        contentContainerStyle={styles.rulesListContent}
      />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: Metrics.rfv(15),
    backgroundColor: Colors.Primary_100,
    borderTopLeftRadius: Metrics.rfv(10),
    borderTopRightRadius: Metrics.rfv(10),
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontSize: Metrics.rfv(15),
    fontFamily: Fonts.Roboto400,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
  },
  cell: {
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  rulesListContent: {
    paddingBottom: Metrics.rfv(20),
  },
  pageButton: {
    fontSize: 25,
    fontFamily: Fonts.Roboto400,
    color: Colors.black,
  },
  pageNumber: {
    fontSize: 16,
    color: '#000',
    marginHorizontal: 20,
    fontFamily: Fonts.Roboto400,
    // width: '20%',
  },
  squareButton: {
    width: 40, // Equal width and height for square shape
    height: 40,
    backgroundColor: '#F95859',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5, // Optional for slightly rounded corners
  },
});

export default KChart;
