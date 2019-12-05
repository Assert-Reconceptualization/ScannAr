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
} from 'react-native';

import BusinessContext from "../applicationState/BusinessContext";
import serverConfig from '../serverConfig';
const server = serverConfig().url;

export default function EditProductModal(props){

  const context = useContext(BusinessContext);

  // grab current product states
  const [imageUrl, setImageUrl] = useState(props.product.imageUrl);
  const [name, setName] = useState(props.product.name);
  const [price, setPrice] = useState(props.product.price);
  const [description, setDescription] = useState(props.product.description);

  const handleCancel = () => {
    props.closeModal(false);
  }

  const handleSubmit = () => {
    // make request to server POST
    fetch(`${server}/products/${props.product.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        description,
        price,
        imageUrl,
      })
    })
      .then(() => {
        // refresh inventory
        fetch(`${server}/products?idBusiness=${context.currentBusiness.id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
        })
          .then(response => response.json())
          .then(products => {
            //update current inventory if there are products
            if(products.data){
              context.setCurrentInventory(products.data)
            }
            // close modal
            props.closeModal(false);
            // go back to home screen
            props.navigation.navigate({routeName: 'Home'});
          })
      })
      .catch(() => {
        console.log("something went wrong");
      })
  }

  const handleCamera = async () => {
    // get permission to use camera
    const permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // open camera
    let image = await ImagePicker.launchImageLibraryAsync({base64: true});

    // uncomment when using real phone
    // const permission = await Permissions.askAsync(Permissions.CAMERA);
    // let image = await ImagePicker.launchCameraAsync();

    // upload image to firebase if user doesnt cancel
    if(!image.cancelled){
      // extract base64 image data
      const file = image.base64
      // make request to cloud function
      fetch("https://us-central1-scannar-260417.cloudfunctions.net/storeImage", {
        method: "POST",
        body: JSON.stringify({
          image: file
        })
      })
        .then(res => res.json())
        .then(result => {
          setImageUrl(result.imageUrl);
        })
        // TODO - message user to try again
        .catch(err => {console.log("Try uploading again!")})
    }
  }

  const {
    container,
    photoContainer,
    image,
    textInput,
    descriptionInput
  } = styles;
  return (
    <Modal visible={props.visible} animationType="fade">
      <View style={container}>
        <Text>Update Product information</Text>
        <View style={photoContainer}> 
          <Image
            style={image}
            source={{uri: imageUrl}}
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
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={textInput}
          keyboardType="decimal-pad"
          value={price.toString()}
          onChangeText={text => setPrice(text)}
        />
        <TextInput
          placeholder="Description"
          value={description}
          style={descriptionInput}
          multiline={true}
          onChangeText={text => setDescription(text)}
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
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 114,
    height: 114,
    borderRadius: 5
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