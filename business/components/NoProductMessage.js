import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function NoProductMessage(){
  const { container, message1, message2, addButton } = styles;
  return (
    <View style={container}>
      <Ionicons name="ios-camera" size={70} color="#AEC3B0"/>
      <Text
        style={message1}
      >
        You have no products listed...
      </Text>
      <Text
        style={message2}
      >
        Start adding products
      </Text>
      <Text
        style={message2}
      >
        for customers to scan
      </Text>
      <TouchableOpacity style={addButton}>
        <Ionicons name="ios-add-circle" size={70} color="#AEC3B0"/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "30%",
    alignItems: 'center'
  },
  message1: {
    color: '#AEC3B0',
    fontSize: 20,
    marginTop: '5%',
    marginBottom: '5%'
  },
  message2: {
    color: '#AEC3B0',
    fontSize: 20
  },
  addButton: {
    position: 'absolute',
    bottom: '10%',
    right: '10%'
  }
});