import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface Clase2Props {
  nombre: string;
}

export default function Clase2({ nombre }: Clase2Props) {
  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        console.log(`Clase2 Medidas Reales -> ancho: ${width}, alto: ${height}`);
      }}
    >
      <View style={styles.imageWrapper}>
        <Image source={require('../assets/images/noche-estrellada.webp')} style={styles.image} />
      </View>
      <Text style={styles.texto}>
        Hola,
        <Text style={styles.nombreDestacado}>{nombre}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EDE7DC',
  },
  imageWrapper: {
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#F7F3EC',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  texto: {
    paddingTop: 14,
    paddingHorizontal: 6,
    fontSize: 15,
    color: '#6B6259',
  },
  nombreDestacado: {
    fontWeight: '700',
    color: '#1C2541',
  },
});
