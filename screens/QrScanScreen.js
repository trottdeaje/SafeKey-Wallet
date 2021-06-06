import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarCodeScanner } from "expo-barcode-scanner";
import { styles } from "./styles";
import { CommonActions } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { Camera } from "expo-camera";

const QrScanScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [torch, setTorch] = useState(false);
  const [ratioValue, setRatioValue] = useState();
  const DESIRED_RATIO = "16:9";
  let torchValue;

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
    return <Text>No access to camera</Text>;
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
      setTimeout(() => {
        Toast.show("Invalid QR Code", {
          duration: 1000,
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
          onShow: () => {
            // calls on toast\`s appear animation start
          },
          onShown: () => {
            // calls on toast\`s appear animation end.
          },
          onHide: () => {
            // calls on toast\`s hide animation start.
          },
          onHidden: () => {
            // calls on toast\`s hide animation end.
          },
        });
      }, 250);
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
});

export default QrScanScreen;
