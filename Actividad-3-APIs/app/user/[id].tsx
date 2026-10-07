import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ErrorView, LoadingView } from '../../components/Feedback';
import { Colors } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import useUser from '../../hooks/useGetUser';

export default function UserDetailScreen(): React.JSX.Element {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { data: user, loading, error } = useUser(id);

  if (loading) return <LoadingView />;
  if (error || !user) return <ErrorView message={error ?? 'Usuario no encontrado'} />;

  const { address, company } = user;

  const initials: string = user.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p: string) => p[0]?.toUpperCase() ?? '')
    .join('');

  const Row = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: user.username }} />

      <View style={styles.hero}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
      </View>

      <Section title="Contacto">
        <Row label="Email" value={user.email} />
        <Row label="Teléfono" value={user.phone} />
        <Row label="Sitio web" value={user.website} />
      </Section>

      <Section title="Dirección">
        <Row label="Calle" value={`${address.street}, ${address.suite}`} />
        <Row label="Ciudad" value={`${address.city} (${address.zipcode})`} />
        <Row label="Coordenadas" value={`${address.geo.lat}, ${address.geo.lng}`} />
      </Section>

      <Section title="Empresa">
        <Row label="Nombre" value={company.name} />
        <Row label="Lema" value={company.catchPhrase} />
      </Section>
    </ScrollView>
  );
}

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      padding: 24,
      paddingBottom: 48,
    },
    hero: {
      alignItems: 'center',
      marginBottom: 28,
    },
    avatar: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 14,
    },
    avatarText: {
      color: colors.onPrimary,
      fontSize: 24,
      fontWeight: '700',
    },
    name: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
    },
    username: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 2,
    },
    section: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      padding: 18,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 14,
    },
    row: {
      marginBottom: 10,
    },
    rowLabel: {
      fontSize: 11,
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    rowValue: {
      fontSize: 15,
      color: colors.text,
      marginTop: 2,
    },
  });