import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import useToastStore from '../reduxToolkit/Auth/ToastStore';
// import useToastStore from './path/to/your/zustand/store';

const ToastComponent = () => {
  const {toast} = useToastStore(state => state);

  if (!toast) return null;

  return (
    <View style={styles.toastContainer}>
      <Text style={styles.toastText}>{toast.message}</Text>
      {/* Render other toast options like icons here if needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  toastText: {
    color: '#fff',
  },
});

export default ToastComponent;
