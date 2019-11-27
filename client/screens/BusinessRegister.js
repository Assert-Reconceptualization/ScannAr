import React, { useState } from 'react';
import {
  Text, View, StyleSheet, TextInput,
} from 'react-native';

// eslint-disable-next-line react/prop-types
const BusinessRegister = ({ navigator }) => {
  const [businessName, setBusinessName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  // eslint-disable-next-line no-use-before-define
  const { descriptionInputField, inputField, inputFields, textStyle } = styles;

  return (
    <View style={inputFields}>
			<Text style={textStyle}>
					Business Name
      </Text>
      <TextInput
        style={inputField}
        onChangeText={(text) => setBusinessName(text)}
        value={businessName}
        placeholder="Business Name"
      />
			<Text style={textStyle}>
        Email
      </Text>
      <TextInput
        style={inputField}
        onChangeText={(text) => setBusinessEmail(text)}
        value={businessEmail}
        placeholder="Email"
      />
			<Text style={textStyle}>
        Phone Number
      </Text>
      <TextInput
        style={inputField}
        onChangeText={(num) => setBusinessNumber(num)}
        value={businessNumber}
        placeholder="Phone Number"
      />
			<Text style={textStyle}>
        Description
      </Text>
      <TextInput
        style={descriptionInputField}
        onChangeText={(text) => setBusinessDescription(text)}
        value={businessDescription}
				placeholder="Description"
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
    borderColor: 'gray',
    borderWidth: 2,
    width: '100%',
    borderRadius: 5,
  },
  inputFields: {
    width: '80%',
    backgroundColor: '#505950',
	},
	textStyle: {
		padding: 1,
	},
});

export default BusinessRegister;
