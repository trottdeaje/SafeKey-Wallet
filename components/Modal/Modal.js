import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../screens/styles";

const ModalComponent = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { show, onClose } = props;

  useEffect(() => {
    setShowModal(show);
  }, [show]);

  return (
    <Modal
      customBackdrop={
        <SafeAreaView style={modalStyle.customBackdrop}></SafeAreaView>
      }
      animationIn="fadeInDownBig"
      isVisible={showModal}
    >
      <View style={styles.center}>
        <View style={[modalStyle.modalInnerView, styles.center]}>
          <View style={{ position: "absolute", top: 7, right: 7 }}>
            <TouchableOpacity onPress={() => onClose()}>
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
                  width: 18,
                  height: 18,
                  marginHorizontal: 4,
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
  customBackdrop: {
    backgroundColor: "black",
    position: "sticky",
    height: "100vh",
    width: "100vw",
  },
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
