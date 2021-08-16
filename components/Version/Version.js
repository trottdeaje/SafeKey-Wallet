import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Version = () => {
  return (
    <View style={VersionStyle.container}>
      <Text style={VersionStyle.text}>Version: 1.1.3</Text>
    </View>
  );
};

const VersionStyle = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "#f5f5f5",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 15,
  },
  text: {
    color: "#0000008c",
  },
});

export default Version;
