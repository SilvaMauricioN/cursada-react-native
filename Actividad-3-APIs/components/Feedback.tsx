import React, { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

export function LoadingView(): React.JSX.Element {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.center}>
      <ActivityIndicator color={colors.text} />
    </View>
  );
}

interface ErrorViewProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorView({ message, onRetry }: ErrorViewProps): React.JSX.Element {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.center}>
      <View style={styles.errorBox}>
        <Text style={styles.errorText}>{message}</Text>
      </View>
      {onRetry && (
        <TouchableOpacity onPress={onRetry} style={styles.retry}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    },
    errorBox: {
      backgroundColor: colors.errorBackground,
      borderRadius: 10,
      padding: 14,
    },
    errorText: {
      color: colors.error,
      fontSize: 14,
      textAlign: 'center',
    },
    retry: {
      marginTop: 14,
    },
    retryText: {
      fontSize: 13,
      color: colors.textSecondary,
      textDecorationLine: 'underline',
    },
  });