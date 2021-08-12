import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import loadable from "@loadable/component";
const Version = loadable(() => import("../components/Version/Version"));
const QrTile = loadable(() => import("../components/QrTile/QrTile"));
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAssets } from "expo-asset";
import { styles } from "./styles";
import AppLoading from "expo-app-loading";

import {
  FloatingMenu,
  MainButton,
  ChildButton,
} from "react-floating-button-menu";
import { Ionicons, Feather } from "@expo/vector-icons";

const QrList = ({ navigation }) => {
  const [vax, setVax] = useState(undefined);
  const [passkey, setPasskey] = useState(undefined);
  const [passExists, setPassExists] = useState();
  const [vaxExists, setVaxExists] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const [assets] = useAssets([
    require("../assets/images/upload.png"),
    require("../assets/images/camera.png"),
  ]);

  const noVaxExists = () => {
    setVaxExists(false);
  };

  const noPassExists = () => {
    setPassExists(false);
  };

  useEffect(() => {
    try {
      async function getPasskey() {
        const value = await AsyncStorage.getItem("BM.KEY");
        if (value !== null) {
          setPasskey(value);
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
          setVax(value);
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
    if (vaxExists === false && passExists === false) {
      navigation.dispatch(StackActions.replace("Home"));
    }
  }, [vaxExists, passExists]);

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      {!assets ? (
        <AppLoading />
      ) : (
        <View style={styles.containerTop}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              backgroundColor: "#f9f9f9",
              padding: 20,
              paddingBottom: 35,
              marginBottom: 25,
              marginTop: 5,
              width: "100%",
              maxWidth: 650,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#dadada",
            }}
          >
            <Text>
              <Text
                style={{
                  fontSize: 18,
                  alignSelf: "flex-start",
                  fontFamily: "OpenSans_600SemiBold",
                  color: "#919191",
                  display: "block",
                }}
              >
                Guide
              </Text>
              {"\n"}
              <Text style={{ fontSize: 14, color: "#919191" }}>{"\u2022"}</Text>
              <Text style={home.infoPoints}>
                {" "}
                SafeKey Wallet currently supports two QR Codes. Vaccination
                Certificate & SafeKey.
              </Text>
              {"\n"}
              <Text style={{ display: "block" }}> </Text>
              <Text style={{ fontSize: 14, color: "#919191" }}>{"\u2022"}</Text>
              <Text style={home.infoPoints}>
                {" "}
                Select the QR you want to present. Read the information on the
                next screen carefully, then continue.
              </Text>
              {"\n"}
              <Text style={{ display: "block" }}> </Text>
              <Text style={{ fontSize: 14, color: "#919191" }}>{"\u2022"}</Text>
              <Text style={home.infoPoints}>
                {" "}
                When your SafeKey expires, hold the trash icon to delete it. You
                can then scan your new SafeKey by pressing the camera Icon.
              </Text>
            </Text>
          </View>
          {vaxExists ? (
            <QrTile
              name="Vaccination Certificate"
              type="BM.VAX"
              holder="John Doe"
              removeItem={noVaxExists}
              infoScreen="Vaccination Notice"
              data={vax}
            />
          ) : (
            <Text></Text>
          )}
          {passExists ? (
            <QrTile
              name="SafeKey"
              type="BM.KEY"
              holder="John Doe"
              removeItem={noPassExists}
              infoScreen="SafeKey Notice"
              data={passkey}
            />
          ) : (
            <Text></Text>
          )}

          {!vaxExists ^ !passExists ? (
            <View
              style={{
                position: "absolute",
                bottom: -60,
                right: 20,
              }}
            >
              <FloatingMenu
                slideSpeed={500}
                direction="left"
                spacing={8}
                isOpen={isOpen}
                style={home.btn}
              >
                <MainButton
                  iconResting={<Feather name="plus" size={24} color="white" />}
                  iconActive={
                    <Ionicons name="close-outline" size={24} color="white" />
                  }
                  background="#1971ef"
                  onClick={() => setIsOpen(!isOpen)}
                  size={56}
                />
                <ChildButton
                  icon={
                    <Image
                      id="camera"
                      style={{ height: 20, width: 20 }}
                      source={require("../assets/images/camera.png")}
                    />
                  }
                  background="#1971ef"
                  size={40}
                  onClick={() => {
                    setIsOpen(!isOpen);
                    navigation.navigate("Scan QR");
                  }}
                />
                <ChildButton
                  icon={
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={require("../assets/images/upload.png")}
                    />
                  }
                  background="#1971ef"
                  size={40}
                  onClick={() => {
                    setIsOpen(!isOpen);
                    navigation.navigate("Select Document");
                  }}
                />
              </FloatingMenu>
            </View>
          ) : (
            <Text></Text>
          )}
        </View>
      )}
      <Version />
    </View>
  );
};
const home = StyleSheet.create({
  btn: {
    display: "flex",
    flexDirection: "row",
    width: 55,
    height: 55,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#1971ef",
    shadowColor: "#470000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  btnTwo: {
    display: "flex",
    flexDirection: "row",
    width: 55,
    height: 55,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 85,
    right: 20,
    backgroundColor: "#1971ef",
    shadowColor: "#470000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  infoPoints: {
    fontSize: 10,
    fontFamily: "OpenSans_400Regular",
    color: "#919191",
    marginBottom: -10,
  },
});

export default QrList;
