import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { styles } from "./styles";
import Version from "../components/Version/Version";

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
        <Text
          style={{
            fontFamily: "OpenSans_400Regular",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          The page you were looking for was not found.
        </Text>
        <TouchableOpacity
          onPress={() => {
            //   navigation.navigate("QR List");
            navigation.dispatch(
              CommonActions.reset({ index: 0, routes: [{ name: "QR List" }] })
            );
          }}
          style={{
            backgroundColor: "#1971ef",
            borderRadius: 15,
            marginTop: 20,
            shadowColor: "#470000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 2,
            padding: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "OpenSans_400Regular",
              color: "white",
              paddingHorizontal: 10,
              fontSize: 16,
            }}
          >
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
      <Version />
    </>
  );
};

export default NotFound;
