// src/config.js
const PROD_URL = "https://proyecto-maiz.onrender.com";
const DEV_URL = "http://172.31.97.23:8000"; // Usamos 10.0.2.2 para que el emulador/app llegue a tu PC

// Usamos __DEV__ que es una variable global en React Native
const API_URL = window.location.hostname === "proyecto-maiz.onrender.com" ? PROD_URL : DEV_URL;

export { API_URL };

