import React from "react";
import { Text, View, StyleSheet, Button, TouchableHighlight, TouchableOpacity } from "react-native";

const ARNavBar = ({ navigator }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigator.pop()}>
                <View style={styles.button}>
                <Text style={styles.buttonText}>Back</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        justifyContent: "space-around",
        height: "7%",
        width: "100%",
        backgroundColor: 'lightblue'
    },
    button: {
        // flexDirection: "row",

        width: "100%",
    },
    buttonText: {
        textAlign: 'left',
        padding: 10,
        color: 'white'
    }
});

export default ARNavBar;