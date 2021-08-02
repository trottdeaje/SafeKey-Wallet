import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { styles } from "./styles";
import QRCode from "react-native-qrcode-svg";
import AppLoading from "expo-app-loading";
import Version from "../components/Version/Version";

const ShowQrPass = ({ navigation }) => {
  const [passExists, setPassExists] = useState(null);
  const [passkey, setPasskey] = useState(null);
  const [passExpiry, setPassExpiry] = useState(null);

  useEffect(() => {
    try {
      async function getPasskey() {
        const value = await AsyncStorage.getItem("BM.KEY");
        if (value !== null) {
          setPassExists(true);
          setPasskey(value);
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
    if (passExists === false) {
      navigation.dispatch(StackActions.replace("QR List"));
    }
  }, [passExists]);

  useEffect(() => {
    try {
      async function getPassExpiry() {
        const value = await AsyncStorage.getItem("passExpiry");
        if (value !== null) {
          setPassExpiry(value);
        }
      }
      getPassExpiry();
    } catch (e) {
      alert(e);
    }
  }, []);

  return (
    <>
      {!passkey ? (
        <AppLoading />
      ) : (
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 30,
              marginTop: 25,
              color: "#000",
            }}
          >
            SafeKey
          </Text>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                borderWidth: 5,
                borderColor: "#63acfa",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: 82,
                  height: 82,
                  position: "absolute",
                }}
                source={require("../assets/images/bm-logo.png")}
              />
              <QRCode
                value={passkey}
                size={300}
                logoSize={82}
                logo={require("../assets/images/bm-logo.png")}
                quietZone={10}
                color={"#121212"}
              />
            </View>
            {!passExpiry ? (
              <Text></Text>
            ) : (
              <Text style={{ fontSize: 18, fontWeight: "500", marginTop: 20 }}>
                Expiry:{" "}
                <Text style={{ fontWeight: "normal" }}>{passExpiry}</Text>
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(
                CommonActions.reset({ index: 0, routes: [{ name: "QR List" }] })
              )
            }
            style={{
              backgroundColor: "#1971ef",
              borderRadius: 15,
              marginTop: 30,
              marginBottom: 25,
              shadowColor: "#470000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 5,
              elevation: 2,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "left",
                fontSize: 18,
                paddingHorizontal: 100,
                paddingVertical: 10,
              }}
            >
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Version />
    </>
  );
};

export default ShowQrPass;
