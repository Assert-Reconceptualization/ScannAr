/* eslint-disable react/prop-types */
import React from 'react';
import { Platform, View } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config,
);

HomeStack.navigationOptions = {
  tabBarLabel: <View />,
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="list-ul" />,
};

HomeStack.path = '';

const AddStack = createStackNavigator(
  {
    Add: AddScreen,
  },
  config,
);

AddStack.navigationOptions = {
  tabBarLabel: <View />,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="plus-circle" />
  ),
};

AddStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config,
);

SettingsStack.navigationOptions = {
  tabBarLabel: <View />,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="user" />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    AddStack,
    SettingsStack,
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#505950',
      },
    },
  },
);

tabNavigator.path = '';

export default tabNavigator;
