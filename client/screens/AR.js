"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import { ViroARScene, ViroText, ViroConstants, ViroARSceneNavigator } from "react-viro";

const ARScreen = () => {
  return (
    <ViroARSceneNavigator
      initialScene={{
        scene: ARscene
      }}
    />
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
}

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

export default ARScreen;

