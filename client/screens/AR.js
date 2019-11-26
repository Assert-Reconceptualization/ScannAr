"use strict";

import React, { Component, useState } from "react";

import { StyleSheet, Button, View } from "react-native";

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARSceneNavigator,
  ViroFlexView,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroNode,
  ViroAnimations,
  ViroAnimatedImage,
} from "react-viro";

import ARNavBar from "../components/NavBar/ARNavBar";
import ARImageMarkerItem from "../components/AR/ARImageMarkerItem";
import products from '../mock-data/products';
// this will be targets given in props or from state
// let targets = [];

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
  var [text, setText] = useState('cool')
  var [runAnimation, setAnimation] = useState(false);
  return (
    <ViroARScene>
      <ViroText
        text={`${runAnimation}`}
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
  card: {
    flexDirection: 'column',
    backgroundColor: 'white',
    opacity: 0.5
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 0.001,
    flex: .5,
  },
  textStyle: {
    flex: .5,
    fontFamily: 'Roboto',
    fontSize: 30,
    color: 'black',
    textAlignVertical: 'top',
    textAlign: 'left',
    fontWeight: 'bold',
  },
});

export default ARScreen;

