import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import qrcodeParser from "qrcode-parser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import { useToast } from "react-native-fast-toast";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles";
import Version from "../../components/Version/Version";

const UploadDocument = ({ navigation }) => {
  const [ErrorInfo, SetErrorInfo] = useState("");
  const toast = useToast();

  const PickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: ["image/png", "image/jpeg"],
      });
      // console.log(result);
      if (result.type !== "cancel") {
        qrcodeParser(result.output[0])
          .then((res) => {
            const handleImageUpload = async () => {
              const data = res.data;
              const keywords = [":BM.KEY:", ":BM.VAX:"];
              const keyRef = [":BM.KEY:"];
              if (keywords.some((keyword) => data.includes(keyword))) {
                if (keyRef.some((keyword) => data.includes(keyword))) {
                  let indexStartKey = data.indexOf(":", 130);
                  let indexEndKey = data.indexOf("/");
                  let keywordBMKey = data.substring(indexStartKey, indexEndKey);
                  let keywordBMKeyFinal = keywordBMKey.slice(1);
                  if (!isNaN(keywordBMKeyFinal)) {
                    let year = parseInt(keywordBMKeyFinal.substr(0, 4), 10);
                    let day = parseInt(keywordBMKeyFinal.substr(6), 10);
                    let month = parseInt(keywordBMKeyFinal.substr(4, 2), 10);
                    let date = new Date(year, month - 1, day);
                    let options = {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    };
                    const dateFinal = date.toLocaleString("en-US", options);
                    await AsyncStorage.setItem("passExpiry", dateFinal);
                  } else {
                    console.log("parsed date is not a number");
                  }
                }
                // take payload name and set as Key with the value being the parsed QR data. Every payload name is found
                // between two colons in the parsed QR data
                let indexStart = data.indexOf(":");
                indexStart += 1;
                let indexEnd = data.indexOf(":", indexStart + 1);
                let keywordKey = data.substring(indexStart, indexEnd);
                await AsyncStorage.setItem(keywordKey, data);
                // Navigate to a different screen while passing the parsed QR data with it
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "QR List" }],
                  })
                );
                toast.show(
                  keywordKey === "BM.KEY"
                    ? "SafeKey Added"
                    : "Vaccination Certificate Added",
                  {
                    id: 2,
                    type: "success",
                    duration: 5000,
                  }
                );
              }
            };
            handleImageUpload();
          })
          .catch((err) => {
            console.log(err);
            SetErrorInfo("Invalid QR: Please upload an image of your SafeKey");
            toast.show("No Safekey QR found", {
              type: "danger",
              duration: 3000,
            });
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  let location = window.location.origin;
  const _handlePressButtonAsync = async () => {
    let result = await Linking.openURL(location + "/pdf2img");
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={upload.heading}>
          Add your SafeKey to your wallet by uploading a{" "}
          <Text style={{ fontWeight: "bold" }}>SafeKey PDF Document </Text>Image
          or{" "}
          <Text style={{ fontWeight: "bold" }}>
            Vaccination Certificate PDF Document
          </Text>{" "}
          Image
        </Text>
        <Text style={upload.info}>
          1. Convert your PDF Document to an image, then download it.
        </Text>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={_handlePressButtonAsync}
        >
          <Text style={styles.btnTextOutline}>
            <Ionicons
              style={{ marginRight: 8 }}
              name="open-outline"
              size={18}
              color="#1971ef"
            />
            Open Converter
          </Text>
        </TouchableOpacity>
        <Text style={upload.info}>2. Upload the image.</Text>
        <TouchableOpacity style={styles.btn} onPress={PickDocument}>
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 17,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 20, height: 20, marginRight: 8 }}
              source={require("./image-folder2.png")}
            />
            Select Image
          </Text>
        </TouchableOpacity>
        <Text style={ErrorInfo ? upload.infoError : upload.nfn}>
          {ErrorInfo ? ErrorInfo : ""}
        </Text>
      </View>
      <Version />
    </>
  );
};

const upload = StyleSheet.create({
  info: {
    textAlign: "center",
    color: "black",
    fontSize: 14,
    marginTop: 20,
    marginBottom: 10,
    fontFamily: "OpenSans_400Regular",
    fontWeight: "bold",
  },
  heading: {
    textAlign: "center",
    marginBottom: 0.5,
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 24,
  },
  infoError: {
    color: "red",
    fontWeight: "bold",
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "red",
  },
  nfn: {},
});

export default UploadDocument;
