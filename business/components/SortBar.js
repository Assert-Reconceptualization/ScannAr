import React from 'react';
import {
  View,
  StyleSheet,
  Button,
} from 'react-native';


export default function SortModal(props) {
  const { container } = styles;
  const { sort } = props;
  return (
    <View style={container}>
      <Button title="Low" onPress={() => sort('priceAscending')} />
      <Button title="High" onPress={() => sort('priceDescending')} />
      <Button title="Newest" onPress={() => sort('mostRecent')} />
      <Button title="Oldest" onPress={() => sort('oldestFirst')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1F251F',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#AEC3B0',
    flex: 6,
  },
});
