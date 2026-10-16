import { Ionicons } from '@expo/vector-icons';
import { Accelerometer, Gyroscope } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type SensorData = {
  x: number;
  y: number;
  z: number;
};

// Los sensores de movimiento solo existen en un celular: en el navegador (web)
// expo-sensors no los soporta y la pantalla se rompería. Probar siempre en Expo Go.
export default function SensorsScreen() {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webNotice}>
        <View style={[styles.iconTileLarge, { backgroundColor: '#5B5BD61F' }]}>
          <Ionicons name="phone-portrait-outline" size={40} color="#5B5BD6" />
        </View>
        <Text style={styles.webTitle}>Solo disponible en el celular</Text>
        <Text style={styles.webSubtitle}>
          Abrí la app con Expo Go para usar el acelerómetro y el giroscopio.
        </Text>
      </View>
    );
  }
  return <SensorsContent />;
}

function SensorsContent() {
  const insets = useSafeAreaInsets();
  const [accelerometerData, setAccelerometerData] = useState<SensorData | null>(null);
  const [gyroscopeData, setGyroscopeData] = useState<SensorData | null>(null);
  const [isActive, setIsActive] = useState({
    accelerometer: false,
    gyroscope: false,
  });

  // LIMPIEZA OBLIGATORIA: Los sensores siguen enviando datos en segundo plano
  // si no se remueven los listeners. Esto agotaría la batería.
  useEffect(() => {
    return () => {
      // removeAllListeners: Detiene todas las suscripciones al desmontar la pantalla
      Accelerometer.removeAllListeners();
      Gyroscope.removeAllListeners();
    };
  }, []);

  const startAccelerometer = () => {
    if (isActive.accelerometer) {
      stopAccelerometer();
      return;
    }

    // setUpdateInterval: Define cada cuántos milisegundos queremos recibir datos.
    // Un valor muy bajo (ej: 10ms) puede saturar el bridge de React Native.
    Accelerometer.setUpdateInterval(100);

    // addListener: Crea una suscripción que ejecuta el callback con cada movimiento.
    Accelerometer.addListener((data) => {
      setAccelerometerData(data);
    });
    setIsActive((prev) => ({ ...prev, accelerometer: true }));
  };

  const stopAccelerometer = () => {
    Accelerometer.removeAllListeners();
    setAccelerometerData(null);
    setIsActive((prev) => ({ ...prev, accelerometer: false }));
  };

  const startGyroscope = () => {
    if (isActive.gyroscope) {
      stopGyroscope();
      return;
    }

    Gyroscope.setUpdateInterval(100);
    Gyroscope.addListener((data) => {
      setGyroscopeData(data);
    });
    setIsActive((prev) => ({ ...prev, gyroscope: true }));
  };

  const stopGyroscope = () => {
    Gyroscope.removeAllListeners();
    setGyroscopeData(null);
    setIsActive((prev) => ({ ...prev, gyroscope: false }));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: 32,
        paddingBottom: insets.bottom + 32,
        paddingHorizontal: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Sensores del dispositivo</Text>
        <Text style={styles.subtitle}>Activá un sensor para ver sus datos en tiempo real</Text>
      </View>

      <View style={styles.list}>
        <SensorCard
          title="Acelerómetro"
          icon="phone-portrait-outline"
          color="#5B5BD6"
          data={accelerometerData}
          active={isActive.accelerometer}
          onPress={startAccelerometer}
        />
        <SensorCard
          title="Giroscopio"
          icon="sync-outline"
          color="#F59E0B"
          data={gyroscopeData}
          active={isActive.gyroscope}
          onPress={startGyroscope}
        />
      </View>
    </ScrollView>
  );
}

type SensorCardProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  data: SensorData | null;
  active: boolean;
  onPress: () => void;
};

function SensorCard({ title, icon, color, data, active, onPress }: SensorCardProps) {
  const axes: { label: string; value: number | undefined }[] = [
    { label: 'X', value: data?.x },
    { label: 'Y', value: data?.y },
    { label: 'Z', value: data?.z },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconTile, { backgroundColor: `${color}1F` }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <Text style={styles.cardTitle}>{title}</Text>
        {active && (
          <View style={[styles.statusPill, { backgroundColor: `${color}1F` }]}>
            <View style={[styles.statusDot, { backgroundColor: color }]} />
            <Text style={[styles.statusText, { color }]}>Activo</Text>
          </View>
        )}
      </View>

      <View style={styles.dataRow}>
        {axes.map((axis) => (
          <View key={axis.label} style={styles.dataCell}>
            <Text style={styles.dataLabel}>{axis.label}</Text>
            <Text style={[styles.dataValue, axis.value === undefined && styles.dataEmpty]}>
              {axis.value === undefined ? '–' : axis.value.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          active ? styles.buttonActive : { backgroundColor: color },
          pressed && styles.buttonPressed,
        ]}
      >
        <Ionicons
          name={active ? 'stop' : 'play'}
          size={18}
          color={active ? '#14161B' : '#FFFFFF'}
        />
        <Text style={[styles.buttonText, active && styles.buttonTextActive]}>
          {active ? 'Detener' : 'Iniciar'} {title.toLowerCase()}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  webNotice: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
    backgroundColor: '#F7F8FA',
  },
  iconTileLarge: {
    width: 80,
    height: 80,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  webTitle: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: '#14161B',
    textAlign: 'center',
  },
  webSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 320,
  },
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
    padding: 16,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E7E9EE',
    backgroundColor: '#FFFFFF',
    gap: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconTile: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.2,
    color: '#14161B',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12.5,
    fontWeight: '600',
  },
  dataRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dataCell: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: '#F7F8FA',
    gap: 2,
  },
  dataLabel: {
    fontSize: 12.5,
    fontWeight: '500',
    color: '#6B7280',
  },
  dataValue: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: -0.4,
    color: '#14161B',
    fontVariant: ['tabular-nums'],
  },
  dataEmpty: {
    color: '#B4B9C4',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
  },
  buttonActive: {
    backgroundColor: '#F0F1F4',
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  buttonTextActive: {
    color: '#14161B',
  },
});
