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
        <Text style={buttonText}>{'<'}</Text>
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
    backgroundColor: '#124559',
  },
  buttonText: {
    textAlign: 'left',
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 5,
  },
});

export default ARNavBar;
