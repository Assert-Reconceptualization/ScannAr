/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState, useContext } from 'react';
import {
  Modal,
  Text,
  Button,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import BusinessContext from '../applicationState/BusinessContext';
import serverConfig from '../serverConfig';
import TagPicker from './TagPicker';

const server = serverConfig().url;

export default function NewProductModal(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [price, setPrice] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [currentTag, setCurrentTag] = useState('default');

  const {
    setCreating,
    navigation,
    visible,
  } = props;
  const {
    currentBusiness,
    setCurrentInventory,
    accessToken,
    tags,
  } = useContext(BusinessContext);

  const handleCancel = () => {
    // close modal
    resetModalState();
    props.setCreating(false);
  };

  const handleSubmit = () => {
    // make request to server POST
    fetch(`${server}/products`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        name,
        description,
        price,
        imageUrl,
        idBusiness: currentBusiness.id,
      }),
    })
      .then((response) => response.json())
      .then((newProduct) => {
        // create new product tag
        if (currentTag.name !== 'default') {
          saveProductTags(newProduct.id, currentTag);
        }
        // refresh inventory
        fetch(`${server}/products?idBusiness=${currentBusiness.id}`, {
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
              setCurrentInventory(products.data);
            }
            Alert.alert(
              'Success!',
              'Product added to inventory',
              [{
                text: 'OK',
                onPress: () => {
                  resetModalState();
                  setCreating(false);
                },
              }],
            );
            navigation.navigate({ routeName: 'Home' });
          });
      })
      .catch(() => {
        Alert.alert(
          'Error',
          'Try Again',
        );
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

  const resetModalState = () => {
    setName('');
    setDescription('');
    setImageUrl(null);
    setPrice('');
  };

  const saveProductTags = (productId, tagName) => {
    // grab tag id
    const { id } = tags.filter((tag) => tag.name === tagName)[0];
    fetch(`${server}/productTags?idProduct=${productId}&idTag=${id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    })
      .catch(() => {
        Alert.alert('Error', 'Unable to create tag');
      });
  };

  const {
    container,
    image,
    photoContainer,
    textInput,
    descriptionInput,
  } = styles;

  const imageText = spinner ? (
    <ActivityIndicator size="small" color="black" />
  ) : (
    <Button title="Take a Picture!" onPress={cameraAlert} />
  );

  return (
    <Modal visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={container}>
          <Text>Create AR product!</Text>
          <View style={photoContainer}>
            {imageUrl ? (
              <Image style={image} source={{ uri: imageUrl }} />
            ) : (
              imageText
            )}
          </View>
          <TextInput
            placeholder="Name"
            style={textInput}
            onChangeText={(text) => setName(text)}
            maxLength={20}
          />
          <TextInput
            placeholder="Price"
            style={textInput}
            keyboardType="decimal-pad"
            onChangeText={(text) => setPrice(text)}
          />
          <TextInput
            placeholder="Description"
            style={descriptionInput}
            multiline
            onChangeText={(text) => setDescription(text)}
          />
          <TagPicker currentTag={currentTag} setCurrentTag={setCurrentTag} />
          <Button title="Submit" onPress={handleSubmit} />
          <Button title="Cancel" onPress={handleCancel} color="red" />
        </View>
      </TouchableWithoutFeedback>
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
