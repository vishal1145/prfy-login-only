import "expo-dev-client";
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import MainNavigator from "./src/navigation/MainNavigator";
import { store } from "./src/redux/store";
import * as Font from "expo-font";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  let customFonts = {
    Hind_400Regular: require("./src/assets/fonts/Hind-Regular.ttf"),
    Hind_600SemiBold: require("./src/assets/fonts/Hind-SemiBold.ttf"),
    Hind_700Bold: require("./src/assets/fonts/Hind-Bold.ttf"),
  };

  const loadFonts = async () => {
    console.log(customFonts);
    await Font.loadAsync(customFonts);

    setFontLoaded(true);
  };
  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}
