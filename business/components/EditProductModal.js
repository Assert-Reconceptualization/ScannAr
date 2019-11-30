import React from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';

export default function EditProductModal(props){

  const handleCancel = () => {
    props.closeModal(false);
  }

  const {
    container,
  } = styles;
  return (
    <Modal visible={props.visible} animationType="fade">
      <View style={container}>
        <Text>Super cool modal</Text>
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
  }
});