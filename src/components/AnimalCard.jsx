import React from "react";
import styles from "../styles/AnimalCardStyle";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

export default function AnimalCard({ animal, onEdit, onDelete }) {
  const handleEditPress = () => {
    console.log("Botón editar presionado:", animal.nombre);
    if (onEdit) onEdit(animal);
  };

  const handleDeletePress = () => {
    console.log("Botón eliminar presionado:", animal.nombre);
    if (onDelete) onDelete(animal);
  };

  return (
    <View style={styles.card}>
  <Image source={{ uri: animal.urlImagen }} style={styles.image} />

  <View style={styles.info}>
    <Text style={styles.title}>{animal.nombre}</Text>
    <Text style={styles.subtitle}>{animal.raza}</Text>
    <Text style={styles.description}>{animal.descripcion}</Text>
    <Text style={styles.details}>
      Edad: {animal.edad} años • Peso: {animal.peso} kg
    </Text>

    <View style={styles.buttons}>
      <Pressable
        onPress={handleEditPress}
        style={({ pressed }) => [
          styles.btn,
          styles.editBtn,
          pressed && { opacity: 0.7 },
        ]}
      >
        <Text style={styles.btnText}>Editar</Text>
      </Pressable>

      <Pressable
        onPress={handleDeletePress}
        style={({ pressed }) => [
          styles.btn,
          styles.deleteBtn,
          pressed && { opacity: 0.7 },
        ]}
      >
        <Text style={styles.btnText}>Eliminar</Text>
      </Pressable>
    </View>
  </View>
</View>
  );
}


