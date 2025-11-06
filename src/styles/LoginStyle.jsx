// styles/LoginStyle.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDF6EC", 
    padding: 20,
  },
  card: {
    width: "90%",
    maxWidth: 380,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5, // sombra Android
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    color: "#4CAF50",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#dcdcdc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    backgroundColor: "#FAFAFA",
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default styles;
