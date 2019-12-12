/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState, useContext, useEffect } from 'react';
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
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import BusinessContext from '../applicationState/BusinessContext';
import serverConfig from '../serverConfig';
import TagPicker from '../components/TagPicker';
import HomeScreenHeader from '../components/HomeScreenHeader';

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
            resetScreenState();
          });
      })
      .catch(() => {
        Alert.alert(
          'Hold On',
          'Please fill out all fields',
        );
      });
  };

  const saveProductTags = (productId, tagName) => {
    // grab tag id
    const { id } = context.tags.filter((tag) => tag.name === tagName)[0];
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
    inputContainer,
    textInput,
    descriptionInput,
    buttonContainer,
    buttonText,
    submitButtonContainer,
    cancelButtonContainer,
    noImageContainer,
    inputLabelText,
    tagContainer,
  } = styles;

  const imageText = spinner ? <ActivityIndicator size="small" color="white" /> : (
    <View style={noImageContainer}>
      <TouchableOpacity onPress={cameraAlert} style={{ alignItems: 'center' }}>
        <MaterialIcons name="add-a-photo" size={30} color="#EFF6E0" />
        <Text style={{ fontSize: 15, color: '#EFF6E0' }}>Take a picture!</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={backgroundUrl}
      style={{ width: '100%', height: '100%', backgroundColor: '#3B423C' }}
    >
      <ScrollView style={{ flex: 1 }}>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ flex: 1 }}
        >
          <View style={container}>
            <View style={photoContainer}>
              {imageUrl ? (
                <Image style={image} source={{ uri: imageUrl }} />
              ) : (
                imageText
              )}
            </View>
            <View style={inputContainer}>
              <Text style={inputLabelText}>Product Name</Text>
              <TextInput
                placeholder="Name"
                placeholderTextColor="#EFF6E0"
                style={textInput}
                value={name}
                onChangeText={(text) => setName(text)}
                maxLength={20}
              />
              <Text style={inputLabelText}>Price</Text>
              <TextInput
                placeholder="Price"
                placeholderTextColor="#EFF6E0"
                value={price}
                style={textInput}
                keyboardType="decimal-pad"
                onChangeText={(text) => setPrice(text)}
              />
              <Text style={inputLabelText}>Product Description</Text>
              <TextInput
                placeholder="Description"
                placeholderTextColor="#EFF6E0"
                style={descriptionInput}
                value={description}
                multiline
                onChangeText={(text) => setDescription(text)}
              />
            </View>
            <View style={tagContainer}>
              <TagPicker
                currentTag={currentTag}
                setCurrentTag={setCurrentTag}
              />
            </View>
            <View style={buttonContainer}>
              <TouchableOpacity onPress={handleSubmit} style={submitButtonContainer}>
                <Text style={buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={cancelButtonContainer}
                onPress={resetScreenState}
              >
                <FontAwesome name="trash-o" size={25} color="#EFF6E0" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </ImageBackground>
  );
}

AddScreen.navigationOptions = {
  headerTitle: () => <HomeScreenHeader />,
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
  noImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 20,
    marginTop: 20,
    borderColor: '#AEC3B0',
    backgroundColor: '#1E241F',
  },
  inputContainer: {
    width: '70%',
  },
  tagContainer: {
    width: '70%',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#AEC3B0',
    backgroundColor: '#1E241F',
  },
  textInput: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#AEC3B0',
    backgroundColor: '#1E241F',
    borderRadius: 5,
    fontSize: 25,
    marginBottom: 10,
    paddingLeft: 5,
    color: '#EFF6E0',
  },
  inputLabelText: {
    paddingLeft: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#EFF6E0',
  },
  descriptionInput: {
    width: '100%',
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
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    color: '#1E241F',
    fontSize: 25,
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
  cancelButtonContainer: {
    justifyContent: 'center',
    backgroundColor: '#1E241F',
    alignItems: 'center',
    borderColor: '#AEC3B0',
    borderRadius: 5,
    borderWidth: 2,
    width: 60,
    marginLeft: 20,
  },
});
