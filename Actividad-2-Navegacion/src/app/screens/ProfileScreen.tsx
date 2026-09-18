import { View } from 'react-native';
import { Avatar, Divider, Text } from 'react-native-paper';
import ScreenWrapper from '../components/ScreenWrapper';
import { sharedStyles, spacing } from '../styles/sharedStyles';

// Segunda pantalla de tab, sin props tipadas de navegación.
export default function ProfileScreen(_props: any) {
  return (
    <ScreenWrapper>
      <View style={[sharedStyles.content, { alignItems: 'center' }]}>
        <Avatar.Icon
          icon="account"
          size={88}
          style={{ backgroundColor: '#13442f', marginTop: spacing.lg }}
        />
        <Text variant="headlineSmall" style={[sharedStyles.title, { marginTop: spacing.md }]}>
          Guardián del bosque
        </Text>
        <Text variant="bodyMedium" style={sharedStyles.subtitle}>
          Explorador desde 2024
        </Text>

        <Divider style={{ width: '100%', backgroundColor: '#1f4534', marginVertical: spacing.md }} />

        <View style={{ width: '100%' }}>
          <Text variant="labelLarge" style={{ color: '#b9c4bd' }}>
            Árboles explorados
          </Text>
          <Text variant="bodyLarge" style={{ color: '#f2f0e6', marginBottom: spacing.md }}>
            5
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
}