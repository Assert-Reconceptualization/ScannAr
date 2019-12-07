import React, { useState, useContext } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

import SignUp from "./buttons/SignUp";
import State from "../applicationState/BusinessContext";
import serverConfig from '../serverConfig';

export default function RegisterModal(props) {
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPassword, setBusinessPassword] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");

  const context = useContext(State);
  const server = serverConfig().url;

  const handleCancel = () => {
    props.cancelRegistration(false);
  };

  const handleRegister = () => {
    fetch(`${server}/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: businessName,
        phone: businessNumber,
        email: businessEmail,
        password: businessPassword,
        description: businessDescription
      })
    })
      .then((response) => response.json())
      .then(business => {
        if(business.id){
          props.handleSignIn(businessEmail, businessPassword);
        }
      })
      .catch((err) => {
        console.log("Unable to register", err)
      })
  };

  const {
    modalContainer,
    inputContainer,
    titleContainer,
    textInput,
    descriptionInput,
    inputHeader,
    buttonContainer,
    title
  } = styles;

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={modalContainer}>
        <SafeAreaView style={titleContainer}>
          <Text style={title}>Register Your Business</Text>
        </SafeAreaView>
        <ScrollView
          contentContainerStyle={inputContainer}
          keyboardDismissMode="on-drag"
        >
          <Text style={inputHeader}>Business Name</Text>
          <TextInput
            style={textInput}
            onChangeText={text => setBusinessName(text)}
            value={businessName}
            placeholder="Business Name"
            autoCapitalize="sentences"
          />
          <Text style={inputHeader}>Email</Text>
          <TextInput
            style={textInput}
            onChangeText={text => setBusinessEmail(text)}
            value={businessEmail}
            placeholder="Email"
            keyboardType="email-address"
          />
          <Text style={inputHeader}>Password</Text>
          <TextInput
            style={textInput}
            onChangeText={text => setBusinessPassword(text)}
            value={businessPassword}
            placeholder="Password"
            secureTextEntry
          />
          <Text style={inputHeader}>Phone Number</Text>
          <TextInput
            style={textInput}
            onChangeText={num => setBusinessNumber(num)}
            value={businessNumber}
            placeholder="Phone Number"
            keyboardType="phone-pad"
          />
          <Text style={inputHeader}>Description</Text>
          <TextInput
            style={descriptionInput}
            multiline={true}
            onChangeText={text => setBusinessDescription(text)}
            value={businessDescription}
            placeholder="Description"
          />
        </ScrollView>
        <View style={buttonContainer}>
          <TouchableOpacity onPress={handleRegister}>
            <Text>Register</Text>
          </TouchableOpacity>
          <Button title="cancel" onPress={handleCancel} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingTop: "20%"
  },
  titleContainer: {
    flex: 1,
    padding: "5%",
    alignItems: "center"
  },
  inputContainer: {
    flexGrow: 1,
    alignItems: "center"
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    width: "70%",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    fontSize: 25,
    marginBottom: 20,
    paddingLeft: 5
  },
  title: {
    fontSize: 30
  },
  inputHeader: {
    width: "70%",
    paddingLeft: 5,
    fontSize: 15
  },
  descriptionInput: {
    width: "70%",
    borderWidth: 2,
    height: 200,
    borderColor: "black",
    borderRadius: 5,
    fontSize: 25,
    marginBottom: 20,
    paddingLeft: 5
  }
});
