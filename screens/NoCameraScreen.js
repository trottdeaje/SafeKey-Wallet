import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import DetectRTC from "detectrtc";
import loadable from "@loadable/component";
const Version = loadable(() => import("../components/Version/Version"));

const NoCamera = ({ navigation }) => {
  const [learnUrl, setLearnUrl] = useState(null);

  useEffect(() => {
    DetectRTC.load(function () {
      if (DetectRTC.browser.isChrome) {
        setLearnUrl("https://support.google.com/chrome/answer/2693767");
      } else if (DetectRTC.browser.isEdge) {
        setLearnUrl(
          "https://help.doxy.me/en/articles/3867526-allow-access-to-camera-in-edge#:~:text=How%20to%20enable%20your,browser%20tab%20(CTRL%20%2B%20R)."
        );
      } else if (DetectRTC.browser.isFirefox) {
        setLearnUrl("https://support.mozilla.org/en-US/kb/camera-permissions");
      } else if (DetectRTC.browser.isOpera) {
        setLearnUrl("https://help.opera.com/en/latest/web-preferences/#camera");
      } else if (DetectRTC.browser.isSafari) {
        setLearnUrl(
          "https://help.cer.bo/support/solutions/articles/8000084621-allow-access-to-camera-in-safari-mobile-tablet-"
        );
      }
    });
  }, []);
  return (
    <>
      <View style={nocam.container}>
        <Image
          source={require("../assets/images/nocam.png")}
          style={nocam.image}
        />
        <Text style={nocam.bold}>No access to camera</Text>
        <Text style={nocam.text}>
          Please enable camera access in your web browser’s settings then try
          scanning again.
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(learnUrl);
            }}
            style={{
              borderWidth: 1,
              borderColor: "grey",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginRight: 10,
            }}
          >
            <Text
              style={{
                color: "blue",
                textAlign: "center",
                alignSelf: "center",
              }}
            >
              Learn more
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(
                CommonActions.reset({ index: 0, routes: [{ name: "QR List" }] })
              );
            }}
            style={nocam.button}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Go back</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Version />
    </>
  );
};

const nocam = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#470000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    padding: 15,
    flex: 1,
    marginBottom: 50,
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  bold: {
    marginBottom: 15,
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1971ef",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    shadowColor: "#470000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  text: {
    textAlign: "center",
    fontFamily: "OpenSans_400Regular",
    color: "#333333",
    marginBottom: 10,
  },
});

export default NoCamera;
