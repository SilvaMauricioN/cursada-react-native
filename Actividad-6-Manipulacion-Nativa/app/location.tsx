import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LocationScreen() {
  const insets = useSafeAreaInsets();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    requestPermissions();
  }, []);

  // FUNCIÓN PARA SOLICITAR PERMISO: La ubicación es crítica.
  // requestForegroundPermissionsAsync: Pide permiso para cuando la app está abierta.
  const requestPermissions = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === 'granted'); // status 'granted' significa que el usuario aceptó
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se necesita permiso de ubicación para esta funcionalidad');
      }
    } catch (error) {
      Alert.alert('Error', 'Error al solicitar permisos');
    }
  };

  // FUNCIÓN PARA OBTENER COORDENADAS: este botón solo se muestra si el permiso fue concedido.
  const getCurrentLocation = async () => {
    setIsLoading(true);

    try {
      // getCurrentPositionAsync: Obtiene latitud, longitud y otros datos una sola vez.
      // accuracy: Define cuánta batería/tiempo usar para ser preciso.
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(currentLocation);
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la ubicación. ¿Tienes el GPS encendido?');
    } finally {
      setIsLoading(false);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>Solicitando permisos...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <View style={styles.iconTileLarge}>
          <Ionicons name="location-outline" size={40} color="#12A594" />
        </View>
        <Text style={styles.messageTitle}>Permiso de ubicación requerido</Text>
        <Text style={styles.message}>
          Necesitamos acceso a tu ubicación para mostrar tu posición actual.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={requestPermissions}
          style={({ pressed }) => [
            styles.button,
            styles.buttonCompact,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Solicitar permiso</Text>
        </Pressable>
      </View>
    );
  }

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
        <Text style={styles.title}>Ubicación GPS</Text>
        <Text style={styles.subtitle}>Obtené la posición actual de tu dispositivo</Text>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={getCurrentLocation}
        disabled={isLoading}
        style={({ pressed }) => [
          styles.button,
          isLoading && styles.buttonDisabled,
          pressed && styles.buttonPressed,
        ]}
      >
        <Ionicons name="locate-outline" size={20} color="#FFFFFF" />
        <Text style={styles.buttonText}>{isLoading ? 'Obteniendo...' : 'Obtener ubicación'}</Text>
      </Pressable>

      {location && (
        <View style={styles.list}>
          <DataCard
            icon="navigate-outline"
            label="Coordenadas"
            value={`${location.coords.latitude.toFixed(6)}, ${location.coords.longitude.toFixed(6)}`}
          />
          <DataCard
            icon="speedometer-outline"
            label="Precisión"
            value={`±${location.coords.accuracy?.toFixed(0) ?? 'N/A'} metros`}
          />
          {location.coords.altitude != null && (
            <DataCard
              icon="trending-up-outline"
              label="Altitud"
              value={`${location.coords.altitude.toFixed(2)} metros`}
            />
          )}
        </View>
      )}
    </ScrollView>
  );
}

type DataCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
};

function DataCard({ icon, label, value }: DataCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconTile}>
        <Ionicons name={icon} size={24} color="#12A594" />
      </View>
      <View style={styles.cardText}>
        <Text style={styles.cardLabel}>{label}</Text>
        <Text style={styles.cardValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F7F8FA',
  },
  iconTileLarge: {
    width: 80,
    height: 80,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#12A5941F',
    marginBottom: 20,
  },
  messageTitle: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: '#14161B',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 15,
    lineHeight: 22,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 320,
    marginBottom: 28,
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
    backgroundColor: '#12A594',
  },
  buttonCompact: {
    paddingHorizontal: 28,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  list: {
    gap: 12,
    marginTop: 24,
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
  iconTile: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#12A5941F',
  },
  cardText: {
    flex: 1,
    gap: 2,
  },
  cardLabel: {
    fontSize: 13.5,
    color: '#6B7280',
  },
  cardValue: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.2,
    color: '#14161B',
    fontVariant: ['tabular-nums'],
  },
});
