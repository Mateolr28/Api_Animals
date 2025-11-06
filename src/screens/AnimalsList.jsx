import styles from "../styles/AnimalListStyle";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Alert,
  RefreshControl,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAnimals, deleteAnimal } from "../api/animals";
import AnimalCard from "../components/AnimalCard";

export default function AnimalsList({ navigation }) {
  const [animals, setAnimals] = useState([]);
  const [token, setToken] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const savedToken = await AsyncStorage.getItem("@token");
      if (!savedToken) {
        Alert.alert("Error", "Token no encontrado. Inicia sesión nuevamente.");
        navigation.replace("Login");
        return;
      }
      setToken(savedToken);
      await fetchAnimals(savedToken);
    } catch (err) {
      console.error("Error al cargar datos:", err);
    }
  };

  const fetchAnimals = async (tkn) => {
    try {
      setRefreshing(true);
      const data = await getAnimals(tkn);

      let list = [];
      if (Array.isArray(data)) list = data;
      else if (data.animals) list = data.animals;
      else if (data.data) list = data.data;
      else if (data.result) list = data.result;
      else if (data.items) list = data.items;

      setAnimals(list);
    } catch (err) {
      console.error("Error al obtener animales:", err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleDelete = (animal) => {
    const id = animal._id || animal.id;
    const isWeb = Platform.OS === "web";

    if (isWeb) {
      const confirmed = window.confirm(`¿Eliminar a ${animal.nombre}?`);
      if (confirmed) performDelete(id);
    } else {
      Alert.alert("Confirmar", `¿Eliminar a ${animal.nombre}?`, [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => performDelete(id) },
      ]);
    }
  };

  const performDelete = async (id) => {
    if (!id) {
      Alert.alert("Error", "ID no válido.");
      return;
    }

    try {
      await deleteAnimal(token, id);
      Alert.alert("Éxito", "Animal eliminado correctamente.");
      await fetchAnimals(token);
    } catch (err) {
      console.error("Error al eliminar:", err);
      Alert.alert("Error", err.message || "No se pudo eliminar el animal");
    }
  };

  const handleEdit = (animal) => {
    navigation.navigate("EditAnimal", { animal });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadData);
    loadData();
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Lista de animales</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Crear nuevo animal"
            onPress={() => navigation.navigate("CreateAnimal")}
            color="#4CAF50"
          />
        </View>

        <FlatList
          data={animals}
          keyExtractor={(item) => item._id || item.id || item.nombre}
          renderItem={({ item }) => (
            <AnimalCard
              animal={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchAnimals(token)}
            />
          }
          ListEmptyComponent={<Text style={styles.empty}>No hay animales</Text>}
        />
      </View>
    </View>
  );
}

