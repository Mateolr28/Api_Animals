import React, { useState } from "react";
import styles from "../styles/LoginStyle";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../api/animals";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await login(username, password);
      const token = res.token || res;
      await AsyncStorage.setItem("@token", token);
      setLoading(false);
      navigation.replace("AnimalsList");
    } catch (err) {
      setLoading(false);
      Alert.alert("Error", err.message || "Login falló");
    }
  };

 return (
  <View style={styles.container}>
    <View style={styles.card}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <Text>Usuario</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <Text>Contraseña</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button
        title={loading ? "Entrando..." : "Entrar"}
        onPress={handleLogin}
        disabled={loading}
      />
    </View>
  </View>
);
}


