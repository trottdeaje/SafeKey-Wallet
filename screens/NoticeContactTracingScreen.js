import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";
import Checkbox from "expo-checkbox";

const ContactTracingInfo = ({ navigation }) => {
  const [contactKeyExists, setContactKeyExists] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const [checkboxAvailable, setCheckboxAvailable] = useState(false);
  Checkbox.isAvailableAsync().then((isAvailable) => {
    if (isAvailable) {
      setCheckboxAvailable(true);
    }
  });

  const skipScreenContactKey = async () => {
    await AsyncStorage.setItem("no_notice_contact", true);
  };

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
    if (contactKeyExists === false) {
      navigation.dispatch(StackActions.replace("QR List"));
    }
  }, [contactKeyExists]);

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
              By allowing your Contact Tracing Key to be scanned you're agreeing
              to share the following information:
            </Text>
            <Text style={styles.li}>
              1. Initials{"\n"}2. Date of Birth{"\n"}3. Expiry
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (isChecked) {
                skipScreenContactKey();
              }
              navigation.navigate("Contact Tracing Key QR");
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

export default ContactTracingInfo;
