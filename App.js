import React, { useState, useEffect, useRef } from "react";
import { Image, Platform } from "react-native";
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
import UploadDocumentScreen from "./screens/UploadDocumentScreen";
import QrScanScreen from "./screens/QrScanScreen";
import QrListScreen from "./screens/QrListScreen";
import PassInfoScreen from "./screens/NoticeSafeKeyScreen";
import VaxInfoScreen from "./screens/NoticeVaccinationScreen";
import ShowQrScreenPass from "./screens/ShowSafeKeyQrScreen";
import ShowQrScreenVax from "./screens/ShowVaccinationQrScreen";
import NotFound from "./screens/NotFoundScreen";
import NoCamera from "./screens/NoCameraScreen";
import Loading from "./screens/Loading";
// Importing async storage
import AsyncStorage from "@react-native-async-storage/async-storage";
// Importing fonts
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
} from "@expo-google-fonts/open-sans";
// Importing Toast
import { ToastProvider } from "react-native-fast-toast";
import AppLoading from "expo-app-loading";

const Stack = createStackNavigator();

import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";

export default function App() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasQR, setHasQR] = useState(false);
  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
  });

  const config = {
    screens: {
      Home: "",
      "Upload Document": "upload-document",
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

  return (
    <ToastProvider>
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
          fallback={<AppLoading />}
        >
          <Stack.Navigator
            screenOptions={{
              headerTitleStyle: {
                alignSelf: "center",
                fontFamily: "OpenSans_600SemiBold",
              },
              headerRight: () => (
                <Image
                  style={{ width: 35, height: 35, margin: 20 }}
                  source={require("./assets/images/bm-logo.png")}
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
              }}
            />
            <Stack.Screen
              name="Upload Document"
              component={UploadDocumentScreen}
              options={{
                title: "Upload Document",
                animationTypeForReplace: "pop",
                headerTitleStyle: {
                  alignSelf: "flex-start",
                  fontFamily: "OpenSans_600SemiBold",
                },
                headerTitle: " Upload your SafeKey",
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
              options={{ headerTitle: "Show QR" }}
              name="SafeKey QR"
              component={ShowQrScreenPass}
            />
            <Stack.Screen
              options={{ headerTitle: "Show QR" }}
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
    </ToastProvider>
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
