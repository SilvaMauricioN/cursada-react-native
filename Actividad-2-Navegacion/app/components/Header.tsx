import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { palette, spacing } from '../styles/sharedStyles';

type Props = {
  title: string;
  showBack?: boolean;
};

export default function Header({ title, showBack = false }: Props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {showBack && (
        <IconButton
          icon="arrow-left"
          iconColor={palette.text}
          size={24}
          onPress={() => navigation.goBack()}
        />
      )}
      <Text variant="titleLarge" style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    marginBottom: spacing.xs,
  },
  title: {
    color: palette.text,
    fontWeight: '700',
    marginLeft: spacing.xs / 2,
  },
});
