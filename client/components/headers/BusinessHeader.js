import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const BusinessHeader = ({navigator}) => {

  const handleLogout = () => {
      navigator.pop();
  }
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.text}>ScannAR B</Text>
      <Button title="Logout" onPress={handleLogout}/>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    height: "8%",
    backgroundColor: "#505950",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 5
  }
});

export default BusinessHeader;
