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
    card,
    nameAndPrice,
    subText,
    textStyle,
    priceStyle,
  // eslint-disable-next-line no-use-before-define
  } = styles;

  return (
    <ViroARImageMarker target={item.name}>
      <ViroNode
        onClick={() => { setVisibility(); setProduct(item); }}
        key="card"
      >
        <ViroNode
          position={[0, -0.02, 0]}
          animation={{
            name: 'animateImage',
            run: true,
          }}
          scale={[1, 1, 1]}
        >
          <ViroFlexView
            rotation={[-90, 0, 0]}
            height={0.5}
            width={1}
            style={card}
          >
            <ViroFlexView
              style={nameAndPrice}
            >
              <ViroText
                textClipMode="None"
                text={item.name}
                scale={[0.25, 0.25, 0.25]}
                style={textStyle}
              />
              <ViroText
                text={`$${item.price}.00`}
                scale={[0.25, 0.25, 0.25]}
                style={priceStyle}
              />
            </ViroFlexView>
            <ViroFlexView style={subText}>
              <ViroText
                text="Click for info"
                scale={[0.15, 0.15, 0.15]}
                style={textStyle}
              />
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
      positionX: 0.05,
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
  nameAndPrice: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    flexDirection: 'column',
  },
  textStyle: {
    fontFamily: 'Roboto',
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  priceStyle: {
    fontFamily: 'Roboto',
    fontSize: 30,
    color: 'black',
    fontStyle: 'italic',
    fontWeight: 'bold',
    margin: 0.07,
  },
  subText: {
    height: 0.5,
    width: 0.3,
  },
});

export default ARImageMarkerItem;
