import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

const CustomerLanding = ({ navigator }) => (
    <View style={[styles.screen, { backgroundColor: "#23395B" }]}>
        <Button title="Augmented Reality" onPress={() => navigator.push("AR")} />
        <Button title="Logout" onPress={() => navigator.pop()} />
    </View>
);

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default CustomerLanding;