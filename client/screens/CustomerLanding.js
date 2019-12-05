/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Picker,
  Button,
} from 'react-native';

// import components
import CustomerNavBar from '../components/NavBar/CustomerNavBar';
import CustomerHeader from '../components/headers/CustomerHeader';
import CustomerList from '../components/productLists/CustomerList';
import ProductProfileModal from '../components/productProfiles/ProductProfileModal';
import CustomerContext from '../applicationState/customerContext';

const CustomerLanding = ({ navigator }) => {
  const { screen, customerList, productsTitle } = styles;
  const [visible, setVisibility] = useState(false);
  const [product, setProduct] = useState('');
  const context = useContext(CustomerContext);
  const { serverUrl } = context;

  // sets item for modal to render upon click of product profile
  const setModalProp = (item) => {
    setProduct(item);
    setVisibility(true);
  };

  // updates AR markers upon mounting
  useEffect(() => {
    setMarkers();
  }, []);

  // sets markers for AR
  const setMarkers = () => {
    fetch(`${serverUrl}/products`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((parsedResponse) => {
        context.setAllMarkers(parsedResponse.data);
      });
    // .catch(() => console.log('something went wrong'));
  };

  const filterFunctions = (filterBy) => {
    let sortedInventory;
    const inventory = context.currentInventory;
    switch (filterBy) {
      case 'priceAscending':
        sortedInventory = inventory.sort((a, b) => a.price - b.price);
        context.setCurrentInventory(sortedInventory);
        // force re-render component
        break;
      case 'priceDescending':
        sortedInventory = inventory.sort((a, b) => b.price - a.price);
        context.setCurrentInventory(sortedInventory);
        // force re-render component
        break;
      case 'oldestFirst':
        sortedInventory = inventory.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
        context.setCurrentInventory(sortedInventory);
        // force re-render component
        break;
      case 'mostRecent':
        sortedInventory = inventory.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        context.setCurrentInventory(sortedInventory);
        // force re-render component
        break;
      default: break;
    }
  };


  const picker = () => (
    <Picker
      selectedValue={sortingBy}
      style={{ height: 50, width: 100, flex: 1 }}
      onValueChange={(itemValue) => setSortingBy(itemValue)}
    >
      <Picker.Item label="newest" value="newest" />
      <Picker.Item label="oldest" value="oldest" />
    </Picker>
  );

  return (
    <View style={screen}>
      <ProductProfileModal visible={visible} setVisibility={setVisibility} product={product} />
      <CustomerHeader navigator={navigator} />
      <Text style={productsTitle}>Saved Products</Text>
      <View style={customerList}>
        <Button title="Sort" onPress={() => setSortVisibility(true)} />
        <CustomerList setModalProp={setModalProp} setVisibility={setVisibility} />
      </View>
      <CustomerNavBar navigator={navigator} />
    </View>
  );
};

const styles = StyleSheet.create({
  links: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    flex: 1,
    backgroundColor: '#082A36',
  },
  customerList: {
    flex: 1,
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: -25,
  },
  productsTitle: {
    marginTop: '2%',
    fontSize: 25,
    color: '#B3C6CD',
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default CustomerLanding;
