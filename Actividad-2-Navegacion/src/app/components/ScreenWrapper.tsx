import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sharedStyles } from '../styles/sharedStyles';

interface ScreenWrapperProps {
  children: React.ReactNode;
}

export default function ScreenWrapper({ children }: ScreenWrapperProps) {
  return (
    <SafeAreaView style={sharedStyles.screen} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#182c25" />
      {children}
    </SafeAreaView>
  );
}