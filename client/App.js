import React, { useState } from 'react';
import CustomerContext from './applicationState/customerContext';

// import screens
import Login from './screens/Login';
import AR from './screens/AR';
import CustomerLanding from './screens/CustomerLanding';
import BusinessLanding from './screens/BusinessLanding';

// import components
// eslint-disable-next-line import/named
import { Navigator, Route } from './navigation/Navigator';

// ScannAR navigator
const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [currentSavedList, setCurrentSavedList] = useState([]);
  const [allMarkers, setAllMarkers] = useState([]);

  return (
    <CustomerContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentSavedList,
        setCurrentSavedList,
        allMarkers,
        setAllMarkers,
      }}
    >
      <Navigator>
        <Route name="Login" component={Login} />
        <Route name="CustomerLanding" component={CustomerLanding} />
        <Route name="Business" component={BusinessLanding} />
        <Route name="AR" component={AR} />
      </Navigator>
    </CustomerContext.Provider>
  );
};

export default App;
