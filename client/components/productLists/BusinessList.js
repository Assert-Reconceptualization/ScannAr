import React from 'react';
import {
  View, FlatList,
} from 'react-native';
import BusinessListItem from '../productProfiles/businessListItem';

// import mock data
import mockData from '../../mock-data/products';

const BusinessList = () => (
  <View>
    <FlatList
      data={mockData}
      renderItem={({ item }) => (
        <BusinessListItem
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

export default BusinessList;
