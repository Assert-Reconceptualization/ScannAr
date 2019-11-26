import React from 'react';
import {
  View, Text, StyleSheet, FlatList,
} from 'react-native';

const BusinessList = () => {
  // eslint-disable-next-line no-use-before-define
  const { text } = styles;
  return (
    <View>
      <Text style={text}>Our Products</Text>
      <FlatList
        data={[{ name: 'item1' }, { name: 'item2' }]}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BusinessList;
