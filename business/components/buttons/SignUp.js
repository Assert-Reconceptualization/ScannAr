import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

export default function SignUp(){

  const { signInButton, signInText } = styles;

  return (
    <View
      style={signInButton}
    >
      <Text style={signInText}>Sign In</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  signInButton: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#AEC3B0',
    width: 300,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  signInText: {
    fontSize: 30,
    color: '#AEC3B0'
  }
});