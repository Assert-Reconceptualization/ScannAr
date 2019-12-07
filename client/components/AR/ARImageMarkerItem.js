/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroText,
  ViroFlexView,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroNode,
  ViroAnimations,
  ViroImage,

} from 'react-viro';

/**
 * This will dynamically create image markers for AR screen tracked items
 * @param {string} object
 */

const ARImageMarkerItem = ({ item, setProduct, setVisibility }) => {
  // dynamically create targets
  ViroARTrackingTargets.createTargets({
    [item.name]: {
      source: { url: `${item.imageUrl}` },
      orientation: 'Up',
      physicalWidth: 1.5, // real world width in meters
    },
  });

  const {
    itemText,
    clickText,
  } = styles;

  return (
    <ViroARImageMarker
      target={item.name}
      onClick={() => { setVisibility(); setProduct(item); }}
    >
      <ViroNode key="card">
        <ViroNode
          position={[0, -0.2, 0]}
          scale={[1, 1, 1]}
          animation={{
            name: 'animateImage',
            run: true,
          }}
        >
          <ViroFlexView
            scale={[0.5, 0.5, 0.5]}
            rotation={[-90, 0, 0]}
            height={1}
            width={1.25}
            style={{ flexDirection: 'row', backgroundColor: 'black' }}

          >
            <ViroFlexView
              width={0.4}
              height={1}
              style={{ flexDirection: 'column' }}
            >
              <ViroImage
                style={{ flex: 0.4 }}
                source={{ uri: item.imageUrl }}
              />
            </ViroFlexView>
            <ViroFlexView
              width={0.6}
              height={1}
              style={{ flexDirection: 'column', padding: 0.1 }}
            >
              <ViroText text={item.name} flex={0.3} style={itemText} />
              <ViroText text={`$${item.price}.00`} flex={0.3} style={itemText} />
              <ViroText text="click for more" flex={0.4} style={clickText} />
            </ViroFlexView>
          </ViroFlexView>
        </ViroNode>
      </ViroNode>
    </ViroARImageMarker>
  );
};

ViroAnimations.registerAnimations({
  animateImage: {
    properties: {
      positionX: 0.00,
      opacity: 1.0,
    },
    easing: 'Bounce',
    duration: 500,
  },
  animateViro: {
    properties: {
      positionZ: 0.02,
      opacity: 1.0,
    },
    easing: 'Bounce',
    duration: 500,
  },
});

const styles = StyleSheet.create({
  itemText: {
    fontFamily: "lucida grande', tahoma, verdana, arial, sans-serif", 
    fontSize: 12,
    fontWeight: "900",
    color: "#ffffff",
  },
  clickText: {
    fontFamily: "lucida grande', tahoma, verdana, arial, sans-serif", 
    fontSize: 9,
    fontWeight: '400',
    color: "white",
  },
});

export default ARImageMarkerItem;
