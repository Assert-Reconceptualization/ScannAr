/* eslint-disable react/prop-types */
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  const { name, focused } = props;
  return (
    <FontAwesome
      name={name}
      size={30}
      style={{ marginBottom: -5 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
