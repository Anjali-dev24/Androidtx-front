import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import FocusAwareStatusBar from './FocusAwareStatusBar';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Metrics from '../Helpers/Metrics';

const PageWrapperView = props => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: props.topSafeArea ? insets.top : 0,
        paddingBottom: props.bottomSafeArea
          ? insets.bottom || Metrics.rfv(0)
          : 0,
        ...props.style,
      }}>
      {/* <FocusAwareStatusBar
        // barStyle={`${props?.statusBar?.style || "dark"}-content`}
        barStyle={props.dark ? 'dark-content' : 'light-content'}
        backgroundColor={
          props?.statusBar?.background ||
          (props.dark ? '#a32324' : 'transparent')
        }
      /> */}
      {props.children}
    </View>
  );
};

export default PageWrapperView;

const styles = StyleSheet.create({});
