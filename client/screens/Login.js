import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity
} from "react-native";

// import components
import LoginHeader from '../components/headers/LoginHeader';

// ScannAR navigator
const Login = ({ navigator }) => {
  return (
    <View style={styles.screen}>
      <LoginHeader />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigator.push("CustomerLanding")}
        >
          <Text style={styles.text}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigator.push("Business")}
        >
          <Text style={styles.text}>Business</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 50
  },
  screen: {
    flex: 1,
    backgroundColor: "#59C9A5"
  },
  button: {
    height: "10%",
    width: "40%",
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30
  }
});

export default Login;
