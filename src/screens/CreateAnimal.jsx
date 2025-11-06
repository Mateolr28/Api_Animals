import React, { useState, useEffect } from 'react';
import styles from '../styles/CreateAnimalStyle';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAnimal } from '../api/animals';

const initialBody = {
  nombre: '',
  raza: '',
  descripcion: '',
  urlImagen: '',
  peso: null,
  altura: null,
  edad: null,
  habitat: '',
  especie: '',
};

export default function CreateAnimal({ navigation }) {
  const [body, setBody] = useState(initialBody);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@token').then(setToken);
  }, []);

  const handleChange = (key, value) => setBody({ ...body, [key]: value });

  const handleSubmit = async () => {
    if (!body.nombre || !body.urlImagen) return Alert.alert('Error', 'Nombre y urlImagen obligatorios');
    setLoading(true);
    try {
      const payload = { ...body, peso: Number(body.peso), altura: Number(body.altura), edad: Number(body.edad) };
      await createAnimal(token, payload);
      setLoading(false);
      Alert.alert('OK', 'Animal creado');
      navigation.goBack();
    } catch (err) {
      setLoading(false);
      Alert.alert('Error', 'No se pudo crear: ' + (err.message || ''));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Registrar Animal</Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={body.nombre}
          onChangeText={(t) => handleChange("nombre", t)}
        />

        <Text style={styles.label}>Raza</Text>
        <TextInput
          style={styles.input}
          value={body.raza}
          onChangeText={(t) => handleChange("raza", t)}
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          multiline
          value={body.descripcion}
          onChangeText={(t) => handleChange("descripcion", t)}
        />

        <Text style={styles.label}>URL Imagen</Text>
        <TextInput
          style={styles.input}
          value={body.urlImagen}
          onChangeText={(t) => handleChange("urlImagen", t)}
        />

        <Text style={styles.label}>Peso (kg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={body.peso ? String(body.peso) : ""}
          onChangeText={(t) => handleChange("peso", t)}
        />

        <Text style={styles.label}>Altura (cm)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={body.altura ? String(body.altura) : ""}
          onChangeText={(t) => handleChange("altura", t)}
        />

        <Text style={styles.label}>Edad (años)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={body.edad ? String(body.edad) : ""}
          onChangeText={(t) => handleChange("edad", t)}
        />

        <Text style={styles.label}>Hábitat</Text>
        <TextInput
          style={styles.input}
          value={body.habitat}
          onChangeText={(t) => handleChange("habitat", t)}
        />

        <Text style={styles.label}>Especie</Text>
        <TextInput
          style={styles.input}
          value={body.especie}
          onChangeText={(t) => handleChange("especie", t)}
        />

        <View style={styles.buttonContainer}>
          <Button
            title={loading ? "Creando..." : "Crear"}
            onPress={handleSubmit}
            disabled={loading}
            color="#4CAF50"
          />
        </View>
      </View>
    </ScrollView>
  );
}


