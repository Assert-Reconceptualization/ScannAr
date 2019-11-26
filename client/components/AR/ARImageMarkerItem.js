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

/**
 * This will dynamically create image markers for AR screen tracked items
 * @param {string} object
 */

const ARImageMarkerItem = ({ item }) => {

  ViroARTrackingTargets.createTargets({
    [item.name]: {
      source: { url: (`${item.url}`) },
      orientation: "Up",
      physicalWidth: 1 // real world width in meters
    }
  });

return (
    <ViroARImageMarker target={item.name}>
        <ViroNode key="card">
            <ViroNode
                style={{opacity: 0}}position={[0, -0.02, 0]}
                dragType="FixedToWorld"
                animation={{
                    name: 'animateImage',
                    run: true,
                    loop: false
                }}
            >
                <ViroFlexView
                    rotation={[-90, 0, 0]}
                    height={1}
                    width={1}
                    style={styles.card}
                >
                    <ViroFlexView
                        style={styles.cardWrapper}
                    >
                        <ViroText
                            textClipMode="None"
                            text={item.name}
                            scale={[.25, .25, .25]}
                            style={styles.textStyle}
                        />
                    </ViroFlexView>
                    <ViroFlexView
                        style={styles.subText}
                    >
                        <ViroText
                            width={0.01}
                            height={0.01}
                            textAlign="left"
                            textClipMode="None"
                            text={item.description}
                            scale={[.1, .1, .1]}
                            style={styles.textStyle}
                        />
                    </ViroFlexView>
                </ViroFlexView>
            </ViroNode>
        </ViroNode>
    </ViroARImageMarker>
  );
}

ViroAnimations.registerAnimations({
    animateImage: {
        properties: {
            positionX: 0.05,
            opacity: 1.0
        },
        easing: "Bounce",
        duration: 500
    },
    animateViro: {
        properties: {
            positionZ: 0.02,
            opacity: 1.0,
        },
        easing: "Bounce",
        duration: 500
    }
});

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
        // opacity: 0.5 
        /* Viro doesnt like opacity here */
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

export default ARImageMarkerItem;