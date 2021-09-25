import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Analytics from "expo-firebase-analytics";

export const removeValue = async (value) => {
  try {
    if (value === "BM.KEY") {
      await AsyncStorage.removeItem("passExpiry");
    }
    await AsyncStorage.removeItem(value);
    // Send analytics when user deletes safekey
    Analytics.logEvent("QrDeleted", {
      type: value === "BM.KEY" ? "SafeKey" : "Vaccination Certificate",
      purpose: "user deleted a safekey",
    });
  } catch (e) {
    alert(e);
  }
};
