import React, { useState, useContext } from 'react';
import { Modal, Text, Button, StyleSheet, View, TextInput, Image } from 'react-native';
import BusinessContext from "../applicationState/BusinessContext";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default function NewProductModal(props){
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [price, setPrice] = useState("");
  const context = useContext(BusinessContext);

  const handleSubmit = () => {
    // make request to server POST
    props.setCreating(false);
    // link back to HomeScreen
    props.navigation.navigate({routeName: 'Home'});
  }

  const handleCamera = async () => {
    const permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let image = await ImagePicker.launchImageLibraryAsync({base64: true});

    // uncomment when using real phone
    // const permission = await Permissions.askAsync(Permissions.CAMERA);
    // let image = await ImagePicker.launchCameraAsync();

    if(!image.cancelled){
      const file = image.base64
      // upload image to firebase
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
        .catch(err => {console.log("Try uploading again!")})
    }
  }

  const { container, image, photoContainer } = styles;

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={ container }>
        <Text>Create AR product!</Text>
        <View style={photoContainer}>
          
          {imageUrl ? <Image style={image} source={{uri: imageUrl}} /> : <Button title="Take a Picture!" onPress={handleCamera} />}
          <TextInput placeholder="Name"/>
        </View>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
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
    height: 90,
    width: 90,
    borderRadius: 5
  },
  photoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});