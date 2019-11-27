/* eslint-disable react/prop-types */
import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';

const CustomerHeader = () => {
  // const handleLogout = () => {
  //   navigator.pop();
  // };

  // eslint-disable-next-line no-use-before-define
  const { titleContainer, text } = styles;

  return (
    <View style={titleContainer}>
      <Text style={text}>ScannAR</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    height: '8%',
    backgroundColor: '#124559',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  text: {
    color: '#D2DDE1',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 2,
  },
});

export default CustomerHeader;
