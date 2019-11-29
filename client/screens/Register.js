import React, { useState } from 'react';
import {
  Text, View, StyleSheet, TextInput, TouchableOpacity,
} from 'react-native';

// eslint-disable-next-line react/prop-types
const Register = ({ navigator, handleUserInfo }) => {
  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userInfo = { name, email, password };
  // eslint-disable-next-line no-use-before-define
  const {
    inputField,
    inputFields,
    textStyle,
    customerTitle,
    button3,
  } = styles;

  return (
    <View style={inputFields}>
      <Text style={textStyle}>
          Full Name
      </Text>
      <TextInput
        style={inputField}
        onChangeText={(text) => setUserName(text)}
        value={name}
        autoCompleteType="name"
        placeholder="John Doe"
      />
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
        autoCompleteType="password"
        secureTextEntry
        placeholder="password123"
      />
      <TouchableOpacity
        style={button3}
        onPress={() => handleUserInfo(userInfo)}
      >
        <Text style={customerTitle}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionInputField: {
    height: 120,
    borderColor: 'gray',
    borderWidth: 2,
    width: '100%',
    borderRadius: 5,
  },
  customerTitle: {
    fontSize: 15,
    color: 'white',
  },
  inputField: {
    height: 40,
    borderColor: '#86A4AF',
    borderWidth: 2,
    width: '100%',
    borderRadius: 5,
    color: 'white',
  },
  inputFields: {
    marginTop: 5,
    width: '80%',
    backgroundColor: '#082C39',
  },
  textStyle: {
    padding: 1,
    color: 'white',
  },
  button3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    borderRadius: 5,
    backgroundColor: '#01161D',
    borderColor: '#86A4AF',
    borderWidth: 2,
    marginTop: 10,
  },
});

export default Register;
