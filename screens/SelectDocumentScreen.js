import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import { useToast } from "react-native-toast-notifications";
import { styles } from "./styles";
import loadable from "@loadable/component";
const Version = loadable(() => import("../components/Version/Version"));
import { PDF_QR_JS } from "pdf-qr";
import { ClipLoader } from "react-spinners";

const SelectDocument = ({ navigation }) => {
  const [ErrorInfo, SetErrorInfo] = useState("");
  const toast = useToast();

  const PickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (result.type !== "cancel") {
        // PDF page target
        const pageNr = 1;
        // qr scanning configuration
        const configs = {
          scale: {
            once: true,
            value: 5,
            start: 0.2,
            step: 0.2,
            stop: 2,
          },
          resultOpts: {
            singleCodeInPage: true,
            multiCodesInPage: false,
            maxCodesInPage: 1,
          },
          improve: true,
          jsQR: {},
        };
        SetErrorInfo(
          <ClipLoader size="14px" color="#1971ef" style={{ marginTop: 10 }} />
        );

        PDF_QR_JS.decodeSinglePage(result.uri, pageNr, configs, recordcallback);

        function recordcallback(result) {
          // check if array is empty
          if (result.codes.length === 0) {
            console.log("No QR Found");
            SetErrorInfo("SafeKey QR Code not detected. Please try again.");
            return;
          }
          const handlePDFUpload = async () => {
            const data = result.codes.toString();
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
                  let todayDate = new Date();

                  if (date.getTime() < todayDate.getTime()) {
                    // If the date is in the past, show a toast
                    return SetErrorInfo(
                      <>
                        <Text>This SafeKey has expired. Visit </Text>
                        <TouchableOpacity
                          onPress={() =>
                            Linking.openURL("https://www.gov.bm/safekey")
                          }
                        >
                          <Text style={{ color: "#1a0dab" }}>here</Text>
                        </TouchableOpacity>
                        <Text> to renew it.</Text>
                      </>
                    );
                  }

                  let options = {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  };
                  const dateQR = date.toLocaleString("en-US", options);
                  await AsyncStorage.setItem("passExpiry", dateQR);
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
                  ? "SafeKey added"
                  : "Vaccination Certificate added",
                {
                  id: 2,
                  type: "success",
                  duration: 5000,
                }
              );
            }
          };
          handlePDFUpload();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={upload.heading}>
          Add your SafeKey to your wallet by selecting your{" "}
          <Text style={{ fontWeight: "bold" }}>SafeKey PDF Document </Text>
          or{" "}
          <Text style={{ fontWeight: "bold" }}>
            Vaccination Certificate PDF Document
          </Text>
        </Text>
        <Text style={upload.info}>Select your PDF Document</Text>
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
              source={require("../assets/images/file-text.png")}
            />
            Select
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
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 24,
  },
  infoError: {
    color: "red",
    fontWeight: "bold",
    marginTop: 20,
    padding: 10,
  },
  nfn: {},
});

export default SelectDocument;
