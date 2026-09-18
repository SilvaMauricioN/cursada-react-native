import { FlatList } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';
import ScreenWrapper from '../components/ScreenWrapper';
import { sharedStyles, spacing } from '../styles/sharedStyles';

const PINE_ITEMS = [
  { id: '1', name: 'Pino Silvestre', description: 'Corteza rojiza, muy resistente al frío.' },
  { id: '2', name: 'Abeto Blanco', description: 'Ramas densas, típico de bosques nórdicos.' },
  { id: '3', name: 'Cedro del Atlas', description: 'Copa amplia, madera muy aromática.' },
  { id: '4', name: 'Secuoya Roja', description: 'Uno de los árboles más altos del mundo.' },
  { id: '5', name: 'Pino Piñonero', description: 'Copa en forma de sombrilla, produce piñones.' },
];

// { navigation, route } llegan automáticamente inyectadas por el Stack.Navigator.
// Sin tipado explícito de rutas: navigation se recibe simplemente como prop.
export default function HomeScreen({ navigation }: any) {
  return (
    <ScreenWrapper>
      <FlatList
        contentContainerStyle={sharedStyles.content}
        data={PINE_ITEMS}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <Text variant="headlineMedium" style={sharedStyles.title}>
              Bosque pino
            </Text>
            <Text variant="bodyMedium" style={sharedStyles.subtitle}>
              Selecciona un árbol para ver el detalle
            </Text>
          </>
        }
        ItemSeparatorComponent={() => <Text style={{ height: spacing.sm }} />}
        renderItem={({ item }) => (
          <Card
            mode="contained"
            style={sharedStyles.card}
            // navigate() no apila si ya estamos en Details con el mismo item;
            // aquí siempre venimos desde Home, así que es la opción correcta.
            onPress={() => navigation.navigate('Details', { item })}
          >
            <Card.Title
              title={item.name}
              titleStyle={{ color: '#f2f0e6' }}
              subtitle={item.description}
              subtitleStyle={{ color: '#b9c4bd' }}
              left={(props) => (
                <Avatar.Icon {...props} icon="pine-tree" style={{ backgroundColor: '#0e5332' }} />
              )}
            />
          </Card>
        )}
      />
    </ScreenWrapper>
  );
}