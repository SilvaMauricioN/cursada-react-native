import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';

import { ErrorView, LoadingView } from '../../components/Feedback';
import { AppTheme } from '../../constants/theme';
import { useAppTheme } from '../../context/ThemeContext';
import useUser from '../../hooks/useGetUser';

function Row({ label, value }: { label: string; value: string }) {
  const theme = useAppTheme();
  return (
    <View style={rowStyles.row}>
      <Text style={[rowStyles.label, { color: theme.colors.onSurfaceVariant }]}>{label}</Text>
      <Text style={[rowStyles.value, { color: theme.colors.onSurface }]}>{value}</Text>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const theme = useAppTheme();
  return (
    <Card mode="outlined" style={rowStyles.section}>
      <Card.Content>
        <Text style={[rowStyles.sectionTitle, { color: theme.colors.onSurface }]}>{title}</Text>
        {children}
      </Card.Content>
    </Card>
  );
}

export default function UserDetailScreen(): React.JSX.Element {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: user.username }} />

      <View style={styles.hero}>
        <Avatar.Text size={72} label={initials} style={styles.avatar} />
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

const rowStyles = StyleSheet.create({
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 14,
  },
  row: {
    marginBottom: 10,
  },
  label: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 15,
    marginTop: 2,
  },
});

const createStyles = (theme: AppTheme) =>
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
      marginBottom: 14,
    },
    name: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.colors.onBackground,
    },
    username: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
      marginTop: 2,
    },
  });