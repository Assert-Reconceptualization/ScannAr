import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function SignInScreen(props) {
  const handleSignUp = () => {
    props.navigation.navigate('Main')
  }

  const {
    container,
    titleContainer,
    titleLeftText,
    titleRightText,
  } = styles;
  return (
    <View style={container}>
      <View style={titleContainer}>
        <Text style={titleLeftText}>Scann</Text>
        <Text style={titleRightText}>AR</Text>
      </View>
      
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '20%',
    backgroundColor: '#3B423C',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleLeftText: {
    color: '#EFF6E0',
    fontSize: 40,
    fontWeight: 'bold',
  },
  titleRightText: {
    color: '#AEC3B0',
    fontSize: 40,
    fontWeight: 'bold',
  },
});