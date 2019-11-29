import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ProductCard(props){
  const { container, image, productDescription, productPrice, productTitle } = styles;
  const { name, imageUrl, description, price } = props.product;
  return (
    <View style={container}>
      <Image style={image} source={{ uri: imageUrl }}/>
      <View>
        <Text style={productTitle}>{name}</Text>
        <Text style={productDescription}>{description}</Text>
        <Text style={productPrice}>{`$${price}.00`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems: 'center',
    marginLeft: '5%',
    marginRight: '5%',
    height: 116,
    borderColor: '#AEC3B0',
    borderWidth: 3,
    borderRadius: 5,
    marginBottom: 10
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  productDescription: {
    fontSize: 12,
    color: '#99AC9B',
    marginBottom: 6,
  },
  productPrice: {
    marginTop: 5,
    fontSize: 20,
    color: '#C4D2C5',
  },
  productTitle: {
    fontSize: 25,
    color: '#EFF6E0',
    fontWeight: 'bold',
    marginBottom: 7,
  },
});