/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react';
import {
  View, Modal, Text, Image, StyleSheet, Button,
} from 'react-native';

// import components
import ProductProfileNavBar from '../NavBar/ProductProfileNavBar';
import CustomerContext from '../../applicationState/customerContext';

const ProductProfileModal = ({ visible, setVisibility, product }) => {
  const [isSaved, setSaved] = useState(false);
  const [saveUpdated, setSaveUpdated] = useState(false);
  const context = useContext(CustomerContext);
  const { serverUrl, currentSavedList, allMarkers, currentUser, setCurrentSavedList } = context;
  const {
    listItemContainer,
    image,
    productPrice,
    productTitle,
    productDescription,
    nameAndPrice,
    description,
    businessName,
  } = styles;

  const getSavedProducts = () => {
    return fetch(`${serverUrl}/savedProducts?idUser=${currentUser.id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((savedList) => {
        setCurrentSavedList(savedList);
        setVisibility(false);
      })
      .catch(() => console.log('something happend'));
  };

  // Saves product to users savedProducts list
  const handleSaveProduct = () => {
    fetch(`${serverUrl}/savedProducts?idUser=${context.currentUser.id}&idProduct=${product.id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        // update saved products list with another fetch
        getSavedProducts();
      })
      .then(() => setVisibility(false))
      .catch(() => console.log('something happened'));
  };

  // Deletes the current product from the current user's savedProducts
  const handleDelete = () => {
    fetch(`${serverUrl}/savedProducts?idUser=${currentUser.id}&idProduct=${product.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .catch(() => console.log('something went wrong'));
  };

  // conditional rendering of save or delete
  const saveOrDelete = () => {
    if (isSaved === false) {
      return (<Button title="Save" onPress={handleSaveProduct} />);
    }
    return (<Button title="Delete" onPress={handleDelete} />);
  };

  // If modal is visible, check if item is saved and setSaveUpdated to true so this doesn't keep happening
  if (visible && saveUpdated === false) {
    setSaveUpdated(true);
    currentSavedList.forEach((savedItem) => {
      if (savedItem.id === product.id) { // if this product is in currentSavedList
        setSaved(true);
      }
    });
  }

  // When the modal is hidden, reset saveUpdated to false
  if (!visible && saveUpdated) {
    setSaveUpdated(false);
  }

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
        {saveOrDelete()}
        <Image
          source={{ uri: (product.imageUrl) }}
          style={image}
        />
        <View>
          <View style={nameAndPrice}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={productDescription}>By </Text>
              <Text style={businessName}>{product.businessName || 'Some Business'}</Text>
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
