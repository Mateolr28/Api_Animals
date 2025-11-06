// src/api/animals.js
import { API_CONFIG } from './config';

const baseUrl = API_CONFIG.baseUrl.replace(/\/$/, '');

async function request(path, method = 'GET', token = null, body = null) {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) headers['Authorization'] = token;

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }

  if (!res.ok) {
    const error = new Error(data?.message || `HTTP ${res.status}`);
    error.status = res.status;
    error.body = data;
    throw error;
  }
  return data;
}

export const login = async (username, password) => {
  return request('/auth/login', 'POST', null, { username, password });
};

export const getAnimals = async (token) => {
  return request('/animals', 'GET', token);
};

export const createAnimal = async (token, animalBody) => {
  return request('/animals', 'POST', token, animalBody);
};

export const updateAnimal = async (token, id, animalBody) => {
  return request(`/animals/${id}`, 'PUT', token, animalBody);
};

export const deleteAnimal = async (token, id) => {
  if (!id) {
    throw new Error('ID inválido al eliminar.');
  }

  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = token.startsWith('Bearer')
      ? token
      : `Bearer ${token}`;
  }

  const url = `${baseUrl}/animals/${id}`;
  console.log(`🗑️ Enviando DELETE a: ${url}`);
  console.log('🔑 Token enviado:', headers['Authorization']);

  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers,
    });

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      data = text;
    }

    console.log('🗑️ Respuesta DELETE:', res.status, data);

    if (!res.ok) {
      const err = new Error(data?.message || `HTTP ${res.status}`);
      err.status = res.status;
      err.body = data;
      throw err;
    }

    return data;
  } catch (error) {
    console.error('❌ Error interno en deleteAnimal:', error);
    throw error;
  }
};