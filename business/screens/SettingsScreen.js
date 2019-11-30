import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import BusinessContext from '../applicationState/BusinessContext';

export default function SettingsScreen() {
  const context = useContext(BusinessContext);

  return (
    <View>
      <Text>{`Business Name: ${context.currentBusiness.name}`}</Text>
    </View>
  );
}

SettingsScreen.navigationOptions = {
  title: 'Edit Business Profile',
};
