import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";

import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";
import Checkbox from "expo-checkbox";

const PassInfo = ({ navigation }) => {
  const [passExists, setPassExists] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const [checkboxAvailable, setCheckboxAvailable] = useState(false);
  Checkbox.isAvailableAsync().then((isAvailable) => {
    if (isAvailable) {
      setCheckboxAvailable(true);
    }
  });

  const skipScreen = async () => {
    await AsyncStorage.setItem("no_notice_safekey", true);
  };

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
      <ScrollView
        contentContainerStyle={{
          margin: "auto",
        }}
        style={[styles.scrollStyle]}
      >
        <View style={styles.container}>
          <View>
            <Text style={styles.noticeHeader}>
              By allowing your SafeKey to be scanned you're agreeing to share
              the following information:
            </Text>
            <Text style={styles.li}>
              1. Initials{"\n"}2. Date of Birth{"\n"}3. Expiry
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (isChecked) {
                skipScreen();
              }
              navigation.navigate("SafeKey QR");
            }}
            style={[
              styles.btn,
              styles.shadow,
              { backgroundColor: "#1971ef", maxWidth: 350, marginBottom: 25 },
            ]}
          >
            <Text style={[styles.btnText, { color: "#fff" }]}>Continue</Text>
          </TouchableOpacity>
          <>
            {checkboxAvailable ? (
              <View
                style={[
                  styles.center,
                  { flexDirection: "row", marginBottom: 10 },
                ]}
              >
                <Text style={[styles.text, { marginEnd: 8 }]}>
                  Don't show again
                </Text>
                <Checkbox value={isChecked} onValueChange={setChecked} />
              </View>
            ) : null}
          </>
        </View>
      </ScrollView>
    </>
  );
};

export default PassInfo;
