import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { styles } from "./styles";
import { useAssets } from "expo-asset";
import loadable from "@loadable/component";
const Version = loadable(() => import("../components/Version/Version"));

const HomeScreen = ({ navigation }) => {
  const [assets] = useAssets([
    require("../assets/images/qr-background.png"),
    require("../assets/images/bm-logo.png"),
    require("../assets/images/nocam.png"),
  ]);
  const [passExists, setPassExists] = useState(null);
  const [vaxExists, setVaxExists] = useState(null);

  useEffect(() => {
    try {
      async function getPasskey() {
        const value = await AsyncStorage.getItem("BM.KEY");
        if (value !== null) {
          setPassExists(true);
        } else {
          setPassExists(false);
        }
      }
      getPasskey();
    } catch (e) {
      alert(e);
    }
  }, [passExists]);

  useEffect(() => {
    try {
      async function getVax() {
        const value = await AsyncStorage.getItem("BM.VAX");
        if (value !== null) {
          setVaxExists(true);
        } else {
          setVaxExists(false);
        }
      }
      getVax();
    } catch (e) {
      alert(e);
    }
  }, [vaxExists]);

  useEffect(() => {
    if (vaxExists === true || passExists === true) {
      navigation.dispatch(StackActions.replace("QR List"));
    }
  }, [vaxExists, passExists]);

  return (
    <>
      {!assets ? (
        <AppLoading />
      ) : (
        <View style={home.container}>
          <View>
            <Image
              resizeMethod="auto"
              style={{ height: 150, width: 150, marginTop: 25 }}
              source={require("../assets/images/qr-background.png")}
            />
          </View>
          <Text style={home.info}>No SafeKey's found</Text>
          <Text style={home.infoTwo}>Press Scan or Upload to add one.</Text>
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
                  fontSize: 17,
                })
              }
            >
              Scan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={home.btnOutline}
            onPress={() => {
              navigation.navigate("Upload Document");
            }}
          >
            <Text style={styles.btnTextOutline}>Upload</Text>
          </TouchableOpacity>
        </View>
      )}
      <Version />
    </>
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
    marginBottom: 50,
  },
  info: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 2,
    color: "#000",
  },
  infoTwo: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 15,
    color: "#000",
  },
  btn: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "#1971ef",
    borderRadius: 10,
    paddingVertical: 11,
    shadowColor: "#470000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    marginTop: 20,
    borderWidth: 2.5,
    borderColor: "#1971ef",
  },
  btnOutline: {
    width: "100%",
    maxWidth: 500,
    borderWidth: 2.5,
    borderColor: "#1971ef",
    borderRadius: 10,
    paddingVertical: 11,
    shadowColor: "#470000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    marginTop: 16,
  },
});

export default HomeScreen;
