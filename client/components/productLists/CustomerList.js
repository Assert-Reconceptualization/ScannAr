import React, { useContext, useState } from 'react';
import {
  View, FlatList, StyleSheet,
} from 'react-native';
import CustomerListItem from '../productProfiles/customerListItem';
import CustomerContext from '../../applicationState/customerContext';

// eslint-disable-next-line react/prop-types
const CustomerList = ({ setModalProp, setVisibility }) => {
  const [refresh, setRefresh] = useState(false);
  const context = useContext(CustomerContext);
  const {
    currentSavedList,
    setCurrentSavedList,
    serverUrl,
    currentUser,
  } = context;
  // eslint-disable-next-line no-use-before-define
  const { container } = styles;

  const getSavedProducts = () => {
    setRefresh(true);
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
        setRefresh(false);
      });
    // .catch(() => )
  };


  return (
    <View
      onPress={() => setVisibility(true)}
      style={container}
    >
      <FlatList
        refreshing={refresh}
        onRefresh={getSavedProducts}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomerList;
