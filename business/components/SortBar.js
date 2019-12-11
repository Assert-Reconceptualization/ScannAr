/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';


export default function SortModal(props) {
  const {
    container,
    buttonText,
    highContainer,
    lowContainer,
    newContainer,
    oldContainer,
  } = styles;

  const { sort, active } = props;

  // handle button backgounds
  let old = 'transparent';
  let newest = 'transparent';
  let low = 'transparent';
  let high = 'transparent';
  // handle button text font
  let oldText = '#C4D2C5';
  let newestText = '#C4D2C5';
  let lowText = '#C4D2C5';
  let highText = '#C4D2C5';
  if (active === 'priceAscending') {
    high = '#C4D2C5';
    highText = '#1F251F';
  }
  if (active === 'priceDescending') {
    low = '#C4D2C5';
    lowText = '#1F251F';
  }
  if (active === 'mostRecent') {
    newest = '#C4D2C5';
    newestText = '#1F251F';
  }
  if (active === 'oldestFirst') {
    old = '#C4D2C5';
    oldText = '#1F251F';
  }

  return (
    <View style={container}>
      <TouchableOpacity style={{ backgroundColor: high, flex: 1, alignItems: 'center' }} onPress={() => sort('priceAscending')}>
        <Text style={[buttonText, { color: highText }]}>High</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor: low, flex: 1, alignItems: 'center' }} onPress={() => sort('priceDescending')}>
        <Text style={[buttonText, { color: lowText }]}>Low</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor: newest, flex: 1, alignItems: 'center' }} onPress={() => sort('mostRecent')}>
        <Text style={[buttonText, { color: newestText }]}>New</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor: old, flex: 1, alignItems: 'center' }} onPress={() => sort('oldestFirst')}>
        <Text style={[buttonText, { color: oldText }]}>Old</Text>
      </TouchableOpacity>
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
  buttonText: {
    fontSize: 20,
  },
});
