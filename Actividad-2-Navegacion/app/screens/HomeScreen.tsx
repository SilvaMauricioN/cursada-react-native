import React from 'react';
import { FlatList } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Header from '../components/Header';
import ScreenWrapper from '../components/ScreenWrapper';
import { ITEMS, Item } from '../data/items';
import { sharedStyles } from '../styles/sharedStyles';

export default function HomeScreen({ navigation }: any) {
  const renderItem = ({ item }: { item: Item }) => (
    <Card
      style={sharedStyles.card}
      mode="contained"
      onPress={() => navigation.navigate('Details', { item })}
    >
      <Card.Content style={sharedStyles.cardContent}>
        <Text style={sharedStyles.cardTitle}>{item.name}</Text>
        <Text style={sharedStyles.cardText} numberOfLines={2}>
          {item.description}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <ScreenWrapper>
      <Header title="Tipos de Pinos" />
      <FlatList
        data={ITEMS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={sharedStyles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </ScreenWrapper>
  );
}
