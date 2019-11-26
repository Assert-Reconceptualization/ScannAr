import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

import BusinessHeader from '../components/headers/BusinessHeader';
import BusinessList from '../components/productLists/BusinessList';

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
      </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#383F38",
    },
    title: {
        flex: 1,
        marginTop: "5%",
        marginLeft: "5%"
    }
});

export default BusinessLanding;