import React, { useMemo } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { Colors } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

interface Props extends TextInputProps {
  label: string;
}

export default function Field({ label, style, ...rest }: Props): React.JSX.Element {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={colors.placeholder}
        {...rest}
      />
    </View>
  );
}

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    field: {
      marginBottom: 18,
    },
    label: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 6,
    },
    input: {
      backgroundColor: colors.inputBackground,
      borderWidth: 1,
      borderColor: colors.inputBorder,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 15,
      color: colors.inputText,
    },
  });