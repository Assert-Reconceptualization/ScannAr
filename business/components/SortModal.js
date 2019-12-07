import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function SortModal(props) {
  const { container } = styles;
  const { sort } = props;
  return (
    <View style={container}>
      <Text>Sort By:</Text>
      <Button title="Lowest" onPress={() => sort('priceAscending')}/>
      <Button title="Highest" onPress={() => sort('priceDescending')}/>
      <Button title="Most Recent" onPress={() => sort('mostRecent')}/>
      <Button title="Oldest" onPress={() => sort('oldestFirst')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    backgroundColor: '#EFF6E0',
    justifyContent: 'center',
    borderTopStartRadius: 5,
    borderBottomStartRadius: 5,
  }
});