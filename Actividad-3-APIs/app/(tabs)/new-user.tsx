import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Field from '../../components/Field';
import { Colors } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import useCreateUser from '../../hooks/useCreateUser';

export default function NewUserScreen(): React.JSX.Element {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const { createUser, data, loading, error, reset } = useCreateUser();

  const canSubmit = name.trim() && username.trim() && email.trim();

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

          <TouchableOpacity
            style={[styles.button, (loading || !canSubmit) && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading || !canSubmit}
          >
            {loading ? (
              <ActivityIndicator color={colors.onPrimary} />
            ) : (
              <Text style={styles.buttonText}>Crear Usuario</Text>
            )}
          </TouchableOpacity>

          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {data && (
            <View style={styles.resultBox}>
              <View style={styles.resultHeader}>
                <Text style={styles.resultTitle}>Respuesta de la API</Text>
                <TouchableOpacity onPress={handleClear}>
                  <Text style={styles.clearText}>Limpiar</Text>
                </TouchableOpacity>
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
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    flex: { flex: 1 },
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      padding: 24,
      paddingBottom: 48,
    },
    title: {
      fontSize: 26,
      fontWeight: '700',
      color: colors.text,
    },
    subtitle: {
      fontSize: 13,
      color: colors.textSecondary,
      marginTop: 4,
      marginBottom: 28,
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 14,
      alignItems: 'center',
      marginTop: 8,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonText: {
      color: colors.onPrimary,
      fontSize: 15,
      fontWeight: '600',
    },
    errorBox: {
      marginTop: 20,
      backgroundColor: colors.errorBackground,
      borderRadius: 10,
      padding: 14,
    },
    errorText: {
      color: colors.error,
      fontSize: 14,
    },
    resultBox: {
      marginTop: 28,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      padding: 18,
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
      color: colors.text,
    },
    clearText: {
      fontSize: 13,
      color: colors.textSecondary,
      textDecorationLine: 'underline',
    },
    resultRow: {
      marginBottom: 10,
    },
    resultLabel: {
      fontSize: 11,
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    resultValue: {
      fontSize: 15,
      color: colors.text,
      marginTop: 2,
    },
  });