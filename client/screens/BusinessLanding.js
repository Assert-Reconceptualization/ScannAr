import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

import BusinessHeader from '../components/headers/BusinessHeader'

const BusinessLanding = ({ navigator }) => {
    

    //component
    //header with logout button
    //Our products Flatlist
    //navbar
    return (
        <View style={styles.screen}>
            <BusinessHeader navigator={navigator}/>
            <Text>I am the Products page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#383F38",
    }
});

export default BusinessLanding;