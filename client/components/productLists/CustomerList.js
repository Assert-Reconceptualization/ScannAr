import React, { useContext } from 'react';
import {
  View, FlatList,
} from 'react-native';
import CustomerListItem from '../productProfiles/customerListItem';
import CustomerContext from '../../applicationState/customerContext';

// import mock data
// import mockData from '../../mock-data/products';

// eslint-disable-next-line react/prop-types
const CustomerList = ({ setModalProp, setVisibility }) => {
  const context = useContext(CustomerContext);
  const {
    currentSavedList,
    setCurrentSavedList,
    serverUrl,
    currentUser,
  } = context;

  const getSavedProducts = () => (
    fetch(`${serverUrl}/savedProducts?idUser=${currentUser.id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((savedList) => {
        setCurrentSavedList(savedList);
      })
    // .catch(() => )
  );

  return (
    <View onPress={() => setVisibility(true)}>
      <FlatList
        onRefresh
        refreshing={getSavedProducts}
        data={currentSavedList}
        renderItem={({ item }) => (
          <CustomerListItem
            name={item.name}
            uri={item.imageUrl}
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
};

export default CustomerList;
