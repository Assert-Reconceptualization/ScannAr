/* eslint-disable react/prop-types */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const CustomerListItem = ({
  name,
  uri,
  description,
  price,
}) => {
  const {
    productTitle,
    listItemContainer,
    image,
    productDescription,
    productPrice,
    productMenu,
    // eslint-disable-next-line no-use-before-define
  } = styles;
  return (
    <View style={listItemContainer}>
      <Image
        source={{ uri }}
        style={image}
      />
      <View>
        <Text style={productTitle}>{name}</Text>
        <Text style={productDescription}>{description}</Text>
        <Text style={productPrice}>{`$${price}.00`}</Text>
      </View>
      <TouchableOpacity style={productMenu}>
        <Text style={productTitle}>...</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  productTitle: {
    fontSize: 28,
    color: '#B3C6CD',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productMenu: {
    position: 'absolute',
    top: 0,
    right: 10,
  },
  productDescription: {
    fontSize: 12,
    color: '#B3C6CD',
    marginBottom: 10,
  },
  productPrice: {
    marginTop: 15,
    fontSize: 30,
    color: '#B3C6CD',
  },
  listItemContainer: {
    height: 160,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#B3C6CD',
    borderWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 140,
    width: 100,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default CustomerListItem;
