import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../screens/styles";

const ModalComponent = () => {
  const [isModalVisible, setModalVisible] = useState();

  return (
    <Modal animationIn="fadeInDownBig" isVisible={isModalVisible}>
      <View style={styles.center}>
        <View style={[modalStyle.modalInnerView, styles.center]}>
          <View style={{ position: "absolute", top: 7, right: 7 }}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close-outline" size={28} color="black" />
            </TouchableOpacity>
          </View>
          <View style={[modalStyle.IconView, styles.center]}>
            <View style={modalStyle.AppIcon}></View>
            <View style={modalStyle.AppIcon}></View>
            <View
              style={[
                modalStyle.AppIcon,
                styles.shadow,
                {
                  marginRight: 4,
                  width: 90,
                  height: 90,
                  borderRadius: 5,
                },
              ]}
            >
              <Image
                source={require("../../assets/icon.png")}
                style={[
                  {
                    borderRadius: 5,
                    width: 90,
                    height: 90,
                  },
                ]}
              />
            </View>

            <View style={modalStyle.AppIcon}></View>
            <View style={modalStyle.AppIcon}></View>
          </View>
          <Text
            style={[
              styles.bold,
              {
                fontSize: 20,
                fontFamily: "OpenSans_700Bold",
                marginBottom: 20,
              },
            ]}
          >
            Install SafeKey Wallet
          </Text>
          <Text
            style={[
              styles.text,
              {
                marginHorizontal: 20,
                textAlign: "center",
                fontSize: 16,
                marginBottom: 20,
              },
            ]}
          >
            Install SafeKey Wallet on your home screen for quick and easy access
            when you're on the go.
          </Text>
          <View
            style={[
              styles.center,
              {
                backgroundColor: "#f9f9f9",
                width: "100%",
                paddingVertical: 15,
              },
            ]}
          >
            <Text style={[styles.center, styles.text]}>
              Just tap
              <Image
                style={{
                  width: 20,
                  height: 20,
                  marginHorizontal: 3,
                  marginBottom: 3,
                }}
                source={require("../../assets/images/share-min.svg")}
              />
              then 'Add to Home Screen'
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const modalStyle = StyleSheet.create({
  modalInnerView: {
    maxWidth: 350,
    backgroundColor: "#fff",
    borderRadius: 5,
    overflow: "hidden",
  },
  IconView: {
    overflow: "hidden",
    flexDirection: "row",
    marginVertical: 30,
  },
  AppIcon: {
    width: 80,
    height: 80,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginHorizontal: 4,
    marginVertical: 8,
  },
});

export default ModalComponent;
