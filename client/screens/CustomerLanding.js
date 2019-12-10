/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Picker,
  TouchableOpacity,
} from 'react-native';

// import components
import CustomerNavBar from '../components/NavBar/CustomerNavBar';
import CustomerHeader from '../components/headers/CustomerHeader';
import CustomerList from '../components/productLists/CustomerList';
import ProductProfileModal from '../components/productProfiles/ProductProfileModal';
import CustomerContext from '../applicationState/customerContext';

const CustomerLanding = ({ navigator }) => {
  const {
    screen,
    customerList,
    productsTitle,
    pickerStyle,
    sortButton,
    pickerViewStyle,
    sortButtonText,
  } = styles;
  const [visible, setVisibility] = useState(false);
  const [product, setProduct] = useState('');
  const [sortVisibility, setSortVisibility] = useState(false);
  const [sortingBy, setSortingBy] = useState('oldest');
  const [refreshState, setRefreshState] = useState(false);
  const context = useContext(CustomerContext);
  const { serverUrl, currentSavedList } = context;

  // sets item for modal to render upon click of product profile
  const setModalProp = (item) => {
    setProduct(item);
    setVisibility(true);
  };

  // updates AR markers upon mounting
  useEffect(() => {
    setMarkers();
    filterFunctions(sortingBy);
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
    switch (filterBy) {
      case 'priceAscending':
        sortedInventory = currentSavedList.sort((a, b) => a.price - b.price);
        context.setCurrentSavedList(sortedInventory);
        // force re-render component
        break;
      case 'priceDescending':
        sortedInventory = currentSavedList.sort((a, b) => b.price - a.price);
        context.setCurrentSavedList(sortedInventory);
        // force re-render component
        break;
      case 'oldest':
        sortedInventory = currentSavedList.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
        context.setCurrentSavedList(sortedInventory);
        // force re-render component
        break;
      case 'newest':
        sortedInventory = currentSavedList.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        context.setCurrentSavedList(sortedInventory);
        // force re-render component
        break;
      default: break;
    }
    setRefreshState(!refreshState);
  };


  const picker = () => (
    <View
      style={pickerViewStyle}
    >
      <Picker
        selectedValue={sortingBy}
        style={pickerStyle}
        onValueChange={(itemValue) => { setSortingBy(itemValue); filterFunctions(sortingBy); setSortVisibility(false); }}
      >
        <Picker.Item label="Highest Cost" value="priceAscending" />
        <Picker.Item label="Lowest Cost" value="priceDescending" />
        <Picker.Item label="Newest" value="newest" />
        <Picker.Item label="Oldest" value="oldest" />
      </Picker>
    </View>
  );

  return (
    <View style={screen}>
      <ProductProfileModal visible={visible} setVisibility={setVisibility} product={product} />
      <CustomerHeader navigator={navigator} />
      <Text style={productsTitle}>Saved Products</Text>
      <View style={sortButton}>
        <TouchableOpacity onPress={() => setSortVisibility(true)}>
          <Text style={sortButtonText}>.</Text>
          <Text style={sortButtonText}>.</Text>
          <Text style={sortButtonText}>.</Text>
        </TouchableOpacity>
      </View>
      {sortVisibility ? picker() : null }
      <View style={customerList}>
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
    marginBottom: 3,
    marginLeft: 8,
  },
  pickerViewStyle: {
    width: 150,
    zIndex: 5,
    backgroundColor: '#d9d9d9',
    borderRadius: 5,
    alignSelf: 'center',
    position: 'absolute',
    top: 100,
    right: 10,
    opacity: 0.8,
  },
  sortButton: {
    zIndex: 5,
    position: 'absolute',
    top: 70,
    right: 20,
    height: 50,
    width: 50,
    alignItems: 'flex-end',
  },
  sortButtonText: {
    color: 'white',
    marginTop: -5,
    marginBottom: -20,
    marginRight: 10,
    fontSize: 25,
    alignSelf: 'center',
  },
});

export default CustomerLanding;
