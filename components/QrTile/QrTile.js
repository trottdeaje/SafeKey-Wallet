import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { removeValue } from "./script";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../screens/styles";
const QrTile = (props) => {
  const [tileBg, setTileBg] = useState("#000");
  const [tileBgTwo, setTileBgTwo] = useState("#000");

  const myRef = React.createRef();

  const showMenu = () => {
    myRef.current.style.display = "flex";
    document.addEventListener("click", hideMenu);
  };

  const hideMenu = () => {
    if (myRef.current) {
      myRef.current.style.display = "none";
      document.removeEventListener("click", hideMenu);
    } else return;
  };

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
        style={[
          styles.shadow,
          {
            width: "100%",
            marginBottom: 15,
            paddingLeft: 15,
            borderRadius: 10,
          },
        ]}
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
              style={{
                fontFamily: "OpenSans_600SemiBold",
                color: "white",
                textAlign: "left",
                fontSize: 16,
              }}
            >
              {props.name}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              showMenu();
            }}
            style={[
              styles.center,
              {
                height: "100%",
                width: 50,
                flexDirection: "row",
              },
            ]}
          >
            <Ionicons name="ios-ellipsis-vertical" size={24} color="white" />
          </TouchableOpacity>
          <View
            style={[
              styles.shadow,
              {
                display: "none",
                flexDirection: "column",
                backgroundColor: "#fff",
                borderRadius: 5,
                position: "absolute",
                right: 40,
                top: 11,
              },
            ]}
            ref={myRef}
          >
            <TouchableOpacity
              onPress={() => {
                removeValue(props.type);
                props.removeItem();
              }}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 5,
              }}
            >
              <Text
                style={{ fontFamily: "OpenSans_400Regular", color: "#dc3545" }}
              >
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default QrTile;
