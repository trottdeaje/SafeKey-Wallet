import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const PassInfo = ({ navigation, route }) => {
  const { typeName, data } = route.params;
  return (
    <View style={info.container}>
      <Text style={info.header}>
        By allowing your SafeKey to be scanned you're agreeing to share the
        following information:
      </Text>
      <Text style={info.li}>
        1. Initials{"\n"}2. Date of Birth{"\n"}3. Expiry
      </Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Show QR", { typeName: typeName, data: data })
        }
        style={{
          backgroundColor: "#1971ef",
          borderRadius: 15,
          width: "100%",
          maxWidth: 350,
          alignSelf: "center",
          shadowColor: "#470000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          elevation: 2,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 18,
            paddingVertical: 10,
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const info = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: "7%",
  },
  header: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 19,
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  li: {
    alignSelf: "flex-start",
    color: "black",
    fontFamily: "OpenSans_400Regular",
    lineHeight: 30,
    marginBottom: 30,
    fontSize: 18,
  },
});

export default PassInfo;
