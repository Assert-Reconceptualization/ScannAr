/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CustomerContext from '../../applicationState/customerContext';

const CustomerNavBar = ({ navigator }) => {
  // eslint-disable-next-line no-use-before-define
  const context = useContext(CustomerContext);
  const { bar, buttonText } = styles;
  const [throttle, setThrottle] = useState(false);

  const handleThrottle = () => {
    setThrottle(true);
    setTimeout(() => {
      setThrottle(false);
    }, 400);
  };
  const updateMarkers = () => {
    return fetch(`${context.serverUrl}/products`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((parsedResponse) => {
        context.setAllMarkers(parsedResponse.data);
      });
  }
  
  const handlePress = () => {
    if (!throttle) { // only do something if throttle is false
      updateMarkers()
        .then(() => handleThrottle())
        .then(() => navigator.push('AR'));
      // handleThrottle();
      // navigator.push('AR');
    }
  };

  const handleLogout = () => {
    context.setCurrentUser({});
    navigator.pop();
  };

  return (
    <View style={bar}>
      <TouchableOpacity onPress={() => handlePress()}>
        <Text style={buttonText}>AR</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
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
    backgroundColor: '#124559',
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
