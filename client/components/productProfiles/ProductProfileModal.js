/* eslint-disable react/prop-types */
import React from 'react';
import {
  View, Modal, Text, Button, Image, StyleSheet,
} from 'react-native';

// import components
import ProductProfileNavBar from '../NavBar/ProductProfileNavBar';

const ProductProfileModal = ({ visible, setVisibility, product }) => {
  const {
    listItemContainer, image, productPrice, productTitle, productDescription,
  } = styles;

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
    >
      <View
        style={listItemContainer}
      >
        <ProductProfileNavBar setVisibility={setVisibility} />
        <Image
          source={{ uri: (product.url) }}
          style={image}
        />
        <View>
          <Text style={productTitle}>{product.name}</Text>
          <Text style={productDescription}>{product.description}</Text>
          <Text style={productPrice}>{`$${product.price}.00`}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  productTitle: {
    fontSize: 25,
    color: '#B3C6CD',
    fontWeight: 'bold',
    marginBottom: 7,
  },
  productMenu: {
    position: 'absolute',
    top: 0,
    right: 10,
  },
  productDescription: {
    fontSize: 12,
    color: '#B3C6CD',
    marginBottom: 6,
  },
  productPrice: {
    marginTop: 5,
    fontSize: 20,
    color: '#B3C6CD',
  },
  listItemContainer: {
    flex: 1,
    backgroundColor: '#082A36',
    alignItems: 'center',
  },
  image: {
    height: 350,
    width: 300,
    borderRadius: 5,
    margin: 10,
  },
});

export default ProductProfileModal;
