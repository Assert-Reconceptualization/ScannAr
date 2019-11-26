/* eslint-disable react/prop-types */
import React from 'react';
import {
  View, Text, StyleSheet, Button,
} from 'react-native';

const BusinessHeader = ({ navigator }) => {
  const handleLogout = () => {
    navigator.pop();
  };

  // eslint-disable-next-line no-use-before-define
  const { titleContainer, text } = styles;

  return (
    <View style={titleContainer}>
      <Text style={text}>ScannAR B</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    height: '8%',
    backgroundColor: '#505950',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 5,
  },
});

export default BusinessHeader;
