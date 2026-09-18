import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import { pineColors } from '../theme/Theme';
import HomeStack from './HomeStack';

// Sin ParamList tipado: se crea el navigator genérico.
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: pineColors.primary,
        tabBarInactiveTintColor: pineColors.textSecondary,
        tabBarStyle: {
          backgroundColor: pineColors.surface,
          borderTopColor: pineColors.border,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      {/*
        Se coloca el HomeStack completo (no HomeScreen directo) para que,
        al entrar en Details, la barra de tabs siga visible abajo.
      */}
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="pine-tree" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}