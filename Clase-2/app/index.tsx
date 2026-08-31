import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Clase2 from './Clase2';

export default function Index() {
  const [nombre, setNombre] = useState('Nicolás Silva');
  const [bio, setBio] = useState('Aprendiendo react native');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.avatar} />
          </View>
          <Text style={styles.nombre}> {nombre} </Text>
          <Text> {bio} </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardAccent} />
            <Text style={styles.cardTitle}>Editar Perfil</Text>
          </View>

          <Text style={styles.label}>Nombre: </Text>
          <TextInput
            value={nombre}
            onChangeText={setNombre}
            style={styles.input}
            placeholder="Escribe tu nombre"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Biografía</Text>
          <TextInput
            value={bio}
            onChangeText={setBio}
            multiline
            style={[styles.input, styles.textArea]}
            placeholder="Escribe una breve bio"
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.boton} onPress={() => alert('¡Perfil actualizado!')}>
            <Text style={styles.botonTexto}> Actualizar perfil </Text>
          </TouchableOpacity>
        </View>
        <Clase2 nombre={nombre} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F3EC' },
  container: { padding: 22, alignItems: 'center', paddingBottom: 48 },
  header: { alignItems: 'center', marginBottom: 28, marginTop: 8 },
  avatarContainer: {
    padding: 4,
    borderRadius: 64,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EDE7DC',
    shadowColor: '#1C2541',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 5,
  },
  avatar: { width: 120, height: 120, borderRadius: 50 },
  nombre: { fontSize: 24, fontWeight: '700', color: '#1C2541', marginTop: 12 },
  bio: {
    fontSize: 14,
    color: '#6B6259',
    marginTop: 4,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EDE7DC',
    shadowColor: '#1C2541',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 22,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  cardAccent: {
    width: 4,
    height: 16,
    borderRadius: 2,
    backgroundColor: '#C17A4E',
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C2541',
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
    color: '#6B6259',
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#F7F3EC',
    borderWidth: 1,
    borderColor: '#EDE7DC',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 15,
    color: '#1C2541',
    marginBottom: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  boton: {
    backgroundColor: '#1C2541',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    marginTop: 8,
    alignItems: 'center',
  },
  botonTexto: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 },
});
