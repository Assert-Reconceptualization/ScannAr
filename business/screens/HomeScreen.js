import * as WebBrowser from "expo-web-browser";
import React from "react";
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

export default function HomeScreen() {
  const { container, titleContainer, inventoryContainer, titleText } = styles;
  return (
    <View style={container}>
      <View style={titleContainer}>
        <Text style={titleText}>Our Products</Text>
        <Ionicons name="ios-options" size={26} />
      </View>
      <View style={inventoryContainer}>
        <ScrollView>
          {[1, 2, 3, 4].map(product => <ProductCard />)}
        </ScrollView>
      </View>
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
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  }
});
