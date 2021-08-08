import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import loadable from "@loadable/component";
const QrReader = loadable(() => import("react-qr-reader"));
import DetectRTC from "detectrtc";
import { useToast } from "react-native-fast-toast";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const QrScanScreen = ({ navigation }) => {
  const [scanned, setScanned] = useState(false);
  const [facing, setFacing] = useState("environment");
  const [invalidQR, setInvalidQR] = useState(false);
  const [dimensions, setDimensions] = useState({ window, screen });
  const [CameraPermissions, setCameraPermissions] = useState(null);
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
    const keywords = [":BM.KEY:", ":BM.VAX:"];
    const keyRef = [":BM.KEY:"];
    if (data !== null) {
      // Find keywords that match our array of items
      if (keywords.some((keyword) => data.includes(keyword))) {
        // Gets date from pass and checks to see if it's a number
        if (keyRef.some((keyword) => data.includes(keyword))) {
          let indexStartKey = data.indexOf(":", 130);
          let indexEndKey = data.indexOf("/");
          let keywordBMKey = data.substring(indexStartKey, indexEndKey);
          let keywordBMKeyFinal = keywordBMKey.slice(1);

          if (!isNaN(keywordBMKeyFinal)) {
            let year = parseInt(keywordBMKeyFinal.substr(0, 4), 10);
            let day = parseInt(keywordBMKeyFinal.substr(6), 10);
            let month = parseInt(keywordBMKeyFinal.substr(4, 2), 10);

            let date = new Date(year, month - 1, day);
            let options = {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            };
            const dateFinal = date.toLocaleString("en-US", options);
            await AsyncStorage.setItem("passExpiry", dateFinal);
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
        // Navigate to a different screen while passing the parsed QR data with it
        navigation.dispatch(
          CommonActions.reset({ index: 0, routes: [{ name: "QR List" }] })
        );
        toast.show(
          keywordKey === "BM.KEY"
            ? "SafeKey Added"
            : "Vaccination Certificate Added",
          {
            id: 3,
            type: "success",
            duration: 5000,
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
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#000",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
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
        }}
      >
        <Text style={{ color: "#f1f1f1", marginBottom: 5, marginTop: 15 }}>
          Scan your SafeKey Document
        </Text>
        <Text style={{ color: "#f1f1f1" }}>Keep camera steady</Text>
        <Text
          style={{
            color: invalidQR ? "#ffbb33" : "#28a745",
            marginTop: 10,
            fontFamily: "OpenSans_600SemiBold",
          }}
        >
          {invalidQR ? "Invalid QR" : "SCANNING"}
        </Text>
      </View>

      <QrReader
        facingMode={facing}
        onLoad={() => {
          console.log("QR Reader Loaded");
          DetectRTC.load(function () {
            // console.log(DetectRTC.isWebsiteHasWebcamPermissions);
          });
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
