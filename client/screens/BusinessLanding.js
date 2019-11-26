import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

import BusinessHeader from '../components/headers/BusinessHeader';
import BusinessList from '../components/productLists/BusinessList';
import BusinessNavbar from '../components/NavBar/BusinessNavbar';

// eslint-disable-next-line react/prop-types
const BusinessLanding = ({ navigator }) => {
  const {
    screen,
    title,
    addButton,
    navbar,
  // eslint-disable-next-line no-use-before-define
  } = styles;

  return (
    <View style={screen}>
      <BusinessHeader navigator={navigator} />
      <View style={title}>
        <BusinessList />
      </View>
      <View style={addButton}>
        <Button title="BIG ADD BUTTON" />
      </View>
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
  title: {
    flex: 1,
    marginTop: '5%',
    marginLeft: '5%',
  },
  navbar: {
    height: '8%',
    width: '100%',
    marginBottom: 0,
  },
  addButton: {
    marginBottom: 20,
    marginLeft: '50%',
  },
});

export default BusinessLanding;
