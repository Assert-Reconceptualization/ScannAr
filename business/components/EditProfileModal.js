/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import {
  Modal,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import BusinessContext from '../applicationState/BusinessContext';
import serverConfig from '../serverConfig';

const backgroundImagePath = require('../assets/images/business-bg.png');

const server = serverConfig().url;

export default function EditProfileModal(props) {
  const context = useContext(BusinessContext);
  const {
    id,
    name,
    email,
    phone,
    description,
  // eslint-disable-next-line react/destructuring-assignment
  } = context.currentBusiness;

  // form state
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newPhone, setNewPhone] = useState(phone);
  const [newDescription, setNewDescription] = useState(description);

  const handleCancel = () => {
    props.closeModal(false);
  };

  const handleSubmit = () => {
    fetch(`${server}/users/${id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: context.accessToken,
      },
      body: JSON.stringify({
        name: newName,
        description: newDescription,
        email: newEmail,
        phone: newPhone,
      }),
    })
      .then((response) => response.json())
      .then((updatedBusiness) => {
        // update current business
        context.setCurrentBusiness(updatedBusiness);
        // close modal
        handleCancel();
      })
      .catch(() => {
        console.log('something went wrong');
      });
  };

  const {
    container,
    textInput,
    descriptionInput,
    buttonCancel,
    buttonRegister,
    buttonContainer,
  } = styles;

  const {
    visible,
  } = props;

  return (
    <Modal visible={visible} animationType="fade">
      <ImageBackground
        source={backgroundImagePath}
        style={{ width: '100%', height: '100%', backgroundColor: '#3B423C' }}
      >
        <ScrollView
          contentContainerStyle={container}
          keyboardDismissMode="on-drag"
        >
          <Text>Update Business Information</Text>
          <TextInput
            placeholder="Name"
            value={newName}
            style={textInput}
            onChangeText={(text) => setNewName(text)}
            maxLength={20}
          />
          <TextInput
            placeholder="Email"
            value={newEmail}
            style={textInput}
            onChangeText={(text) => setNewEmail(text)}
          />
          <TextInput
            placeholder="Phone"
            value={newPhone}
            style={textInput}
            onChangeText={(text) => setNewPhone(text)}
          />
          <TextInput
            placeholder="Description"
            value={newDescription}
            style={descriptionInput}
            multiline
            onChangeText={(text) => setNewDescription(text)}
          />
          <SafeAreaView style={buttonContainer}>
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={buttonRegister}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={buttonCancel}>cancel</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '70%',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    fontSize: 25,
    marginBottom: 20,
    paddingLeft: 5,
  },
  descriptionInput: {
    width: '70%',
    borderWidth: 2,
    height: 200,
    borderColor: 'black',
    borderRadius: 5,
    fontSize: 25,
    marginBottom: 15,
    paddingLeft: 5,
  },
  buttonCancel: {
    fontSize: 35,
    flexDirection: 'row',
    color: 'white',
    backgroundColor: '#ff2200',
  },
  buttonRegister: {
    fontSize: 35,
    flexDirection: 'row',
    color: 'white',
    backgroundColor: '#339900',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
