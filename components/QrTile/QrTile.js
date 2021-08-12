import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { removeValue } from "./script";
import { LinearGradient } from "expo-linear-gradient";
import { useToast } from "react-native-toast-notifications";

const QrTile = (props) => {
  const [tileBg, setTileBg] = useState("#000");
  const [tileBgTwo, setTileBgTwo] = useState("#000");
  const toast = useToast();

  useEffect(() => {
    if (props.name == "Vaccination Certificate") {
      setTileBg("#fc9cc7");
      setTileBgTwo("#fc9cc7");
    } else if (props.name == "SafeKey") {
      setTileBg("#5299e1");
      setTileBgTwo("#66b0ff");
    }
  }, [props.name]);

  const navigation = useNavigation();

  return (
    <View style={{ width: "100%" }}>
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        colors={[tileBg, tileBgTwo]}
        style={{
          width: "100%",
          marginBottom: 15,
          paddingLeft: 15,
          borderRadius: 10,
          shadowColor: "#470000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 2,
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate(props.infoScreen)}
        >
          <View style={{ paddingVertical: 15 }}>
            <Text
              style={
                ([styles.text, styles.name],
                {
                  fontFamily: "OpenSans_600SemiBold",
                  color: "white",
                  textAlign: "left",
                  fontSize: 16,
                })
              }
            >
              {props.name}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              toast.hide(1);
              toast.show("Hold to delete", {
                id: 1,
                type: "normal",
                duration: 2500,
              });
            }}
            onLongPress={() => {
              removeValue(props.type);
              props.removeItem();
            }}
            style={{
              height: "100%",
              width: 50,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <FontAwesome5 name="trash" size={20} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  name: {
    fontSize: 20,
  },
});

export default QrTile;
