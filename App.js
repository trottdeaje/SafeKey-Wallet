import React, { useState, useEffect, useRef } from "react";
import { View, Image } from "react-native";
//  Import react-navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// Import Firebase
import * as Analytics from "expo-firebase-analytics";
// Importing the screens
import HomeScreen from "./screens/HomeScreen";
import SelectDocumentScreen from "./screens/SelectDocumentScreen";
import QrScanScreen from "./screens/QrScanScreen";
import QrListScreen from "./screens/QrListScreen";
import PassInfoScreen from "./screens/NoticeSafeKeyScreen";
import VaxInfoScreen from "./screens/NoticeVaccinationScreen";
import ContactInfoScreen from "./screens/NoticeContactTracingScreen";
import ShowQrScreenPass from "./screens/ShowSafeKeyQrScreen";
import ShowQrScreenVax from "./screens/ShowVaccinationQrScreen";
import ShowQrScreenContact from "./screens/ShowContactKeyQRScreen";
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
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
// Importing Toast
import { ToastProvider } from "react-native-toast-notifications";
// Importing Modal
const Stack = createStackNavigator();
import Version from "./components/Version/Version";
import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";

export default function App() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasQR, setHasQR] = useState(false);
  const [screenName, setScreenName] = useState(undefined);

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
      "Contact Tracing Notice": "contact-tracing-notice",
      "SafeKey QR": "safekey",
      "Vaccination Certificate QR": "vaccination-certificate",
      "Contact Tracing Key QR": "contact-tracing-key",
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
    <ToastProvider offset={75} swipeEnabled={false}>
      {fontsLoaded && hasLoaded ? (
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current = navigationRef.current.getCurrentRoute().name;
            setScreenName(navigationRef.current.getCurrentRoute().name);
          }}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName =
              navigationRef.current.getCurrentRoute().name;
            if (previousRouteName !== currentRouteName) {
              // The line below uses the expo-firebase-analytics tracker
              // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
              // Change this line to use another Mobile analytics SDK
              await Analytics.setCurrentScreen(currentRouteName);
              if (screenName === currentRouteName) {
                return;
              } else {
                setScreenName(currentRouteName);
              }
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
                headerTitleStyle: {
                  alignSelf: "flex-start",
                  fontFamily: "OpenSans_600SemiBold",
                },
                title: "SafeKey Wallet",
                headerTitle: " SafeKey Wallet",
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
                  </View>
                ),
              }}
            />
            <Stack.Screen
              name="Select Document"
              component={SelectDocumentScreen}
              options={{
                title: "Select Document",
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
                headerTitleStyle: {
                  alignSelf: "flex-start",
                  fontFamily: "OpenSans_600SemiBold",
                },
                headerTitle: " SafeKey Wallet",
              }}
            />
            <Stack.Screen
              name="Scan QR"
              options={{
                headerTitleAlign: "center",
                headerTitle: "Scan your SafeKey",
              }}
              component={QrScanScreen}
            />
            <Stack.Screen
              name="SafeKey Notice"
              component={PassInfoScreen}
              options={{
                headerTitleAlign: "center",
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
                headerTitleAlign: "center",
                headerTitle: "Notice",
                headerTitleStyle: {
                  alignSelf: "center",
                  fontFamily: "OpenSans_600SemiBold",
                },
              }}
            />
            <Stack.Screen
              name="Contact Tracing Notice"
              component={ContactInfoScreen}
              options={{
                headerTitleAlign: "center",
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
              options={{ headerTitle: "Show QR", headerTitleAlign: "center" }}
              name="Contact Tracing Key QR"
              component={ShowQrScreenContact}
            />
            <Stack.Screen
              options={{
                headerTitle: "404: Not Found",
                headerTitleAlign: "center",
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
          {screenName === "Scan QR" ? (
            <Version brightness={"brightness(0)"} />
          ) : (
            <Version />
          )}
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
