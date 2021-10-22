import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { styles } from "./styles";

import QRCode from "react-native-qrcode-svg";
import Loading from "./Loading";

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
        <Loading />
      ) : (
        <ScrollView
          contentContainerStyle={{
            margin: "auto",
          }}
          style={styles.scrollStyle}
        >
          <View style={styles.container}>
            <Text style={styles.QrHeader}>SafeKey</Text>
            <View style={styles.center}>
              <View
                style={[
                  styles.center,
                  {
                    borderWidth: 5,
                    borderColor: "#63acfa",
                  },
                ]}
              >
                <Image
                  style={styles.bmQrLogo}
                  source={require("../assets/images/bm-logo.svg")}
                />
                <QRCode
                  value={passkey}
                  size={250}
                  quietZone={10}
                  color={"#121212"}
                />
              </View>
              {!passExpiry ? (
                <Text></Text>
              ) : (
                <Text style={[styles.bold, { marginTop: 20, fontSize: 18 }]}>
                  Expiry:{" "}
                  <Text style={[styles.text, { fontSize: 18 }]}>
                    {passExpiry}
                  </Text>
                </Text>
              )}
            </View>

            <TouchableOpacity
              onPress={() =>
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "QR List" }],
                  })
                )
              }
              style={[
                styles.btn,
                styles.shadow,
                {
                  backgroundColor: "#1971ef",
                  marginTop: 20,
                  marginBottom: 25,
                  maxWidth: 250,
                },
              ]}
            >
              <Text style={[styles.btnText, { color: "#fff" }]}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default ShowQrPass;
