import request from 'supertest';

export const API = 'http://localhost:3000';

/**
 * Retorna un objeto con headers necesarios para autenticación.
 * Puedes modificarlo para obtener token dinámico si lo necesitas.
 */
export const getAuthHeaders = () => {
  const token = process.env.TEST_JWT || 'fake-jwt-token';
  return {
    Authorization: `Bearer ${token}`
  };
};

/**
 * Envuelve `request` con tu API base y auth por defecto
 */
export const apiRequest = () => {
  return request(API).set(getAuthHeaders());
};
