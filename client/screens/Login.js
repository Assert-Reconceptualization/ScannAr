import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

// import screens

// ScannAR navigator
const Login = ({ navigator }) => {
  return (
    <View style={[styles.screen, { backgroundColor: "#59C9A5" }]}>
      <Button title="Customer" onPress={() => navigator.push("Customer")} />
      <Button title="Business" onPress={() => navigator.push("Business")} />
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Login;
