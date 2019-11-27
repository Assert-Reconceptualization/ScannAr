import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export default function SignUp(props){

  const handleSignIn = () => {
    props.navigation.navigate('Main')
  }

  const { signInButton, signInText } = styles;

  return (
    <TouchableOpacity
      style={signInButton}
      onPress={handleSignIn}
    >
      <Text style={signInText}>Sign In</Text>
      <Text>Google Icon</Text>
    </TouchableOpacity>
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