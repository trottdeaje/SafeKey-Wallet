import AsyncStorage from "@react-native-async-storage/async-storage";

export const removeValue = async (value) => {
  try {
    if (value === "BM.KEY") {
      await AsyncStorage.removeItem("passExpiry");
    }
    await AsyncStorage.removeItem(value);
  } catch (e) {
    alert(e);
  }
};
