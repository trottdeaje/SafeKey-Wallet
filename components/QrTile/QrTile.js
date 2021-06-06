import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { removeValue } from "./script";
import Toast from "react-native-root-toast";

const QrTile = (props) => {
  const [tileBg, setTileBg] = useState("#000");

  useEffect(() => {
    if (props.name == "Vaccination Certificate") {
      setTileBg("#ff7272");
    } else if (props.name == "SafeKey") {
      setTileBg("#72b3ff");
    }
  }, [props.name]);

  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: tileBg,
        width: "100%",
        marginBottom: 15,
        paddingLeft: 15,
        borderRadius: 10,
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
              onShow: () => {
                // calls on toast\`s appear animation start
              },
              onShown: () => {
                // calls on toast\`s appear animation end.
              },
              onHide: () => {
                // calls on toast\`s hide animation start.
              },
              onHidden: () => {
                // calls on toast\`s hide animation end.
              },
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
