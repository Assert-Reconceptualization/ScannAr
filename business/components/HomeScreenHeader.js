/* eslint-disable no-use-before-define */
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const logo = require('../assets/images/business-logo.png');


export default function HomeScreenHeader() {
  const { container } = styles;

  return (
    <View style={container}>
      <Image source={logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
  },
});
