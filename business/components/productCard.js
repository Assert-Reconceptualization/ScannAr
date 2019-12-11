/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import BusinessContext from '../applicationState/BusinessContext';
import EditProductModal from './EditProductModal';
import serverConfig from '../serverConfig';

const server = serverConfig().url;

export default function ProductCard(props) {
  const context = useContext(BusinessContext);
  const [editing, setEditing] = useState(false);
  const [productTag, setProductTag] = useState('');

  useEffect(() => {
    fetch(`${server}/productTags?idProduct=${product.id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((parsed) => {
        if (parsed[0]) {
          setProductTag(parsed[0].tags[0].name);
        }
      })
      .catch(() => setProductTag(''));
  }, []);

  const handleDelete = () => {
    // delete request to API
    fetch(`${server}/products/${props.product.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: context.accessToken,
      },
    })
      .then(() => {
        // delete item from current inventory
        const currentInventory = context.currentInventory.filter(
          (product) => product.id !== props.product.id,
        );
        // update state
        context.setCurrentInventory(currentInventory);
      })
      .catch(() => {
        Alert.alert(
          'Error',
          'Unable to delete item',
        );
      });
  };

  const showEditModal = () => {
    setEditing(true);
  };

  const confirmDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Product will be permanently removed',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => handleDelete() },
      ],
      { cancelable: false },
    );
  };

  const {
    container,
    image,
    productTagText,
    productPrice,
    productTitle,
    deleteContainer,
    infoContainer,
  } = styles;

  const { product, navigation } = props;
  const {
    name,
    imageUrl,
    price,
  } = product;

  return (
    <TouchableOpacity onPress={showEditModal}>
      <View style={container}>
        <EditProductModal
          navigation={navigation}
          product={product}
          visible={editing}
          closeModal={setEditing}
        />
        <Image style={image} source={{ uri: imageUrl }} />
        <View style={infoContainer}>
          <Text style={productTitle} numberOfLines={1} adjustsFontSizeToFit>
            {name}
          </Text>
          <Text style={productTagText} numberOfLines={1} ellipsizeMode="tail">
            {productTag}
          </Text>
          <Text style={productPrice}>{`$${price}.00`}</Text>
        </View>
        <View style={deleteContainer}>
          <TouchableOpacity onPress={confirmDelete}>
            <FontAwesome name="trash-o" size={25} style={{ color: '#EFF6E0' }} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '5%',
    marginRight: '5%',
    height: 116,
    borderColor: '#AEC3B0',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  productTagText: {
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
  deleteContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  infoContainer: {
    flex: 1,
    paddingRight: 50,
  },
});
