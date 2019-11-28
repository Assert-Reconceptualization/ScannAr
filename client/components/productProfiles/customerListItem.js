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
    // eslint-disable-next-line no-use-before-define
  } = styles;

  return (
    <View
      style={listItemContainer}
    >
      <Image
        source={{ uri }}
        style={image}
      />
      <View>
        <Text style={productTitle}>{name}</Text>
        <Text style={productDescription}>{description}</Text>
        <Text style={productPrice}>{`$${price}.00`}</Text>
      </View>
      <TouchableOpacity
        style={productMenu}
        onPress={() => setModalProp(item)}
      >
        <Text style={productTitle}>...</Text>
      </TouchableOpacity>
    </View>
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
    height: 100,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#B3C6CD',
    borderWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default CustomerListItem;
