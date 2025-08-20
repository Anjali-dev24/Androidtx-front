import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import RNModal from 'react-native-modal';
import {Colors} from '../Helpers/Colors';
import {Fonts} from '../constant/data';
import Metrics from '../Helpers/Metrics';
import LinearGradient from 'react-native-linear-gradient';

const Model = props => {
  return (
    <RNModal
      isVisible={props.isVisible}
      animationIn="zoomIn"
      animationOut="zoomOut">
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Notification</Text>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.text}>🎰 Welcome back 9TX member 🎰</Text>
            <Text style={styles.text}>
              Reminder. If your deposit not receive, please send it directly to
              9TX Self-service Center, wait till already get process and do not
              send to another person that on behalf of 9TX.
            </Text>
            <Text style={styles.text}>
              🔥🔥We have many bonus for you to claim 🔥🔥
            </Text>
            <Text style={styles.text}>1. First Deposit Bonus</Text>
            <Text style={styles.text}>2. Attendance Bonus 💯 💯</Text>
            <Text style={styles.text}>3. Gifts Code 🎁🎁</Text>
            <Text style={styles.text}>4. Invitation Bonus 🎉🎉</Text>
            <Text style={styles.text}>5. Betting Rebate 💎💎</Text>
            <Text style={styles.text}>6. Super Jackpot 💯 💯</Text>
            <Text style={styles.text}>VIP Bonus 💎💎</Text>
            <Text style={styles.text}>
              Join us and become part of our agent to get the amazing benefit.
              the best aspect of joining our agent, if more you invite and the
              higher level of your downlines, the greater the bonuses you may
              receive, resulting the more downlines.
            </Text>
            <Text style={styles.text}>
              Having problem with deposit not receive, bank data problem, forgot
              phone number, delete USDT and change password? Rest assured you
              can submit the problem on 91CLUB Self-service Center and fill the
              requirement need Didn't know how to submit problem on our
              self-service center? Don't worry you can see the guide step by
              step by clicking this LINK.
            </Text>
            <Text style={styles.text}>
              Also if you having problem with withdrawal not receive over than 3
              days / 72 hours you can submit the problem on 9TX email by
              checking on this LINK
            </Text>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <LinearGradient
              colors={Colors.Gradient_Color}
              style={styles.confirmButton}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  props.setIsVisible(false);
                }}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
    </RNModal>
  );
};

export default Model;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: Metrics.rfv(8),
    width: Metrics.rfv(350),
    height: Metrics.rfv(490),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: Metrics.rfv(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: Metrics.rfv(3.84),
    elevation: 5,
    overflow: 'hidden',
  },
  title: {
    backgroundColor: '#a32324',
    textAlign: 'center',
    color: '#fff',
    paddingVertical: Metrics.rfv(10),
    fontSize: Metrics.rfv(18),
    fontWeight: 'bold',
    fontFamily: Fonts.Roboto400,
  },
  scrollView: {
    paddingHorizontal: Metrics.rfv(20),
  },
  text: {
    paddingVertical: Metrics.rfv(3),
    fontFamily: Fonts.Roboto400,
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: Metrics.rfv(13),
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Metrics.rfv(5),
  },
  confirmButton: {
    width: Metrics.rfv(200),
    borderRadius: Metrics.rfv(25),
    paddingVertical: Metrics.rfv(5),
    // marginVertical:Metrics.rfv(5)
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: Fonts.Roboto500,
    fontSize: Metrics.rfv(16),
  },
});
