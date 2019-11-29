import * as WebBrowser from "expo-web-browser";
import React, { useContext, useEffect } from "react";
import {
  Image,
  Platform,
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

export default function HomeScreen() {
  const context = useContext(BusinessContext);
  console.log(context);

  // grab user data from database
  useEffect(() => {
    // grab products
    
  }, []);


  const {
    container,
    titleContainer,
    inventoryContainer,
    titleText,
    noInventoryContainer
  } = styles;
  return (
    <View style={container}>
      <View style={titleContainer}>
        <Text style={titleText}>Our Products</Text>
        <TouchableOpacity>
          <Ionicons name="ios-options" size={40} color="#AEC3B0"/>
        </TouchableOpacity>
      </View>
      {context.currentInventory.length ? (
        <View style={inventoryContainer}>
          <ScrollView>
            {[1, 2, 3, 4].map(product => <ProductCard />)}
          </ScrollView>
        </View>
      ) : (
        <View style={noInventoryContainer}>
          <NoProductMessage />
        </View>
      )}
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

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/development-mode/"
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes"
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#39403A"
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
    flex: 5,
  },
  noInventoryContainer: {
    flex: 5,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#EFF6E0'
  }
});
