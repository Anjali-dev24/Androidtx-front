import {BottomTabBar} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const CustomTabBar = props => {
  return (
    <View style={styles.tabBar}>
      <BottomTabBar {...props} />
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabBar: {
   
  },
});
