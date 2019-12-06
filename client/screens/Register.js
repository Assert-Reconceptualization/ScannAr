/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Text, View, StyleSheet, TextInput, TouchableOpacity,
} from 'react-native';

const Register = ({
  handleRegister,
  setNameFirst,
  setNameLast,
  setEmail,
  setPassword,
  nameFirst,
  nameLast,
  email,
  password,
  setRegister,
}) => {
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
          First Name
      </Text>
      <TextInput
        style={inputField}
        onChangeText={(text) => setNameFirst(text)}
        value={nameFirst}
        autoCompleteType="name"
        placeholder="John"
      />
      <Text style={textStyle}>
        Last Name
      </Text>
      <TextInput
        style={inputField}
        onChangeText={(text) => setNameLast(text)}
        value={nameLast}
        autoCompleteType="name"
        placeholder="Doe"
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
        secureTextEntry
        placeholder="password123"
      />
      <TouchableOpacity
        style={button3}
        onPress={handleRegister}
      >
        <Text style={customerTitle}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={button3}
        onPress={() => setRegister(false)}
      >
        <Text style={customerTitle}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
