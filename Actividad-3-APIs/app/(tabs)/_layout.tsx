import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

import { useTheme } from '../../context/ThemeContext';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const icon =
  (active: IconName, inactive: IconName) =>
  ({ color, size, focused }: { color: string; size: number; focused: boolean }) =>
    <Ionicons name={focused ? active : inactive} size={size} color={color} />;

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textDisabled,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Usuarios', tabBarIcon: icon('people', 'people-outline') }}
      />
      <Tabs.Screen
        name="new-user"
        options={{ title: 'Nuevo usuario', tabBarIcon: icon('person-add', 'person-add-outline') }}
      />
      <Tabs.Screen
        name="new-post"
        options={{ title: 'Nuevo post', tabBarIcon: icon('create', 'create-outline') }}
      />
    </Tabs>
  );
}