import React, { Component, useState } from 'react';

import { StyleSheet, View } from 'react-native';

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


class ARScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      product: {},
    };
    this.setVisibility = this.setVisibility.bind(this);
    this.setProduct = this.setProduct.bind(this);
  }

  setVisibility() {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  }

  setProduct(item) {
    this.setState({ product: item });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { navigator } = this.props;
    const { visible, product } = this.state;
    const { setProduct, setVisibility } = this;
    return (
      <View style={{ flex: 1 }}>
        <ProductProfileModal
          visible={visible}
          setVisibility={this.setVisibility}
          product={product}
        />
        <ARNavBar navigator={navigator} />
        <ViroARSceneNavigator
          initialScene={{
            // eslint-disable-next-line no-use-before-define
            scene: ARscene,
            passProps: { setVisibility, setProduct },
          }}
        />
      </View>
    );
  }
}

// eslint-disable-next-line react/prop-types
const ARscene = ({ setVisibility, setProduct }) => {
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
        {products.map((item) => (
          <ARImageMarkerItem
            setVisibility={setVisibility}
            setProduct={setProduct}
            item={item}
            key={item.name}
          />
        ))}
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
