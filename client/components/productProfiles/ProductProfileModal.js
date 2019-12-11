/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import {
  View, Modal, Text, Image, StyleSheet, Alert, TouchableOpacity, Linking,
} from 'react-native';

// import components
import ProductProfileNavBar from '../NavBar/ProductProfileNavBar';
import CustomerContext from '../../applicationState/customerContext';

const ProductProfileModal = ({ visible, setVisibility, product }) => {
  const [isSaved, setSaved] = useState(false);
  const [saveUpdated, setSaveUpdated] = useState(false);
  const [businessName, setBusinessName] = useState('Loading...');
  const [businessPhone, setBusinessPhone] = useState(null);
  const [productTags, setProductTags] = useState('');
  const context = useContext(CustomerContext);
  const {
    serverUrl,
    currentSavedList,
    currentUser,
    setCurrentSavedList,
  } = context;
  const {
    listItemContainer,
    image,
    productPrice,
    productTitle,
    productDescription,
    nameAndPrice,
    description,
    businessNameStyle,
    tagsStyle,
    saveButton,
    removeButton,
  } = styles;

  // retrieve and update tags for products
  const getProductTags = () => {
    fetch(`${serverUrl}/productTags?idProduct=${product.id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((parsed) => {
        if (parsed[0]) {
          setProductTags(parsed[0].tags[0].name);
        }
      })
      .catch(() => setProductTags(''));
  };

  // Retrieves and updates business name based on product
  const getBusinessName = () => {
    fetch(`${serverUrl}/users?id=${product.idBusiness}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((parsed) => {
        const businessInfo = parsed.data[0];
        setBusinessPhone(businessInfo.phone);
        setBusinessName(businessInfo.name);
      });
    // .catch(() => console.log('Something happened'));
  };

  // Retrieves all current user's saved products
  const getSavedProducts = (type) => (
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
        if (type === 'save') { // if save is passed, will alert after save
          handleSaveAlert();
        }
      })
  );

  // Saves product to users savedProducts list
  const handleSaveProduct = () => {
    fetch(`${serverUrl}/savedProducts?idUser=${context.currentUser.id}&idProduct=${product.id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => getSavedProducts('save')); // update saved products list with another fetch
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
      .then(() => getSavedProducts('delete'))
      .then(() => setVisibility(false)); // Hiding modal after deletion
  };

  // conditional rendering of save or delete
  const saveOrDelete = () => {
    if (isSaved === false) {
      return (
        <TouchableOpacity
          style={saveButton}
          onPress={handleSaveProduct}
        >
          <Text style={{ color: '#082A36' }}>Save</Text>
        </TouchableOpacity>
      );
    }
    return (
    // <Button title="Remove from saved" onPress={handleDeleteAlert} />
      <TouchableOpacity
        style={removeButton}
        onPress={handleDeleteAlert}
      >
        <Text>Remove</Text>
      </TouchableOpacity>
    );
  };

  // Alerts user when a product is saved
  const handleSaveAlert = () => {
    Alert.alert('Saved to your list!', '', [{ text: 'OK', onPress: () => setVisibility(false) }], { cancelable: false });
  };

  const handleDeleteAlert = () => {
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

  // If modal is visible,
  // check if item is saved and setSaveUpdated to true so this doesn't keep happening
  if (visible && saveUpdated === false) {
    getProductTags(); // Get tags when modal is visible
    getBusinessName(); // Get businessName when modal is visible
    setSaveUpdated(true);
    currentSavedList.forEach((savedItem) => {
      if (savedItem.id === product.id) { // if this product is in currentSavedList
        setSaved(true); // For conditional rendering of saveOrDelete
      }
    });
  }

  // When the modal is hidden, reset saveUpdated to false
  // This aids in the condition checking to see if the modal is updated
  if (!visible && saveUpdated) {
    setSaveUpdated(false);
    setSaved(false);
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={productTitle}>{product.name}</Text>
          {saveOrDelete()}
        </View>
        <Image
          source={{ uri: (product.imageUrl) }}
          style={image}
        />
        <View>
          <View style={nameAndPrice}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={productDescription}>By: </Text>
              <Text style={businessNameStyle} onPress={() => { Linking.openURL(`tel:${businessPhone}`); }}>{businessName}</Text>
            </View>
            <Text style={productPrice}>{`$${product.price}.00`}</Text>
          </View>
          <Text style={tagsStyle}>{productTags || 'No tags available'}</Text>
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
  businessNameStyle: {
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
  tagsStyle: {
    marginLeft: 5,
    color: 'white',
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: '#B3C6CD',
    width: 100,
    padding: 10,
    borderRadius: 5,
  },
  removeButton: {
    alignItems: 'center',
    backgroundColor: '#eb4242',
    width: 100,
    padding: 10,
    borderRadius: 5,
  },
});

export default ProductProfileModal;
