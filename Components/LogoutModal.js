import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

const LogoutModal = ({isVisible, onClose, onLogout}) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Confirm Logout</Text>
        <Text style={styles.modalMessage}>
          Are you sure you want to logout?
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={onLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 40,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: 'gray',
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: '#a32324',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LogoutModal;
