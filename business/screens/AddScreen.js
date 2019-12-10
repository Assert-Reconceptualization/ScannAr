/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState, useContext } from 'react';
import {
  Button,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  ScrollView,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import BusinessContext from '../applicationState/BusinessContext';
import serverConfig from '../serverConfig';
import TagPicker from '../components/TagPicker';

const server = serverConfig().url;
const backgroundUrl = require('../assets/images/business-bg.png');

export default function AddScreen(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [price, setPrice] = useState(null);
  const context = useContext(BusinessContext);
  const [spinner, setSpinner] = useState(false);
  const [currentTag, setCurrentTag] = useState('default');

  const handleSubmit = () => {
    // make request to server POST
    fetch(`${server}/products`, {
      method: 'POST',
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
        idBusiness: context.currentBusiness.id,
      }),
    })
      .then((response) => response.json())
      .then((newProduct) => {
        // save product tag
        if (currentTag.name !== 'default') {
          saveProductTags(newProduct.id, currentTag);
        }
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
            // go back to home screen
            Alert.alert(
              'Success!',
              'Product added to inventory',
            );
            props.navigation.navigate({ routeName: 'Home' });
          });
      })
      .catch(() => {
        console.log('something went wrong');
      });
  };

  const saveProductTags = (productId, tagName) => {
    // grab tag id
    const { id } = context.tags.filter((tag) => tag.name === tagName)[0];
    console.log(productId, id);
    fetch(`${server}/productTags?idProduct=${productId}&idTag=${id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: context.accessToken,
      },
    })
      .catch((err) => console.log(err));
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
      fetch('https://us-central1-scannar-260417.cloudfunctions.net/storeImage', {
        method: 'POST',
        body: JSON.stringify({
          image: file,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setImageUrl(result.imageUrl);
        })
        .then(() => setSpinner(false))
        .catch(() => {
          Alert.alert(
            'Error',
            'Try uploading another picture',
          );
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

  const resetScreenState = () => {
    setName('');
    setDescription('');
    setImageUrl(null);
    setPrice('');
    setSpinner(false);
  };

  const {
    container,
    image,
    photoContainer,
    textInput,
    descriptionInput,
    buttonContainer,
    buttonText,
    submitButtonContainer,
    cancelButtonContainer,
  } = styles;

  const imageText = spinner ? <ActivityIndicator size="small" color="white" /> : (
    <Button
      title="Take a Picture!"
      onPress={cameraAlert}
      color="#EFF6E0"
    />
  );

  return (
    <ImageBackground
      source={backgroundUrl}
      style={{ width: '100%', height: '100%', backgroundColor: '#3B423C' }}
    >
      <ScrollView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
          <View style={container}>
            <View style={photoContainer}>
              {imageUrl ? (
                <Image
                  style={image}
                  source={{ uri: imageUrl }}
                />
              ) : (
                imageText
              )}
            </View>
            <TextInput
              placeholder="Name"
              placeholderTextColor="#EFF6E0"
              style={textInput}
              value={name}
              onChangeText={(text) => setName(text)}
              maxLength={20}
            />
            <TextInput
              placeholder="Price"
              placeholderTextColor="#EFF6E0"
              value={price}
              style={textInput}
              keyboardType="decimal-pad"
              onChangeText={(text) => setPrice(text)}
            />
            <TextInput
              placeholder="Description"
              placeholderTextColor="#EFF6E0"
              style={descriptionInput}
              value={description}
              multiline
              onChangeText={(text) => setDescription(text)}
            />
            <TagPicker
              currentTag={currentTag}
              setCurrentTag={setCurrentTag}
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
                  onPress={resetScreenState}
                >
                  <Ionicons name="ios-backspace" size={30} color="#AEC3B0" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </ImageBackground>
  );
}

AddScreen.navigationOptions = {
  title: 'Add A Product',
  headerStyle: {
    backgroundColor: '#505950',
  },
  headerTintColor: 'white',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  formContainer: {
    flex: 8,
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
    borderColor: '#AEC3B0',
    backgroundColor: '#1E241F',
  },
  textInput: {
    width: '70%',
    borderWidth: 2,
    borderColor: '#AEC3B0',
    backgroundColor: '#1E241F',
    borderRadius: 5,
    fontSize: 25,
    marginBottom: 20,
    paddingLeft: 5,
    color: '#EFF6E0',
  },
  descriptionInput: {
    width: '70%',
    borderWidth: 2,
    height: 100,
    borderColor: '#AEC3B0',
    backgroundColor: '#1E241F',
    borderRadius: 5,
    fontSize: 25,
    paddingLeft: 5,
    color: '#EFF6E0',
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
