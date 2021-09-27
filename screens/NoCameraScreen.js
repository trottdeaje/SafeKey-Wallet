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
import Version from "../components/Version/Version";
import { useAssets } from "expo-asset";
import Loading from "./Loading";
import { styles } from "./styles";

const NoCamera = ({ navigation }) => {
  const [learnUrl, setLearnUrl] = useState(null);

  const [assets] = useAssets([require("../assets/images/nocam.png")]);

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
      {!assets ? (
        <Loading />
      ) : (
        <>
          <View style={styles.container}>
            <Image
              source={require("../assets/images/nocam.png")}
              style={nocam.image}
            />
            <Text style={[styles.bold, { marginBottom: 15, fontSize: 18 }]}>
              No access to camera
            </Text>
            <Text
              style={[styles.text, { textAlign: "center", marginBottom: 10 }]}
            >
              Please enable camera access in your web browser’s settings then
              try scanning again.
            </Text>
            <View
              style={[
                styles.center,
                {
                  flexDirection: "row",
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(learnUrl);
                }}
                style={[
                  styles.center,
                  {
                    borderWidth: 1,
                    borderColor: "grey",
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginRight: 10,
                  },
                ]}
              >
                <Text
                  style={{
                    color: "blue",
                  }}
                >
                  Learn more
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: "QR List" }],
                    })
                  );
                }}
                style={[nocam.button, styles.shadow]}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Go back
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Version />
        </>
      )}
    </>
  );
};

const nocam = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1971ef",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
});

export default NoCamera;
