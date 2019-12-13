/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import {
  Modal,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  View,
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
    cancelButtonContainer,
    buttonRegister,
    buttonContainer,
    titleText,
    inputHeader,
    inputContainer,
    modalContainer,
    submitButtonContainer,
  } = styles;

  const {
    visible,
  } = props;

  return (
    <Modal visible={visible} animationType="fade">
      <View style={modalContainer}>
        <ImageBackground
          source={backgroundImagePath}
          style={{ width: '100%', height: '100%', backgroundColor: '#3B423C' }}
        >
          <ScrollView
            keyboardDismissMode="on-drag"
            contentContainerStyle={inputContainer}
          >
            <View style={container}>
              <Text style={titleText}>Update Business Information</Text>
              <Text style={inputHeader}>Business Name</Text>
              <TextInput
                placeholder="Name"
                value={newName}
                style={textInput}
                onChangeText={(text) => setNewName(text)}
                maxLength={20}
              />
              <Text style={inputHeader}>Email</Text>
              <TextInput
                placeholder="Email"
                value={newEmail}
                style={textInput}
                onChangeText={(text) => setNewEmail(text)}
              />
              <Text style={inputHeader}>Phone Number</Text>
              <TextInput
                placeholder="Phone"
                value={newPhone}
                style={textInput}
                onChangeText={(text) => setNewPhone(text)}
              />
              <Text style={inputHeader}>Description</Text>
              <TextInput
                placeholder="Description"
                value={newDescription}
                style={descriptionInput}
                multiline
                onChangeText={(text) => setNewDescription(text)}
              />
              <View style={buttonContainer}>
                <TouchableOpacity onPress={handleSubmit} style={submitButtonContainer}>
                  <Text style={buttonRegister}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancel} style={cancelButtonContainer}>
                  <FontAwesome name="remove" size={35} color="#EFF6E0" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingBottom: 50,
    alignItems: 'center',
    width: '100%',
  },
  titleText: {
    fontSize: 30,
    paddingTop: 70,
    color: '#AEC3B0',
    paddingBottom: 70,
    justifyContent: 'center',
    marginTop: 5,
  },
  inputHeader: {
    width: '70%',
    paddingLeft: 2,
    fontSize: 20,
    alignItems: 'center',
    color: '#EFF6E0',
  },
  textInput: {
    width: '70%',
    backgroundColor: '#1E241F',
    borderWidth: 2,
    borderColor: '#AEC3B0',
    borderRadius: 5,
    fontSize: 18,
    justifyContent: 'center',
    marginBottom: 20,
    paddingLeft: 5,
    color: '#AEC3B0',
  },
  submitButtonContainer: {
    padding: 5,
    width: 200,
    backgroundColor: '#AEC3B0',
    alignItems: 'center',
    borderColor: '#AEC3B0',
    borderRadius: 5,
    borderWidth: 2,
  },
  descriptionInput: {
    width: '70%',
    borderWidth: 2,
    height: 150,
    backgroundColor: '#1E241F',
    borderColor: '#AEC3B0',
    borderRadius: 5,
    fontSize: 25,
    marginBottom: 15,
    justifyContent: 'center',
    paddingLeft: 5,
    color: '#AEC3B0',
  },
  buttonRegister: {
    color: '#1E241F',
    fontSize: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    marginLeft: 20,
  },
});
