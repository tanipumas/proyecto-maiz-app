import { API_URL } from '@/config';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PerfilScreen() {
  const [historial, setHistorial] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loadingPass, setLoadingPass] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    fetch(`${API_URL}/api/historial/`)
      .then((res) => res.json())
      .then((data) => {
        // Aseguramos que data sea un arreglo, si es un objeto o error mandamos vacío
        if (Array.isArray(data)) {
          setHistorial(data);
        } else {
          setHistorial([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar historial:", err);
        setHistorial([]);
        setLoading(false);
      });
  }, []);

  const handleCambiarPassword = async () => {
    if (!oldPassword || !newPassword) {
      Alert.alert('Error', 'Por favor llena ambos campos de contraseña.');
      return;
    }

    setLoadingPass(true);
    try {
      const response = await fetch(`${API_URL}/api/cambiar-password/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('¡Éxito!', 'Contraseña actualizada correctamente.');
        setOldPassword('');
        setNewPassword('');
      } else {
        Alert.alert('Error', data.error || 'No se pudo actualizar la contraseña.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    } finally {
      setLoadingPass(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.headerCard}>
        <Text style={styles.avatarEmoji}>👤</Text>
        <Text style={styles.title}>Mi Cuenta 🌾</Text>
        <Text style={styles.subtitle}>Gestiona tus pedidos y seguridad</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>📦 Mis Pedidos y Estatus</Text>
        
        {loading ? (
          <ActivityIndicator size="small" color="#166534" style={{ marginVertical: 20 }} />
        ) : historial.length === 0 ? (
          <Text style={styles.emptyText}>Aún no tienes pedidos registrados o sesión activa.</Text>
        ) : (
          historial.map((pedido: any) => (
            <View key={pedido.id || Math.random()} style={styles.pedidoCard}>
              <View style={styles.pedidoHeader}>
                <Text style={styles.pedidoId}>Pedido #{pedido.id}</Text>
                <Text style={[
                  styles.statusBadge, 
                  pedido.estatus === 'Completado' ? styles.statusGreen : styles.statusYellow
                ]}>
                  {pedido.estatus || 'En proceso'}
                </Text>
              </View>
              <Text style={styles.pedidoDate}>Fecha: {pedido.fecha || 'Reciente'}</Text>
              <Text style={styles.pedidoTotal}>Total: ${pedido.total} MXN</Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>🔒 Cambiar Contraseña</Text>

        <TextInput
          style={styles.input}
          placeholder="Contraseña actual"
          placeholderTextColor="#888"
          secureTextEntry
          value={oldPassword}
          onChangeText={setOldPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Nueva contraseña"
          placeholderTextColor="#888"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleCambiarPassword} disabled={loadingPass}>
          {loadingPass ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Actualizar Contraseña</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F8', paddingTop: 30, paddingHorizontal: 16 },
  headerCard: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0', elevation: 2 },
  avatarEmoji: { fontSize: 40, marginBottom: 8 },
  title: { fontSize: 22, fontWeight: '800', color: '#1E293B' },
  subtitle: { fontSize: 13, color: '#64748B', marginTop: 2 },

  sectionContainer: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0', elevation: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#334155', marginBottom: 12 },
  
  emptyText: { textAlign: 'center', color: '#888', fontStyle: 'italic', marginVertical: 10 },
  
  pedidoCard: { backgroundColor: '#F8FAFC', padding: 12, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  pedidoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  pedidoId: { fontWeight: 'bold', color: '#1E293B', fontSize: 14 },
  statusBadge: { fontSize: 11, fontWeight: 'bold', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  statusGreen: { backgroundColor: '#DCFCE7', color: '#166534' },
  statusYellow: { backgroundColor: '#FEF9C3', color: '#854D0E' },
  pedidoDate: { fontSize: 12, color: '#64748B', marginBottom: 2 },
  pedidoTotal: { fontSize: 13, fontWeight: '700', color: '#166534' },

  input: { height: 46, borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 10, paddingHorizontal: 14, marginBottom: 12, backgroundColor: '#F8FAFC', fontSize: 14, color: '#1E293B' },
  button: { backgroundColor: '#166534', height: 46, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
  buttonText: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' }
});