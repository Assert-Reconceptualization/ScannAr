import React, { useState } from 'react';

import { StyleSheet, View, Modal } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroARSceneNavigator,
  ViroNode,
} from 'react-viro';

import ARNavBar from '../components/NavBar/ARNavBar';
import ARImageMarkerItem from '../components/AR/ARImageMarkerItem';
import products from '../mock-data/products';
import ProductProfileModal from '../components/productProfiles/ProductProfileModal';

const ARScreen = ({ navigator }) => {
  // eslint-disable-next-line no-use-before-define
  const [visible, setVisibility] = useState(false);
  const [product, setProduct] = useState('');
  const { screen } = styles;
  return (
    <View style={screen}>
      <ProductProfileModal visible={visible} setVisibility={setVisibility} product={product}/>
      <ARNavBar navigator={navigator} />
      <ViroARSceneNavigator
        initialScene={{
          // eslint-disable-next-line no-use-before-define
          scene: ARscene,
        }}
      />
    </View>
  );
};

const ARscene = () => {
  const [text, setText] = useState('Initializing...');
  // eslint-disable-next-line no-use-before-define
  const { initialText } = styles;
  return (
    <ViroARScene onTrackingUpdated={() => setText('Look around to get started')}>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={initialText}
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
  initialText: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default ARScreen;
