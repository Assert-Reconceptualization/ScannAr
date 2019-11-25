import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

const CustomerNavBar = () => {
return (
    <View style={styles.bar}>
        <Button title="AR" onPress={() => navigator.push("AR")} />
        <Button title="Logout" onPress={() => navigator.pop()} />
    </View>
    )
};

const styles = StyleSheet.create({
    bar: {
        // flex:1,
        flexDirection: "row",
        height: 50,
        width: "100%",
        backgroundColor: 'lightblue'
    }
});

export default CustomerNavBar;