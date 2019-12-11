/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity,
} from 'react-native';

import CustomerContext from '../../applicationState/customerContext';

// import icons
const back = require('../../assets/icons/back.png');

const CustomerHeader = ({ navigator }) => {
  // eslint-disable-next-line no-use-before-define
  const { titleContainer, header2, header, backButton, backButtonTouchable } = styles;
  const context = useContext(CustomerContext);
  const { setCurrentUser } = context;

  const handleLogout = () => {
    setCurrentUser({});
    navigator.pop();
  };

  return (
    <View style={titleContainer}>
      <TouchableOpacity style={backButtonTouchable} onPress={handleLogout}>
        <Image source={back} style={backButton} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row' }}>
        <Text style={header}>Scann</Text>
        <Text style={header2}>AR</Text>
      </View>
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
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  header2: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#85A4AF',
  },
  backButton: {
    height: 28,
    width: 28,
  },
  backButtonTouchable: {
    position: 'absolute',
    left: 20,
    top: 25,
  },
});

export default CustomerHeader;
