import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import QRCode from "react-native-qrcode-svg";
import bmLogo from "../assets/images/bm-logo.png";

const ShowQr = ({ navigation, route }) => {
  const { typeName, data } = route.params;
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 30 }}>
        {typeName}
      </Text>
      <QRCode
        value={data}
        size={300}
        logoSize={82}
        logo={bmLogo}
        quietZone={10}
        color={typeName == "Vaccination Certificate" ? "#ff7272" : "#72b3ff"}
      />

      <TouchableOpacity
        onPress={() => navigation.popToTop()}
        style={{
          backgroundColor: "#1971ef",
          borderRadius: 15,
          marginTop: 50,
          shadowColor: "#470000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          elevation: 2,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "left",
            fontSize: 18,
            paddingHorizontal: 100,
            paddingVertical: 10,
          }}
        >
          Go Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShowQr;
