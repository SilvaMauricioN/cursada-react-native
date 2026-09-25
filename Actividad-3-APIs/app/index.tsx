import React, { useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import useCreatePost from '../hooks/useCreatePost';

export default function App(): React.JSX.Element {
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Nuevo Post</Text>
        <Text style={styles.subtitle}>JSONPlaceholder · POST /posts</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            placeholder="foo"
            placeholderTextColor="#A0A0A0"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Contenido</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="bar"
            placeholderTextColor="#A0A0A0"
            value={body}
            onChangeText={setBody}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>User ID</Text>
          <TextInput
            style={styles.input}
            placeholder="1"
            placeholderTextColor="#A0A0A0"
            value={userId}
            onChangeText={setUserId}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
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
    </SafeAreaView>
  );
}

const COLORS = {
  background: '#FAFAFA',
  surface: '#FFFFFF',
  border: '#E5E5E5',
  text: '#1A1A1A',
  textMuted: '#8A8A8A',
  accent: '#2F2F2F',
  error: '#C0392B',
  errorBg: '#FBEAEA',
} as const;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: 24,
    paddingBottom: 48,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 4,
    marginBottom: 28,
  },
  field: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.text,
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  errorBox: {
    marginTop: 20,
    backgroundColor: COLORS.errorBg,
    borderRadius: 10,
    padding: 14,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
  },
  resultBox: {
    marginTop: 28,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
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
    color: COLORS.text,
  },
  clearText: {
    fontSize: 13,
    color: COLORS.textMuted,
    textDecorationLine: 'underline',
  },
  resultRow: {
    marginBottom: 10,
  },
  resultLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  resultValue: {
    fontSize: 15,
    color: COLORS.text,
    marginTop: 2,
  },
});
