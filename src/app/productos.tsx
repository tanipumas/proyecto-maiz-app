import { API_URL } from '@/config';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 1. Componente de Categorías Superiores Horizontal
const categoriasVisualesLista = [
  { id: '1', nombre: 'Huerto', icono: '🍅' },
  { id: '2', nombre: 'Granos', icono: '🌽' },
  { id: '3', nombre: 'Tierra', icono: '🥔' },
  { id: '4', nombre: 'Despensa', icono: '🌾' },
  { id: '5', nombre: 'Orgánico', icono: '🌿' },
];

function CategoriasVisuales({ categoriaSeleccionada, onSelectCategoria }: { categoriaSeleccionada: string | null, onSelectCategoria: (nombre: string | null) => void }) {
  return (
    <View style={styles.categoriasContainerVisual}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainerVisual}>
        <TouchableOpacity 
          style={[styles.categoryCard, categoriaSeleccionada === null && styles.selectedCard]}
          onPress={() => onSelectCategoria(null)}
          activeOpacity={0.8}
        >
          <Text style={styles.categoryIcon}>✨</Text>
          <Text style={[styles.categoryText, categoriaSeleccionada === null && styles.selectedText]}>Todas</Text>
        </TouchableOpacity>

        {categoriasVisualesLista.map((cat) => {
          const isSelected = categoriaSeleccionada === cat.nombre;
          return (
            <TouchableOpacity 
              key={cat.id} 
              style={[styles.categoryCard, isSelected && styles.selectedCard]}
              onPress={() => onSelectCategoria(cat.nombre)}
              activeOpacity={0.8}
            >
              <Text style={styles.categoryIcon}>{cat.icono}</Text>
              <Text style={[styles.categoryText, isSelected && styles.selectedText]}>{cat.nombre}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default function ProductosScreen() {
  const [categoriasData, setCategoriasData] = useState<{ [key: string]: any[] }>({});
  const [loading, setLoading] = useState(true);
  const [categoriaAbierta, setCategoriaAbierta] = useState<string | null>(null);
  const [filtroVisual, setFiltroVisual] = useState<string | null>(null);
  
  const { addToCart, totalItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    fetch(`${API_URL}/api/productos/`)
      .then((res) => res.json())
      .then((data) => {
        setCategoriasData(data || {});
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setLoading(false);
      });
  }, []);

  const obtenerIconoCategoria = (nombre: string) => {
    const lower = nombre.toLowerCase();
    if (lower.includes('maiz') || lower.includes('maíz') || lower.includes('grano')) return '🌽';
    if (lower.includes('harina') || lower.includes('polvo')) return '🌾';
    if (lower.includes('tortilla') || lower.includes('masa')) return '🫓';
    if (lower.includes('bebida') || lower.includes('agua') || lower.includes('atole')) return '🥛';
    if (lower.includes('semilla') || lower.includes('frijol')) return '🌱';
    return '📦';
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={{ marginTop: 10 }}>Cargando catálogo...</Text>
      </View>
    );
  }

  // Filtrar las categorías según lo que toque el usuario arriba
  const categoriasKeys = Object.keys(categoriasData).filter((categoriaNombre) => {
    if (!filtroVisual) return true;
    return categoriaNombre.toLowerCase().includes(filtroVisual.toLowerCase());
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Barra superior estilizada con Home, Título, Perfil y Carrito */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <TouchableOpacity 
            onPress={() => router.replace('/home')} 
            style={styles.homeBtn}
          >
            <Text style={{ fontSize: 16 }}>🏠</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.title}>Catálogo 🌽</Text>
            <Text style={styles.subtitle}>Selecciona una categoría</Text>
          </View>
        </View>

        <View style={styles.headerButtons}>
          <TouchableOpacity 
            onPress={() => router.push('/perfil')} 
            style={styles.profileBtn}
          >
            <Text style={{ fontSize: 16 }}>👤</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push('/carrito')} 
            style={styles.cartBtn}
          >
            <Text style={{ fontWeight: 'bold', color: '#2E7D32' }}>🛒 ({totalItems})</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Categorías Visuales Interactivas */}
      <CategoriasVisuales 
        categoriaSeleccionada={filtroVisual} 
        onSelectCategoria={(nombre) => {
          setFiltroVisual(nombre);
          if (nombre) setCategoriaAbierta(nombre); // Abre automáticamente la categoría seleccionada
        }} 
      />

      {categoriasKeys.length === 0 ? (
        <View style={styles.center}>
          <Text style={{ fontSize: 16, color: '#666' }}>No hay productos en esta categoría.</Text>
        </View>
      ) : (
        categoriasKeys.map((categoriaNombre) => {
          const listaProductos = categoriasData[categoriaNombre];
          if (!Array.isArray(listaProductos)) return null;

          const estaAbierta = categoriaAbierta === categoriaNombre;
          const icono = obtenerIconoCategoria(categoriaNombre);

          return (
            <View key={categoriaNombre} style={styles.categoriaContainer}>
              {/* Botón Acordeón de la Categoría */}
              <TouchableOpacity 
                style={[styles.categoriaHeader, estaAbierta && styles.categoriaHeaderActive]} 
                onPress={() => setCategoriaAbierta(estaAbierta ? null : categoriaNombre)}
                activeOpacity={0.8}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.categoryIconMain}>{icono}</Text>
                  <Text style={[styles.categoriaTitle, estaAbierta && styles.categoriaTitleActive]}>
                    {categoriaNombre} <Text style={styles.countText}>({listaProductos.length})</Text>
                  </Text>
                </View>
                <Text style={styles.arrowIcon}>{estaAbierta ? '▲' : '▼'}</Text>
              </TouchableOpacity>

              {/* Contenedor de productos en Cuadrícula (Grid de 2 columnas) */}
              {estaAbierta && (
                <View style={styles.gridContainer}>
                  {listaProductos.length === 0 ? (
                    <Text style={styles.emptyText}>No hay productos en esta categoría.</Text>
                  ) : (
                    listaProductos.map((item: any) => (
                      <View key={item.id} style={styles.card}>
                        {item.imagen ? (
                          <Image source={{ uri: item.imagen }} style={styles.image} resizeMode="cover" />
                        ) : (
                          <View style={styles.imagePlaceholder}>
                            <Text style={styles.placeholderEmoji}>🌾</Text>
                          </View>
                        )}

                        <View style={styles.infoContainer}>
                          <Text style={styles.prodName} numberOfLines={1}>{item.nombre}</Text>
                          
                          <Text style={styles.prodPrice}>
                            ${item.precio_por_kilo} <Text style={styles.currency}>MXN/kg</Text>
                          </Text>
                          
                          <TouchableOpacity 
                            style={styles.btnAgregar}
                            onPress={() => {
                              addToCart({
                                ...item,
                                precio: item.precio_por_kilo
                              });
                              Alert.alert('¡Éxito!', `${item.nombre} agregado al carrito.`);
                            }}
                          >
                            <Text style={styles.btnText}>+ Agregar</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))
                  )}
                </View>
              )}
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F8', paddingTop: 40 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, marginTop: 50 },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: '800', color: '#1E293B' },
  subtitle: { fontSize: 13, color: '#64748B' },
  
  headerButtons: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  homeBtn: { backgroundColor: '#FFFFFF', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#E2E8F0', elevation: 1 },
  profileBtn: { backgroundColor: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#E2E8F0', elevation: 1 },
  cartBtn: { backgroundColor: '#E8F5E9', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#C8E6C9', elevation: 1 },
  
  // Estilos del componente de Categorías Superiores
  categoriasContainerVisual: { marginVertical: 10, marginBottom: 16 },
  scrollContainerVisual: { paddingHorizontal: 16, gap: 10 },
  categoryCard: { alignItems: 'center', backgroundColor: '#FFFFFF', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 14, borderWidth: 1, borderColor: '#E2E8F0', minWidth: 80, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 2, elevation: 1 },
  selectedCard: { backgroundColor: '#166534', borderColor: '#166534' },
  categoryIcon: { fontSize: 22, marginBottom: 2 },
  categoryText: { fontSize: 12, fontWeight: '700', color: '#475569' },
  selectedText: { color: '#FFFFFF' },

  categoriaContainer: { marginBottom: 14, marginHorizontal: 16 },
  categoriaHeader: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  categoriaHeaderActive: { backgroundColor: '#F0FDF4', borderColor: '#86EFAC' },
  categoryIconMain: { fontSize: 20, marginRight: 10 },
  categoriaTitle: { fontSize: 16, fontWeight: '700', color: '#334155' },
  categoriaTitleActive: { color: '#166534' },
  countText: { fontSize: 13, fontWeight: 'normal', color: '#64748B' },
  arrowIcon: { fontSize: 12, color: '#64748B' },
  
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 12 },
  emptyText: { textAlign: 'center', color: '#888', marginVertical: 10, fontStyle: 'italic', width: '100%' },
  
  card: { width: '48%', backgroundColor: '#fff', borderRadius: 14, marginBottom: 14, overflow: 'hidden', borderWidth: 1, borderColor: '#E2E8F0', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  image: { width: '100%', height: 110 },
  imagePlaceholder: { width: '100%', height: 110, backgroundColor: '#F1F8E9', justifyContent: 'center', alignItems: 'center' },
  placeholderEmoji: { fontSize: 28 },
  
  infoContainer: { padding: 10 },
  prodName: { fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 4 },
  prodPrice: { fontSize: 14, fontWeight: '700', color: '#166534', marginBottom: 8 },
  currency: { fontSize: 10, fontWeight: 'normal', color: '#64748B' },
  btnAgregar: { backgroundColor: '#166534', paddingVertical: 6, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 }
});