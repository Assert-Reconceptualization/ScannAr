import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity
} from "react-native";

import SignUp from "./buttons/SignUp";

export default function RegisterModal(props) {
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");

  const handleCancel = () => {
    props.cancelRegistration(false);
  };

  const handleRegister = () => {
    fetch("http://localhost:3030/business", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: businessName,
        phone: businessNumber,
        email: businessEmail,
        description: businessDescription
      })
    })
      .then(response => {
        // update user state will all relevent info
        // token
        // business data
        console.log("created");
        props.navigation.navigate({routeName: 'Home'});

      })
      .catch(error => {
        console.log(error);
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={modalContainer}>
          <View style={titleContainer}>
            <Text style={title}>Register Your Business</Text>
          </View>
          <View style={inputContainer}>
            <Text style={inputHeader}>Business Name</Text>
            <TextInput
              style={textInput}
              onChangeText={text => setBusinessName(text)}
              value={businessName}
              placeholder="Business Name"
            />
            <Text style={inputHeader}>Email</Text>
            <TextInput
              style={textInput}
              onChangeText={text => setBusinessEmail(text)}
              value={businessEmail}
              placeholder="Email"
            />
            <Text style={inputHeader}>Phone Number</Text>
            <TextInput
              style={textInput}
              onChangeText={num => setBusinessNumber(num)}
              value={businessNumber}
              placeholder="Phone Number"
            />
            <Text style={inputHeader}>Description</Text>
            <TextInput
              style={descriptionInput}
              multiline={true}
              onChangeText={text => setBusinessDescription(text)}
              value={businessDescription}
              placeholder="Description"
            />
          </View>
          <View style={buttonContainer}>
            <TouchableOpacity onPress={handleRegister}>
              <SignUp />
            </TouchableOpacity>
            <Button title="cancel" onPress={handleCancel} />
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    flex: 5,
    alignItems: "center"
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center"
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
