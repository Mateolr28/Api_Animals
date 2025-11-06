import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF6EC", 
    padding: 16,
    alignItems: "center",
  },
  card: {
    flex: 1,
    width: "95%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5, 
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    color: "#4CAF50",
    marginBottom: 14,
  },
  buttonContainer: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#888",
  },
});

export default styles;
