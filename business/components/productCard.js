import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import BusinessContext from "../applicationState/BusinessContext";

export default function ProductCard(props){

  const context = useContext(BusinessContext);

  const handleDelete = () => {
    // delete request to API
    fetch(`http://localhost:3030/products/${props.product.id}`, {
      method: 'DELETE',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    })
      .then((response) => response.json())
      .then(parsedResponse => {
        console.log(parsedResponse)
        // delete item from current inventory
        const currentInventory = context.currentInventory.filter((product) => product.id !== props.product.id);
        // update state
        context.setCurrentInventory(currentInventory);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const showEditModal = () => {

  }

  const {
    container,
    image,
    productDescription,
    productPrice,
    productTitle,
    deleteContainer,
    editContainer,
  } = styles;
  const {
    name,
    imageUrl,
    description,
    price
  } = props.product;
  return (
    <View style={container}>
      <Image style={image} source={{ uri: imageUrl }}/>
      <View>
        <Text style={productTitle}>{name}</Text>
        <Text style={productDescription}>{description}</Text>
        <Text style={productPrice}>{`$${price}.00`}</Text>
      </View>
      <View style={deleteContainer}>
        <TouchableOpacity
          onPress={handleDelete}
        >
          <Ionicons
            name="ios-close"
            size={40}
            style={{color: '#EFF6E0' }}
          />
        </TouchableOpacity>
      </View>
      <View style={editContainer}>
        <TouchableOpacity
          onPress={showEditModal}
        >
          <Ionicons
            name="ios-more"
            size={25}
            style={{color: '#EFF6E0' }}
          />
        </TouchableOpacity>
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
  deleteContainer: {
    position: 'absolute',
    bottom: 0,
    right: 10
  },
  editContainer: {
    position: 'absolute',
    top: 0,
    right: 10
  }
});