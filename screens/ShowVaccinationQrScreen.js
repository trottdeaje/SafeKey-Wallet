import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { styles } from "./styles";
import QRCode from "react-native-qrcode-svg";
import Loading from "./Loading";

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
        <Loading />
      ) : (
        <View style={styles.container}>
          <Text style={styles.QrHeader}>Vaccination Certificate</Text>
          <View style={styles.center}>
            <View
              style={[
                styles.center,
                {
                  borderWidth: 5,
                  borderColor: "#fc9cc7",
                },
              ]}
            >
              <Image
                style={styles.bmQrLogo}
                source={require("../assets/images/bm-logo.svg")}
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

export default ShowQrVax;
