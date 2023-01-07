import {
  TouchableOpacity,
  Platform,
  StatusBar,
  SafeAreaView,
  View,
} from "react-native";
import React from "react";

import AppText from "./AppText";
import { colors } from "../theme";
import Gradient from "./Gradient";
import { useRoute } from "@react-navigation/native";
import Hamburger from "../svg/Hamburger";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { ArrowLeft } from "../svg";
export default function Header({
  title,
  style,
  background = true,
  goBack = true,
}) {
  const navigation = useNavigation();
  const { isAuthenticated } = useSelector((state) => state.userInfo);

  const showBack = goBack && Platform.OS === "ios" ? true : false;

  return (
    <>
      {background && <Gradient />}
      <StatusBar backgroundColor={colors.primary} />
      <SafeAreaView
        style={[
          {
            display: "flex",
            flexDirection: "row",
            justifyContent: isAuthenticated?"space-between":'center',
            alignItems: "center",
            position: "relative",
            paddingHorizontal: 10,
            marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 60,
          },
          style,
        ]}
      >
        {isAuthenticated && (
          <TouchableOpacity style={{padding:10}} onPress={() => navigation.toggleDrawer()}>
            <Hamburger />
          </TouchableOpacity>
        )}

        <AppText
          preset="h4"
          style={{
            fontSize: 18,
            color: colors.white,
          }}
        >
          {title ? title : useRoute().name}
        </AppText>

        <TouchableOpacity
          activeOpacity={0}
          style={{ fill: colors.white, opacity: showBack ? 1 : 0 }}
          onPress={showBack ? () => navigation.goBack() : () => {}}
        >
          <ArrowLeft style={{ fill: colors.white }} />
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}
