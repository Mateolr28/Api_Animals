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
  return request(`/animals/${id}`, 'DELETE', token);
};