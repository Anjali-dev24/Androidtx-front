import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import BottomSheet from 'react-native-raw-bottom-sheet';
import {balance, Fonts, multiplicationData} from '../constant/data';
import Metrics from '../Helpers/Metrics';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useBalanceStore from '../reduxToolkit/balnce/balanceReducer';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Sheet = props => {
  const {multiplication, setMultiplication} = props;
  const {balanceAmount, setBalance} = useBalanceStore();
  const [quantity, setQuantity] = useState(1);
  const [Icon, setIcon] = useState(false);
  // console.log(props.selectedName);
  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  return (
    <BottomSheet
      ref={props.bottomSheetRef}
      closeOnDragDown={true}
      height={400}
      openDuration={250}>
      <View style={styles.mainView}>
        <View
          style={{...styles.trapezoid, borderTopColor: props.selectedColor}}>
          <View style={styles.topContent}>
            <Text
              style={[
                styles.text,
                {
                  color: '#fff',
                  fontSize: 25,
                  fontFamily: Fonts.Roboto500,
                  fontWeight: '800',
                },
              ]}>
              Win Go {props.gameTimeOption} min
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.text}>
              Select {props.Number ? props.Number : props.selectedName}
            </Text>
          </View>
        </View>

        <View style={styles.sheetContent}>
          <View style={{...styles.row}}>
            <View>
              <Text style={styles.text}>Balance</Text>
            </View>
            <View style={styles.balanceView}>
              {balance.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.multiplicationOption,

                    {
                      backgroundColor:
                        item.amount === balanceAmount
                          ? props.selectedColor
                          : '#F6F6F6',
                      marginLeft: 10,

                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}
                  onPress={() => setBalance(item.amount)}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '500',
                      color: item.amount === balanceAmount ? 'white' : 'black',
                    }}>
                    {item.amount}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View
            style={{
              ...styles.row,
              alignItems: 'center',
            }}>
            <Text style={styles.text}>Quantity</Text>

            <View style={styles.quantityView}>
              <TouchableOpacity
                style={{...styles.button, backgroundColor: props.selectedColor}}
                onPress={decrementQuantity}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.quantityText}>{quantity}</Text>

              <TouchableOpacity
                style={{...styles.button, backgroundColor: props.selectedColor}}
                onPress={incrementQuantity}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
            {/* </View> */}
          </View>
        </View>
        <View
          style={{
            ...styles.multiplicationOptions,
            marginBottom: 0,
            // backgroundColor: 'yellow',
          }}>
          {multiplicationData.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.multiplicationOption,

                {
                  backgroundColor:
                    item.name === multiplication
                      ? props.selectedColor
                      : '#F6F6F6',
                  padding: 10,
                  marginLeft: 10,
                },
              ]}
              onPress={() => setMultiplication(item.name)}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  fontFamily: Fonts.Roboto400,
                  color: item.name === multiplication ? '#fff' : '#000',
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.permissionView}>
          <TouchableOpacity
            onPress={() => {
              setIcon(v => !v);
            }}>
            {Icon ? (
              <MaterialCommunityIcons
                name="checkbox-blank-circle-outline"
                size={30}
                color={Colors.black}
              />
            ) : (
              <MaterialCommunityIcons
                name="check-circle"
                color={'red'}
                size={30}
              />
            )}
          </TouchableOpacity>

          <Text style={styles.agreeView}>I agree</Text>
          <Text style={styles.textView}>{' << Pre - sale rules >>'}</Text>
        </View>
        <View style={styles.cancelView}>
          <TouchableOpacity style={styles.cancel} onPress={props.onClose}>
            <View>
              <Text
                style={{
                  color: Colors.black,
                  fontFamily: Fonts.Roboto400,
                  fontSize: 17,
                  fontWeight: '700',
                }}>
                Cancel
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              ...styles.amountView,
              backgroundColor: props.selectedColor,
            }}>
            <Text style={styles.amountText}>
              Total Amount ${balanceAmount}.00
            </Text>
          </View>
        </View>
      </View>
    </BottomSheet>
  );
};

export default Sheet;

const styles = StyleSheet.create({
  trapezoid: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderBottomWidth: 0,
    borderRightWidth: Metrics.rfv(650), // Applied rfv to width
    borderTopWidth: Metrics.rfv(110), // Applied rfv to height
    borderLeftWidth: Metrics.rfv(650),
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    marginTop: Metrics.rfv(-60), // Applied rfv to marginTop
  },
  cancelView: {
    flexDirection: 'row',
    height: Metrics.rfv(50),

    flex: 0.8,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  amountText: {
    color: '#fff',
    fontSize: Metrics.rfv(15), // Applied rfv to fontSize
    fontWeight: '500',
    fontFamily: Fonts.Roboto400,
  },
  amountView: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {
    marginLeft: Metrics.rfv(10),
    fontFamily: Fonts.Roboto400,
    // Applied rfv to marginLeft
    color: 'red',
    fontSize: Metrics.rfv(15), // Applied rfv to fontSize
  },
  agreeView: {
    marginLeft: Metrics.rfv(10),
    fontWeight: 'bold',
    color: 'black',
    fontSize: Metrics.rfv(15),
    fontFamily: Fonts.Roboto400,
  },
  cancel: {
    backgroundColor: '#F6F6F6',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f1f3f6',
    alignItems: 'center',
    paddingTop: Metrics.rfv(50),
    backgroundColor: Colors.White,
  },
  quantityContainer: {
    alignSelf: 'center',
    backgroundColor: 'yellow',
    marginHorizontal: Metrics.rfv(20), // Applied rfv to marginHorizontal
    minWidth: Metrics.rfv(20), // Ensures a minimum width for the quantity text
  },
  quantityText: {
    fontSize: Metrics.rfv(15),
    fontWeight: 'bold',
    textAlign: 'center',
    width: Metrics.rfv(70),
    marginBottom: 4,
    color: Colors.black,
    fontFamily: Fonts.Roboto400,
  },
  button: {
    padding: Metrics.rfv(0),
    borderRadius: Metrics.rfv(5),
    width: Metrics.rfv(40),
    alignItems: 'center',
  },
  permissionView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Metrics.rfv(30),
    marginBottom: Metrics.rfv(10),
  },
  buttonText: {
    fontSize: Metrics.rfv(20),
    fontWeight: 'bold',
    color: 'white',
    fontFamily: Fonts.Roboto500,
  },
  text: {
    color: '#000',
    fontSize: Metrics.rfv(15),
    fontFamily: Fonts.Roboto400,
  },
  topContent: {
    position: 'absolute',
    bottom: Metrics.rfv(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.rfv(280),
    marginLeft: Metrics.rfv(-140),
    borderRadius: Metrics.rfv(5),
    paddingVertical: Metrics.rfv(5),
    marginBottom: Metrics.rfv(6),
  },
  content: {
    position: 'absolute',
    bottom: Metrics.rfv(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.rfv(280),
    marginLeft: Metrics.rfv(-140),
    backgroundColor: '#fff',
    borderRadius: Metrics.rfv(5),
    paddingVertical: Metrics.rfv(5),
  },
  balanceView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetContent: {
    flex: 1,
    width: '100%',
    paddingHorizontal: Metrics.rfv(20),
    justifyContent: 'center',
    marginTop: Metrics.rfv(20),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Metrics.rfv(10),
  },
  multiplicationOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Metrics.rfv(30),
    justifyContent: 'flex-end',
    marginRight: Metrics.rfv(30),
    flex: 1,
    width: '100%',
  },
  randomButton: {
    borderWidth: Metrics.rfv(1),
    padding: Metrics.rfv(5),
    borderRadius: Metrics.rfv(5),
  },
  randomButtonText: {
    color: '#dc2626',
  },
  multiplicationOption: {
    paddingVertical: Metrics.rfv(5),
    borderRadius: Metrics.rfv(5),
    paddingHorizontal: Metrics.rfv(7),
  },
  sizeOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Metrics.rfv(10),
    justifyContent: 'center',
  },
  sizeOptionBig: {
    paddingVertical: Metrics.rfv(8),
    width: '45%',
    borderTopLeftRadius: Metrics.rfv(20),
    borderBottomLeftRadius: Metrics.rfv(20),
    backgroundColor: '#fb923c',
  },
  sizeOptionSmall: {
    paddingVertical: Metrics.rfv(8),
    width: '45%',
    borderTopRightRadius: Metrics.rfv(20),
    borderBottomRightRadius: Metrics.rfv(20),
    backgroundColor: '#38bdf8',
  },
  sizeOptionText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: Metrics.rfv(18),
    fontWeight: 'bold',
  },
});
