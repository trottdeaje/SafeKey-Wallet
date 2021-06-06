import AsyncStorage from "@react-native-async-storage/async-storage";

export const removeValue = async (value) => {
  try {
    await AsyncStorage.removeItem(value);
  } catch (e) {
    alert(e);
  }
};
