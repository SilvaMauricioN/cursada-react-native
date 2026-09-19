import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, Divider, List, Text } from 'react-native-paper';

import Header from '../components/Header';
import ScreenWrapper from '../components/ScreenWrapper';
import { palette, sharedStyles, spacing } from '../styles/sharedStyles';

export default function ProfileScreen() {
  return (
    <ScreenWrapper>
      <Header title="Mi Perfil" />

      <View style={styles.header}>
        <Avatar.Icon size={96} icon="account" color={palette.text} style={styles.avatar} />
        <Text style={[sharedStyles.title, styles.name]}>Silva Mauricio</Text>
        <Text style={sharedStyles.subtitle}>Alumno React Native</Text>
      </View>

      <Card style={sharedStyles.card} mode="contained">
        <List.Item
          title="silvamauricio@gmail.com"
          description="Email"
          titleStyle={styles.itemTitle}
          descriptionStyle={styles.itemDescription}
          left={(props) => <List.Icon {...props} icon="email-outline" color={palette.textMuted} />}
        />
        <Divider style={styles.divider} />
        <List.Item
          title="Alumno React Native"
          description="Rol"
          titleStyle={styles.itemTitle}
          descriptionStyle={styles.itemDescription}
          left={(props) => <List.Icon {...props} icon="school-outline" color={palette.textMuted} />}
        />
      </Card>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatar: {
    backgroundColor: palette.pine600,
  },
  name: {
    marginTop: spacing.sm,
  },
  itemTitle: {
    color: palette.text,
    fontSize: 16,
  },
  itemDescription: {
    color: palette.textMuted,
  },
  divider: {
    backgroundColor: palette.pine700,
  },
});
