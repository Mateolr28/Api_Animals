import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateAnimal } from '../api/animals';

export default function EditAnimal({ route, navigation }) {
  const incoming = route.params?.animal || {};
  const [body, setBody] = useState({
    nombre: incoming.nombre || '',
    raza: incoming.raza || '',
    descripcion: incoming.descripcion || '',
    urlImagen: incoming.urlImagen || '',
    peso: incoming.peso || '',
    altura: incoming.altura || '',
    edad: incoming.edad || '',
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
      const payload = { ...body, peso: Number(body.peso), altura: Number(body.altura), edad: Number(body.edad) };
      const id = incoming._id || incoming.id;
      await updateAnimal(token, id, payload);
      setLoading(false);
      Alert.alert('OK', 'Animal actualizado');
      navigation.goBack();
    } catch (err) {
      setLoading(false);
      Alert.alert('Error', 'No se pudo actualizar: ' + (err.message || ''));
    }
  };

  return (
    <ScrollView style={{ padding: 12 }}>
      <Text>Nombre</Text>
      <TextInput style={styles.input} value={body.nombre} onChangeText={(t) => handleChange('nombre', t)} />
      <Text>Raza</Text>
      <TextInput style={styles.input} value={body.raza} onChangeText={(t) => handleChange('raza', t)} />
      <Text>Descripción</Text>
      <TextInput style={[styles.input, { height: 80 }]} multiline value={body.descripcion} onChangeText={(t) => handleChange('descripcion', t)} />
      <Text>URL Imagen</Text>
      <TextInput style={styles.input} value={body.urlImagen} onChangeText={(t) => handleChange('urlImagen', t)} />
      <Text>Peso (kg)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={String(body.peso)} onChangeText={(t) => handleChange('peso', t)} />
      <Text>Altura (cm)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={String(body.altura)} onChangeText={(t) => handleChange('altura', t)} />
      <Text>Edad (años)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={String(body.edad)} onChangeText={(t) => handleChange('edad', t)} />
      <Text>Hábitat</Text>
      <TextInput style={styles.input} value={body.habitat} onChangeText={(t) => handleChange('habitat', t)} />
      <Text>Especie</Text>
      <TextInput style={styles.input} value={body.especie} onChangeText={(t) => handleChange('especie', t)} />

      <View style={{ marginTop: 12 }}>
        <Button title={loading ? 'Guardando...' : 'Guardar cambios'} onPress={handleSubmit} disabled={loading} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 6, marginBottom: 10 },
});
