/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RegisterModal from '../components/RegisterModal';
import SignUp from '../components/buttons/SignUp';
import BusinessContext from '../applicationState/BusinessContext';
import serverConfig from '../serverConfig';

const backgroundImagePath = require('../assets/images/business-bg.png');

const server = serverConfig().url;

export default function SignInScreen(props) {
  const context = useContext(BusinessContext);
  const [register, setRegister] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isRegistering = () => {
    setRegister(true);
  };
  const isSigningIn = () => {
    setSignIn(true);
  };
  const cancelSigningIn = () => {
    setSignIn(false);
  };
  const cancelRegistration = () => {
    setRegister(false);
  };

  const handleSignIn = (bEmail, bPassword) => {
    // fetch business info
    fetch(`${server}/authentication`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        strategy: 'local',
        email: bEmail,
        password: bPassword,
      }),
    }).then((business) => business.json())
      .then((businessInfo) => {
        if (businessInfo.user) {
          // grab tags from db
          fetchTags();
          // store JWT token on app state
          context.setAccessToken(businessInfo.accessToken);
          // store current business info
          return context.setCurrentBusiness(businessInfo.user);
        }
        throw Error;
      })
      .then(() => {
        props.navigation.navigate({ routeName: 'Home' });
      })
      .catch(() => {
        Alert.alert(
          'Error',
          'Wrong email or password',
        );
        setPassword('');
        setEmail('');
      });
  };

  const fetchTags = () => {
    fetch(`${server}/tags`)
      .then((response) => response.json())
      .then((tags) => {
        context.setTags(tags.data);
      })
      .catch(() => console.log("couldn't fetch tags"));
  };

  const {
    container,
    titleContainer,
    subTitleContainer,
    buttonContainer,
    titleLeftText,
    titleRightText,
    subTitle,
    loginModal,
    textInput,
    titleIconContainer,
    newContainer,
    cancelButtonContainer,
    smallText,
    buttonSignIn,
    registerButtonContainer,
    registerContainer,
  } = styles;

  const {
    navigation,
  } = props;

  return (
    <View style={container}>
      <ImageBackground
        source={backgroundImagePath}
        style={{ flex: 1, width: null, height: null }}
      >
        <RegisterModal
          handleSignIn={handleSignIn}
          visible={register}
          navigation={navigation}
          cancelRegistration={cancelRegistration}
        />
        <View style={titleContainer}>
          <Text style={titleLeftText}>Scann</Text>
          <Text style={titleRightText}>AR</Text>
          <View style={titleIconContainer}>
            <Ionicons name="ios-briefcase" size={30} color="#AEC3B0"/>
          </View>
        </View>
        <View style={subTitleContainer}>
          <Text style={subTitle}>
            Business
          </Text>
        </View>
        <View style={buttonContainer}>
          <TouchableOpacity
            onPress={isSigningIn}
          >
            <SignUp />
          </TouchableOpacity>
          <View style={newContainer}>
            <Text style={smallText}>New?</Text>
          </View>
          <TouchableOpacity
            onPress={isRegistering}
            style={registerContainer}
          >
            <Text style={{ color: '#EFF6E0', fontSize: 18 }}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }} />
        <Modal
          visible={signIn}
          animationType="slide"
        >
          <TouchableOpacity
            style={cancelButtonContainer}
            onPress={cancelSigningIn}
          >
            <Ionicons name="ios-rewind" size={30} color="#AEC3B0" />
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={loginModal}>
              <TextInput
                style={textInput}
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="Email"
                placeholderTextColor="#EFF6E0"
              />
              <TextInput
                style={textInput}
                onChangeText={(text) => setPassword(text)}
                value={password}
                placeholder="Password"
                placeholderTextColor="#EFF6E0"
                secureTextEntry
              />
              <TouchableOpacity
                onPress={() => { handleSignIn(email, password); }}
                style={registerButtonContainer}
              >
                <Text style={buttonSignIn}>Sign in  </Text>
                <Ionicons name="ios-redo" size={30} color="#AEC3B0" />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B423C',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  titleIconContainer: {
    paddingBottom: 12,
  },
  subTitleContainer: {
    flex: 2,
    alignItems: 'center',
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
  smallText: {
    color: '#EFF6E0',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 3,
    alignItems: 'center',
  },
  loginModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B423C',
  },
  textInput: {
    width: '70%',
    borderWidth: 2,
    borderColor: '#AEC3B0',
    borderRadius: 5,
    fontSize: 25,
    marginBottom: 20,
    paddingLeft: 5,
    backgroundColor: '#1E241F',
    color: '#EFF6E0',
  },
  newContainer: {
    paddingTop: 10,
  },
  cancelButtonContainer: {
    position: 'absolute',
    zIndex: 5,
    top: 50,
    left: 50,
  },
  buttonSignIn: {
    fontSize: 25,
    color: '#AEC3B0',
  },
  registerButtonContainer: {
    backgroundColor: '#1E241F',
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#AEC3B0',
    padding: 10,
    flexDirection: 'row',
  },
  registerContainer: {
    backgroundColor: '#1E241F',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#AEC3B0',
    marginTop: 10,
    width: 100,
    alignItems: 'center',
  },
});
