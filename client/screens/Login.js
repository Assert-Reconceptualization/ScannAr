/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// import components
import Register from './Register';

// ScannAR navigator
// eslint-disable-next-line react/prop-types
const Login = ({ navigator }) => {
  const [mode, setMode] = useState('CustomerLanding');
  const [customerColor, setCustomerColor] = useState('#01161D');
  const [background, setBackground] = useState('#082C39');
  const [register, setRegister] = useState(false);
  const [user, setUser] = useState({});

  const handleRegisterView = () => {
    // render registration page
    setRegister(true);
  };

  const handlePress = () => {
    handleRegisterView();
  };
  const handleLogin = () => {
    // eslint-disable-next-line react/prop-types
    navigator.push(mode);
  };

  const handleRegister = () => {
  // send axios request with user info
  // then
    handleLogin();
  };

  const handleUserInfo = (userObject) => {
    setUser(userObject);
    handleRegister();
  };

  const {
    screen,
    header,
    buttonContainer,
    button1,
    customerTitle,
    button2,
  // eslint-disable-next-line no-use-before-define
  } = styles;

  return (
    <View style={[screen, { backgroundColor: background }]}>
      <Text style={header}>ScannAR</Text>
      {register ? <Register handleUserInfo={handleUserInfo} /> : null}
      {!register ? (
        <View style={buttonContainer}>
          <TouchableOpacity
            style={[button1, { backgroundColor: customerColor }]}
            onPress={handleLogin}
          >
            <Text style={customerTitle}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[button2, { backgroundColor: customerColor }]}
            onPress={handlePress}
          >
            <Text style={customerTitle}>Register</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  buttonContainer: {
    padding: 2,
    flexDirection: 'column',
    width: '85%',
    height: '25%',
    backgroundColor: '#86A4AF',
    borderRadius: 5,
  },
  buttonContainer2: {
    padding: 2,
    marginTop: 5,
    flexDirection: 'column',
    width: '85%',
    height: '10%',
    backgroundColor: '#86A4AF',
    borderRadius: 5,
  },
  loginContainer: {
    marginTop: '10%',
    padding: 2,
    width: '60%',
    justifyContent: 'space-around',
    backgroundColor: '#86A4AF',
    borderRadius: 5,
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
    marginTop: 5,
    borderRadius: 5,
  },
  button3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    borderRadius: 5,
  },
  customerTitle: {
    fontSize: 15,
    color: 'white',
  },
  businessTitle: {
    fontSize: 15,
    color: 'white',
  },
  header: {
    fontSize: 55,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Login;
