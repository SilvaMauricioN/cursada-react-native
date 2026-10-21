import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

type Props = React.ComponentProps<typeof TextInput>;

export default function Field({ style, ...rest }: Props): React.JSX.Element {
  return <TextInput mode="outlined" style={[styles.input, style]} {...rest} />;
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
  },
});