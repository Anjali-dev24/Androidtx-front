import React, {useState, useEffect} from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import Metrics from '../Helpers/Metrics';
import {Colors} from '../Helpers/Colors';
import {Fonts} from '../constant/data';

const ProcessingModal = ({
  visible,
  status,
  toggleModal,
  onClose,
  successMessage = 'Payment Successful!',
  failureMessage = 'Payment Failed!',
  processingMessage = 'Processing...',
}) => {
  const [remainingTime, setRemainingTime] = useState(600); // 10 minutes in seconds

  // useEffect(() => {
  //   let timer;
  //   if (status === 'processing') {
  //     // Start a timer to update the remaining time
  //     timer = setInterval(() => {
  //       setRemainingTime(prevTime => {
  //         if (prevTime <= 1) {
  //           clearInterval(timer);
  //           onClose(); // Close the modal when time is up
  //           return 0;
  //         }
  //         return prevTime - 1;
  //       });
  //     }, 1000); // Update every second

  //     // Cleanup timer on unmount or when processing is done
  //     return () => clearInterval(timer);
  //   } else if (status === 'success' || status === 'failure') {
  //     // Close after 10 seconds if success or failure
  //     const closeTimer = setTimeout(onClose, 10000); // 10 seconds
  //     return () => clearTimeout(closeTimer);
  //   }
  // }, [status, onClose]);

  // Convert seconds to minutes:seconds format
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={toggleModal} // Handle Android back button press
      transparent={true}
      animationType="slide">
      <TouchableOpacity style={styles.modalContainer} onPress={toggleModal}>
        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
          {status === 'processing' && (
            <View style={styles.centeredView}>
              <LottieView
                source={require('../Assets/Animations/pending/Animation - 1724930152295.json')}
                autoPlay
                loop
                style={styles.lottie}
              />
              <Text style={styles.pendingText}>{'Payment Pending'}</Text>
              <View style={styles.transactionView}>
                <Text
                  style={{color: Colors.black, fontFamily: Fonts.Roboto400}}>
                  {' '}
                  Transaction id:
                </Text>
                <Text style={styles.itemView}> 3483473747</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{color: Colors.black, fontFamily: Fonts.Roboto400}}>
                  Time:
                </Text>
                <Text style={styles.itemView}> 20 June 2024 10:23</Text>
              </View>
            </View>
          )}
          {status === 'timer' && (
            <View style={styles.centeredView}>
              <Text
                style={{
                  fontSize: Metrics.rfv(15),
                  fontFamily: Fonts.Roboto400,
                  color: Colors.black,
                }}>
                Please Wait..
              </Text>
              <LottieView
                source={require('../Assets/Animations/Success/Animation - 1724914060446.json')}
                autoPlay
                loop
                style={styles.lottie}
              />
              <Text style={styles.processingText}>{processingMessage}</Text>
              <Text style={styles.timerText}>
                Time Remaining: {formatTime(remainingTime)}
              </Text>
            </View>
          )}
          {status === 'success' && (
            <View style={styles.centeredView}>
              <LottieView
                source={require('../Assets/Animations/Success/Animation - 1724913881280.json')}
                autoPlay
                loop={false}
                style={styles.lottie}
              />
              <Text style={styles.successText}>{successMessage}</Text>

              <View style={styles.transactionView}>
                <Text
                  style={{color: Colors.black, fontFamily: Fonts.Roboto400}}>
                  {' '}
                  Transaction id:
                </Text>
                <Text style={styles.itemView}> 3483473747</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{color: Colors.black, fontFamily: Fonts.Roboto400}}>
                  Time:
                </Text>
                <Text style={styles.itemView}> 20 June 2024 10:23</Text>
              </View>
            </View>
          )}
          {status === 'failure' && (
            <View style={styles.centeredView}>
              <LottieView
                source={require('../Assets/Animations/Failed/Animation - 1724925713769.json')}
                autoPlay
                loop={false}
                style={styles.lottie}
              />
              <Text style={styles.failureText}>{failureMessage}</Text>

              <View style={styles.transactionView}>
                <Text style={{color: Colors.black,fontFamily: Fonts.Roboto400}}> Transaction id:</Text>
                <Text style={styles.itemView}> 3483473747</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: Colors.black,fontFamily: Fonts.Roboto400}}>Time:</Text>
                <Text style={styles.itemView}> 20 June 2024 10:23</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  transactionView: {
    flexDirection: 'row',
    color: Colors.black,
    marginTop: Metrics.rfv(10),
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  itemView: {
    fontWeight: 'bold',
    color: Colors.black,
    fontFamily: Fonts.Roboto400,
  },
  centeredView: {
    paddingVertical: 80,
    alignItems: 'center',
  },
  processingText: {
    fontSize: Metrics.rfv(30),
    marginTop: 5,
    color: '#000',
    fontFamily: Fonts.Roboto300,
  },
  timerText: {
    fontSize: 16,
    marginTop: 5,
    color: '#888',
    fontFamily: Fonts.Roboto400,
  },
  successText: {
    fontSize: 18,
    marginTop: 30,
    color: 'green',
    fontWeight: 'bold',
    fontFamily: Fonts.Roboto500,
  },
  failureText: {
    fontSize: Metrics.rfv(18),
    marginTop: 30,
    color: 'red',
    fontWeight: 'bold',
    fontFamily: Fonts.Roboto500
  },
  pendingText: {
    fontSize: Metrics.rfv(18),
    marginTop: 30,
    fontWeight: 'bold',
    fontFamily: Fonts.Roboto500,
    color: 'black',
  },
  lottie: {
    height: 150,
    width: 150,
  },
});

export default ProcessingModal;
