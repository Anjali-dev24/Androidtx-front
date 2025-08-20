// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import {Colors, FONT_SIZE, Fonts} from '../Themes/AppTheme';
// import Metrics from '../Themes/Metrics';
// import Icon from 'react-native-vector-icons/Ionicons';
// import NoPermission from './NoPermission';

// const messageTheme = {
//   success: {
//     bg: '#E7F6EC',
//     border: '#B0E1C2',
//     iconBg: '#02B75D',
//     icon: 'checkmark-done-circle',
//   },
//   error: {
//     bg: '#FEEAE7',
//     border: '#F9BCB2',
//     iconBg: '#F44630',
//     icon: 'warning',
//   },
//   info: {
//     bg: '#E0ECF8',
//     border: '#99C5EC',
//     iconBg: '#0060DB',
//     icon: 'information-circle-sharp',
//   },
//   warning: {
//     bg: '#FFF6E8',
//     border: '#FDDAAA',
//     iconBg: '#F68A27',
//     icon: 'warning',
//   },
// };

// const UniversalToast = props => {
//   const {message, variant = 'info', dismiss, icon, type} = props;
//   if (dismiss) {
//     return null;
//   }
//   if (type && type === 'permission') {
//     return <NoPermission icon={icon} message={message} variant={variant} />;
//   }
//   return (
//     <View
//       style={{
//         ...styles.mainView,
//         backgroundColor: messageTheme[variant].bg,
//         borderColor: messageTheme[variant].border,
//       }}>
//       <View
//         style={{
//           ...styles.iconBg,
//           backgroundColor: messageTheme[variant].iconBg,
//         }}>
//         <Icon
//           name={messageTheme[variant].icon}
//           size={Metrics.rfv(20)}
//           color={Colors.white}
//         />
//       </View>

//       <Text style={styles.text}>{message}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   mainView: {
//     flex: 1,
//     zIndex: 1,
//     width: Metrics.width - Metrics.rfv(30),
//     borderRadius: Metrics.rfv(10),
//     flexDirection: 'row',
//     borderWidth: Metrics.rfv(1),
//     marginHorizontal: Metrics.rfv(20),
//     alignItems: 'center',
//     padding: Metrics.rfv(5),
//     shadowColor: Colors.black,
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.22,
//     shadowRadius: 2.22,

//     elevation: 0,
//   },
//   text: {
//     fontSize: FONT_SIZE.small_medium,
//     color: Colors.black,
//     marginLeft: Metrics.rfv(10),
//     flex: 1,
//     fontFamily: Fonts.Roboto400,
//   },
//   iconBg: {
//     height: Metrics.rfv(30),
//     width: Metrics.rfv(30),
//     borderRadius: Metrics.rfv(10),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default UniversalToast;
