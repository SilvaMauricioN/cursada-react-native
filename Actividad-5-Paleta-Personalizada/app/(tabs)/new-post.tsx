import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import Field from '../../components/Field';
import { AppTheme } from '../../constants/theme';
import { useAppTheme } from '../../context/ThemeContext';
import useCreatePost from '../../hooks/useCreatePost';

export default function NewPostScreen(): React.JSX.Element {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [userId, setUserId] = useState<string>('1');

  const { createPost, data, loading, error, reset } = useCreatePost();

  const canSubmit = Boolean(title.trim() && body.trim());

  const handleSubmit = (): void => {
    if (!canSubmit) return;
    createPost({
      title: title.trim(),
      body: body.trim(),
      userId: Number(userId) || 1,
    });
  };

  const handleClear = (): void => {
    setTitle('');
    setBody('');
    setUserId('1');
    reset();
  };

  const rows: [string, string][] = data
    ? [
        ['ID', String(data.id)],
        ['Título', data.title],
        ['Contenido', data.body],
        ['User ID', String(data.userId)],
      ]
    : [];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Nuevo Post</Text>
          <Text style={styles.subtitle}>JSONPlaceholder · POST /posts</Text>

          <Field label="Título" placeholder="foo" value={title} onChangeText={setTitle} />
          <Field
            label="Contenido"
            placeholder="bar"
            value={body}
            onChangeText={setBody}
            multiline
            numberOfLines={4}
            style={styles.textArea}
          />
          <Field
            label="User ID"
            placeholder="1"
            value={userId}
            onChangeText={setUserId}
            keyboardType="numeric"
          />

          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading || !canSubmit}
            contentStyle={styles.buttonContent}
            style={styles.button}
          >
            Crear Post
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

                {rows.map(([label, value]) => (
                  <View key={label} style={styles.resultRow}>
                    <Text style={styles.resultLabel}>{label}</Text>
                    <Text style={styles.resultValue}>{value}</Text>
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
    textArea: {
      minHeight: 100,
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