import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({ style, title, titleStyle, ...otherProps }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} {...otherProps}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#5033FB",
    borderRadius: 12,
    height: 44,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  title: {
    color: "white",
  },
});

export default Button;
