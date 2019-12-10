/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { Component, useContext } from 'react';

import { View } from 'react-native';

import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroNode,
} from 'react-viro';

import ARNavBar from '../components/NavBar/ARNavBar';
import ARImageMarkerItem from '../components/AR/ARImageMarkerItem';
import ProductProfileModal from '../components/productProfiles/ProductProfileModal';
import CustomerContext from '../applicationState/customerContext';


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
            scene: ARscene,
            passProps: { setVisibility, setProduct },
          }}
        />
      </View>
    );
  }
}

const ARscene = ({ setVisibility, setProduct }) => {
  const context = useContext(CustomerContext);
  const { allMarkers } = context;
  return (
    <ViroARScene>
      <ViroNode>
        {allMarkers.map((item) => (
          <ARImageMarkerItem
            setVisibility={setVisibility}
            setProduct={setProduct}
            item={item}
            key={item.id}
          />
        ))}
      </ViroNode>
    </ViroARScene>
  );
};

export default ARScreen;
