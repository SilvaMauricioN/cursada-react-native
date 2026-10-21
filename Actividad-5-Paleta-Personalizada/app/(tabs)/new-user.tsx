import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import Field from '../../components/Field';
import { AppTheme } from '../../constants/theme';
import { useAppTheme } from '../../context/ThemeContext';
import useCreateUser from '../../hooks/useCreateUser';

export default function NewUserScreen(): React.JSX.Element {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const { createUser, data, loading, error, reset } = useCreateUser();

  const canSubmit = Boolean(name.trim() && username.trim() && email.trim());

  const handleSubmit = (): void => {
    if (!canSubmit) return;
    createUser({
      name: name.trim(),
      username: username.trim(),
      email: email.trim(),
      phone: phone.trim(),
    });
  };

  const handleClear = (): void => {
    setName('');
    setUsername('');
    setEmail('');
    setPhone('');
    reset();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Nuevo Usuario</Text>
          <Text style={styles.subtitle}>JSONPlaceholder · POST /users</Text>

          <Field label="Nombre" placeholder="Leanne Graham" value={name} onChangeText={setName} />
          <Field
            label="Usuario"
            placeholder="Bret"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <Field
            label="Email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Field
            label="Teléfono"
            placeholder="1-770-736-8031"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading || !canSubmit}
            contentStyle={styles.buttonContent}
            style={styles.button}
          >
            Crear Usuario
          </Button>

          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {data && (
            <Card mode="outlined" style={styles.resultBox}>
              <Card.Content>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultTitle}>Respuesta de la API</Text>
                  <Button mode="text" compact onPress={handleClear}>
                    Limpiar
                  </Button>
                </View>

                {(
                  [
                    ['ID', String(data.id)],
                    ['Nombre', data.name],
                    ['Usuario', data.username],
                    ['Email', data.email],
                    ['Teléfono', data.phone],
                  ] as const
                ).map(([label, value]) => (
                  <View key={label} style={styles.resultRow}>
                    <Text style={styles.resultLabel}>{label}</Text>
                    <Text style={styles.resultValue}>{value || '—'}</Text>
                  </View>
                ))}
              </Card.Content>
            </Card>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    flex: { flex: 1 },
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      padding: 24,
      paddingBottom: 48,
    },
    title: {
      fontSize: 26,
      fontWeight: '700',
      color: theme.colors.onBackground,
    },
    subtitle: {
      fontSize: 13,
      color: theme.colors.onSurfaceVariant,
      marginTop: 4,
      marginBottom: 28,
    },
    button: {
      marginTop: 8,
    },
    buttonContent: {
      paddingVertical: 6,
    },
    errorBox: {
      marginTop: 20,
      backgroundColor: theme.colors.errorContainer,
      borderRadius: 10,
      padding: 14,
    },
    errorText: {
      color: theme.colors.error,
    },
    resultBox: {
      marginTop: 28,
    },
    resultHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14,
    },
    resultTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.colors.onSurface,
    },
    resultRow: {
      marginBottom: 10,
    },
    resultLabel: {
      fontSize: 11,
      color: theme.colors.onSurfaceVariant,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    resultValue: {
      fontSize: 15,
      color: theme.colors.onSurface,
      marginTop: 2,
    },
  });