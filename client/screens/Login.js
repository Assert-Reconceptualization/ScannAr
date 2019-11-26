import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity
} from "react-native";

// import components

// ScannAR navigator
const Login = ({ navigator }) => {
  const [mode, setMode] = useState("CustomerLanding");
  const [customerColor, setCustomerColor] = useState("#01161D");
  const [businessColor, setBusinessColor] = useState("#86A4AF");

  const handlePress = (chosenMode) => {
    setMode(chosenMode);
    if (chosenMode === "CustomerLanding") {
      setCustomerColor("#01161D");
      setBusinessColor("#86A4AF");
    } else {
      setCustomerColor("#86A4AF");
      setBusinessColor("#01161D");
    }
  }
  
  const handleLogin = () => {
    navigator.push(mode);
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>ScannAR</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button1, { backgroundColor: customerColor }]}
          onPress={handlePress.bind(null, "CustomerLanding")}
        >
          <Text style={styles.customerTitle}>I am a customer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button2, { backgroundColor: businessColor }]}
          onPress={handlePress.bind(null, "Business")}
        >
          <Text style={styles.businessTitle}>I am a business</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loginContainer}>
        <TouchableOpacity
          style={styles.button3}
          onPress={handleLogin}
        >
          <Text style={styles.businessTitle}>Sign up with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: "10%",
    padding: 2,
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-around",
    backgroundColor: "#86A4AF",
    borderRadius: 5
  },
  loginContainer: {
    marginTop: "10%",
    padding: 2,
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-around",
    backgroundColor: "#86A4AF",
    borderRadius: 5
  },
  screen: {
    flex: 1,
    alignItems: "center",
    paddingTop: "30%",
    backgroundColor: "#082C39"
  },
  button1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 30,
    borderTopStartRadius: 5,
    borderBottomStartRadius: 5
  },
  button2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 30,
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5
  },
  button3: {
    flex: 1,
    backgroundColor: "#01161D",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 50,
    borderRadius: 5
  },
  customerTitle: {
    fontSize: 15,
    color: "white"
  },
  businessTitle: {
    fontSize: 15,
    color: "white"
  },
  header: {
    fontSize: 55,
    fontWeight: "bold",
    color: "white"
  }
});

export default Login;
