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
// eslint-disable-next-line react/prop-types
const Login = ({ navigator }) => {
  const [customerColor, setCustomerColor] = useState('#01161D');
  const [background, setBackground] = useState('#082C39');
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
    navigator.push('CustomerLanding');
    // fetch(`http://whatever.ngrok.io/users?email=${email}`, {
    //   method: 'GET',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then(({ idUser }) => {
    //     // add idUser to context
    //     setIdUser(idUser);
    //     handleLogin();
    //   })
    //   .catch((err) => console.error(err));
  };

  // Handles login redirecting
  const handleLogin = () => {
    if (idUser && idUser !== '') {
      navigator.push('CustomerLanding');
    } else {
      setRegister(true);
    }
  };

  const handleRegister = () => {
  // send user from state to server
    fetch('http://2c926474.ngrok.io/users', {
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
      }),
    })
      .then(({ idUSer }) => {
        setIdUser(idUSer);
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
    <View style={[screen, { backgroundColor: background }]}>
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
              style={[button1, { backgroundColor: customerColor }]}
              onPress={getUserInfo}
            >
              <Text style={customerTitle}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[button2, { backgroundColor: customerColor }]}
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
  },
  button1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    borderRadius: 5,
  },
  button2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    marginTop: 3,
    borderRadius: 5,
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
