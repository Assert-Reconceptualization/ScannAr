import React from "react";
import { Text, View, StyleSheet } from "react-native";

// import screens

// ScannAR navigator
const Login = () => {
  return (
    <View style={styles.screen}>
      <Text>Login Screen</Text>
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
