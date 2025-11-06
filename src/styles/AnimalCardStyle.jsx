import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
   image: {
    width: "100%",
    height: 220,
    resizeMode: "contain", 
    backgroundColor: "#f5f5f5", 
  },
  info: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#4CAF50",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
    lineHeight: 20,
  },
  details: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  editBtn: {
    backgroundColor: "#4CAF50",
  },
  deleteBtn: {
    backgroundColor: "#F44336",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default styles;
