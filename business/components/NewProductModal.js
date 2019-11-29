import React, { useState, useContext } from 'react';
import { Modal, Text, Button, StyleSheet, View } from 'react-native';
import BusinessContext from "../applicationState/BusinessContext";

export default function NewProductModal(props){
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const context = useContext(BusinessContext);

  const handleSubmit = () => {
    // make request to server POST
    props.setCreating(false);
    // link back to HomeScreen
    props.navigation.navigate({routeName: 'Home'});
  }

  const { container } = styles;

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={ container }>
        <Text>Testing out this modal</Text>
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
  }
});