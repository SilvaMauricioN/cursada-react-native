import { Ionicons } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CameraScreen() {
  const insets = useSafeAreaInsets();
  const [facing, setFacing] = useState<CameraType>('back');
  const [photo, setPhoto] = useState<string | null>(null);

  // permission: { granted, canAskAgain, status }  (null mientras carga)
  // requestPermission: dispara el diálogo nativo del sistema
  const [permission, requestPermission] = useCameraPermissions();

  // useRef: guardamos una referencia a la cámara para poder llamar takePictureAsync()
  const cameraRef = useRef<CameraView>(null);

  // 1. Escenario: el estado de los permisos todavía no se cargó
  if (!permission) {
    return <View style={styles.light} />;
  }

  // 2. Escenario: permiso denegado o todavía no pedido
  if (!permission.granted) {
    return (
      <View style={[styles.light, styles.centered]}>
        <View style={styles.iconTileLarge}>
          <Ionicons name="camera-outline" size={40} color="#F2555D" />
        </View>
        <Text style={styles.messageTitle}>Permiso de cámara requerido</Text>
        <Text style={styles.messageText}>Necesitamos acceso a tu cámara para tomar fotos</Text>
        <Pressable
          accessibilityRole="button"
          onPress={requestPermission}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>Solicitar permiso</Text>
        </Pressable>
      </View>
    );
  }

  // Alternar entre cámara trasera y frontal
  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  // takePictureAsync captura y devuelve la ubicación temporal del archivo
  const takePicture = async () => {
    if (!cameraRef.current) return;
    try {
      const result = await cameraRef.current.takePictureAsync({ quality: 0.8 });
      setPhoto(result.uri);
    } catch (error) {
      Alert.alert('Error', 'No se pudo tomar la foto');
      console.log(error);
    }
  };

  // 3. Escenario: ya hay una foto -> vista previa
  if (photo) {
    return (
      <View style={styles.dark}>
        <Image source={{ uri: photo }} style={styles.preview} resizeMode="contain" />
        <View style={[styles.previewActions, { paddingBottom: insets.bottom + 20 }]}>
          <Pressable
            accessibilityRole="button"
            onPress={() => setPhoto(null)}
            style={({ pressed }) => [
              styles.button,
              styles.buttonFull,
              pressed && styles.buttonPressed,
            ]}
          >
            <Ionicons name="refresh-outline" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Tomar otra foto</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // 4. Escenario: cámara lista
  return (
    <View style={styles.dark}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
      {/* CameraView no admite hijos: los controles se dibujan encima, como hermanos */}
      <View style={[styles.controls, { bottom: insets.bottom + 32 }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Cambiar cámara"
          onPress={toggleCameraFacing}
          style={({ pressed }) => [styles.controlButton, pressed && styles.buttonPressed]}
        >
          <Ionicons name="camera-reverse-outline" size={26} color="#FFFFFF" />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Tomar foto"
          onPress={takePicture}
          style={({ pressed }) => [styles.captureButton, pressed && styles.captureButtonPressed]}
        >
          <View style={styles.captureButtonInner} />
        </Pressable>

        {/* Espaciador del mismo ancho que el botón de giro para centrar el disparador */}
        <View style={styles.controlButton} pointerEvents="none" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  light: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  dark: {
    flex: 1,
    backgroundColor: '#000000',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconTileLarge: {
    width: 80,
    height: 80,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2555D1F',
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
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 320,
    marginBottom: 28,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 14,
    gap: 8,
    backgroundColor: '#F2555D',
  },
  buttonFull: {
    alignSelf: 'stretch',
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
  camera: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  controlButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(20,22,27,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonPressed: {
    transform: [{ scale: 0.94 }],
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
  },
  preview: {
    flex: 1,
  },
  previewActions: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#000000',
  },
});
