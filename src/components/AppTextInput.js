import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export default function AppTextInput({
  icon,
  placeholderText,
  style,
  penIcon,
  ...otherProps
}) {
  return (
    <View
      style={[
        styles.container,
        style,
        penIcon && {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
        icon && { flexDirection: "row", alignItems: "center" },
      ]}
    >
      {icon && icon}
      <TextInput
        placeholder={placeholderText}
        {...otherProps}
        style={{ width: "100%" }}
      />
      {penIcon && penIcon}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    padding: 15,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.light2,
    marginBottom: 15,
  }
});
