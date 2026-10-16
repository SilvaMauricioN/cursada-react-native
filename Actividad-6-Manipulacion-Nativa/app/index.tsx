import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Cada "id" coincide con el nombre de un archivo dentro de /app
// (camera.tsx -> /camera). Agregar una tarjeta nueva = agregar un objeto acá.
const capabilities = [
  {
    id: 'camera',
    title: 'Cámara',
    icon: 'camera-outline',
    color: '#F2555D',
    description: 'Tomar fotos',
  },
  {
    id: 'sensors',
    title: 'Sensores',
    icon: 'phone-portrait-outline',
    color: '#5B5BD6',
    description: 'Acelerómetro y giroscopio',
  },
  {
    id: 'location',
    title: 'Ubicación',
    icon: 'location-outline',
    color: '#12A594',
    description: 'GPS del dispositivo',
  },
];

export default function Index() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: insets.top + 32,
        paddingBottom: insets.bottom + 32,
        paddingHorizontal: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Capacidades nativas</Text>
        <Text style={styles.subtitle}>Seleccioná una capacidad para probarla</Text>
      </View>

      <View style={styles.list}>
        {capabilities.map((capability) => (
          <Pressable
            key={capability.id}
            accessibilityRole="button"
            accessibilityLabel={`${capability.title}. ${capability.description}`}
            onPress={() => router.push(`/${capability.id}` as any)}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          >
            <View style={[styles.iconTile, { backgroundColor: `${capability.color}1F` }]}>
              <Ionicons name={capability.icon as any} size={24} color={capability.color} />
            </View>

            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{capability.title}</Text>
              <Text style={styles.cardDescription}>{capability.description}</Text>
            </View>

            <Ionicons name="chevron-forward" size={18} color="#B4B9C4" />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -0.7,
    color: '#14161B',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#6B7280',
  },
  list: {
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E7E9EE',
    backgroundColor: '#FFFFFF',
    gap: 16,
  },
  cardPressed: {
    backgroundColor: '#F0F1F4',
    transform: [{ scale: 0.985 }],
  },
  iconTile: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    flex: 1,
    gap: 2,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.2,
    color: '#14161B',
  },
  cardDescription: {
    fontSize: 13.5,
    lineHeight: 19,
    color: '#6B7280',
  },
});
