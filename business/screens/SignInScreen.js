import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button
} from 'react-native';

export default function SignInScreen(props) {
  const handleSignUp = () => {
    props.navigation.navigate('Main')
  }

  const {
    container,
    titleContainer,
    subTitleContainer,
    buttonContainer,
    titleLeftText,
    titleRightText,
    subTitle,
    signInButton,
    signInText,
  } = styles;
  return (
    <View style={container}>
      <View style={titleContainer}>
        <Text style={titleLeftText}>Scann</Text>
        <Text style={titleRightText}>AR</Text>
      </View>
      <View style={subTitleContainer}>
        <Text style={subTitle}>
          Business
        </Text>
      </View>
      <View style={buttonContainer}>
        <TouchableOpacity style={signInButton}>
          <Text style={signInText}>Sign In</Text>
          <Text>Google Icon</Text>
        </TouchableOpacity>
        <Button title="Register" onPress={handleSignUp} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '20%',
    backgroundColor: '#3B423C',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  subTitleContainer: {
    flex: 2,
    alignItems: 'center'
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
  subTitle: {
    color: '#AEC3B0',
    fontSize: 40,
  },
  buttonContainer: {
    flex: 3,
    alignItems: 'center'
  },
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