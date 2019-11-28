/* eslint-disable react/prop-types */
import React from 'react';
import {
  View, Modal, Text, Button, Image, StyleSheet,
} from 'react-native';

// import components
import ProductProfileNavBar from '../NavBar/ProductProfileNavBar';

const ProductProfileModal = ({ visible, setVisibility, product }) => {
  const {
    listItemContainer, image, productPrice, productTitle, productDescription, nameAndPrice, description, businessName,
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
        <Text style={productTitle}>{product.name}</Text>
        <Image
          source={{ uri: (product.url) }}
          style={image}
        />
        <View>
          <View style={nameAndPrice}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={productDescription}>By </Text>
              <Text style={businessName}>{'Some Business'}</Text>
            </View>
            <Text style={productPrice}>{`$${product.price}.00`}</Text>
          </View>
          <View style={description}>
            <Text style={productDescription}>{product.description}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  productTitle: {
    fontSize: 30,
    color: '#B3C6CD',
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 10,
  },
  productMenu: {
    position: 'absolute',
    top: 0,
    right: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#B3C6CD',
    marginBottom: 6,
  },
  businessName: {
    fontSize: 15,
    color: '#B3C6CD',
    marginBottom: 6,
    textDecorationLine: 'underline',
  },
  productPrice: {
    fontSize: 30,
    color: 'white',
  },
  listItemContainer: {
    flex: 1,
    backgroundColor: '#082A36',
  },
  image: {
    height: 350,
    width: 300,
    borderRadius: 5,
    margin: 10,
    alignSelf: 'center',
  },
  nameAndPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
  },
  description: {
    marginTop: 20,
    marginLeft: 15,
    justifyContent: 'flex-start',
  },
});

export default ProductProfileModal;
