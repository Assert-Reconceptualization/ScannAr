/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const CustomerNavBar = ({ navigator }) => {
  // eslint-disable-next-line no-use-before-define
  const { bar, buttonText } = styles;
  const [throttle, setThrottle] = useState(false);

  const handleThrottle = () => {
    setThrottle(true);
    setTimeout(() => {
      setThrottle(false);
    }, 400);
  };

  const handlePress = () => {
    if (!throttle) { // only do something if throttle is false
      handleThrottle();
      navigator.push('AR');
    }
  };

  return (
    <View style={bar}>
      <TouchableOpacity onPress={() => handlePress()}>
        <Text style={buttonText}>AR</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigator.pop()}>
        <Text style={buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    // flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '8%',
    width: '100%',
    backgroundColor: 'lightblue',
  },
  button: {
    borderRadius: 10,
    marginBottom: 1,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white',
  },
});

export default CustomerNavBar;
