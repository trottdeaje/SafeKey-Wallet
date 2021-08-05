import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Version from "../components/Version/Version";

const VaxInfo = ({ navigation }) => {
  const [vaxExists, setVaxExists] = useState(null);

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
    if (vaxExists === false) {
      navigation.dispatch(StackActions.replace("QR List"));
    }
  }, [vaxExists]);

  return (
    <>
      <View style={info.container}>
        <View>
          <Text style={info.header}>
            By allowing your Vaccination Certificate to be scanned you're
            agreeing to share the following information:
          </Text>
          <Text style={info.li}>
            1. Full Name{"\n"}2. Date of Birth{"\n"}3. Expiry{"\n"}4. Vaccine
            Type
            {"\n"}
            5. Vaccine Dosage{"\n"}6. Date of Vaccination
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Vaccination Certificate QR")}
          style={{
            backgroundColor: "#1971ef",
            borderRadius: 15,
            marginBottom: 25,
            width: "100%",
            maxWidth: 350,
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

export default VaxInfo;
