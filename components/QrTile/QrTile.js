import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { removeValue } from "./script";
import Toast from "react-native-root-toast";
import { LinearGradient } from "expo-linear-gradient";

const QrTile = (props) => {
  const [tileBg, setTileBg] = useState("#000");
  const [tileBgTwo, setTileBgTwo] = useState("#000");

  useEffect(() => {
    if (props.name == "Vaccination Certificate") {
      setTileBg("#ea6460");
      setTileBgTwo("#ff7771");
    } else if (props.name == "SafeKey") {
      setTileBg("#5299e1");
      setTileBgTwo("#70b5ff");
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
          elevation: 2,
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() =>
            navigation.navigate(props.infoScreen, {
              typeName: props.name,
              data: props.data,
            })
          }
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
            onPress={() =>
              Toast.show("Hold to delete", {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: false,
                animation: true,
                hideOnPress: true,
                delay: 0,

                containerStyle: {
                  borderRadius: 30,
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                },
                textStyle: { fontFamily: "OpenSans_600SemiBold", fontSize: 14 },
                textColor: "#121212",
                backgroundColor: "#f0f0f0",
              })
            }
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
            <MaterialIcons name="delete" size={30} color="white" />
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
