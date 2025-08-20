import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Appearance,
} from 'react-native';
import Metrics from '../Helpers/Metrics';
import Svg, {
  Text as SvgText,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import {Colors} from '../Helpers/Colors';
import {Fonts} from '../constant/data';

const data = [
  {
    period: 20240802011055,
    number: 5,
    bigSmall: 'big',
    color: 'purple',
  },
  {period: 20240802011054, number: 7, bigSmall: 'big', color: 'green'},
  {
    period: 20240802011053,
    number: 8,
    bigSmall: 'big',
    color: 'red',
  },
  {
    period: 20240802011052,
    number: 9,
    bigSmall: 'big',
    color: 'green',
  },
  {
    period: 20240802017052,
    number: 9,
    bigSmall: 'big',
    color: 'green',
  },
  {period: 20240802011051, number: 2, bigSmall: 'small', color: 'red'},
  // Add more data as needed
];

const ITEMS_PER_PAGE = 5;

const WinningTable = () => {
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
  const paginatedData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const GradientText = ({text, fontSize}) => (
    <Svg height={fontSize} width="100%">
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0%" stopColor="#FF5F6D" />
          <Stop offset="100%" stopColor="#FFC371" />
        </LinearGradient>
      </Defs>
      <SvgText
        fill="url(#grad)"
        fontSize={fontSize}
        fontWeight="bold"
        x="50%"
        y="50%"
        textAnchor="middle"
        alignmentBaseline="middle">
        {text}
      </SvgText>
    </Svg>
  );
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const SolidColorText = ({text, color, fontSize}) => (
    <Text
      style={{
        color,
        fontSize,
        fontWeight: 'bold',
        fontFamily: Fonts.Roboto400,
        textAlign: 'center',
      }}>
      {text}
    </Text>
  );

  const renderRow = ({item}) => (
    <View style={styles.row}>
      <Text
        style={[
          styles.cell,
          {
            width: '40%',
            color: isDarkMode ? '#000' : '#000',
            fontSize: Metrics.rfv(15),
            marginTop: Metrics.rfv(5),
            fontFamily: Fonts.Roboto400,
          },
        ]}>
        {item.period}
      </Text>
      <View style={[styles.cell, {width: '20%'}]}>
        {item.hasGradient ? (
          <GradientText text={item.number} fontSize={Metrics.rfv(24)} />
        ) : (
          <SolidColorText
            text={item.number}
            color={item.color || '#000'}
            fontSize={Metrics.rfv(24)}
          />
        )}
      </View>
      <Text
        style={[
          styles.cell,
          {
            width: '20%',
            color: isDarkMode ? '#000' : '#000',
            marginTop: Metrics.rfv(5),
            fontSize: Metrics.rfv(15),
            fontFamily: Fonts.Roboto400,
          },
        ]}>
        {item.bigSmall}
      </Text>
      <View
        style={[
          styles.cell,
          {width: '20%', marginTop: Metrics.rfv(10), alignItems: 'center'},
        ]}>
        <View
          style={{
            backgroundColor: item.color,
            height: 7,
            width: 7,
            marginHorizontal: 2,
            borderRadius: 5,
          }}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            width: '38%',
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
        <Text style={[styles.headerCell, {width: '20%'}]}>Number</Text>
        <Text style={[styles.headerCell, {width: '20%'}]}>Big/Small</Text>
        <Text style={[styles.headerCell, {width: '20%'}]}>Color</Text>
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

export default WinningTable;
