// src/components/MenuLateral.tsx
import { useRouter } from 'expo-router';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MenuLateralProps {
  visible: boolean;
  onClose: () => void;
}

export function MenuLateral({ visible, onClose }: MenuLateralProps) {
  const router = useRouter();

  const navegarA = (ruta: string) => {
    onClose();
    router.push(ruta as any);
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.menuContainer}>
          <View style={styles.menuHeader}>
            <Text style={styles.menuTitle}>Proyecto Maíz 🌾</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.optionsList}>
            <TouchableOpacity style={styles.optionItem} onPress={() => navegarA('/home')}>
              <Text style={styles.optionIcon}>🏠</Text>
              <Text style={styles.optionText}>INICIO</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionItem} onPress={() => navegarA('/perfil')}>
              <Text style={styles.optionIcon}>👤</Text>
              <Text style={styles.optionText}>MI CUENTA</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionItem} onPress={() => navegarA('/productos')}>
              <Text style={styles.optionIcon}>🌽</Text>
              <Text style={styles.optionText}>CATÁLOGO Y PRODUCTOS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionItem} onPress={() => navegarA('/carrito')}>
              <Text style={styles.optionIcon}>🛒</Text>
              <Text style={styles.optionText}>TU PEDIDO / CARRITO</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)' },
  menuContainer: { width: Dimensions.get('window').width * 0.75, backgroundColor: '#FFFFFF', height: '100%', padding: 20, paddingTop: 50, zIndex: 10 },
  backdrop: { flex: 1 },
  menuHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', paddingBottom: 16, marginBottom: 20 },
  menuTitle: { fontSize: 18, fontWeight: '900', color: '#14532D' },
  closeButton: { fontSize: 20, fontWeight: 'bold', color: '#64748B' },
  optionsList: { gap: 12 },
  optionItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  optionIcon: { fontSize: 18, marginRight: 14 },
  optionText: { fontSize: 13, fontWeight: '700', color: '#334155' }
});