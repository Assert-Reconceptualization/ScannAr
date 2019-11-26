import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

import BusinessHeader from '../components/headers/BusinessHeader';
import BusinessList from '../components/productLists/BusinessList';
import BusinessNavbar from "../components/NavBar/BusinessNavbar";

const BusinessLanding = ({ navigator }) => {
    

    //component
    //header with logout button
    //Our products Flatlist
    //navbar
    return (
      <View style={styles.screen}>
        <BusinessHeader navigator={navigator} />
        <View style={styles.title}>
          <BusinessList />
        </View>
        <View style={styles.addButton}>
            <Button title="BIG ADD BUTTON" />
        </View>
        <View style={styles.navbar}>
            <BusinessNavbar navigator={navigator} />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#383F38"
  },
  title: {
    flex: 1,
    marginTop: "5%",
    marginLeft: "5%"
  },
  navbar: {
    height: "8%",
    width: "100%",
    marginBottom: 0
  },
  addButton: {
      marginBottom: 20,
      marginLeft: '50%'
  }
});

export default BusinessLanding;