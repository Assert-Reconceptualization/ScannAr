import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoginHeader = () => {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.text}>
                ScannAR
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
  titleContainer: {
    height: "8%",
    backgroundColor: "#114559",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 5
  }
});

export default LoginHeader;