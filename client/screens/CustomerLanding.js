import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';

// import components
import CustomerNavBar from '../components/NavBar/CustomerNavBar';
import CustomerHeader from '../components/headers/CustomerHeader';
import CustomerList from '../components/productLists/CustomerList';
import ProductProfileModal from '../components/productProfiles/ProductProfileModal';
import CustomerContext from '../applicationState/customerContext';

// eslint-disable-next-line react/prop-types
const CustomerLanding = ({ navigator }) => {
  // eslint-disable-next-line no-use-before-define
  const { screen, customerList, productsTitle } = styles;
  const [visible, setVisibility] = useState(false);
  const [product, setProduct] = useState('');
  const context = useContext(CustomerContext);

  // sets prop to be passed to modal
  const setModalProp = (item) => {
    setProduct(item);
    setVisibility(true);
  };

  useEffect(() => {
    fetch(`http://38d7345e.ngrok.io/products`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((parsedResponse) => {
        context.setAllMarkers(parsedResponse.data);
      })
      .catch(() => console.log('something went wrong'));
  }, []);

  return (
    <View style={screen}>
      <ProductProfileModal visible={visible} setVisibility={setVisibility} product={product} />
      <CustomerHeader navigator={navigator} />
      <Text style={productsTitle}>Saved Products</Text>
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
    marginBottom: 8,
  },
});

export default CustomerLanding;
