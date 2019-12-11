/* eslint-disable react/prop-types */
import React from 'react';
import {
  View, StyleSheet, TouchableOpacity, Image,
} from 'react-native';

const back = require('../../assets/icons/back.png');

const ProductProfileNavBar = ({ setVisibility }) => {
  const { container } = styles;
  return (
    <View style={container}>
      <TouchableOpacity onPress={() => setVisibility(false)}>
        <Image source={back} style={backButton} />
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

export default ProductProfileNavBar;
