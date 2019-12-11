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
    buttonCancel,
    buttonRegister,
    buttonContainer,
    titleText,
    inputHeader,
    titleContainer,
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
          keyboardDismissMode="on-drag"
        >
          <View style={titleContainer}>
            <Text style={titleText}>Update Business Information</Text>
          </View>
          <View style={container}>
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
            <SafeAreaView style={buttonContainer}>
              <TouchableOpacity onPress={handleSubmit}>
                <Text style={buttonRegister}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancel}>
                <Text style={buttonCancel}>cancel</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </ScrollView>
      </ImageBackground>
    </Modal>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    paddingTop: 70,
    paddingBottom: 0,
    padding: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 5,
    alignItems: 'center',
    width: '100%',
  },
  titleText: {
    fontSize: 30,
    color: '#AEC3B0',
    marginBottom: 9,
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
    fontSize: 25,
    justifyContent: 'center',
    marginBottom: 20,
    paddingLeft: 5,
    color: '#AEC3B0',
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
