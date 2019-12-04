import React, { useState } from 'react';
import CustomerContext from './applicationState/customerContext';

// import screens
import Login from './screens/Login';
import AR from './screens/AR';
import CustomerLanding from './screens/CustomerLanding';

// import components
// eslint-disable-next-line import/named
import { Navigator, Route } from './navigation/Navigator';

// ScannAR navigator
const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [currentSavedList, setCurrentSavedList] = useState([]);
  const [allMarkers, setAllMarkers] = useState([]);
  const [serverUrl, setServerUrl] = useState('');
  return (
    <CustomerContext.Provider
      value={{
        serverUrl,
        setServerUrl,
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
        <Route name="AR" component={AR} />
      </Navigator>
    </CustomerContext.Provider>
  );
};

export default App;
