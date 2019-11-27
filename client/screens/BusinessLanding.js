import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import BusinessHeader from '../components/headers/BusinessHeader';
import BusinessList from '../components/productLists/BusinessList';
import BusinessNavbar from '../components/NavBar/BusinessNavbar';

// eslint-disable-next-line react/prop-types
const BusinessLanding = ({ navigator }) => {
  const {
    screen,
    businessList,
    addButton,
    navbar,
    businessName,
  // eslint-disable-next-line no-use-before-define
  } = styles;

  return (
    <View style={screen}>
      <BusinessHeader navigator={navigator} />
      <Text style={businessName}>Our Products</Text>
      <View style={businessList}>
        <BusinessList />
      </View>
      <TouchableOpacity
        style={addButton}
      >
        <Text>Add</Text>
      </TouchableOpacity>
      <View style={navbar}>
        <BusinessNavbar navigator={navigator} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#383F38',
  },
  businessList: {
    flex: 1,
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: -25,
  },
  navbar: {
    height: '8%',
    width: '100%',
    marginBottom: 0,
  },
  addButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: '12%',
    right: 10,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  businessName: {
    marginTop: '5%',
    fontSize: 30,
    color: '#A2B5A3',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default BusinessLanding;
