import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { styles } from "../../screens/styles";
import ModalComponent from "../Modal/Modal";

const Version = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [devicePlatform, setDevicePlatform] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  function getOS() {
    var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
      windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
      iosPlatforms = ["iPhone", "iPad", "iPod"],
      os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = "Mac OS";
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = "iOS";
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = "Windows";
    } else if (/Android/.test(userAgent)) {
      os = "Android";
    } else if (!os && /Linux/.test(platform)) {
      os = "Linux";
    }
    // return os;
    setDevicePlatform(os);
  }

  useEffect(() => {
    getOS();
    if (devicePlatform === "iOS") {
      setShowInstallBtn(true);
    } else if (devicePlatform === "Android") {
      return;
    } else {
      setShowInstallBtn(false);
    }
  }, [devicePlatform]);

  window.addEventListener("beforeinstallprompt", (event) => {
    console.log("👍", "beforeinstallprompt", event);
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Update UI notify the user they can install the PWA
    setShowInstallBtn(true);
    // Optionally, send analytics event that PWA install promo was shown.
    console.log(`'beforeinstallprompt' event was fired.`);
  });

  const handleInstallBtnClick = async () => {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.error("👎", "The deferred prompt is not available.");
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
  };

  window.addEventListener("appinstalled", () => {
    // Hide the app-provided install promotion
    setShowInstallBtn(false);
    // Clear the deferredPrompt so it can be garbage collected
    window.deferredPrompt = null;
    // Optionally, send analytics event to indicate successful install
    console.log("PWA was installed");
  });

  function isInstalled() {
    // For iOS
    if (window.navigator.standalone) return true;

    // For Android
    if (window.matchMedia("(display-mode: standalone)").matches) return true;

    // If neither is true, it's not installed
    return false;
  }

  return (
    <>
      <View style={VersionStyle.container}>
        <Text style={VersionStyle.text}>Version: 1.1.7</Text>

        {showInstallBtn && !isInstalled() ? (
          <TouchableOpacity
            onPress={() => {
              console.log(devicePlatform);
              if (devicePlatform === "iOS") {
                setModalVisible(true);
              } else if (devicePlatform === "Android") {
                handleInstallBtnClick();
              } else {
                alert("other");
              }
            }}
            style={[
              styles.center,
              styles.shadow,
              {
                borderRadius: 50,
                backgroundColor: "#1971ef",
                shadowColor: "#0a418f",
              },
            ]}
          >
            <Text style={[VersionStyle.btnText]}>Install</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      <ModalComponent
        onClose={() => setModalVisible(false)}
        show={modalVisible}
      />
    </>
  );
};

const VersionStyle = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  text: {
    color: "#0000008c",
  },
  btnText: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    fontSize: 14,
    color: "#fff",
  },
});

export default Version;
