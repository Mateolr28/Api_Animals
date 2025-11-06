import React, { useState, useEffect } from 'react';
import styles from '../styles/EditAnimalStyle';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateAnimal } from '../api/animals';

export default function EditAnimal({ route, navigation }) {
  const incoming = route.params?.animal || {};
  const [body, setBody] = useState({
    nombre: incoming.nombre || '',
    raza: incoming.raza || '',
    descripcion: incoming.descripcion || '',
    urlImagen: incoming.urlImagen || '',
    peso: incoming.peso?.toString() || '',
    altura: incoming.altura?.toString() || '',
    edad: incoming.edad?.toString() || '',
    habitat: incoming.habitat || '',
    especie: incoming.especie || '',
  });

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@token').then(setToken);
  }, []);

  const handleChange = (key, value) => setBody({ ...body, [key]: value });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...body,
        peso: Number(body.peso),
        altura: Number(body.altura),
        edad: Number(body.edad),
      };
      const id = incoming._id || incoming.id;
      await updateAnimal(token, id, payload);
      setLoading(false);
      Alert.alert('El animal fue actualizado correctamente.');
      navigation.goBack();
    } catch (err) {
      setLoading(false);
      Alert.alert('No se pudo actualizar: ' + (err.message || ''));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Editar Animal</Text>


        <Text style={styles.label}>Nombre</Text>
        <TextInput style={styles.input} value={body.nombre} onChangeText={(t) => handleChange('nombre', t)} />

        <Text style={styles.label}>Raza</Text>
        <TextInput style={styles.input} value={body.raza} onChangeText={(t) => handleChange('raza', t)} />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline
          value={body.descripcion}
          onChangeText={(t) => handleChange('descripcion', t)}
        />

        <Text style={styles.label}>URL Imagen</Text>
        <TextInput style={styles.input} value={body.urlImagen} onChangeText={(t) => handleChange('urlImagen', t)} />

        <Text style={styles.label}>Peso (kg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={body.peso}
          onChangeText={(t) => handleChange('peso', t)}
        />

        <Text style={styles.label}>Altura (cm)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={body.altura}
          onChangeText={(t) => handleChange('altura', t)}
        />

        <Text style={styles.label}>Edad (años)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={body.edad}
          onChangeText={(t) => handleChange('edad', t)}
        />

        <Text style={styles.label}>Hábitat</Text>
        <TextInput style={styles.input} value={body.habitat} onChangeText={(t) => handleChange('habitat', t)} />

        <Text style={styles.label}>Especie</Text>
        <TextInput style={styles.input} value={body.especie} onChangeText={(t) => handleChange('especie', t)} />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Guardando...' : 'Guardar Cambios'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
