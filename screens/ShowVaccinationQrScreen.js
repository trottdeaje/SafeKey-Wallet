import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { styles } from "./styles";
import QRCode from "react-native-qrcode-svg";
import AppLoading from "expo-app-loading";
import Version from "../components/Version/Version";

const ShowQrVax = ({ navigation }) => {
  const [vaxExists, setVaxExists] = useState(null);
  const [vax, setVax] = useState(null);

  useEffect(() => {
    try {
      async function getVax() {
        const value = await AsyncStorage.getItem("BM.VAX");
        if (value !== null) {
          setVaxExists(true);
          setVax(value);
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
      {!vax ? (
        <AppLoading />
      ) : (
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 30,
              color: "#000",
              marginTop: 25,
            }}
          >
            Vaccination Certificate
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
                borderColor: "#fc9cc7",
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
              <QRCode value={vax} size={300} quietZone={10} color={"#121212"} />
            </View>
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
              marginTop: 50,
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

export default ShowQrVax;
