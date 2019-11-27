import React from 'react';
import {
  View, FlatList,
} from 'react-native';
import BusinessListItem from '../productProfiles/businessListItem';

const BusinessList = () => {
  return (
    <View>
      <FlatList
        data={[
          { name: 'item1' },
          { name: 'item2' },
          { name: 'item3' },
          { name: 'item4' },
          { name: 'item5' },
        ]}
        renderItem={({ item }) => (
          <BusinessListItem name={item.name} />
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

export default BusinessList;
