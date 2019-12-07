import React, { useState, useContext } from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  SafeAreaView
} from "react-native";

import BusinessContext from "../applicationState/BusinessContext";
import serverConfig from '../serverConfig';
const server = serverConfig().url;

export default function EditProfileModal(props) {
  const context = useContext(BusinessContext);
  const {
    id,
    name,
    email,
    phone,
    description,
    password,
  } = context.currentBusiness;

  // form state
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newPhone, setNewPhone] = useState(phone);
  const [newDescription, setNewDescription] = useState(description);

  const handleCancel = () => {
    props.closeModal(false);
  }

  const handleSubmit = () => {
    fetch(`${server}/users/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: context.accessToken
      },
      body: JSON.stringify({
        name: newName,
        description: newDescription,
        email: newEmail,
        phone: newPhone,
      })
    })
      .then((response) => response.json())
      .then(updatedBusiness => {
        // update current business
        context.setCurrentBusiness(updatedBusiness);
        // close modal
        handleCancel();
      })
      .catch(() => {
        console.log("something went wrong");
      })
  }

  const {
    container,
    textInput,
    descriptionInput,
  } = styles;

  const {
    visible,
  } = props;

  return (
    <Modal visible={visible} animationType="fade">
      <ScrollView
        contentContainerStyle={container}
        keyboardDismissMode="on-drag"
      >
        <Text>Update Business Information</Text>
        <TextInput
          placeholder="Name"
          value={newName}
          style={textInput}
          onChangeText={text => setNewName(text)}
          maxLength={20}
        />
        <TextInput
          placeholder="Email"
          value={newEmail}
          style={textInput}
          onChangeText={text => setNewEmail(text)}
        />
        <TextInput
          placeholder="Phone"
          value={newPhone}
          style={textInput}
          onChangeText={text => setNewPhone(text)}
        />
        <TextInput
          placeholder="Description"
          value={newDescription}
          style={descriptionInput}
          multiline={true}
          onChangeText={text => setNewDescription(text)}
        />
        <Button title="Submit" onPress={handleSubmit} />
        <Button title="cancel" color="red" onPress={handleCancel} />
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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