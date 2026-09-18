import { View } from 'react-native';
import { Avatar, Button, IconButton, Text } from 'react-native-paper';
import ScreenWrapper from '../components/ScreenWrapper';
import { sharedStyles, spacing } from '../styles/sharedStyles';

// Sin tipado de rutas: navigation y route llegan como "any".
export default function DetailsScreen({ navigation, route }: any) {
  // El "equipaje" que viajó desde HomeScreen
  const { item } = route.params;

  return (
    <ScreenWrapper>
      <View style={[sharedStyles.content, { alignItems: 'center' }]}>
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
          <IconButton
            icon="arrow-left"
            iconColor="#f2f0e6"
            onPress={() => navigation.goBack()}
          />
          <Text variant="titleMedium" style={{ color: '#f2f0e6' }}>
            Volver
          </Text>
        </View>

        <Avatar.Icon
          icon="pine-tree"
          size={96}
          style={{ backgroundColor: '#0e5332', marginTop: spacing.lg, marginBottom: spacing.lg }}
        />

        <Text variant="headlineMedium" style={sharedStyles.title}>
          {item.name}
        </Text>
        <Text variant="bodyLarge" style={[sharedStyles.subtitle, { textAlign: 'center' }]}>
          {item.description}
        </Text>

        <View style={sharedStyles.cardVariant}>
          <Text variant="labelLarge" style={{ color: '#b9c4bd' }}>
            ID interno
          </Text>
          <Text variant="bodyMedium" style={{ color: '#f2f0e6' }}>
            {item.id}
          </Text>
        </View>

        <Button
          mode="contained"
          buttonColor="#0e5332"
          textColor="#eef5f0"
          style={{ marginTop: spacing.xl, borderRadius: 12, width: '100%' }}
          onPress={() => navigation.goBack()}
        >
          Volver al listado
        </Button>
      </View>
    </ScreenWrapper>
  );
}