import { useCart } from '@/context/CartContext';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MenuLateral } from '../components/MenuLateral';

export default function HomeScreen() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const { totalItems } = useCart();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      
      {/* Botón de Menú Hamburguesa y Encabezado Principal */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => setMenuVisible(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.menuButtonIcon}>☰</Text>
        </TouchableOpacity>
        
        <View style={styles.header}>
          <Text style={styles.brandTitle}>Proyecto Maíz 🌾</Text>
          <Text style={styles.subtitle}>Innovación y calidad en el campo mexicano</Text>
        </View>
      </View>

      {/* Banner de Promociones del Mes */}
      {/* Banner de Promociones del Mes Interactivo */}
      <TouchableOpacity 
        style={styles.bannerContainer} 
        onPress={() => router.push('/productos')}
        activeOpacity={0.9}
      >
        <View style={styles.bannerBadge}>
          <Text style={styles.bannerBadgeText}>✨ Promoción del Mes</Text>
        </View>
        <Text style={styles.bannerTitle}>¡Envío Gratis en Mayoreo!</Text>
        <Text style={styles.bannerDescription}>
          Aprovecha los descuentos especiales en grano seleccionado y harina de maíz durante todo este mes. ¡Abastece tu negocio al mejor precio!
        </Text>
        <View style={styles.bannerActionRow}>
          <Text style={styles.bannerActionText}>Ver productos en oferta →</Text>
        </View>
      </TouchableOpacity>

      {/* Cuadrícula de Opciones Principales */}
      <View style={styles.menuGrid}>
        
        {/* Catálogo */}
        <TouchableOpacity 
          style={styles.menuCardPrimary} 
          onPress={() => router.push('/productos')}
          activeOpacity={0.85}
        >
          <Text style={styles.cardIcon}>🌽</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitlePrimary}>Catálogo de Productos</Text>
            <Text style={styles.cardSubtitlePrimary}>Explora nuestra variedad de granos, masas y derivados</Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>

        {/* Pasarela de Pago / Pagar */}
        <TouchableOpacity 
          style={styles.menuCard} 
          onPress={() => router.push('/pago')} 
          activeOpacity={0.85}
        >
          <Text style={styles.cardIcon}>💳</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Pasarela de Pago</Text>
            <Text style={styles.cardSubtitle}>Tarjetas, PayPal y pago contra entrega</Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>

        {/* Ayuda / Soporte */}
        <TouchableOpacity 
          style={styles.menuCard} 
          onPress={() => router.push('/perfil')} 
          activeOpacity={0.85}
        >
          <Text style={styles.cardIcon}>💬</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Ayuda y Soporte</Text>
            <Text style={styles.cardSubtitle}>Resolvemos tus dudas sobre pedidos y entregas</Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>

        {/* Carrito de Compras */}
        <TouchableOpacity 
  style={styles.menuCard} 
  onPress={() => router.push('/carrito')}
  activeOpacity={0.85}
>
  <Text style={styles.cardIcon}>🛒</Text>
  <View style={{ flex: 1 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Text style={styles.cardTitle}>Mi Carrito</Text>
      {totalItems > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{totalItems}</Text>
        </View>
      )}
    </View>
    <Text style={styles.cardSubtitle}>Revisa tus productos seleccionados antes de pedir</Text>
  </View>
  <Text style={styles.arrowIcon}>→</Text>
</TouchableOpacity>

      </View>

      {/* Leyenda Institucional / Manifiesto */}
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteIcon}>💡</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.quoteHeaderTitle}>Compromiso con el Campo</Text>
          <Text style={styles.quoteText}>
            "El éxito de cualquier producción comienza con una materia prima de calidad. Tener maíz disponible en el momento preciso significa continuidad, confianza y crecimiento. Porque el maíz no solo alimenta industrias, también impulsa el desarrollo de México."
          </Text>
        </View>
      </View>

      {/* Componente del Menú Lateral Desplegable */}
      <MenuLateral visible={menuVisible} onClose={() => setMenuVisible(false)} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', paddingHorizontal: 20, paddingTop: 40 },
  
  topBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  menuButton: { backgroundColor: '#FFFFFF', padding: 10, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginRight: 15, elevation: 1 },
  menuButtonIcon: { fontSize: 20, fontWeight: 'bold', color: '#166534' },

  header: { flex: 1, alignItems: 'flex-start' },
  brandTitle: { fontSize: 24, fontWeight: '900', color: '#14532D', letterSpacing: 0.5 },
  subtitle: { fontSize: 12, color: '#64748B', marginTop: 2, fontWeight: '500' },

  badgeContainer: { backgroundColor: '#DCFCE7', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, borderWidth: 1, borderColor: '#86EFAC' },
  badgeText: { color: '#166534', fontSize: 11, fontWeight: '900' },

  /* Estilos del Banner de Promociones Actualizado */
  bannerContainer: { backgroundColor: '#166534', borderRadius: 20, padding: 22, marginBottom: 24, shadowColor: '#166534', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  bannerBadge: { backgroundColor: '#DCFCE7', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 10 },
  bannerBadgeText: { color: '#14532D', fontSize: 11, fontWeight: 'bold' },
  bannerTitle: { fontSize: 20, fontWeight: '800', color: '#FFFFFF', marginBottom: 6 },
  bannerDescription: { fontSize: 13, color: '#E2E8F0', lineHeight: 18, marginBottom: 12 },
  bannerActionRow: { alignSelf: 'flex-end', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.2)', paddingTop: 8, width: '100%' },
  bannerActionText: { color: '#86EFAC', fontSize: 12, fontWeight: 'bold', textAlign: 'right' },

  /* Estilos de la Cuadrícula del Menú */
  menuGrid: { gap: 14, marginBottom: 24 },
  
  menuCardPrimary: { backgroundColor: '#F0FDF4', padding: 18, borderRadius: 16, flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#86EFAC', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  cardTitlePrimary: { fontSize: 16, fontWeight: '800', color: '#166534' },
  cardSubtitlePrimary: { fontSize: 12, color: '#15803D', marginTop: 2 },

  menuCard: { backgroundColor: '#FFFFFF', padding: 18, borderRadius: 16, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 2, elevation: 1 },
  cardIcon: { fontSize: 28, marginRight: 14 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  cardSubtitle: { fontSize: 12, color: '#64748B', marginTop: 2 },
  arrowIcon: { fontSize: 18, fontWeight: 'bold', color: '#94A3B8', marginLeft: 8 },

   /* Leyenda Institucional Actualizada */
  quoteContainer: { backgroundColor: '#FEFCE8', padding: 18, borderRadius: 16, borderWidth: 1, borderColor: '#FEF08A', marginBottom: 24, flexDirection: 'row', alignItems: 'flex-start', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.02, shadowRadius: 2, elevation: 1 },
  quoteIcon: { fontSize: 22, marginRight: 12, marginTop: 2 },
  quoteHeaderTitle: { fontSize: 13, fontWeight: '800', color: '#854D0E', marginBottom: 4, letterSpacing: 0.3, textTransform: 'uppercase' },
  quoteText: { fontSize: 13, color: '#713F12', fontStyle: 'italic', lineHeight: 20, fontWeight: '500' },
});