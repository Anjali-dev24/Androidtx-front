import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Fonts} from '../constant/data';
import Metrics from '../Helpers/Metrics';
import useGameStore from '../reduxToolkit/gameStore/GameStore';

const Timer = props => {
  const [minutes, setMinutes] = useState(
    props.minute > 1 ? props.minute - 1 : 0,
  );
  const {setSoundDisable, soundDisable, multiplication, setMultiplication} =
    useGameStore();
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    setMinutes(props.minute > 1 ? props.minute - 1 : 0);
    setSeconds(59);

    const interval = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds > 0) {
          const newTime = prevSeconds - 1;

          if (newTime <= 5) {
            console.log('Time is about to run out: 5 seconds remaining');
            props.setClockVisible(true);
            const formattedTime = `0:${newTime}`; // Format time as 0:5, 0:4, etc.
            props.onFiveSecondsLeft(formattedTime); // Pass formatted time to parent
          }
          if (newTime === 4) {
            !soundDisable && props.playsong; // Play a sound when 4 seconds are remaining
          }

          return newTime;
        } else {
          if (minutes === 0 && prevSeconds === 0) {
            clearInterval(interval);
            props.setClockVisible(false);
            return 0;
          } else {
            setMinutes(prevMinutes => prevMinutes - 1);
            return 59;
          }
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [props.minute, minutes]);
  const minutesTens = Math.floor(minutes / 10);
  const minutesOnes = minutes % 10;
  const secondsTens = Math.floor(seconds / 10);
  const secondsOnes = seconds % 10;

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text
        style={{
          backgroundColor: '#f6f6f6',
          color: '#a32324',
          padding: Metrics.rfv(5),
          fontWeight: 'bold',
          fontSize: 22,
          marginRight: 5,
          fontFamily: Fonts.Roboto400,
        }}>
        {minutesTens}
      </Text>
      <Text
        style={{
          backgroundColor: '#f6f6f6',
          color: '#a32324',
          padding: Metrics.rfv(5),
          fontWeight: 'bold',
          fontSize: 22,
          fontFamily: Fonts.Roboto400,
        }}>
        {minutesOnes}
      </Text>
      <Text
        style={{
          color: '#a32324',
          padding: Metrics.rfv(5),
          fontWeight: 'bold',
          fontSize: 22,
          fontFamily: Fonts.Roboto400,
        }}>
        :
      </Text>
      <Text
        style={{
          backgroundColor: '#f6f6f6',
          color: '#a32324',
          padding: Metrics.rfv(5),
          fontWeight: 'bold',
          fontSize: 22,
          marginRight: 5,
          fontFamily: Fonts.Roboto400,
        }}>
        {secondsTens}
      </Text>
      <Text
        style={{
          backgroundColor: '#f6f6f6',
          color: '#a32324',
          padding: Metrics.rfv(5),
          fontWeight: 'bold',
          fontSize: 22,
          fontFamily: Fonts.Roboto400,
        }}>
        {secondsOnes}
      </Text>
    </View>
  );
};

export default Timer;
