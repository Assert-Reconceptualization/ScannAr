import React, { useState } from 'react';
import {
  Text, View, StyleSheet, TextInput,
} from 'react-native';

// eslint-disable-next-line react/prop-types
const Register = ({ navigator }) => {
  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [businessDescription, setBusinessDescription] = useState('');
  // eslint-disable-next-line no-use-before-define
  const { inputField, inputFields, textStyle } = styles;

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
        value={email}
        autoCompleteType="password"
        secureTextEntry
        placeholder="password123"
      />
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
  inputField: {
    height: 40,
    borderColor: '#86A4AF',
    borderWidth: 2,
    width: '100%',
    borderRadius: 5,
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
});

export default Register;
