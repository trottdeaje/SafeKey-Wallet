import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QrTile from "../components/QrTile/QrTile";
import { styles } from "./styles";

const QrList = ({ navigation }) => {
  const [vax, setVax] = useState(undefined);
  const [passkey, setPasskey] = useState(undefined);
  const [passExists, setPassExists] = useState();
  const [vaxExists, setVaxExists] = useState();

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
    <View style={styles.containerTop}>
      {vaxExists ? (
        <QrTile
          name="Vaccination Certificate"
          type="BM.VAX"
          holder="John Doe"
          removeItem={noVaxExists}
          infoScreen="Vaccination Certificate Notice"
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Scan QR");
          }}
          style={home.btn}
        >
          <Image
            style={{ height: 25, width: 25 }}
            source={require("../assets/images/camera.png")}
          />
        </TouchableOpacity>
      ) : (
        <Text></Text>
      )}
    </View>
  );
};
const home = StyleSheet.create({
  btn: {
    display: "flex",
    flexDirection: "row",
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#1971ef",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});

export default QrList;
