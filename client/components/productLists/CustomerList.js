import React from 'react';
import {
  View, FlatList,
} from 'react-native';
import CustomerListItem from '../productProfiles/customerListItem';

// import mock data
import mockData from '../../mock-data/products';

const CustomerList = () => (
  <View>
    <FlatList
      data={mockData}
      renderItem={({ item }) => (
        <CustomerListItem
          name={item.name}
          uri={item.url}
          description={item.description}
          price={item.price}
        />
      )}
      keyExtractor={(item) => item.name}
    />
  </View>
);

export default CustomerList;
