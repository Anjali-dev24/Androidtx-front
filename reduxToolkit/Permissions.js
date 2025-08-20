import { Alert, Linking, PermissionsAndroid } from "react-native";

export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        PermissionsAndroid.PERMISSIONS.READ_CALENDAR,
        PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        PermissionsAndroid.PERMISSIONS.WRITE_CALL_LOG,
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        // PermissionsAndroid.PERMISSIONS.SEND_SMS,
      ],
      {
        title: "Permissions",
        message: "AndroidTx needs all of these permissions",
      }
    );
    if ( granted["android.permission.CAMERA"]==='granted' &&
      granted["android.permission.READ_CONTACTS"]==='granted' &&
      granted["android.permission.ACCESS_FINE_LOCATION"]==='granted' &&
      granted["android.permission.ACCESS_COARSE_LOCATION"]==='granted' &&
      granted["android.permission.WRITE_CONTACTS"]==='granted' &&
      granted["android.permission.READ_CALENDAR"]==='granted' &&
      granted["android.permission.WRITE_CALENDAR"]==='granted' &&
      granted["android.permission.CALL_PHONE"]==='granted' &&
      granted["android.permission.RECORD_AUDIO"]==='granted' &&
      granted["android.permission.READ_CALL_LOG"]==='granted' &&
      granted["android.permission.WRITE_CALL_LOG"]==='granted' &&
      granted["android.permission.SEND_SMS"]==='granted' &&
      granted["android.permission.RECEIVE_SMS"]==='granted' &&
      granted["android.permission.READ_SMS"]==='granted'
    ) {
     
      return true;
    } else {
    
      return false;
    }

    // if (PermissionsAndroid.RESULTS.GRANTED==='granted') {
    //   console.log("Storage Permission Granted.");
    //   Alert.alert('You can use Application')
    // } else {
    //   Alert.alert('', 'AndroidTx needs permissions. Go to settings and enable all the permissions', [
    //     {
    //       text: 'Ask me later',
    //       onPress: () => console.log('Ask me later pressed'),
    //     },
    //     {
    //       text: 'Cancel',
    //       onPress: () => console.log('Cancel Pressed'),
    //       style: 'cancel',
    //     },
    //     {text: 'OK', onPress: () => Linking.openSettings()},
    //   ]);
    //   // Linking.openSettings()
    // }
  } catch (err) {
    console.log("++++" + err);
  }
};
