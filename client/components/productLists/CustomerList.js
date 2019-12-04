import React, { useContext, useState } from 'react';
import {
  View, FlatList, StyleSheet, Picker,
} from 'react-native';
import CustomerListItem from '../productProfiles/customerListItem';
import CustomerContext from '../../applicationState/customerContext';

// import mock data
// import mockData from '../../mock-data/products';

// eslint-disable-next-line react/prop-types
const CustomerList = ({ setModalProp, setVisibility }) => {
  const [refresh, setRefresh] = useState(false);
  const [sortVisibility, setSortVisibility] = useState(false);
  const [sortingBy, setSortingBy] = useState('');
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

  const filterFunctions = (filterBy) => {
    let sortedInventory;
    // hide filter functions
    // hideSortModal();
    // grab current inventory
    const inventory = context.currentInventory;
    switch (filterBy) {
      case 'priceAscending':
        sortedInventory = inventory.sort((a, b) => a.price - b.price);
        context.setCurrentInventory(sortedInventory);
        // force re-render component
        break;
      case 'priceDescending':
        sortedInventory = inventory.sort((a, b) => b.price - a.price);
        context.setCurrentInventory(sortedInventory);
        // force re-render component
        break;
      case 'oldestFirst':
        sortedInventory = inventory.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
        context.setCurrentInventory(sortedInventory);
        // force re-render component
        break;
      case 'mostRecent':
        sortedInventory = inventory.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        context.setCurrentInventory(sortedInventory);
        // force re-render component
        break;
      default: break;
    }
    // ensure component is refreshed!
    // setRefresh(!refresh);
  };
  const pickerFilter = () => (
    <Picker
      selectedValue={sortingBy}
      style={{ height: 50, width: 100 }}
      onValueChange={(itemValue) => setSortingBy(itemValue)}
    >
      <Picker.Item label="mostRecent" value="mostRecent" />
    </Picker>
  );

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
