// util simple para guardar/leer credenciales en localStorage
const AUTH_KEY = 'recetas_auth_v1';

export function saveAuth({ token, user }) {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ token, user }));
  } catch (e) {
    console.warn('No se pudo guardar auth en localStorage', e);
  }
}

export function getAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('Error leyendo auth de localStorage', e);
    return null;
  }
}

export function clearAuth() {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch (e) {
    console.warn('Error limpiando auth en localStorage', e);
  }
}

export default {
  saveAuth,
  getAuth,
  clearAuth,
};
