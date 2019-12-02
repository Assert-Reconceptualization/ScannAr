import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProductCard from "../components/productCard";
import BusinessContext from "../applicationState/BusinessContext";
import NoProductMessage from "../components/NoProductMessage";
import NewProductModal from "../components/NewProductModal";

export default function HomeScreen(props) {
  const context = useContext(BusinessContext);
  const [creating, setCreating] = useState(false);
  // grab user data from database
  useEffect(() => {
    // grab products
    fetch(`http://scannar-server-second.appspot.com/products?idBusiness=${context.currentBusiness.id}`, {
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
          context.setCurrentInventory(products.data)
        }
      })
      .catch(() => {
        console.log('Something Went Wrong');
      });
    
  }, []);

  const handleModalVisibility = () => {
    setCreating(true);
  }

  const {
    container,
    titleContainer,
    inventoryContainer,
    titleText,
    noInventoryContainer,
    businessInfoContainer,
    businessName,
    addButton
  } = styles;
  return (
    <View style={container}>
      <View style={businessInfoContainer}>
        <Text style={businessName}>{context.currentBusiness.name}</Text>
      </View>
      <View style={titleContainer}>
        <Text style={titleText}>Our Products</Text>
        <TouchableOpacity>
          <Ionicons name="ios-options" size={40} color="#AEC3B0"/>
        </TouchableOpacity>
      </View>
      {context.currentInventory.length ? (
        <View style={inventoryContainer}>
          <ScrollView>
            {context.currentInventory.map(product => <ProductCard navigation={props.navigation} key={product.id} product={product}/>)}
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
  );
}

// add content and style to header
HomeScreen.navigationOptions = {
  headerTitle: "ScannAR for Business",
  headerStyle: {
    backgroundColor: "#505950"
  },
  headerTintColor: "white"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#39403A"
  },
  businessInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '5%',
    marginRight: '5%',
    alignItems: 'center'
  },
  inventoryContainer: {
    flex: 7,
  },
  noInventoryContainer: {
    flex: 7,
  },
  businessName: {
    color: '#EFF6E0',
    fontSize: 20
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#EFF6E0'
  },
  addButton: {
    position: 'absolute',
    bottom: '10%',
    right: '10%'
  }
});
