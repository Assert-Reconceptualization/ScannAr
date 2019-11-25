"use strict";

import React, { Component } from "react";

import { StyleSheet, Button, View } from "react-native";

import { ViroARScene, ViroText, ViroConstants, ViroARSceneNavigator } from "react-viro";

const ARScreen = ({ navigator }) => {
  return (
    <View style={styles.screen}>
      <ViroARSceneNavigator
        initialScene={{
          scene: ARscene
        }}
      />
      <Button title="Go Back" onPress={() => navigator.pop()} />
    </View>
  );
};

const ARscene = () => {
  return (
    <ViroARScene>
      <ViroText
        text="coool"
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />
    </ViroARScene>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

export default ARScreen;

