// src/app/pago.tsx
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PasarelaPagoScreen() {
  const router = useRouter();
  const [metodoPago, setMetodoPago] = useState<'tarjeta' | 'paypal' | 'efectivo'>('tarjeta');
  const [propina, setPropina] = useState<number>(0);
  const [propinaPersonalizada, setPropinaPersonalizada] = useState<string>('');

  // Simulación de montos de compra
  const subtotal = 310.00;
  const envio = 50.00;
  const total = subtotal + envio + propina;

  const confirmarPedido = () => {
    Alert.alert(
      "🎉 ¡Pedido Exitoso!",
      `Tu pago por $${total.toFixed(2)} ha sido procesado mediante ${metodoPago.toUpperCase()}. Te enviaremos el comprobante y el seguimiento a tu correo.`,
      [
        {
          text: "Volver al Inicio",
          onPress: () => router.push('/home')
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.headerTitle}>💳 Finalizar Pago</Text>
      <Text style={styles.headerSubtitle}>Todas las transacciones son seguras y están encriptadas.</Text>

      {/* 1. Selección de Método de Pago */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Método de Pago</Text>

        {/* Opción Tarjeta */}
        <TouchableOpacity 
          style={[styles.paymentOption, metodoPago === 'tarjeta' && styles.selectedOption]}
          onPress={() => setMetodoPago('tarjeta')}
          activeOpacity={0.8}
        >
          <Text style={styles.optionIcon}>💳</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.optionTitle}>Tarjeta de Crédito o Débito</Text>
            <Text style={styles.optionDesc}>Pagos seguros procesados digitalmente</Text>
          </View>
        </TouchableOpacity>

        {/* Opción PayPal */}
        <TouchableOpacity 
          style={[styles.paymentOption, metodoPago === 'paypal' && styles.selectedOption]}
          onPress={() => setMetodoPago('paypal')}
          activeOpacity={0.8}
        >
          <Text style={styles.optionIcon}>🌐</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.optionTitle}>PayPal</Text>
            <Text style={styles.optionDesc}>Se te redirigirá a PayPal para completar tu compra</Text>
          </View>
        </TouchableOpacity>

        {/* Opción Pago contra entrega */}
        <TouchableOpacity 
          style={[styles.paymentOption, metodoPago === 'efectivo' && styles.selectedOption]}
          onPress={() => setMetodoPago('efectivo')}
          activeOpacity={0.8}
        >
          <Text style={styles.optionIcon}>💵</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.optionTitle}>Pago contra entrega</Text>
            <Text style={styles.optionDesc}>Paga en efectivo al recibir tu pedido en domicilio</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* 2. Sección de Propina para el repartidor */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Agregar propina al equipo de entrega</Text>
        <Text style={styles.sectionDesc}>Da una muestra de apoyo a nuestros repartidores locales.</Text>
        
        <View style={styles.tipGrid}>
          {[0, 10, 20, 30].map((monto) => (
            <TouchableOpacity 
              key={monto} 
              style={[styles.tipButton, propina === monto && styles.selectedTip]}
              onPress={() => { setPropina(monto); setPropinaPersonalizada(''); }}
            >
              <Text style={[styles.tipText, propina === monto && styles.selectedTipText]}>
                {monto === 0 ? 'Ninguna' : `$${monto}`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 3. Resumen de Totales */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subproductos:</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)} MXN</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Costo de Envío:</Text>
          <Text style={styles.summaryValue}>${envio.toFixed(2)} MXN</Text>
        </View>
        {propina > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Propina:</Text>
            <Text style={styles.summaryValue}>${propina.toFixed(2)} MXN</Text>
          </View>
        )}
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total a Pagar:</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)} MXN</Text>
        </View>
      </View>

      {/* Botón de Confirmación Final */}
      <TouchableOpacity style={styles.payButton} onPress={confirmarPedido} activeOpacity={0.85}>
        <Text style={styles.payButtonText}>Completar Pedido Secure</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', paddingHorizontal: 20, paddingTop: 30 },
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#14532D', marginBottom: 4 },
  headerSubtitle: { fontSize: 13, color: '#64748B', marginBottom: 20 },

  sectionContainer: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 18, marginBottom: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginBottom: 4 },
  sectionDesc: { fontSize: 12, color: '#64748B', marginBottom: 14 },

  paymentOption: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 10, backgroundColor: '#FAFAFA' },
  selectedOption: { borderColor: '#166534', backgroundColor: '#F0FDF4', borderWidth: 1.5 },
  optionIcon: { fontSize: 22, marginRight: 12 },
  optionTitle: { fontSize: 14, fontWeight: '700', color: '#1E293B' },
  optionDesc: { fontSize: 11, color: '#64748B', marginTop: 2 },

  tipGrid: { flexDirection: 'row', gap: 10, justifyContent: 'space-between' },
  tipButton: { flex: 1, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: '#CBD5E1', alignItems: 'center', backgroundColor: '#F8FAFC' },
  selectedTip: { backgroundColor: '#166534', borderColor: '#166534' },
  tipText: { fontSize: 13, fontWeight: '700', color: '#475569' },
  selectedTipText: { color: '#FFFFFF' },

  summaryContainer: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 18, marginBottom: 24, borderWidth: 1, borderColor: '#E2E8F0' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontSize: 13, color: '#64748B' },
  summaryValue: { fontSize: 13, fontWeight: '600', color: '#334155' },
  totalRow: { borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 12, marginTop: 4 },
  totalLabel: { fontSize: 16, fontWeight: '800', color: '#1E293B' },
  totalValue: { fontSize: 18, fontWeight: '900', color: '#166534' },

  payButton: { backgroundColor: '#166534', paddingVertical: 16, borderRadius: 16, alignItems: 'center', shadowColor: '#166534', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 3 },
  payButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
});