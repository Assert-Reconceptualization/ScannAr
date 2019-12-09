import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState, createContext } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppNavigator from "./navigation/AppNavigator";
//import state wrapper
import BusinessContext from "./applicationState/BusinessContext";

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Application state for holding current user and business data
  const [currentUser, setCurrentUser] = useState({});
  const [currentBusiness, setCurrentBusiness] = useState({});
  const [currentInventory, setCurrentInventory] = useState([]);
  const [appNavigator, setAppNavigator] = useState({});
  const [accessToken, setAccessToken] = useState(null);
  const [tags, setTags] = useState([]);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <BusinessContext.Provider
          value={{
            currentBusiness,
            currentUser,
            currentInventory,
            setCurrentBusiness,
            setCurrentUser,
            setCurrentInventory,
            appNavigator,
            setAppNavigator,
            accessToken,
            setAccessToken,
            tags,
            setTags
          }}
        >
          <AppNavigator />
        </BusinessContext.Provider>
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require("./assets/images/robot-dev.png"),
      require("./assets/images/robot-prod.png"),
      require("./assets/images/business-bg.png")
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
    })
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
