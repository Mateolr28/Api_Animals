// src/screens/AnimalsList.jsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAnimals, deleteAnimal } from '../api/animals';
import AnimalCard from '../components/AnimalCard';

export default function AnimalsList({ navigation }) {
  const [animals, setAnimals] = useState([]);
  const [token, setToken] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Cargar token y animales
  const loadTokenAndAnimals = async () => {
    try {
      const t = await AsyncStorage.getItem('@token');
      if (!t) {
        Alert.alert('Error', 'Token no encontrado. Inicia sesión nuevamente.');
        navigation.replace('Login');
        return;
      }
      setToken(t);
      await fetchAnimals(t);
    } catch (err) {
      console.error('Error al cargar token:', err);
    }
  };

  // Obtener lista de animales
  const fetchAnimals = async (tkn) => {
    try {
      setRefreshing(true);
      const data = await getAnimals(tkn);

      console.log('📦 Respuesta GET /animals:', JSON.stringify(data, null, 2));

      // Detectar el array correcto
      let list = [];
      if (Array.isArray(data)) list = data;
      else if (data.animals) list = data.animals;
      else if (data.data) list = data.data;
      else if (data.result) list = data.result;
      else if (data.items) list = data.items;

      setAnimals(list);
    } catch (err) {
      console.error('❌ Error al obtener animales:', err);
      Alert.alert('Error', 'No se pudieron cargar los animales: ' + err.message);
    } finally {
      setRefreshing(false);
    }
  };

  // Confirmar eliminación
  const handleDelete = (animal) => {
    const id = animal._id || animal.id;
    Alert.alert('Confirmar eliminación', `¿Eliminar a ${animal.nombre}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => performDelete(id) },
    ]);
  };

  // Eliminar animal de la API
  const performDelete = async (id) => {
  try {
    if (!id) {
      Alert.alert('Error', 'ID de animal inválido.');
      return;
    }

    console.log('🗑️ Eliminando animal con ID:', id);
    console.log('🔑 Token actual:', token);

    const resp = await deleteAnimal(token, id);
    console.log('🗑️ Resultado DELETE:', resp);

    Alert.alert('Éxito', 'Animal eliminado correctamente.');
    await fetchAnimals(token); // refrescar lista
  } catch (err) {
    console.error('❌ Error al eliminar:', err);
    const detail =
      err.body?.message ||
      (err.body && JSON.stringify(err.body)) ||
      err.message ||
      'Error desconocido';
    Alert.alert('Error', detail);
  }
};

  // Editar animal
  const handleEdit = (animal) => {
    navigation.navigate('EditAnimal', { animal });
  };

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      loadTokenAndAnimals();
    });
    loadTokenAndAnimals();
    return unsub;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="➕ Crear nuevo animal"
          onPress={() => navigation.navigate('CreateAnimal')}
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
          <RefreshControl refreshing={refreshing} onRefresh={() => fetchAnimals(token)} />
        }
        ListEmptyComponent={() => (
          <Text style={styles.empty}>No hay animales registrados</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#f5f5f5' },
  buttonContainer: { marginBottom: 10 },
  empty: { textAlign: 'center', marginTop: 30, fontSize: 16, color: '#777' },
});
