import React from 'react';
import {Modal, View, Text, Button, StyleSheet} from 'react-native';
import SignUp from './buttons/SignUp';

export default function RegisterModal(props){

  const handleCancel = () => {
    props.cancelRegistration(false);
  }

  const { inputContainer } = styles;

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={inputContainer}>
        <Text>Register Your Business</Text>
        <SignUp navigation={props.navigation}/>
        <Button title='cancel' onPress={handleCancel} />
      </View>
    </Modal>

  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});