import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Fonts } from '../constant/data';
import {Colors} from '../Helpers/Colors';
import Metrics from '../Helpers/Metrics';

const TextWithIcon = ({text, onIconPress}) => (
  <View style={styles.rowView}>
    <Text style={styles.twoSameNo}>{text}</Text>
    <TouchableOpacity onPress={onIconPress}>
      <AntDesign
        name="questioncircle"
        color={Colors.Primary_100}
        size={20}
        style={{marginLeft: Metrics.rfv(10)}}
      />
    </TouchableOpacity>
  </View>
);

const styles = {
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Metrics.rfv(15),
  },
  twoSameNo: {
    color: Colors.black,
    fontSize: Metrics.rfv(14),
    fontFamily: Fonts.Roboto400,
    marginVertical: Metrics.rfv(10),
  },
};

export default TextWithIcon;
