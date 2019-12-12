/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useContext, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ProductCard from '../components/productCard';
import BusinessContext from '../applicationState/BusinessContext';
import NoProductMessage from '../components/NoProductMessage';
import NewProductModal from '../components/NewProductModal';
import HomeScreenHeader from '../components/HomeScreenHeader';
import SortBar from '../components/SortBar';
import serverConfig from '../serverConfig';

const server = serverConfig().url;


export default function HomeScreen(props) {
  const context = useContext(BusinessContext);
  const { navigation } = props;
  const { setAppNavigator } = context;
  setAppNavigator(navigation);
  const [creating, setCreating] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [sorting, setSorting] = useState(false);
  const [filterColor, setFilterColor] = useState('#AEC3B0');
  const [sortingBy, setSortingBy] = useState('mostRecent'); // add default to sort
  const { currentInventory, setCurrentInventory } = context;
  // grab user data from database
  useEffect(() => {
    // grab products
    fetch(`${server}/products?idBusiness=${context.currentBusiness.id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((products) => {
        // update current inventory if there are products
        if (products.data) {
          // ensure default sort is most recent - oldest
          const setInventory = async () => {
            await setCurrentInventory(products.data);
          };
          setInventory();
          return products.data;
        }
        return null;
      })
      .then((products) => filterFunctions(sortingBy, products))
      .catch(() => {
        Alert.alert('Oops!', 'Unable to update inventory');
      });
  }, []);

  const reSort = () => {
    filterFunctions(sortingBy);
  };

  // make sure inventory is correctly filtered
  useEffect(() => {
    reSort();
  }, [currentInventory]);

  const filterFunctions = (filterBy, inventory) => {
    // grab current inventory
    setSortingBy(filterBy);
    let sortedInventory;
    if (!inventory) {
      // eslint-disable-next-line no-param-reassign
      inventory = currentInventory;
    }
    switch (filterBy) {
      case 'priceAscending':
        sortedInventory = inventory.sort((a, b) => a.price - b.price);
        setCurrentInventory(sortedInventory);
        break;
      case 'priceDescending':
        sortedInventory = inventory.sort((a, b) => b.price - a.price);
        setCurrentInventory(sortedInventory);
        break;
      case 'oldestFirst':
        sortedInventory = inventory.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
        setCurrentInventory(sortedInventory);
        break;
      case 'mostRecent':
        sortedInventory = inventory.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setCurrentInventory(sortedInventory);
        break;
      default: break;
    }
    // ensure component is refreshed!
    setRefresh(!refresh);
  };

  const toggleSortModal = () => {
    if (sorting) {
      setFilterColor('#AEC3B0');
      setSorting(false);
    } else {
      setFilterColor('#EFF6E0');
      setSorting(true);
    }
  };

  const {
    container,
    titleContainer,
    inventoryContainer,
    titleText,
    noInventoryContainer,
    sortingContainer,
    filterTitleContainer,
    filterTitle,
  } = styles;

  return (
    <View style={container}>
      <View style={titleContainer}>
        <Text style={titleText}>Our Products</Text>
        <TouchableOpacity onPress={toggleSortModal}>
          <FontAwesome name="ellipsis-h" size={40} color={filterColor} />
        </TouchableOpacity>
      </View>
      {sorting && (
        <View style={sortingContainer}>
          <View style={filterTitleContainer}>
            <Text style={filterTitle}>Filter</Text>
          </View>
          <SortBar sort={filterFunctions} active={sortingBy} />
        </View>
      )}
      {currentInventory.length ? (
        <View style={inventoryContainer}>
          <ScrollView>
            <View onStartShouldSetResponder={() => true}>
              {currentInventory.map((product) => (
                <ProductCard navigation={navigation} key={product.id} product={product} />
              ))}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={noInventoryContainer}>
          <NoProductMessage />
        </View>
      )}
      <NewProductModal navigation={navigation} visible={creating} setCreating={setCreating} />
    </View>
  );
}

// add content and style to header
HomeScreen.navigationOptions = {
  headerTitle: () => <HomeScreenHeader />,
  headerStyle: {
    backgroundColor: '#505950',
  },
  headerTintColor: 'white',
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#39403A',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '5%',
    marginRight: '5%',
    alignItems: 'center',
  },
  inventoryContainer: {
    flex: 7,
  },
  noInventoryContainer: {
    flex: 7,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#EFF6E0',
  },
  addButton: {
    position: 'absolute',
    bottom: '10%',
    right: '10%',
  },
  sortingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: 20,
  },
  filterTitleContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterTitle: {
    fontSize: 20,
    color: '#C4D2C5',
  },
});
