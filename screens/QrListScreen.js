import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QrTile from "../components/QrTile/QrTile";
import { useAssets } from "expo-asset";
import { styles } from "./styles";
import AppLoading from "expo-app-loading";
import Version from "../components/Version/Version";

const QrList = ({ navigation }) => {
  const [vax, setVax] = useState(undefined);
  const [passkey, setPasskey] = useState(undefined);
  const [passExists, setPassExists] = useState();
  const [vaxExists, setVaxExists] = useState();

  const [assets] = useAssets([require("../assets/images/camera.png")]);

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
    <>
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
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Scan QR");
                }}
                style={home.btn}
              >
                <Image
                  id="camera"
                  style={{ height: 25, width: 25 }}
                  source={require("../assets/images/camera.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Upload Document");
                }}
                style={home.btnTwo}
              >
                {/* <MaterialIcons name="file-upload" size={24} color="white" /> */}
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("../assets/images/upload.png")}
                />
              </TouchableOpacity>
            </>
          ) : (
            <Text></Text>
          )}
        </View>
      )}
      <Version />
    </>
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
