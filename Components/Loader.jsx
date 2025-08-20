//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';

// create a component
const Loader = ({marginTop = 0, marginLeft = 0}) => {
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  return (
    <View
      style={{
        height: screenHeight,
        width: screenWidth,
        marginLeft: marginLeft,
        backgroundColor: 'rgba(211, 211, 211, 0.7)',
        position: 'absolute',
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{marginTop: marginTop}}>
        <ActivityIndicator size="large" color="red" />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default Loader;
