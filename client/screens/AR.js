"use strict";

import React, { useState } from "react";

import { StyleSheet, View } from "react-native";

import {
  ViroARScene,
  ViroText,
  ViroARSceneNavigator,
  ViroNode,
} from "react-viro";

import ARNavBar from "../components/NavBar/ARNavBar";
import ARImageMarkerItem from "../components/AR/ARImageMarkerItem";
import products from '../mock-data/products';

const ARScreen = ({ navigator }) => {
  return (
    <View style={styles.screen}>
    <ARNavBar navigator={navigator} />
      <ViroARSceneNavigator
        initialScene={{
          scene: ARscene
        }}
      />
    </View>
  );
};

const ARscene = () => {
  const [text, setText] = useState('Initializing...')
  return (
    <ViroARScene onTrackingUpdated={() => setText('Look around to get started')}>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />
      <ViroNode>
        {products.map((item) => <ARImageMarkerItem item={item} key={item.name} />)}
      </ViroNode>
      </ViroARScene>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  },
});

export default ARScreen;

