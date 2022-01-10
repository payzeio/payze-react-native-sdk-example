import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

const Input = ({ style, ...otherProps }) => {
  return <TextInput style={[styles.container, style]} {...otherProps} />;
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#5033FB99",
    borderWidth: 1,
    borderRadius: 12,
    height: 44,
    paddingHorizontal: 12,
  },
});

export default Input;
