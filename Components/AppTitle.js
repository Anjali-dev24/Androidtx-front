import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Metrics from '../Helpers/Metrics';

const AppTitle =(props) => {

    return (
        <View style={[styles.container,props.titleContainer]}>
        <Text
          style={styles.titleStyle}
        >
          9T
        </Text>
        <Text
          style={styles.xStyle}
        >
          X
        </Text>
      </View>
    );
};

const styles = StyleSheet.create({
    container:{ flexDirection: "row", alignItems: "center" },
    titleStyle:{
        fontSize: Metrics.rfv(45),
        color: "#fff",
        fontWeight: "bold",
      },
      xStyle:{
        fontSize: Metrics.rfv(20),
        color: "#a32324",
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#fff",
        borderRadius: 25,
        paddingHorizontal: 8,
      }
})

export default AppTitle;
