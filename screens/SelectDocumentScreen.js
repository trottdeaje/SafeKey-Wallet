import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import { useToast } from "react-native-toast-notifications";
import { styles } from "./styles";

import { useAssets } from "expo-asset";
import Version from "../components/Version/Version";
import { PDF_QR_JS } from "pdf-qr";
import { ClipLoader } from "react-spinners";
import Loading from "./Loading";
import * as Analytics from "expo-firebase-analytics";

const SelectDocument = ({ navigation }) => {
  const [ErrorInfo, SetErrorInfo] = useState("");
  const toast = useToast();
  const [assets] = useAssets([require("../assets/images/file-text.png")]);
  const [fileIsLoading, SetFileIsLoading] = useState(false);

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
          <View style={{ marginTop: 20 }}>
            <ClipLoader size="14px" color="#1971ef" />
          </View>
        );
        SetFileIsLoading(true);
        PDF_QR_JS.decodeSinglePage(result.uri, pageNr, configs, recordcallback);

        function recordcallback(result) {
          // check if array is empty
          if (result.codes.length === 0) {
            console.error("No QR Found");
            SetErrorInfo(
              <View style={{ marginTop: 15 }}>
                <Text style={styles.text}>
                  SafeKey QR Code not detected. Please try again.
                </Text>
              </View>
            );
            SetFileIsLoading(false);
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
                  const formatYmd = (date) => date.toISOString().slice(0, 10);
                  let todayDate = Date.parse(formatYmd(new Date()));
                  var dateRaw = Date.parse(`${year}/${month}/${day}`);
                  let dayInMilliSeconds = 86400000;
                  if (dateRaw + dayInMilliSeconds <= todayDate) {
                    SetFileIsLoading(false);
                    return SetErrorInfo(
                      <View
                        style={[
                          styles.center,
                          {
                            width: "100%",
                            maxWidth: 500,
                            marginTop: 20,
                            padding: 10,
                            textAlign: "center",
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.text,
                            {
                              color: "red",
                              fontFamily: "OpenSans_600SemiBold",
                            },
                          ]}
                        >
                          This SafeKey has expired. Click the button below to
                          visit the SafeKey renewal page.{" "}
                        </Text>

                        <TouchableOpacity
                          style={[
                            styles.btn,
                            styles.shadow,
                            styles.btnLine,
                            {
                              marginTop: 10,
                            },
                          ]}
                          onPress={() =>
                            Linking.openURL("https://www.gov.bm/safekey")
                          }
                        >
                          <Text style={[styles.btnText, { color: "#1971ef" }]}>
                            Renew
                          </Text>
                        </TouchableOpacity>
                      </View>
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
                  await AsyncStorage.setItem("passExpiryRaw", `${dateRaw}`);
                } else {
                  console.error("parsed date is not a number");
                }
              }
              // take payload name and set as Key with the value being the parsed QR data. Every payload name is found
              // between two colons in the parsed QR data
              let indexStart = data.indexOf(":");
              indexStart += 1;
              let indexEnd = data.indexOf(":", indexStart + 1);
              let keywordKey = data.substring(indexStart, indexEnd);
              await AsyncStorage.setItem(keywordKey, data);
              Analytics.logEvent("DocumentAdded", {
                type:
                  keywordKey === "BM.KEY"
                    ? "SafeKey"
                    : "Vaccination Certificate",
                purpose: "User has added their SafeKey document",
              });
              // Navigate to a different screen while passing the parsed QR data with it
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "QR List" }],
                })
              );
              toast.show(
                keywordKey === "BM.KEY" ? (
                  <View>
                    <Text style={[styles.bold, { color: "#fff" }]}>
                      SafeKey Added
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text style={[styles.bold, { color: "#fff" }]}>
                      Vaccination Certificate Added
                    </Text>
                  </View>
                ),
                {
                  id: 3,
                  type: "success",
                  duration: 3000,
                  animationType: "zoom-in",
                }
              );
            }
          };
          handlePDFUpload();
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {!assets ? (
        <Loading />
      ) : (
        <>
          <View style={styles.container}>
            <Text
              style={{
                textAlign: "center",
                marginBottom: 0.5,
                fontSize: 16,
                marginBottom: 16,
                lineHeight: 24,
              }}
            >
              Add your SafeKey to your wallet by selecting your{" "}
              <Text style={{ fontWeight: "bold" }}>SafeKey PDF Document </Text>
              or{" "}
              <Text style={{ fontWeight: "bold" }}>
                Vaccination Certificate PDF Document
              </Text>
            </Text>
            <Text
              style={[
                styles.text,
                { fontWeight: "bold", marginTop: 15, marginBottom: 15 },
              ]}
            >
              Select your PDF Document
            </Text>
            <TouchableOpacity
              disabled={fileIsLoading}
              style={[
                styles.btn,
                styles.shadow,
                { backgroundColor: fileIsLoading ? "#1a73ef80" : "#1971ef" },
              ]}
              onPress={PickDocument}
            >
              <Text
                style={[
                  styles.center,
                  {
                    textAlign: "center",
                    color: "white",
                    fontSize: 17,
                  },
                ]}
              >
                <Image
                  style={{ width: 20, height: 20, marginRight: 8 }}
                  source={require("../assets/images/file-text.png")}
                />
                Select
              </Text>
            </TouchableOpacity>
            <Text>
              {ErrorInfo ? (
                ErrorInfo
              ) : (
                <View style={{ height: 38, backgroundColor: "#fff" }}></View>
              )}
            </Text>
          </View>
          <Version />
        </>
      )}
    </>
  );
};
export default SelectDocument;
