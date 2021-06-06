import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { styles } from "./styles";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={home.container}>
      <Image
        style={{ width: "22%", height: "22%", aspectRatio: 1 / 1 }}
        source={require("../assets/images/qr-background.png")}
      />
      <Text style={home.info}>No QR codes saved</Text>
      <Text style={home.infoTwo}>Press Scan to add one.</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Scan QR");
        }}
        style={styles.btn}
      >
        <Text
          style={
            (styles.btnText,
            {
              fontFamily: "OpenSans_600SemiBold",
              color: "white",
              textAlign: "center",
              fontSize: 15,
            })
          }
        >
          Scan
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const home = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  info: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 2,
  },
  infoTwo: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 15,
  },
});

export default HomeScreen;
