/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import BusinessContext from '../applicationState/BusinessContext';
import serverConfig from '../serverConfig';

const backgroundImagePath = require('../assets/images/business-bg.png');

const server = serverConfig().url;

export default function EditProductModal(props) {
  const context = useContext(BusinessContext);
  const { product, visible } = props;

  // grab current product states
  const [imageUrl, setImageUrl] = useState(product.imageUrl);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [spinner, setSpinner] = useState(false);

  const handleCancel = () => {
    props.closeModal(false);
    setImageUrl(product.imageUrl);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
  };

  const handleSubmit = () => {
    // make request to server POST
    fetch(`${server}/products/${product.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: context.accessToken,
      },
      body: JSON.stringify({
        name,
        description,
        price,
        imageUrl,
      }),
    })
      .then(() => {
        // refresh inventory
        fetch(`${server}/products?idBusiness=${context.currentBusiness.id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((products) => {
            // update current inventory if there are products
            if (products.data) {
              context.setCurrentInventory(products.data);
            }
            // close modal
            props.closeModal(false);
            // go back to home screen
            props.navigation.navigate({ routeName: 'Home' });
          });
      })
      .catch(() => {
        // console.log('something went wrong');
      });
  };

  const handleCamera = async (type) => {
    setSpinner(true); // turn spinner on

    // get permission to use camera and library
    const permissionCameraRoll = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
    );
    const permissionCamera = await Permissions.askAsync(Permissions.CAMERA);

    let image;
    if (type === 'camera') {
      image = await ImagePicker.launchCameraAsync({ base64: true });
    } else {
      image = await ImagePicker.launchImageLibraryAsync({ base64: true });
    }

    // upload image to firebase if user doesnt cancel
    if (!image.cancelled) {
      // extract base64 image data
      const file = image.base64;
      // make request to cloud function
      fetch(
        'https://us-central1-scannar-260417.cloudfunctions.net/storeImage',
        {
          method: 'POST',
          body: JSON.stringify({
            image: file,
          }),
        },
      )
        .then((res) => res.json())
        .then((result) => {
          setImageUrl(result.imageUrl);
        })
        .then(() => setSpinner(false)) // turn spinner off
        .catch(() => {
          Alert.alert('Error', 'Try uploading another picture');
          setSpinner(false);
        });
    } else {
      setSpinner(false);
    }
  };

  const cameraAlert = async () => {
    Alert.alert(
      'Upload Photo',
      'Use photo from',
      [{
        text: 'Camera',
        onPress: async () => {
          handleCamera('camera');
        },
      },
      {
        text: 'Photo Gallery',
        onPress: async () => {
          handleCamera('gallery');
        },
      },
      ],
    );
  };

  const {
    container,
    photoContainer,
    image,
    textInput,
    descriptionInput,
    titleText,
    changeImageButton,
    changeButtonText,
    submitButtonContainer,
    cancelButtonContainer,
    buttonText,
    buttonContainer,
  } = styles;

  const imageText = spinner ? (
    <ActivityIndicator size="small" color="black" />
  ) : (
    <TouchableOpacity
      onPress={cameraAlert}
      style={changeImageButton}
    >
      <Text style={changeButtonText}>change photo</Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="fade">
      <ImageBackground
        source={backgroundImagePath}
        style={{ width: '100%', height: '100%', backgroundColor: '#3B423C' }}
      >
        <ScrollView contentContainerStyle={container}>
          <Text style={titleText}>Update product information</Text>
          <View style={photoContainer}>
            <Image style={image} source={{ uri: imageUrl }} />
          </View>
          {imageText}
          <TextInput
            placeholder="Name"
            placeholderTextColor="#AEC3B0"
            value={name}
            style={textInput}
            onChangeText={(text) => setName(text)}
            maxLength={20}
          />
          <TextInput
            style={textInput}
            placeholder="Price"
            placeholderTextColor="#AEC3B0"
            keyboardType="decimal-pad"
            value={price.toString()}
            onChangeText={(text) => setPrice(text)}
          />
          <TextInput
            placeholder="Description"
            placeholderTextColor="#AEC3B0"
            value={description}
            style={descriptionInput}
            multiline
            onChangeText={(text) => setDescription(text)}
          />
          <View style={buttonContainer}>
            <View style={submitButtonContainer}>
              <TouchableOpacity
                onPress={handleSubmit}
              >
                <Text style={buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
            <View style={cancelButtonContainer}>
              <TouchableOpacity
                onPress={handleCancel}
              >
                <Ionicons
                  name="ios-backspace"
                  size={30}
                  color="#AEC3B0"
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 70,
  },
  image: {
    width: 247,
    height: 247,
    borderRadius: 5,
  },
  photoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    height: 250,
    borderRadius: 5,
    borderWidth: 3,
    marginTop: 20,
    borderColor: '#AEC3B0',
    backgroundColor: '#1E241F',
  },
  titleText: {
    fontSize: 30,
    color: '#AEC3B0',
  },
  changeImageButton: {
    backgroundColor: '#1E241F',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#AEC3B0',
    padding: 4,
  },
  changeButtonText: {
    color: '#EFF6E0',
    fontSize: 15,
  },
  textInput: {
    width: '70%',
    backgroundColor: '#1E241F',
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#AEC3B0',
    fontSize: 25,
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
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 5,
    color: '#AEC3B0',
  },
  buttonContainer: {
    width: 200,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#AEC3B0',
    borderRadius: 5,
    flexDirection: 'row',
  },
  buttonText: {
    color: '#EFF6E0',
    fontSize: 25,
  },
  submitButtonContainer: {
    padding: 5,
    flex: 1.3,
    backgroundColor: '#1E241F',
    alignItems: 'center',
  },
  cancelButtonContainer: {
    padding: 5,
    flex: 0.7,
    alignItems: 'center',
  },
});
