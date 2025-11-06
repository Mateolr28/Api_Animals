import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import AnimalsList from "../screens/AnimalsList";
import CreateAnimal from "../screens/CreateAnimal";
import EditAnimal from "../screens/EditAnimal";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="AnimalsList"
        component={AnimalsList}
        options={{ title: "Animales" }}
      />
      <Stack.Screen
        name="CreateAnimal"
        component={CreateAnimal}
        options={{ title: "Crear Animal" }}
      />
      <Stack.Screen
        name="EditAnimal"
        component={EditAnimal}
        options={{ title: "Editar Animal" }}
      />
    </Stack.Navigator>
  );
}
