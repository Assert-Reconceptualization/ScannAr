import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// import components
import CustomerNavBar from '../components/NavBar/CustomerNavBar';
import CustomerHeader from '../components/headers/CustomerHeader';
import CustomerList from '../components/productLists/CustomerList';

// eslint-disable-next-line react/prop-types
const CustomerLanding = ({ navigator }) => {
  // eslint-disable-next-line no-use-before-define
  const { screen, customerList, productsTitle } = styles;
  return (
    <View style={screen}>
      <CustomerHeader navigator={navigator} />
      <Text style={productsTitle}>Saved Products</Text>
      <View style={customerList}>
        <CustomerList />
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
