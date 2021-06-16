import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  containerTop: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
    flexWrap: "wrap",
    width: "100%",
  },
  info: {
    textAlign: "center",
    color: "black",
    fontSize: 14,
    marginBottom: 15,
    fontFamily: "OpenSans_400Regular",
  },
  btn: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "#1971ef",
    borderRadius: 10,
    paddingVertical: 11,
    shadowColor: "#470000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontSize: 17,
  },
  qrBorder: {
    width: 250,
    height: 250,
  },
});

export { styles };
