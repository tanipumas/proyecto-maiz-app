// src/app/index.tsx
import { useEffect } from 'react';
import { emitirNotificacionLocal, solicitarPermisosNotificaciones } from '../utils/notifications';
import HomeScreen from './home';

// Dentro de tu export default function HomeScreen() {
  useEffect(() => {
    // Solicitar permisos al cargar la pantalla principal
    solicitarPermisosNotificaciones();
  }, []);

  // Ejemplo de función para probar una notificación del banner
  const probarNotificacionPromocion = () => {
    emitirNotificacionLocal(
      "✨ ¡Promoción Activada!",
      "Has seleccionado el beneficio de Envío Gratis en Mayoreo para tu negocio."
    );
  };

export default HomeScreen;
