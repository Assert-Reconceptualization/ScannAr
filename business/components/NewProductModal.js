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
} from 'react-native';
import BusinessContext from "../applicationState/BusinessContext";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default function NewProductModal(props){
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [price, setPrice] = useState("");
  const context = useContext(BusinessContext);
  const [spinner, setSpinner] = useState(false);

  const handleCancel = () => {
    // close modal
    resetModalState();
    props.setCreating(false);
  }

  const handleSubmit = () => {

    // make request to server POST
    fetch("http://scannar-server-second.appspot.com/products", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        description,
        price,
        imageUrl,
        idBusiness: context.currentBusiness.id
      })
    })
      .then(() => {
        // refresh inventory
        fetch(`http://scannar-server-second.appspot.com/products?idBusiness=${context.currentBusiness.id}`, {
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
            // reset modal state
            resetModalState();
            // close modal
            props.setCreating(false);
            // go back to home screen
            props.navigation.navigate({routeName: 'Home'});
          })
      })
      .catch(() => {
        console.log("something went wrong");
      })
  }

  const handleCamera = async () => {
    setSpinner(true); // turn spinner on
    // get permission to use camera
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // // open camera
    // let image = await ImagePicker.launchImageLibraryAsync({base64: true});

    // uncomment when using real phone
    const permission = await Permissions.askAsync(Permissions.CAMERA);
    let image = await ImagePicker.launchCameraAsync({base64: true});

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
        .then(() => setSpinner(false)) // turn spinner off
        // TODO - message user to try again
        .catch(err => {console.log("Try uploading again!")})
    }
  }

  const resetModalState = () => {
    setName("");
    setDescription("");
    setImageUrl(null);
    setPrice("");
  }

  const {
    container,
    image,
    photoContainer,
    textInput,
    descriptionInput
  } = styles;

  let imageText = spinner ? <ActivityIndicator size="small" color="black" /> : <Button
    title={"Take a Picture!"}
    onPress={handleCamera}
  />;

  return (
    <Modal visible={props.visible} animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={ container }>
          <Text>Create AR product!</Text>
          <View style={photoContainer}> 
            {imageUrl ? (
              <Image
                style={image}
                source={{uri: imageUrl}}
              />
            ) : (
              imageText
            )}
          </View>
          <TextInput
            placeholder="Name"
            style={textInput}
            onChangeText={text => setName(text)}
          />
          <TextInput
            placeholder="Price"
            style={textInput}
            keyboardType="decimal-pad"
            onChangeText={text => setPrice(text)}
          />
          <TextInput
            placeholder="Description"
            style={descriptionInput}
            multiline={true}
            onChangeText={text => setDescription(text)}
          />
          <Button
            title="Submit"
            onPress={handleSubmit} 
          />
          <Button 
            title="Cancel"
            onPress={handleCancel}
            color="red"
          />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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