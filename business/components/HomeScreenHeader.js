import React, { useContext } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BusinessContext from '../applicationState/BusinessContext';

export default function HomeScreenHeader(props){

  const context = useContext(BusinessContext);

  const handleLogout = () => {
    // clear currentbusiness
    context.setCurrentBusiness({});
    context.setAppNavigator({});
    context.appNavigator.navigate({routeName: 'Auth'});
  }

  const { text, logoutIcon, container } = styles;

  return (
    <View style={container}>
      <Text style={text} >ScannAR for Business</Text>
      <TouchableOpacity onPress={handleLogout} >
        <Ionicons name="ios-log-out" size={40} style={logoutIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutIcon: {
    color: '#EFF6E0',
  },
  text: {
    fontSize: 20,
    color: 'white'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});