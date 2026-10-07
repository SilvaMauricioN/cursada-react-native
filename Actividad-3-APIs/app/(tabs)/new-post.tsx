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
import useCreatePost from '../../hooks/useCreatePost';

export default function NewPostScreen(): React.JSX.Element {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [userId, setUserId] = useState<string>('1');

  const { createPost, data, loading, error, reset } = useCreatePost();

  const handleSubmit = (): void => {
    if (!title.trim() || !body.trim()) return;
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

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.onPrimary} />
            ) : (
              <Text style={styles.buttonText}>Crear Post</Text>
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

              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>ID</Text>
                <Text style={styles.resultValue}>{data.id}</Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Título</Text>
                <Text style={styles.resultValue}>{data.title}</Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Contenido</Text>
                <Text style={styles.resultValue}>{data.body}</Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>User ID</Text>
                <Text style={styles.resultValue}>{data.userId}</Text>
              </View>
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
    textArea: {
      minHeight: 90,
      textAlignVertical: 'top',
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 14,
      alignItems: 'center',
      marginTop: 8,
    },
    buttonDisabled: {
      opacity: 0.6,
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