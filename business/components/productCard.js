import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProductCard(props){
  const { container } = styles;
  return (
    <View style={container}>
      <Text>Item to map</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: '5%',
    paddingRight: '5%'
  }
});