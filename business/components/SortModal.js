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
      <Button title="price up" onPress={sort.bind(null, 'priceAscending')}/>
      <Button title="price down" onPress={sort.bind(null, 'priceDescending')}/>
      <Button title="most recent" onPress={sort.bind(null, 'mostRecent')}/>
      <Button title="oldest" onPress={sort.bind(null, 'oldestFirst')}/>
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