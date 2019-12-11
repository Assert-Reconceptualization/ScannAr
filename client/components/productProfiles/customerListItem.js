/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

import CustomerContext from '../../applicationState/customerContext';

const trash = require('../../assets/icons/trash.png');

const CustomerListItem = ({
  name,
  uri,
  description,
  price,
  setModalProp,
  item,
}) => {
  const {
    productTitle,
    listItemContainer,
    image,
    productDescription,
    productPrice,
    productMenu,
    informationContainer,
    deleteButton,
    deleteButtonView,
    // eslint-disable-next-line no-use-before-define
  } = styles;
  const context = useContext(CustomerContext);
  const { setCurrentSavedList, serverUrl, currentUser } = context;

  // Retrieves all current user's saved products
  const getSavedProducts = () => (
    fetch(`${serverUrl}/savedProducts?idUser=${currentUser.id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((savedList) => {
        setCurrentSavedList(savedList);
      })
  );

  // Deletes the current product from the current user's savedProducts
  const handleDelete = () => {
    fetch(`${serverUrl}/savedProducts?idUser=${currentUser.id}&idProduct=${item.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => getSavedProducts());
  };

  const handleAlert = () => {
    Alert.alert(
      'Delete Saved Product',
      'Are you sure you want to delete?',
      [
        {
          text: 'Cancel',
          onPress: () => '',
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => handleDelete() },
      ],
      { cancelable: false },
    );
  };

  return (
    <TouchableOpacity
      onPress={() => setModalProp(item)}
    >
      <View
        style={listItemContainer}
      >
        <Image
          source={{ uri }}
          style={image}
        />
        <View style={informationContainer}>
          <View>
            <Text
              style={productTitle}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {name}
            </Text>
          </View>
          <Text style={productDescription}>{description}</Text>
          <Text style={productPrice}>{`$${price}.00`}</Text>
        </View>
        <View style={productMenu}>
          <TouchableOpacity
            onPress={() => setModalProp(item)}
            style={{ width: 30, alignItems: 'flex-end' }} // touch area
          >
            <Text style={productTitle}>...</Text>
          </TouchableOpacity>
        </View>
        <View style={deleteButtonView}>
          <TouchableOpacity
            onPress={handleAlert}
            style={{ width: 30, alignItems: 'flex-end' }} // touch area
          >
            <Text style={deleteButton}>x</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productTitle: {
    fontSize: 20,
    color: '#B3C6CD',
    fontWeight: 'bold',
    marginBottom: 5,
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
    height: 116,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#B3C6CD',
    borderWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#072633',
  },
  informationContainer: {
    flex: 1,
    paddingRight: 50,
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  deleteButton: {
    fontSize: 24,
    color: 'red',
  },
  deleteButtonView: {
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
});

export default CustomerListItem;
