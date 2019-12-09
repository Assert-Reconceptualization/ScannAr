/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import BusinessContext from '../applicationState/BusinessContext';
import serverConfig from '../serverConfig';

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

  const imageText = spinner ? (
    <ActivityIndicator size="small" color="black" />
  ) : (
    <Button title="Take a Picture!" onPress={cameraAlert} />
  );

  const {
    container,
    photoContainer,
    image,
    textInput,
    descriptionInput,
  } = styles;

  return (
    <Modal visible={visible} animationType="fade">
      <View style={container}>
        <Text>Update Product information</Text>
        <View style={photoContainer}>
          <Image
            style={image}
            source={{ uri: imageUrl }}
          />
        </View>
        <Button
          title="Change Photo"
          onPress={handleCamera}
        />
        <TextInput
          placeholder="Name"
          value={name}
          style={textInput}
          onChangeText={(text) => setName(text)}
          maxLength={20}
        />
        <TextInput
          style={textInput}
          keyboardType="decimal-pad"
          value={price.toString()}
          onChangeText={(text) => setPrice(text)}
        />
        <TextInput
          placeholder="Description"
          value={description}
          style={descriptionInput}
          multiline
          onChangeText={(text) => setDescription(text)}
        />
        <Button
          title="Submit"
          onPress={handleSubmit}
        />
        <Button
          title="cancel"
          color="red"
          onPress={handleCancel}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 114,
    height: 114,
    borderRadius: 5,
  },
  photoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 116,
    height: 116,
    borderRadius: 5,
    borderWidth: 3,
    marginBottom: 20,
    marginTop: 20,
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
    marginBottom: 20,
    paddingLeft: 5,
  },
});
