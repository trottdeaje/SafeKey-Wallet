import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Version from "../components/Version/Version";

const PassInfo = ({ navigation }) => {
  const [passExists, setPassExists] = useState(null);

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
    if (passExists === false) {
      navigation.dispatch(StackActions.replace("QR List"));
    }
  }, [passExists]);
  return (
    <>
      <View style={info.container}>
        <View>
          <Text style={info.header}>
            By allowing your SafeKey to be scanned you're agreeing to share the
            following information:
          </Text>
          <Text style={info.li}>
            1. Initials{"\n"}2. Date of Birth{"\n"}3. Expiry
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("SafeKey QR")}
          style={{
            backgroundColor: "#1971ef",
            marginBottom: 25,
            borderRadius: 15,
            width: "100%",
            maxWidth: 350,
            alignSelf: "center",
            shadowColor: "#470000",
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 5,
            shadowOpacity: 0.2,
            elevation: 2,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 18,
              paddingVertical: 10,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
      <Version />
    </>
  );
};

const info = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "7%",
    marginBottom: 50,
  },
  header: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 19,
    marginBottom: 25,
    marginTop: 25,
    alignSelf: "flex-start",
    color: "#333333",
  },
  li: {
    alignSelf: "flex-start",
    color: "black",
    fontFamily: "OpenSans_400Regular",
    lineHeight: 30,
    marginBottom: 30,
    fontSize: 18,
    textAlign: "left",
    marginLeft: 0,
    color: "#333333",
  },
});

export default PassInfo;
