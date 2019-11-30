/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

// import components
import Register from './Register';

// ScannAR navigator
const Login = ({ navigator }) => {
  const [register, setRegister] = useState(false);
  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [idUser, setIdUser] = useState('');

  // Renders Register fields onto login
  const handleRegisterView = () => {
    setRegister(true);
  };

  // Gets user id / info
  const getUserInfo = () => {
    fetch(`http://NGROKADDRESSHERE.ngrok.io/users?email=${email}&password=${password}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((userInfo) => {
        // add idUser to context
        const { id } = userInfo.data[0];
        if (id) {
          setIdUser(id);
          handleLogin();
        } else {
          setRegister(true);
        }
      })
      .catch((err) => setRegister(true));
  };

  // Handles login redirecting
  const handleLogin = () => {
      navigator.push('CustomerLanding');
  };

  const handleRegister = () => {
  // send user from state to server
    fetch('http://NGROKADDRESSHERE.ngrok.io/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role: 'customer',
        email,
        nameFirst: `${name.split(' ')[0]}`,
        nameLast: `${name.split(' ')[1]}`,
        password,
      }),
    })
      .then((response) => response.json())
      .then((userInfo) => {
        const { id } = userInfo;
        setIdUser(id);
        handleLogin();
      })
      .catch((err) => console.error(err));
  };

  const {
    screen,
    header,
    buttonContainer,
    button1,
    customerTitle,
    button2,
    textStyle,
    inputField,
  // eslint-disable-next-line no-use-before-define
  } = styles;

  return (
    <View style={screen}>
      <Text style={header}>ScannAR</Text>
      {register ? (
        <Register
          handleRegister={handleRegister}
          setUserName={setUserName}
          setEmail={setEmail}
          setPassword={setPassword}
          name={name}
          password={password}
          email={email}
          setRegister={setRegister}
        />
      ) : (
        <View style={{ flex: 1, marginTop: 20 }}>
          <Text style={textStyle}>
            Email
          </Text>
          <TextInput
            style={inputField}
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCompleteType="email"
            placeholder="email@example.com"
          />
          <Text style={textStyle}>
            Password
          </Text>
          <TextInput
            style={inputField}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            placeholder="password123"
          />
          <View style={buttonContainer}>
            <TouchableOpacity
              style={button1}
              onPress={getUserInfo}
            >
              <Text style={customerTitle}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={button2}
              onPress={handleRegisterView}
            >
              <Text style={customerTitle}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  buttonContainer: {
    padding: 2,
    flexDirection: 'column',
    width: '100%',
    height: '25%',
    backgroundColor: '#86A4AF',
    borderRadius: 5,
    minWidth: 300,
    marginTop: 10,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '30%',
    backgroundColor: '#082C39',
  },
  button1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    borderRadius: 5,
    backgroundColor: '#01161D',
  },
  button2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    marginTop: 3,
    borderRadius: 5,
    backgroundColor: '#01161D',
  },
  customerTitle: {
    fontSize: 15,
    color: 'white',
  },
  header: {
    fontSize: 55,
    fontWeight: 'bold',
    color: 'white',
  },
  textStyle: {
    padding: 1,
    color: 'white',
  },
  inputField: {
    height: 40,
    borderColor: '#86A4AF',
    borderWidth: 2,
    minWidth: 275,
    borderRadius: 5,
    color: 'white',
  },
});

export default Login;
