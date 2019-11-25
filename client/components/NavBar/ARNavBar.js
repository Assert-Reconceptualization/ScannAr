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
        justifyContent: "space-around",
        height: "7%",
        width: "100%",
        opacity: 50,
        backgroundColor: 'lightblue'
    },
    button: {
        width: "100%",
    },
    buttonText: {
        textAlign: 'left',
        padding: 10,
        color: 'white'
    }
});

export default ARNavBar;