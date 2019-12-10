/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useContext, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';

// import components
import Register from './Register';
import CustomerContext from '../applicationState/customerContext';

// ScannAR navigator
const Login = ({ navigator }) => {
  const context = useContext(CustomerContext);
  const [register, setRegister] = useState(false);
  const [nameFirst, setNameFirst] = useState('');
  const [nameLast, setNameLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [throttle, setThrottle] = useState(false); // throttle for login
  const [regThrottle, setRegThrottle] = useState(false); // throttle for register
  const [error, setError] = useState(false); // error logging in
  const {
    serverUrl,
    setServerUrl,
    setAccessToken,
    setCurrentUser,
  } = context;

  useEffect(() => {
    setServerUrl('https://scannar-server-second.appspot.com');
  }, []);
  // Renders Register fields onto login
  const handleRegisterView = () => {
    setRegister(true);
  };

  // Gets user id / info
  const handleLogin = () => {
    if (!throttle) {
      setThrottle(true); // set throttle to allow only one button press
      // regular function call here
      fetch(`${serverUrl}/authentication`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          strategy: 'local',
          password,
          email,
        }),
      })
        .then((response) => response.json())
        .then((userInfo) => {
          // add idUser to context
          const { id } = userInfo.user;
          if (id) {
            setAccessToken(userInfo.accessToken);
            setCurrentUser(userInfo.user);
            getSavedProducts(id);
          } else {
            setRegister(true);
            setThrottle(false);
          }
        })
        .catch(() => {
          setThrottle(false);
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 900);
        });
    }
  };

  // updated savedList for current user upon login
  const getSavedProducts = (idUser) => {
    fetch(`${serverUrl}/savedProducts?idUser=${idUser}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((savedList) => {
        context.setCurrentSavedList(savedList);
      })
      .then(() => handleLoginRedirect());
    // .catch(() => console.log('something happend'));
  };

  // Handles login redirecting
  const handleLoginRedirect = () => {
    Keyboard.dismiss();
    navigator.push('CustomerLanding');
    setTimeout(() => {
      setThrottle(false);
    }, 1200);
  };

  const handleRegister = () => {
    if (!regThrottle) {
      setRegThrottle(true); // set throttle to allow only one button press
      // send user from state to server
      fetch(`${serverUrl}/users`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: 'customer',
          email,
          nameFirst,
          nameLast,
          password,
        }),
      })
        .then(() => {
          handleLogin(); // logs user in and adds to state
        })
        .catch(() => {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 900);
        });
    }
  };

  let errorMessage = error ? (<Text style={{ color: 'red' }}> Please try again</Text>) : null;

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={screen}>
        <Text style={header}>ScannAR</Text>
        {errorMessage}
        {register ? (
          <Register
            handleRegister={handleRegister}
            setNameFirst={setNameFirst}
            setNameLast={setNameLast}
            setEmail={setEmail}
            setPassword={setPassword}
            nameFirst={nameFirst}
            nameLast={nameLast}
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
              placeholderTextColor="#d3d3d3"
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
              placeholderTextColor="#d3d3d3"
            />
            <View style={buttonContainer}>
              <TouchableOpacity
                style={button1}
                onPress={handleLogin}
                // onPress={navigator.push('CustomerLanding')}
              >
                {throttle ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={customerTitle}>Login</Text>
                )}
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
    </TouchableWithoutFeedback>
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
