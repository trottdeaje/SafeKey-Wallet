import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { styles } from "./styles";
import QRCode from "react-native-qrcode-svg";
import Loading from "./Loading";

import Version from "../components/Version/Version";

const ShowQrContactKey = ({ navigation }) => {
  const [contactKeyExists, setContactKeyExists] = useState(null);
  const [contactKey, setContactKey] = useState(null);
  const [contactExpiry, setContactExpiry] = useState();

  useEffect(() => {
    try {
      async function getContactKey() {
        const value = await AsyncStorage.getItem("BM.CONTACTKEY");
        if (value !== null) {
          setContactKeyExists(true);
          setContactKey(value);
        } else {
          setContactKeyExists(false);
        }
      }
      getContactKey();
    } catch (e) {
      alert(e);
    }
  }, [contactKeyExists]);

  useEffect(() => {
    if (contactKeyExists === false) {
      navigation.dispatch(StackActions.replace("QR List"));
    }
  }, [contactKeyExists]);

  useEffect(() => {
    try {
      async function getContactExpiry() {
        const value = await AsyncStorage.getItem("contactExpiry");
        if (value !== null) {
          setContactExpiry(value);
        }
      }
      getContactExpiry();
    } catch (e) {
      alert(e);
    }
  }, []);

  return (
    <>
      {!contactKey ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <Text style={styles.QrHeader}>Contact Tracing Key</Text>
          <View style={styles.center}>
            <View
              style={[
                styles.center,
                {
                  borderWidth: 5,
                  borderColor: "#66c45f",
                },
              ]}
            >
              <Image
                style={styles.bmQrLogo}
                source={require("../assets/images/bm-logo.svg")}
              />
              <QRCode
                value={contactKey}
                size={300}
                quietZone={10}
                color={"#121212"}
              />
            </View>
            {!contactExpiry ? (
              <Text></Text>
            ) : (
              <Text style={[styles.bold, { marginTop: 20, fontSize: 18 }]}>
                Expiry:{" "}
                <Text style={[styles.text, { fontSize: 18 }]}>
                  {contactExpiry}
                </Text>
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(
                CommonActions.reset({ index: 0, routes: [{ name: "QR List" }] })
              )
            }
            style={[
              styles.btn,
              styles.shadow,
              {
                backgroundColor: "#1971ef",
                marginTop: 30,
                marginBottom: 25,
                maxWidth: 250,
              },
            ]}
          >
            <Text style={[styles.btnText, { color: "#fff" }]}>Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
      <Version />
    </>
  );
};

export default ShowQrContactKey;
