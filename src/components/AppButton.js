import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { colors } from "../theme/colors";
import AppText from "./AppText";

export default function AppButton({icon, title, onPress, style,textColor,textColor2 ,...props}) {
  return (
    <TouchableOpacity {...props} onPress={onPress} style={[styles.button, style]}>
      {icon && icon}
      <AppText preset="h5" style={[styles.text,textColor2,textColor && {color:colors.gray},icon && {marginLeft:8}]}>{title}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.white,
  },
});
