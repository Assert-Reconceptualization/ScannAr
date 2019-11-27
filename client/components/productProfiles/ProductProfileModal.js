import React from 'react';
import {
  View, Modal, Text, Button,
} from 'react-native';

// eslint-disable-next-line react/prop-types
const ProductProfileModal = ({ visible, setVisibility, product }) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
    >
      <View
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Button title="Go Back" onPress={() => setVisibility(false)} />
          <Text>{product.name}</Text>
        </View>
      </View>
    </Modal>
  );
};
// {/* {item ? <Text>{item}</Text> : null} */ }
export default ProductProfileModal;
