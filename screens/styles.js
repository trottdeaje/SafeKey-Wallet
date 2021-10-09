import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  containerTop: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
    flexWrap: "wrap",
    width: "100%",
    marginBottom: 10,
  },
  btn: {
    width: "100%",
    maxWidth: 500,
    borderRadius: 10,
    paddingVertical: 11,
  },
  btnLine: {
    borderWidth: 2.5,
    borderColor: "#1971ef",
  },
  btnText: {
    textAlign: "center",
    fontSize: 18,
  },
  bold: {
    textAlign: "center",
    color: "#333",
    fontFamily: "OpenSans_600SemiBold",
  },
  shadow: {
    shadowColor: "#470000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  text: {
    color: "#333",
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
  },
  li: {
    alignSelf: "flex-start",
    color: "black",
    fontFamily: "OpenSans_400Regular",
    lineHeight: 30,
    marginBottom: 30,
    fontSize: 18,
    textAlign: "left",
    marginLeft: 0,
    color: "#333333",
  },
  noticeHeader: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 19,
    marginBottom: 25,
    marginTop: 25,
    alignSelf: "flex-start",
    color: "#333333",
  },
  QrHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    color: "#000",
    textAlign: "center",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  bmQrLogo: {
    width: 55,
    height: 80,
    position: "absolute",
  },
});

export { styles };
