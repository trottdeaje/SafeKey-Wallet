import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import loadable from "@loadable/component";
//  Import react-navigation
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
// Import Firebase
import * as Analytics from "expo-firebase-analytics";
// Importing the screens
import HomeScreen from "./screens/HomeScreen";
const SelectDocumentScreen = loadable(() =>
  import("./screens/SelectDocumentScreen")
);
const QrScanScreen = loadable(() => import("./screens/QrScanScreen"));
const QrListScreen = loadable(() => import("./screens/QrListScreen"));
const PassInfoScreen = loadable(() => import("./screens/NoticeSafeKeyScreen"));
const VaxInfoScreen = loadable(() =>
  import("./screens/NoticeVaccinationScreen")
);
const ShowQrScreenPass = loadable(() =>
  import("./screens/ShowSafeKeyQrScreen")
);
const ShowQrScreenVax = loadable(() =>
  import("./screens/ShowVaccinationQrScreen")
);
const NotFound = loadable(() => import("./screens/NotFoundScreen"));
const NoCamera = loadable(() => import("./screens/NoCameraScreen"));
import Loading from "./screens/Loading";
// Importing async storage
import AsyncStorage from "@react-native-async-storage/async-storage";
// Importing fonts
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
// Importing Toast
import { ToastProvider } from "react-native-toast-notifications";
// Importing Modal
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
const Stack = createStackNavigator();

import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";
import { styles } from "./screens/styles";

export default function App() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasQR, setHasQR] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [devicePlatform, setDevicePlatform] = useState(undefined);
  const [showInstallBtn, setShowInstallBtn] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState();

  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

  const config = {
    screens: {
      Home: "",
      "Select Document": "select-document",
      "Scan QR": "qr-scanner",
      "QR List": "wallet",
      "SafeKey Notice": "safekey-notice",
      "Vaccination Notice": "certificate-notice",
      "SafeKey QR": "safekey",
      "Vaccination Certificate QR": "vaccination-certificate",
      NoCamera: "NoCamera",
      NotFound: "*",
    },
  };

  const linking = {
    prefixes: [],
    config,
  };

  useEffect(() => {
    async function read() {
      try {
        const passkey = await AsyncStorage.getItem("BM.KEY");
        const vax = await AsyncStorage.getItem("BM.VAX");

        if (passkey !== null || vax !== null) {
          setHasQR(true);
        }
      } catch (e) {
        alert("Failed to fetch the data from storage: " + e);
      }
      setHasLoaded(true);
    }
    read();
  }, []);

  const navigationRef = useRef();
  const routeNameRef = useRef();

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

  useEffect(() => {}, []);

  useEffect(() => {
    getOS();

    if (devicePlatform === "iOS") {
      setShowInstallBtn(true);
      setBtnDisabled(false);
    } else if (devicePlatform === "Android") {
      setShowInstallBtn(true);
      setBtnDisabled(true);
    }
  }, [devicePlatform]);

  window.addEventListener("beforeinstallprompt", (event) => {
    console.log("👍", "beforeinstallprompt", event);
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Update UI notify the user they can install the PWA
    setBtnDisabled(false);
    console.log("Is button disabled?: " + btnDisabled);
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

  // window.addEventListener("load", (event) => {
  //   setTimeout(() => {
  //     setBtnDisabled(false);
  //   }, 10000);
  // });

  return (
    <ToastProvider offsetBottom={70}>
      {fontsLoaded && hasLoaded ? (
        <NavigationContainer
          ref={navigationRef}
          onReady={() =>
            (routeNameRef.current =
              navigationRef.current.getCurrentRoute().name)
          }
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName =
              navigationRef.current.getCurrentRoute().name;
            // console.log(previousRouteName, currentRouteName);
            if (previousRouteName !== currentRouteName) {
              // The line below uses the expo-firebase-analytics tracker
              // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
              // Change this line to use another Mobile analytics SDK
              await Analytics.setCurrentScreen(currentRouteName);
            }

            // Save the current route name for later comparison
            routeNameRef.current = currentRouteName;
          }}
          linking={linking}
          fallback={<Loading />}
        >
          <Stack.Navigator
            screenOptions={{
              headerTitleStyle: {
                alignSelf: "center",
                fontFamily: "OpenSans_600SemiBold",
              },
              headerRight: () => (
                <Image
                  resizeMethod="auto"
                  style={{ width: 23, height: 35, margin: 20 }}
                  source={require("./assets/images/bm-logo.svg")}
                />
              ),
            }}
            initialRouteName={hasQR ? "QR List" : "Home"}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                ...TransitionPresets.ModalSlideFromBottomIOS,
                headerTitleStyle: {
                  alignSelf: "flex-start",
                  fontFamily: "OpenSans_600SemiBold",
                },
                title: "SafeKey Wallet",
                headerTitle: " SafeKey Wallet",
                cardStyleInterpolator:
                  Platform.OS === "ios"
                    ? ({ current }) => ({
                        cardStyle: { opacity: current.progress },
                      })
                    : undefined,
                headerRight: () => (
                  <View
                    style={{
                      flexDirection: "row-reverse",
                      paddingRight: 20,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      resizeMethod="auto"
                      style={{ width: 23, height: 35 }}
                      source={require("./assets/images/bm-logo.svg")}
                    />
                    {showInstallBtn ? (
                      <TouchableOpacity
                        disabled={btnDisabled}
                        onPress={() => {
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
                          {
                            backgroundColor: btnDisabled
                              ? "#d8d8d8"
                              : "#1971ef",
                            marginRight: 20,
                            paddingHorizontal: btnDisabled ? 10 : 14,
                            height: 28,
                            borderRadius: 50,
                            flexDirection: "row",
                          },
                        ]}
                      >
                        {btnDisabled ? (
                          <Image
                            style={{ width: 18, height: 18 }}
                            source={require("./assets/images/gear.gif")}
                          />
                        ) : (
                          <></>
                        )}
                        <Text
                          style={[
                            styles.text,
                            { color: "#fff", marginLeft: btnDisabled ? 4 : 0 },
                          ]}
                        >
                          Install
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <></>
                    )}
                  </View>
                ),
              }}
            />
            <Stack.Screen
              name="Select Document"
              component={SelectDocumentScreen}
              options={{
                title: "Select Document",
                animationTypeForReplace: "pop",
                headerTitleStyle: {
                  alignSelf: "flex-start",
                  fontFamily: "OpenSans_600SemiBold",
                },
                headerTitle: " Select your SafeKey Document",
              }}
            />
            <Stack.Screen
              name="QR List"
              component={QrListScreen}
              options={{
                title: "SafeKey Wallet",
                animationTypeForReplace: "pop",
                headerTitleStyle: {
                  alignSelf: "flex-start",
                  fontFamily: "OpenSans_600SemiBold",
                },
                headerTitle: " SafeKey Wallet",
              }}
            />
            <Stack.Screen
              name="Scan QR"
              options={{ headerTitle: "Scan your SafeKey" }}
              component={QrScanScreen}
            />
            <Stack.Screen
              name="SafeKey Notice"
              component={PassInfoScreen}
              options={{
                headerTitleStyle: {
                  alignSelf: "center",
                  fontFamily: "OpenSans_600SemiBold",
                },
                headerTitle: "Notice",
              }}
            />
            <Stack.Screen
              name="Vaccination Notice"
              component={VaxInfoScreen}
              options={{
                headerTitle: "Notice",
                headerTitleStyle: {
                  alignSelf: "center",
                  fontFamily: "OpenSans_600SemiBold",
                },
              }}
            />
            <Stack.Screen
              options={{ headerTitle: "Show QR", headerTitleAlign: "center" }}
              name="SafeKey QR"
              component={ShowQrScreenPass}
            />
            <Stack.Screen
              options={{ headerTitle: "Show QR", headerTitleAlign: "center" }}
              name="Vaccination Certificate QR"
              component={ShowQrScreenVax}
            />
            <Stack.Screen
              options={{
                headerTitle: "404: Not Found",
                title: "Page Not Found",
              }}
              name="NotFound"
              component={NotFound}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: "center",
                headerTitle: "No Camera Permission",
                title: "No Camera Permission",
              }}
              name="NoCamera"
              component={NoCamera}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <Loading />
      )}
      <Modal animationIn="fadeInDownBig" isVisible={isModalVisible}>
        <View style={styles.center}>
          <View style={[modalStyle.modalInnerView, styles.center]}>
            <View style={{ position: "absolute", top: 7, right: 7 }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close-outline" size={28} color="black" />
              </TouchableOpacity>
            </View>
            <View style={[modalStyle.IconView, styles.center]}>
              <View style={modalStyle.AppIcon}></View>
              <View style={modalStyle.AppIcon}></View>
              <View
                style={[
                  modalStyle.AppIcon,
                  styles.shadow,
                  {
                    marginRight: 4,
                    width: 90,
                    height: 90,
                    borderRadius: 5,
                  },
                ]}
              >
                <Image
                  source={require("./assets/icon.png")}
                  style={[
                    {
                      borderRadius: 5,
                      width: 90,
                      height: 90,
                    },
                  ]}
                />
              </View>

              <View style={modalStyle.AppIcon}></View>
              <View style={modalStyle.AppIcon}></View>
            </View>
            <Text
              style={[
                styles.bold,
                {
                  fontSize: 20,
                  fontFamily: "OpenSans_700Bold",
                  marginBottom: 20,
                },
              ]}
            >
              Install SafeKey Wallet
            </Text>
            <Text
              style={[
                styles.text,
                {
                  marginHorizontal: 20,
                  textAlign: "center",
                  fontSize: 16,
                  marginBottom: 20,
                },
              ]}
            >
              Install this web app on your home screen for quick and easy access
              when you're on the go.
            </Text>
            <View
              style={[
                styles.center,
                {
                  backgroundColor: "#f9f9f9",
                  width: "100%",
                  paddingVertical: 15,
                },
              ]}
            >
              <Text style={[styles.center, styles.text]}>
                Just tap
                <Image
                  style={{
                    width: 18,
                    height: 18,
                    marginHorizontal: 4,
                    marginBottom: 3,
                  }}
                  source={require("./assets/images/share-min.svg")}
                />
                then 'Add to Home Screen'
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </ToastProvider>
  );
}
const modalStyle = StyleSheet.create({
  modalInnerView: {
    maxWidth: 350,
    backgroundColor: "#fff",
    borderRadius: 5,
    overflow: "hidden",
  },
  IconView: {
    overflow: "hidden",
    flexDirection: "row",
    marginVertical: 30,
  },
  AppIcon: {
    width: 80,
    height: 80,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginHorizontal: 4,
    marginVertical: 8,
  },
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
