import React, { useState, useEffect } from "react";
import { Image, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import QrScanScreen from "./screens/QrScanScreen";
import QrListScreen from "./screens/QrListScreen";
import PassInfoScreen from "./screens/PassInfoScreen";
import VaxInfoScreen from "./screens/VaxInfoScreen";
import ShowQrScreen from "./screens/ShowQrScreen";
import Loading from "./screens/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootSiblingParent } from "react-native-root-siblings";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
} from "@expo-google-fonts/open-sans";

const Stack = createStackNavigator();

export default function App() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasQR, setHasQR] = useState(false);
  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
  });

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

  return (
    <RootSiblingParent>
      {fontsLoaded && hasLoaded ? (
        <NavigationContainer>
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
                headerTitleStyle: { alignSelf: "flex-start" },
                headerTitle: " Home",
                cardStyleInterpolator:
                  Platform.OS === "ios"
                    ? ({ current }) => ({
                        cardStyle: { opacity: current.progress },
                      })
                    : undefined,
              }}
            />
            <Stack.Screen
              name="QR List"
              component={QrListScreen}
              options={{
                animationTypeForReplace: "pop",
                headerTitleStyle: {
                  alignSelf: "flex-start",
                  fontFamily: "OpenSans_600SemiBold",
                },
                headerTitle: " QR List",
              }}
            />
            <Stack.Screen
              options={{ headerTitle: "Scan your SafeKey" }}
              name="Scan QR"
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
              name="Vaccination Certificate Notice"
              component={VaxInfoScreen}
              options={{
                headerTitle: "Notice",
                headerTitleStyle: {
                  alignSelf: "center",
                  fontFamily: "OpenSans_600SemiBold",
                },
              }}
            />
            <Stack.Screen name="Show QR" component={ShowQrScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <Loading />
      )}
    </RootSiblingParent>
  );
}
