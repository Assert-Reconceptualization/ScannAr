import React from 'react';
import { StyleSheet, View, Button } from "react-native";

// import screens
import Login from './screens/Login';
import AR from './screens/AR';
import CustomerLanding from './screens/CustomerLanding';
import BusinessLanding from './screens/BusinessLanding';

// import components
import { Navigator, Route } from './navigation/Navigator';

// ScannAR navigator
export default class App extends React.Component {
  render() {
    return (
      <Navigator>
        <Route name="Login" component={Login} />
        <Route name="CustomerLanding" component={CustomerLanding} />
        <Route name="Business" component={BusinessLanding} />
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
