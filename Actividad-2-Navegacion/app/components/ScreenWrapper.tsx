import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sharedStyles } from '../styles/sharedStyles';

function ScreenWrapper({ children, title, withScroll = false }: any) {
  const Container = withScroll ? ScrollView : View;

  return (
    <SafeAreaView style={[sharedStyles.container]} edges={['bottom', 'left', 'right', 'top']}>
      <Container>
        {title && <Text> {title} </Text>}
        {children}
      </Container>
    </SafeAreaView>
  );
}

export default ScreenWrapper;
