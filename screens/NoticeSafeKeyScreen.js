import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import loadable from "@loadable/component";
import { styles } from "./styles";
const Version = loadable(() => import("../components/Version/Version"));

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
      <View style={styles.container}>
        <View>
          <Text style={styles.noticeHeader}>
            By allowing your SafeKey to be scanned you're agreeing to share the
            following information:
          </Text>
          <Text style={styles.li}>
            1. Initials{"\n"}2. Date of Birth{"\n"}3. Expiry
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("SafeKey QR")}
          style={[
            styles.btn,
            styles.shadow,
            { backgroundColor: "#1971ef", maxWidth: 350, marginBottom: 25 },
          ]}
        >
          <Text style={[styles.btnText, { color: "#fff" }]}>Continue</Text>
        </TouchableOpacity>
      </View>
      <Version />
    </>
  );
};

export default PassInfo;
