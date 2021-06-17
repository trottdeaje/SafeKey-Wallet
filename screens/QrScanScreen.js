import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarCodeScanner } from "expo-barcode-scanner";
import { styles } from "./styles";
import { CommonActions } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { Camera } from "expo-camera";
import Constants from "expo-constants";
import * as IntentLauncher from "expo-intent-launcher";

const QrScanScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [torch, setTorch] = useState(false);
  const [ratioValue, setRatioValue] = useState();
  const [toastShown, setToastShown] = useState(false);
  const DESIRED_RATIO = "16:9";
  let torchValue;

  const openAppSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      IntentLauncher.startActivityAsync(
        IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
        { data: "package:" + Constants.manifest.android.package }
      );
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={scan.info}>
          <Image
            style={{ width: 48, height: 48 }}
            source={require("../assets/images/nocam.png")}
          />
          {"\n"}
          {"\n"}
          <Text style={{ fontSize: 18, color: "#000" }}>
            No access to camera
          </Text>
          {"\n"}Please grant camera permissions to use this app{"\n"} Click{" "}
          <Text
            style={{
              color: "#0077cc",
              fontWeight: "bold",
            }}
            onPress={() => {
              Linking.openURL(
                Platform.OS === "android"
                  ? "https://support.google.com/android/answer/9431959?hl=en#:~:text=your%20Android%20version.-,Change%20app%20permissions%C2%A0,cannot%20use%20the%20setting%2C%20even%20when%20you%E2%80%99re%20using%20the%20app.%C2%A0,-Change%20permissions%20based"
                  : "https://support.apple.com/guide/iphone/control-access-to-hardware-features-iph168c4bbd5/ios#:~:text=Review%20or%20change,recently%20used%20either."
              );
            }}
          >
            here
          </Text>{" "}
          to learn more
        </Text>
        <TouchableOpacity style={scan.btnPlain} onPress={openAppSettings}>
          <Text style={scan.btnText}>Open settings</Text>
        </TouchableOpacity>
      </View>
    );
  }

  prepareRatio = async () => {
    if (Platform.OS === "android" && this.camera) {
      const ratios = await this.camera.getSupportedRatiosAsync();
      // See if the current device has your desired ratio, otherwise get the maximum supported one
      // Usually the last element of "ratios" is the maximum supported ratio
      const ratio =
        ratios.find((ratio) => ratio === DESIRED_RATIO) ||
        ratios[ratios.length - 1];

      setRatioValue(ratio);
    }
  };

  const handleTorchPress = () => {
    setTorch(!torch);
    torch === true ? (torchValue = "torch") : (torchValue = "off");
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    const keywords = [":BM.KEY:", ":BM.VAX:"];

    // Find keywords that match our array of items
    if (keywords.some((keyword) => data.includes(keyword))) {
      // take payload name and set as Key with the value being the parsed QR data. Every payload name is found
      // between two colons in the parsed QR data
      let indexStart = data.indexOf(":");
      indexStart += 1;
      const indexEnd = data.indexOf(":", indexStart + 1);
      const keywordKey = data.substring(indexStart, indexEnd);
      await AsyncStorage.setItem(keywordKey, data);
      setScanned(true);
      // Navigate to a different screen while passing the parsed QR data with it
      navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: "QR List" }] })
      );
    } else {
      if (toastShown === true) {
        setTimeout(() => {
          setToastShown(false);
        }, 3000);
      } else if (toastShown === false) {
        setToastShown(true);
        Toast.show("Invalid QR Code", {
          duration: 3000,
          position: Toast.positions.BOTTOM,
          shadow: false,
          animation: true,
          hideOnPress: true,
          delay: 0,

          containerStyle: {
            borderRadius: 30,
            paddingHorizontal: 20,
            paddingVertical: 20,
          },
          textStyle: { fontFamily: "OpenSans_600SemiBold", fontSize: 14 },
          textColor: "black",
          backgroundColor: "#fff",
        });
      }

      setScanned(false);
    }
  };

  return (
    <>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000",
          fontSize: 16,
          lineHeight: 50,
          textAlign: "center",
          position: "absolute",
          height: 50,
          top: 0,
          left: 0,
          right: 0,
          textAlignVertical: "center",
          margin: 0,
          zIndex: 10,
          fontSize: 16,
        }}
      >
        <Text style={{ color: "#f1f1f1" }}>Keep camera steady</Text>
      </View>

      <Camera
        ref={(ref) => (this.camera = ref)}
        onCameraReady={prepareRatio}
        ratio={ratioValue}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        flashMode={torch === true ? "torch" : "off"}
        style={scan.container}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Image
            style={styles.qrBorder}
            source={require("../assets/images/border.png")}
          ></Image>
        </View>
      </Camera>
      <View style={scan.btnGroupWrapper}>
        <TouchableOpacity
          onPress={() => handleTorchPress()}
          style={{
            backgroundColor: torch === true ? "#ffffff4d" : "#0000008c",
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Image
            style={scan.btn}
            source={
              torch === true
                ? require("../assets/images/flashOn.png")
                : require("../assets/images/flash.png")
            }
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          backgroundColor: "black",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 40,
        }}
      ></Text>
    </>
  );
};

const scan = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    top: 0,
  },
  btnGroupWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 90,
    width: "100%",
  },
  btn: {
    opacity: 0.9,
    height: 50,
    width: 50,
    padding: 25,
  },

  btnPlain: {
    backgroundColor: "#1971ef",
    borderRadius: 10,
    paddingVertical: 11,
    shadowColor: "#470000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  btnText: {
    paddingHorizontal: 20,
    color: "white",
    textAlign: "center",
  },
  info: {
    textAlign: "center",
    color: "black",
    fontSize: 15,
    marginBottom: 15,
    fontFamily: "OpenSans_400Regular",
    color: "#000",
  },
});

export default QrScanScreen;
