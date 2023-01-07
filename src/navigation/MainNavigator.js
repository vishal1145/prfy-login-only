import React, { useRef } from "react";
import AuthNavigator from "./AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import navigationTheme from "./navigationTheme";

const MainNavigator = () => {
  const navRef = useRef();
  return (
    <NavigationContainer ref={navRef} theme={navigationTheme}>
      <AuthNavigator initialRoute={"Login"} />
    </NavigationContainer>
  );
};

export default MainNavigator;
