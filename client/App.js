import React from 'react';
import { StyleSheet, View, Button } from "react-native";

// import screens
import Login from './screens/Login';
import AR from './screens/AR';
import ClientNavbar from './components/navbar/ClientNavbar'
import { Navigator, Route } from './navigation/Navigator';

// ScannAR navigator

const Screen2 = ({ navigator }) => (
  <View style={[styles.screen, { backgroundColor: "#23395B" }]}>
    <Button title="Augmented Reality" onPress={() => navigator.push("AR")} />
    <Button title="Logout" onPress={() => navigator.pop()} />
  </View>
);

const Screen3 = ({ navigator }) => (
  <View style={[styles.screen, { backgroundColor: "#B9E3C6" }]}>
    <Button title="Logout" onPress={() => navigator.pop()} />
  </View>
);

export default class App extends React.Component {
  render() {
    return (
      <Navigator>
        <Route name="Login" component={Login} />
        <Route name="Customer" component={Screen2} />
        <Route name="Business" component={Screen3} />
        <Route name="AR" component={AR} />
      </Navigator>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
