import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProductCard from "../components/productCard";
import BusinessContext from "../applicationState/BusinessContext";
import NoProductMessage from "../components/NoProductMessage";
import NewProductModal from "../components/NewProductModal";
import HomeScreenHeader from "../components/HomeScreenHeader";
import SortModal from "../components/SortModal";
import serverConfig from '../serverConfig';
const server = serverConfig().url;


export default function HomeScreen(props) {
  const context = useContext(BusinessContext);
  context.setAppNavigator(props.navigation);
  const [creating, setCreating] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [sorting, setSorting] = useState(false);
  const [sortingBy, setSortingBy] = useState('mostRecent'); // add default to sort
  // grab user data from database
  useEffect(() => {
    // grab products
    fetch(`${server}/products?idBusiness=${context.currentBusiness.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then(products => {
        //update current inventory if there are products
        if(products.data){
          // ensure default sort is most recent - oldest
          
          const setInventory = async () => {
            await context.setCurrentInventory(products.data)
          }
          setInventory();
          return products.data;
        }
      })
      .then((products) => filterFunctions(sortingBy, products))  
      .catch((err) => {
        // Alert.alert('Oops!', 'Unable to update inventory');
        console.log(err)
      });
    
  }, []);

  const handleModalVisibility = () => {
    setCreating(true);
  }

  const filterFunctions = (filterBy, inventory) => {
    // hide filter functions
    hideSortModal();
    // grab current inventory
    setSortingBy(filterBy);
    if (!inventory) {
      inventory = context.currentInventory;
    }
    console.log(inventory);
    switch (filterBy) {
      case 'priceAscending':
        let sortedInventory = inventory.sort((a, b) => {
          return a.price - b.price;
        });
        context.setCurrentInventory(sortedInventory);
        // force re-render component
        break;
      case 'priceDescending':
        sortedInventory = inventory.sort((a, b) => {
          return b.price - a.price;
        });
        context.setCurrentInventory(sortedInventory);
        // force re-render component
        break;
      case 'oldestFirst':
        sortedInventory = inventory.sort((a, b) => {
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        });
          context.setCurrentInventory(sortedInventory);
          // force re-render component
          break;
      case 'mostRecent':
        sortedInventory = inventory.sort((a, b) => {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
        context.setCurrentInventory(sortedInventory);
        // force re-render component
        break;
    }
    // ensure component is refreshed!
    setRefresh(!refresh);
  }

  const toggleSortModal = () => {
    setSorting(true);
  }

  const hideSortModal = () => {
    setSorting(false);
  }

  const {
    container,
    titleContainer,
    inventoryContainer,
    titleText,
    noInventoryContainer,
    businessInfoContainer,
    businessName,
    addButton,
    sortingContainer,
  } = styles;

  return (
    <TouchableWithoutFeedback onPress={hideSortModal}>
      <View style={container}>
        {sorting && (
          <View style={sortingContainer}>
            <SortModal sort={filterFunctions}/>
          </View>
        )}
        <View style={businessInfoContainer}>
          <Text style={businessName}>{context.currentBusiness.name}</Text>
        </View>
        <View style={titleContainer}>
          <Text style={titleText}>Our Products</Text>
          <TouchableOpacity onPress={toggleSortModal} >
            <Ionicons name="ios-options" size={40} color="#AEC3B0"/>
          </TouchableOpacity>
        </View>
        {context.currentInventory.length ? (
          <View style={inventoryContainer}>
            <ScrollView>
              <View onStartShouldSetResponder={() => true}>
                {context.currentInventory.map(product => <ProductCard navigation={props.navigation} key={product.id} product={product}/>)}
              </View>
            </ScrollView>
          </View>
        ) : (
          <View style={noInventoryContainer}>
            <NoProductMessage />
          </View>
        )}
        <TouchableOpacity style={addButton} onPress={handleModalVisibility}>
          <Ionicons name="ios-add-circle" size={70} color="#AEC3B0"/>
        </TouchableOpacity>
        <NewProductModal navigation={props.navigation} visible={creating} setCreating={setCreating}/>
      </View>
    </TouchableWithoutFeedback>
  );
}

  // add content and style to header
  HomeScreen.navigationOptions = {
    headerTitle: () => <HomeScreenHeader />,
    headerStyle: {
      backgroundColor: "#505950",
    },
    headerTintColor: "white",
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#39403A",
  },
  businessInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
  businessName: {
    color: '#EFF6E0',
    fontSize: 20,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#EFF6E0'
  },
  addButton: {
    position: 'absolute',
    bottom: '10%',
    right: '10%',
  },
  sortingContainer: {
    position: 'absolute',
    top: 40,
    right: 0,
    zIndex: 5,
  }
});
