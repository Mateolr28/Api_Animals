// src/components/AnimalCard.jsx
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

export default function AnimalCard({ animal, onEdit, onDelete }) {
  const handleEditPress = () => {
    console.log('🟢 Botón editar presionado:', animal.nombre);
    if (onEdit) onEdit(animal);
  };

  const handleDeletePress = () => {
    console.log('🔴 Botón eliminar presionado:', animal.nombre);
    if (onDelete) onDelete(animal);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: animal.urlImagen }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>{animal.nombre}</Text>
        <Text style={styles.subtitle}>{animal.raza}</Text>
        <Text numberOfLines={2}>{animal.descripcion}</Text>
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

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#777' },
  details: { marginTop: 5, color: '#444' },
  buttons: { flexDirection: 'row', marginTop: 10 },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  editBtn: {
    backgroundColor: '#4CAF50',
  },
  deleteBtn: {
    backgroundColor: '#F44336',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
