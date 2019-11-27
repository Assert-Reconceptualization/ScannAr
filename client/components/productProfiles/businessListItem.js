import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BusinessListItem = ({ name }) => {

  // eslint-disable-next-line no-use-before-define
  const { text, listItemContainer } = styles;
  return (
    <View style={listItemContainer}>
      <Text style={text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  listItemContainer: {
    height: 160,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#AEC3B0',
    borderWidth: 3,
  },
});

export default BusinessListItem;
