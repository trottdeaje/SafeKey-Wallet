import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
import Loading from "./Loading";
import { styles } from "./styles";
import { useAssets } from "expo-asset";

const HomeScreen = ({ navigation }) => {
  const [passExists, setPassExists] = useState(null);
  const [vaxExists, setVaxExists] = useState(null);
  const [contactKeyExists, setContactKeyExists] = useState(null);

  const [assets] = useAssets([
    require("../assets/images/qr-background.svg"),
    require("../assets/images/bm-logo.svg"),
    require("../assets/images/share-min.svg"),
  ]);
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
    try {
      async function getContactKey() {
        const value = await AsyncStorage.getItem("BM.CONTACTKEY");
        if (value !== null) {
          setContactKeyExists(true);
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
    if (
      vaxExists === true ||
      passExists === true ||
      contactKeyExists === true
    ) {
      navigation.dispatch(StackActions.replace("QR List"));
    }
  }, [vaxExists, passExists, contactKeyExists]);

  return (
    <>
      {!assets ? (
        <Loading />
      ) : (
        <ScrollView
          contentContainerStyle={styles.container}
          style={{ backgroundColor: "#fff" }}
        >
          <View>
            <Image
              resizeMethod="auto"
              style={{ height: 150, width: 170, marginTop: 25 }}
              source={require("../assets/images/qr-background.svg")}
            />
          </View>
          <Text style={[styles.bold, { marginBottom: 2, fontSize: 18 }]}>
            No SafeKeys found
          </Text>
          <Text
            style={[
              styles.text,
              { marginTop: 0, marginBottom: 15, textAlign: "center" },
            ]}
          >
            Press Scan or Select to add one.
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Scan QR");
            }}
            style={[
              styles.btn,
              styles.shadow,
              { backgroundColor: "#1971ef", borderWidth: 0 },
            ]}
          >
            <Text
              style={[
                styles.btnText,
                {
                  color: "white",
                },
              ]}
            >
              Scan Document
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              styles.shadow,
              styles.btnLine,
              {
                backgroundColor: "#fff",
                marginTop: 16,
              },
            ]}
            onPress={() => {
              navigation.navigate("Select Document");
            }}
          >
            <Text style={[styles.btnText, { color: "#1971ef" }]}>
              Select Document
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </>
  );
};

export default HomeScreen;
