import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";
import Checkbox from "expo-checkbox";
import Version from "../components/Version/Version";

const VaxInfo = ({ navigation }) => {
  const [vaxExists, setVaxExists] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const [checkboxAvailable, setCheckboxAvailable] = useState(false);
  Checkbox.isAvailableAsync().then((isAvailable) => {
    if (isAvailable) {
      setCheckboxAvailable(true);
    }
  });
  const skipScreenVaccine = async () => {
    await AsyncStorage.setItem("no_notice_vaccine", true);
  };

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
      <View style={styles.container}>
        <View>
          <Text style={styles.noticeHeader}>
            By allowing your Vaccination Certificate to be scanned you're
            agreeing to share the following information:
          </Text>
          <Text style={styles.li}>
            1. Full Name{"\n"}2. Date of Birth{"\n"}3. Expiry{"\n"}4. Vaccine
            Type
            {"\n"}
            5. Vaccine Dosage{"\n"}6. Date of Vaccination
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (isChecked) {
              skipScreenVaccine();
            }
            navigation.navigate("Vaccination Certificate QR");
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
            <View style={[styles.center, { flexDirection: "row" }]}>
              <Text style={[styles.text, { marginEnd: 8 }]}>
                Don't show again
              </Text>
              <Checkbox value={isChecked} onValueChange={setChecked} />
            </View>
          ) : null}
        </>
      </View>
      <Version />
    </>
  );
};

export default VaxInfo;
