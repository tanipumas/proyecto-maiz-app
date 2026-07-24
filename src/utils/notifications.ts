// src/utils/notifications.ts
import { Alert } from 'react-native';

// Función que simula el cuadro de diálogo profesional de permisos
export async function solicitarPermisosNotificaciones(): Promise<boolean> {
  return new Promise((resolve) => {
    Alert.alert(
      "🔔 ¿Permitir que Proyecto Maíz te envíe notificaciones?",
      "Nos gustaría enviarte alertas sobre el estado de tus pedidos, descuentos de mayoreo y promociones exclusivas.",
      [
        {
          text: "No permitir",
          onPress: () => {
            console.log("Permiso de notificaciones denegado");
            resolve(false);
          },
          style: "cancel",
        },
        {
          text: "Permitir",
          onPress: () => {
            console.log("Permiso de notificaciones concedido");
            // Aquí puedes guardar en AsyncStorage si el usuario aceptó
            resolve(true);
          },
        },
      ],
      { cancelable: false }
    );
  });
}

// Función para disparar una notificación simulada o local cuando ocurra un evento
export const emitirNotificacionLocal = async (titulo: string, cuerpo: string) => {
  Alert.alert(titulo, cuerpo);
};