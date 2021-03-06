import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Linking,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

import QrReader from "react-qr-reader";
import * as Analytics from "expo-firebase-analytics";
import { useToast } from "react-native-toast-notifications";
import { styles } from "./styles";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const QrScanScreen = ({ navigation }) => {
  const [scanned, setScanned] = useState(false);
  const [facing, setFacing] = useState("environment");
  const [invalidQR, setInvalidQR] = useState(false);
  const [dimensions, setDimensions] = useState({ window, screen });
  const toast = useToast();

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  const changeFacing = () => {
    facing === "environment" ? setFacing("user") : setFacing("environment");
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  const handleBarCodeScanned = async (data) => {
    const keywords = [":BM.KEY:", ":BM.VAX:", "BM.CONTACTKEY"];
    const keyRef = [":BM.KEY:", "BM.CONTACTKEY"];
    if (data !== null) {
      // Find keywords that match our array of items
      if (keywords.some((keyword) => data.includes(keyword))) {
        // Gets date from pass and checks to see if it's a number
        if (keyRef.some((keyword) => data.includes(keyword))) {
          // Get QR Keyword
          let indexStart = data.indexOf(":");
          indexStart += 1;
          let indexEnd = data.indexOf(":", indexStart + 1);
          let keywordKey = data.substring(indexStart, indexEnd);
          // set start index for expiry date
          let indexStartKey =
            keywordKey === "BM.KEY"
              ? data.indexOf(":", 130)
              : keywordKey === "BM.CONTACTKEY"
              ? data.indexOf(":", 142)
              : null;
          // set end index for expiry date
          let indexEndKey = data.indexOf("/");
          // get expiry date value
          let keywordBMKey = data.substring(indexStartKey, indexEndKey);
          let keywordBMKeyFinal = keywordBMKey.slice(1);
          if (!isNaN(keywordBMKeyFinal)) {
            let year = parseInt(keywordBMKeyFinal.substr(0, 4), 10);
            let day = parseInt(keywordBMKeyFinal.substr(6), 10);
            let month = parseInt(keywordBMKeyFinal.substr(4, 2), 10);
            let date = new Date(year, month - 1, day);
            const formatYmd = (date) => date.toISOString().slice(0, 10);
            let todayDate = Date.parse(formatYmd(new Date()));
            var dateRaw = Date.parse(`${year}/${month}/${day}`);
            let dayInMilliSeconds = 86400000;
            if (dateRaw + dayInMilliSeconds <= todayDate) {
              // If the date is in the past, show a toast
              toast.show(
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL("https://www.gov.bm/safekey");
                      toast.hide(1);
                    }}
                  >
                    <Text style={[styles.bold, { color: "#fff" }]}>
                      {keywordKey === "BM.KEY"
                        ? "This SafeKey has expired"
                        : keywordKey === "BM.CONTACTKEY"
                        ? "This Contact Tracing Key has expired"
                        : ""}
                    </Text>
                    <Text
                      style={[
                        styles.text,
                        { color: "#fff", textAlign: "center" },
                      ]}
                    >
                      Click here to renew it
                    </Text>
                  </TouchableOpacity>
                </View>,
                {
                  offsetBottom: 50,
                  id: 1,
                  position: "bottom",
                  duration: 8000,
                  type: "normal",
                  normalColor: "#ff4d4d",
                }
              );
              return navigation.goBack();
            }

            let options = {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            };
            const dateQR = date.toLocaleString("en-US", options);
            await AsyncStorage.setItem(
              keywordKey === "BM.KEY" ? "passExpiry" : "contactExpiry",
              dateQR
            );
            await AsyncStorage.setItem(
              keywordKey === "BM.KEY" ? "passExpiryRaw" : "contactExpiryRaw",
              `${dateRaw}`
            );
          } else {
            console.log("parsed date is not a number");
          }
        }
        // take payload name and set as Key with the value being the parsed QR data. Every payload name is found
        // between two colons in the parsed QR data
        let indexStart = data.indexOf(":");
        indexStart += 1;
        let indexEnd = data.indexOf(":", indexStart + 1);
        let keywordKey = data.substring(indexStart, indexEnd);
        await AsyncStorage.setItem(keywordKey, data);
        setScanned(true);
        Analytics.logEvent("DocumentScanned", {
          type:
            keywordKey === "BM.KEY"
              ? "SafeKey"
              : keywordKey === "BM.VAX"
              ? "Vaccination Certificate"
              : keywordKey === "BM.CONTACTKEY"
              ? "Contact Tracing Key"
              : "",
          purpose: "User has scanned their SafeKey QR code.",
        });
        // Navigate to a different screen while passing the parsed QR data with it
        navigation.dispatch(
          CommonActions.reset({ index: 0, routes: [{ name: "QR List" }] })
        );
        //
        //
        //
        toast.show(
          <View>
            <Text style={[styles.bold, { color: "#fff" }]}>
              {keywordKey === "BM.KEY"
                ? "SafeKey added"
                : keywordKey === "BM.VAX"
                ? "Vaccination Certificate added"
                : keywordKey === "BM.CONTACTKEY"
                ? "Contact Tracing Key added"
                : ""}
            </Text>
          </View>,

          {
            id: 3,
            type: "success",
            duration: 3500,
            animationType: "zoom-in",
          }
        );
      } else {
        setInvalidQR(true);
      }
    } else {
      setScanned(false);
      setInvalidQR(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: "#000",
          marginBottom: 0,
        },
      ]}
    >
      <View
        style={[
          styles.center,
          {
            backgroundColor: "#000",
            fontSize: 16,
            lineHeight: 50,
            textAlign: "center",
            position: "relative",
            textAlignVertical: "center",
            margin: 0,
            zIndex: 10,
            fontSize: 16,
            flex: 1,
            minHeight: 80,
            marginBottom: 20,
          },
        ]}
      >
        <Text style={{ color: "#f1f1f1", marginBottom: 5, marginTop: 15 }}>
          Scan your SafeKey Document QR code
        </Text>
        <Text style={{ color: "#f1f1f1" }}>Keep camera steady</Text>
        <Text
          style={{
            color: invalidQR ? "#ffbb33" : "#28a745",
            marginTop: 10,
            fontFamily: "OpenSans_600SemiBold",
          }}
        >
          {invalidQR ? "INVALID QR" : "SCANNING"}
        </Text>
      </View>

      <QrReader
        facingMode={facing}
        onLoad={() => {
          console.log("QR Reader Loaded");
        }}
        delay={300}
        onError={(error) => {
          console.log(error.name);
          if (error.name === "NotAllowedError") {
            navigation.dispatch(
              CommonActions.reset({ index: 0, routes: [{ name: "NoCamera" }] })
            );
          }
        }}
        onScan={(data) => {
          scanned ? undefined : handleBarCodeScanned(data);
        }}
        style={{
          width: dimensions.window.width < 565 ? "100%" : 510,
          alignSelf: "center",
        }}
      />
      <View
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          onPress={changeFacing}
          style={{
            paddingHorizontal: 10,
            alignSelf: "center",
            backgroundColor: "#1971ef",
            paddingVertical: 10,
            borderRadius: 5,
            marginBottom: 25,
            marginTop: 25,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              letterSpacing: 1,
              fontFamily: "OpenSans_400Regular",
            }}
          >
            Switch Camera
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QrScanScreen;
