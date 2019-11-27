import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// import components
import CustomerNavBar from '../components/NavBar/CustomerNavBar';

// eslint-disable-next-line react/prop-types
const CustomerLanding = ({ navigator }) => {
  // eslint-disable-next-line no-use-before-define
  const { screen, links } = styles;
  return (
    <View style={screen}>
      <View style={links}>
        <Text>Saved items will go here</Text>
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
});

export default CustomerLanding;
