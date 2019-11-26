import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";

const BusinessNavbar = ({ navigator }) => {
  
  const [onLanding, setOnLanding] = useState(true);

  const handleProductsButton = () => {
      if(!onLanding){
        navigator.push("Business")
      }
  }

  return (
    <View style={styles.bar}>
      <TouchableOpacity onPress={handleProductsButton}>
        <Text style={styles.buttonText}>Prod</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.buttonText}>Prof.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#505950"
  },
  button: {
    borderRadius: 10,
    marginBottom: 1,
    width: 260,
    alignItems: "center",
    backgroundColor: "#2196F3"
  },
  buttonText: {
    textAlign: "center",
    color: "white"
  }
});

export default BusinessNavbar;
