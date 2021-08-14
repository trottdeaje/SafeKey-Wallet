import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { styles } from "./styles";
import loadable from "@loadable/component";
const Version = loadable(() => import("../components/Version/Version"));

const NotFound = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: "OpenSans_600SemiBold",
            marginBottom: 10,
          }}
        >
          Oops
        </Text>
        <Text style={[styles.text, { textAlign: "center" }]}>
          The page you were looking for was not found.
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({ index: 0, routes: [{ name: "Home" }] })
            );
          }}
          style={[
            styles.shadow,
            styles.btn,
            {
              backgroundColor: "#1971ef",
              marginTop: 10,
            },
          ]}
        >
          <Text style={[styles.btnText, { color: "#fff" }]}>Go Back</Text>
        </TouchableOpacity>
      </View>
      <Version />
    </>
  );
};

export default NotFound;
