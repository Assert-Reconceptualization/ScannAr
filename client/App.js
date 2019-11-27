import React from 'react';

// import screens
import Login from './screens/Login';
import AR from './screens/AR';
import CustomerLanding from './screens/CustomerLanding';
import BusinessLanding from './screens/BusinessLanding';

// import components
import { Navigator, Route } from './navigation/Navigator';

// ScannAR navigator
const App = () => (
  <Navigator>
    <Route name="Login" component={Login} />
    <Route name="CustomerLanding" component={CustomerLanding} />
    <Route name="Business" component={BusinessLanding} />
    <Route name="AR" component={AR} />
  </Navigator>
);

export default App;
