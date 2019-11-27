import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// import components
import CustomerNavBar from '../components/NavBar/CustomerNavBar';
import CustomerList from '../components/productLists/CustomerList';

// eslint-disable-next-line react/prop-types
const CustomerLanding = ({ navigator }) => {
  // eslint-disable-next-line no-use-before-define
  const { screen, links, customerList } = styles;
  return (
    <View style={screen}>
      <Text>Saved items will go here</Text>
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
    backgroundColor: '#23395B',
  },
  customerList: {
    flex: 1,
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: -25,
  },
});

export default CustomerLanding;
