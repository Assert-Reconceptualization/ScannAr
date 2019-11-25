import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

// import components
import CustomerNavBar from '../components/NavBar/CustomerNavBar';

const CustomerLanding = ({ navigator }) => (
    <View style={styles.screen}>
        <View style={styles.links}>
            <Text>Saved items will go here</Text>
        </View>
        <CustomerNavBar />
    </View>
);

const styles = StyleSheet.create({
    links: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    screen: {
        flex: 1,
        backgroundColor: "#23395B",
    }
});

export default CustomerLanding;