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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import BusinessContext from '../applicationState/BusinessContext';
import serverConfig from '../serverConfig';
import TagPicker from '../components/TagPicker';

const server = serverConfig().url;

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
  } = styles;

  const imageText = spinner ? <ActivityIndicator size="small" color="black" /> : (
    <Button
      title="Take a Picture!"
      onPress={cameraAlert}
    />
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            style={textInput}
            value={name}
            onChangeText={(text) => setName(text)}
            maxLength={20}
          />
          <TextInput
            placeholder="Price"
            value={price}
            style={textInput}
            keyboardType="decimal-pad"
            onChangeText={(text) => setPrice(text)}
          />
          <TextInput
            placeholder="Description"
            style={descriptionInput}
            value={description}
            multiline
            onChangeText={(text) => setDescription(text)}
          />
          <TagPicker
            currentTag={currentTag}
            setCurrentTag={setCurrentTag}
          />
          <Button
            title="Submit"
            onPress={handleSubmit}
          />
          <Button
            title="clear fields"
            onPress={resetScreenState}
            color="red"
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
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
    height: 100,
    borderColor: 'black',
    borderRadius: 5,
    fontSize: 25,
    paddingLeft: 5,
  },
});
