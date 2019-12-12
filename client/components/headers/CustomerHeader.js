import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';

const CustomerHeader = () => {
  // eslint-disable-next-line no-use-before-define
  const { titleContainer, header2, header } = styles;

  return (
    <View style={titleContainer}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={header}>Scann</Text>
        <Text style={header2}>AR</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    height: '8%',
    backgroundColor: '#124559',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  header2: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#85A4AF',
  },
});

export default CustomerHeader;
