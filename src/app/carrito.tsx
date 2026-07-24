import { API_URL } from '@/config';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CarritoScreen() {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    if (cart.length === 0) {
      Alert.alert('Carrito vacío', 'Agrega productos antes de pagar.');
      return;
    }

    setLoading(true);

    try {
      // Enviamos la orden al servidor sincronizado con tu web
      const response = await fetch(`${API_URL}/api/pedidos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Aquí podrías agregar el token del usuario logueado si usas autenticación Bearer
        },
        body: JSON.stringify({
          productos: cart,
          total: totalPrice,
          fecha: new Date().toISOString(),
          estatus: 'Pendiente de envío' // Estatus vinculado a la base de datos de la web
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('¡Compra exitosa!', 'Tu pedido ha sido registrado y se reflejará en la web.');
        clearCart();
        router.replace('/'); // Regresar a la pantalla principal
      } else {
        Alert.alert('Error', data.message || 'No se pudo procesar la orden.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error de conexión', 'Verifica tu conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu Carrito de Compras</Text>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Tu carrito está vacío.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.nombre}</Text>
                  <Text style={styles.itemDetails}>Cantidad: {item.cantidad} | ${item.precio * item.cantidad} MXN</Text>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.deleteButton}>
                  <Text style={styles.deleteText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            )}
          />
<TouchableOpacity 
  style={styles.checkoutButton} 
  onPress={() => router.push('/pago')}
>
  <Text style={styles.checkoutButtonText}>Proceder al Pago →</Text>
</TouchableOpacity>
          <View style={styles.footer}>
            <Text style={styles.totalText}>Total: ${totalPrice} MXN</Text>
            
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.checkoutButtonText}>Confirmar Pedido y Pagar</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa', paddingHorizontal: 16, paddingTop: 40 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2c3e50', marginBottom: 16, textAlign: 'center' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#7f8c8d' },
  cartItem: { flexDirection: 'row', backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, alignItems: 'center', justifyContent: 'space-between', elevation: 1 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  itemDetails: { fontSize: 14, color: '#666', marginTop: 4 },
  deleteButton: { backgroundColor: '#e74c3c', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  deleteText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  footer: { paddingVertical: 16, borderTopWidth: 1, borderTopColor: '#ddd', backgroundColor: '#f5f6fa' },
  totalText: { fontSize: 18, fontWeight: 'bold', color: '#27ae60', marginBottom: 12, textAlign: 'right' },
  checkoutButton: { backgroundColor: '#27ae60', paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  checkoutButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});