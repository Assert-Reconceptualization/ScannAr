/* eslint-disable react/prop-types */
import React from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity,
} from 'react-native';

const ARNavBar = ({ navigator }) => {
  const { container, buttonText } = styles;
  return (
    <View style={container}>
      <TouchableOpacity onPress={() => navigator.pop()}>
        <Text style={buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    height: '7%',
    width: '100%',
    opacity: 50,
    backgroundColor: 'lightblue',
  },
  buttonText: {
    textAlign: 'left',
    padding: 10,
    color: 'white',
  },
});

export default ARNavBar;
