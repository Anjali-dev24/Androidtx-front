import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import FastImage from 'react-native-fast-image';

// Helper function to return the correct dice image path based on the value
const getDiceImage = value => {
  switch (value) {
    case 1:
      return require('../Assets/dies/Sqaure_dies/1.png');
    case 2:
      return require('../Assets/dies/Sqaure_dies/2.png');
    case 3:
      return require('../Assets/dies/Square_dies/3.png');
    case 4:
      return require('../Assets/dies/Square_dies/4.png');
    case 5:
      return require('../Assets/dies/Square_dies/5.png');
    case 6:
      return require('../Assets/dies/Square_dies/6.png');
    default:
      return require('../Assets/dies/Square_dies/1.png');
  }
};

const DiceShaker = () => {
  const [diceValue, setDiceValue] = useState([1, 1, 1]); // Default values for three dice
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  // Shake the dice and update the numbers for 2 seconds
  const shakeDice = () => {
    // Start the shaking animation
    Animated.loop(
      Animated.timing(shakeAnimation, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true, // Use native driver for performance
      }),
    ).start();

    // Change dice numbers randomly for 2 seconds
    const intervalId = setInterval(() => {
      setDiceValue([
        Math.floor(Math.random() * 6) + 1, // Random number between 1-6
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ]);
    }, 100);

    // Stop shaking and number change after 2 seconds
    setTimeout(() => {
      clearInterval(intervalId);
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).stop(); // Stop shaking after 2 seconds
    }, 2000);
  };

  // Interpolate shake movement
  const shakeInterpolate = shakeAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 10], // Move dice -10 to 10 on the X-axis
  });

  const shakeStyle = {
    transform: [{translateX: shakeInterpolate}],
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flexDirection: 'row'}}>
        {diceValue.map((value, index) => (
          <Animated.View key={index} style={[shakeStyle, {margin: 10}]}>
            <FastImage
              source={[getDiceImage(value),{priority: FastImage.priority.low,}]} // Get the dice image based on the value
              style={{width: 50, height: 50}}
            />
          </Animated.View>
        ))}
      </View>

      <TouchableOpacity
        style={{
          marginTop: 50,
          backgroundColor: '#f39c12',
          padding: 20,
          borderRadius: 10,
        }}
        onPress={shakeDice}>
        <Text style={{color: 'white'}}>Shake Dice</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DiceShaker;
