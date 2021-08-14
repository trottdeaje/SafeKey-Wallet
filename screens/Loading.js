import React from "react";
import { View, ActivityIndicator } from "react-native";
import { styles } from "./styles";

const Loading = () => {
  return (
    <View style={[styles.container, { marginBottom: 0, paddingHorizontal: 0 }]}>
      <ActivityIndicator color="#000f0f" />
    </View>
  );
};

export default Loading;
