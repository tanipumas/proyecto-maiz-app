import { API_URL } from '@/config';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegistroScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegistro = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Por favor llena todos los campos.');
      return;
    }

    setLoading(true);
    try {
      // Petición POST a tu vista registro_cliente en Django
      const response = await fetch(`${API_URL}/api/registro/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('¡Éxito!', 'Cuenta creada correctamente. Ahora puedes iniciar sesión.');
        router.back(); // Regresa al login automáticamente
      } else {
        Alert.alert('Error', data.error || data.message || 'No se pudo registrar el usuario.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta 🌾</Text>
      <Text style={styles.subtitle}>Regístrate para realizar tus pedidos</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegistro} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Registrarse</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', padding: 24 },
  title: { fontSize: 26, fontWeight: '800', color: '#2c3e50', marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#7f8c8d', marginBottom: 24, textAlign: 'center' },
  input: { height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 16, marginBottom: 16, backgroundColor: '#f9f9f9', fontSize: 16 },
  button: { height: 50, backgroundColor: '#27ae60', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  backButton: { marginTop: 20, alignItems: 'center' },
  backText: { color: '#27ae60', fontSize: 14, fontWeight: '600' }
});