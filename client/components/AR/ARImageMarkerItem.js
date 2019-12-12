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

const back = require('../../assets/icons/back.png');

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
          position={[0, -0.7, 0]}
          animation={{
            name: 'animateImage',
            run: true,
          }}
        >
          <ViroFlexView
            rotation={[-90, 0, 0]}
            scale={[1, 1, 1]}
            height={1}
            width={1}
            style={{ flexDirection: 'row', backgroundColor: 'rgba(52, 52, 52, 0.8)' }}

          >
            <ViroFlexView
              width={0.4}
              height={1}
              style={{ flexDirection: 'column', justifyContent: 'center' }}
            >
              <ViroImage
                style={{ flex: 0.4 }}
                source={{ uri: item.imageUrl }}
              />
            </ViroFlexView>
            <ViroFlexView
              width={0.6}
              height={1}
              style={{ flexDirection: 'column', padding: 0.03 }}
            >
              <ViroText text={item.name} flex={1} style={itemText} fontSize={10} />
              <ViroText text={`$${item.price}.00`} flex={1} style={itemText} fontSize={10} />
              {/* <ViroText text="click for more info" flex={0.7} style={clickText} fontSize={8} /> */}
              <ViroImage
                height={0.5}
                width={0.5}
                source={back}
                onTouch={() => { setVisibility(); setProduct(item); }}
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
    // fontSize: 11,
    fontWeight: '900',
    color: 'white',
  },
  clickText: {
    fontFamily: "lucida grande', tahoma, verdana, arial, sans-serif", 
    // fontSize: 9,
    fontWeight: '900',
    color: 'white',
  },
});

export default ARImageMarkerItem;
