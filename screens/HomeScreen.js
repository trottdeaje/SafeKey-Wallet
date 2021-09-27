import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
import Loading from "./Loading";
import { styles } from "./styles";
import { useAssets } from "expo-asset";
import Version from "../components/Version/Version";

const HomeScreen = ({ navigation }) => {
  const [passExists, setPassExists] = useState(null);
  const [vaxExists, setVaxExists] = useState(null);

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
    if (vaxExists === true || passExists === true) {
      navigation.dispatch(StackActions.replace("QR List"));
    }
  }, [vaxExists, passExists]);

  return (
    <>
      {!assets ? (
        <Loading />
      ) : (
        <View
          style={[
            styles.container,
            {
              paddingBottom: 50,
            },
          ]}
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
        </View>
      )}
      <Version />
    </>
  );
};

export default HomeScreen;
