import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAssets } from "expo-asset";
import Loading from "./Loading";

import QrTile from "../components/QrTile/QrTile";
import { StackActions } from "@react-navigation/native";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
} from "@expo-google-fonts/open-sans";

import {
  FloatingMenu,
  MainButton,
  ChildButton,
} from "react-floating-button-menu";
import { Ionicons, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const QrList = ({ navigation }) => {
  const [vax, setVax] = useState(undefined);
  const [passkey, setPasskey] = useState(undefined);
  const [contactKey, setContactKey] = useState(undefined);
  const [passExists, setPassExists] = useState();
  const [vaxExists, setVaxExists] = useState();
  const [contactKeyExists, setContactKeyExists] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const [assets] = useAssets([
    require("../assets/images/file-text.png"),
    require("../assets/images/camera.png"),
  ]);

  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
  });

  const noVaxExists = () => {
    setVaxExists(false);
  };

  const noPassExists = () => {
    setPassExists(false);
  };
  const noContactKeyExists = () => {
    setContactKeyExists(false);
  };

  // if one or two variables are true then return true. If three variables are true then return false.
  const checkExists = () => {
    if (
      vaxExists === true &&
      passExists === true &&
      contactKeyExists === true
    ) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    try {
      async function getPasskey() {
        const value = await AsyncStorage.getItem("BM.KEY");
        if (value !== null) {
          setPasskey(value);
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
          setVax(value);
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
          setContactKey(value);
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
      vaxExists === false &&
      passExists === false &&
      contactKeyExists === false
    ) {
      navigation.dispatch(StackActions.replace("Home"));
    }
  }, [vaxExists, passExists, contactKeyExists]);

  return (
    <ScrollView style={styles.scrollStyle}>
      {!assets && !fontsLoaded ? (
        <Loading />
      ) : (
        <View style={styles.containerTop}>
          <View
            style={[
              styles.center,
              {
                alignSelf: "center",
                backgroundColor: "#f9f9f9",
                padding: 20,
                paddingBottom: 20,
                marginBottom: 25,
                marginTop: 5,
                width: "100%",
                maxWidth: 650,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#dadada",
              },
            ]}
          >
            <Text>
              <Text
                style={{
                  fontSize: 18,
                  alignSelf: "flex-start",
                  fontFamily: "OpenSans_600SemiBold",
                  color: "#919191",
                  display: "block",
                }}
              >
                Guide
              </Text>
              {"\n"}
              <Text style={{ fontSize: 14, color: "#919191" }}>{"\u2022"}</Text>
              <Text style={qrlist.infoPoints}>
                {" "}
                SafeKey Wallet currently supports three QR Codes. Vaccination
                Certificate, SafeKey and Contact Tracing Key.
              </Text>
              {"\n"}
              <Text style={{ display: "block" }}> </Text>
              <Text style={{ fontSize: 14, color: "#919191" }}>{"\u2022"}</Text>
              <Text style={qrlist.infoPoints}>
                {" "}
                Select the QR you want to present. Read the information on the
                next screen carefully, then continue.
              </Text>
              {"\n"}
              <Text style={{ display: "block" }}> </Text>
              <Text style={{ fontSize: 14, color: "#919191" }}>{"\u2022"}</Text>
              <Text style={qrlist.infoPoints}>
                {" "}
                When your SafeKey expires, you can add another by first deleting
                the expired one, then clicking the plus button and selecting
                either the camera button or the document button.
              </Text>
            </Text>
          </View>
          {vaxExists ? (
            <QrTile
              name="Vaccination Certificate"
              type="BM.VAX"
              removeItem={noVaxExists}
              infoScreen="Vaccination Notice"
              data={vax}
            />
          ) : (
            <Text></Text>
          )}
          {passExists ? (
            <QrTile
              name="SafeKey"
              type="BM.KEY"
              removeItem={noPassExists}
              infoScreen="SafeKey Notice"
              data={passkey}
            />
          ) : (
            <Text></Text>
          )}
          {contactKeyExists ? (
            <QrTile
              name="Contact Tracing Key"
              type="BM.CONTACTKEY"
              removeItem={noContactKeyExists}
              infoScreen="Contact Tracing Notice"
              data={contactKey}
            />
          ) : (
            <Text></Text>
          )}

          {checkExists() ? (
            <View
              style={{
                position: "sticky",
                alignSelf: "flex-end",
              }}
            >
              <FloatingMenu
                slideSpeed={500}
                direction="left"
                spacing={8}
                isOpen={isOpen}
                style={(qrlist.btnCircle, styles.shadow)}
              >
                <MainButton
                  iconResting={<Feather name="plus" size={24} color="white" />}
                  iconActive={
                    <Ionicons name="close-outline" size={24} color="white" />
                  }
                  background="#1971ef"
                  onClick={() => setIsOpen(!isOpen)}
                  size={56}
                />
                <ChildButton
                  icon={
                    <Image
                      id="camera"
                      style={{ height: 20, width: 20 }}
                      source={require("../assets/images/camera.png")}
                    />
                  }
                  background="#1971ef"
                  size={40}
                  onClick={() => {
                    setIsOpen(!isOpen);
                    navigation.navigate("Scan QR");
                  }}
                />
                <ChildButton
                  icon={
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={require("../assets/images/file-text.png")}
                    />
                  }
                  background="#1971ef"
                  size={40}
                  onClick={() => {
                    setIsOpen(!isOpen);
                    navigation.navigate("Select Document");
                  }}
                />
              </FloatingMenu>
            </View>
          ) : (
            <Text></Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};
const qrlist = StyleSheet.create({
  btnCircle: {
    width: 55,
    height: 55,
    borderRadius: 50,
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#1971ef",
  },
  infoPoints: {
    fontSize: 10,
    fontFamily: "OpenSans_400Regular",
    color: "#919191",
    marginBottom: -10,
  },
});

export default QrList;
