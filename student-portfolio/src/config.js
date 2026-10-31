// Set VITE_API_BASE_URL at build time for deployments using a different host port.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
