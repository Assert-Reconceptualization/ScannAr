import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoginHeader = () => {
  // eslint-disable-next-line no-use-before-define
  const { titleContainer, text } = styles;

  return (
    <View style={titleContainer}>
      <Text style={text}>
                ScannAR
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    height: '8%',
    backgroundColor: '#114559',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 5,
  },
});

export default LoginHeader;
