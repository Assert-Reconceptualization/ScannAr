import React from "react";
import { Text, View, StyleSheet, Button, TouchableHighlight, TouchableOpacity } from "react-native";

const CustomerNavBar = ({ navigator }) => {
return (
    <View style={styles.bar}>
        <TouchableOpacity onPress={() => navigator.push("AR")}>
                <Text style={styles.buttonText}>AR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigator.pop()}>
                <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
    </View>
    )
};

const styles = StyleSheet.create({
    bar: {
        // flex:1,
        flexDirection: "row",
        justifyContent: "space-around",
        height: "8%",
        width: "100%",
        backgroundColor: 'lightblue'
    },
    button: {
        borderRadius: 10,
        marginBottom: 1,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white'
    }
});

export default CustomerNavBar;