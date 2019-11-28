import React from 'react';
import {
  View, FlatList,
} from 'react-native';
import CustomerListItem from '../productProfiles/customerListItem';

// import mock data
import mockData from '../../mock-data/products';

// eslint-disable-next-line react/prop-types
const CustomerList = ({ setModalProp, setVisibility }) => (
  <View onPress={() => setVisibility(true)}>
    <FlatList
      data={mockData}
      renderItem={({ item }) => (
        <CustomerListItem
          name={item.name}
          uri={item.url}
          description={item.description}
          price={item.price}
          item={item}
          setModalProp={setModalProp}
        />
      )}
      keyExtractor={(item) => item.name}
    />
  </View>
);

export default CustomerList;
