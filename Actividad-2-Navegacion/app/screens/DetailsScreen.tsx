import React from 'react';
import { Button, Card, Text } from 'react-native-paper';
import Header from '../components/Header';
import ScreenWrapper from '../components/ScreenWrapper';
import { palette, sharedStyles } from '../styles/sharedStyles';

export default function DetailsScreen({ navigation, route }: any) {
  // Datos enviados desde HomeScreen
  const { item } = route.params;

  return (
    <ScreenWrapper>
      <Header title="Detalle" showBack />

      <Card style={sharedStyles.card} mode="contained">
        <Card.Content style={sharedStyles.cardContent}>
          <Text style={sharedStyles.title}>{item.name}</Text>
          <Text style={sharedStyles.subtitle}>ID #{item.id}</Text>
          <Text style={{ color: palette.text, fontSize: 16, lineHeight: 24 }}>
            {item.description}
          </Text>
        </Card.Content>
      </Card>

      <Button
        mode="outlined"
        textColor={palette.text}
        style={[sharedStyles.button, { borderColor: palette.pine600 }]}
        contentStyle={{ paddingVertical: 8 }}
        onPress={() => navigation.goBack()}
      >
        Volver
      </Button>
    </ScreenWrapper>
  );
}
