import React, { useContext, useState } from 'react';
import {
    View, Modal, Text, Picker, StyleSheet
} from 'react-native';

const SortModal = ({ sortVisibility, setSortVisibility, setSortingBy, sortingBy }) => {

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={sortVisibility}
    >
      <View>
        <Text>Im a modal</Text>
        <Picker
          selectedValue={sortingBy}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue) => setSortingBy(itemValue)}
        >
          <Picker.Item label="mostRecent" value="mostRecent" />
        </Picker>
      </View>
    </Modal>
  )
};

export default SortModal;