import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { initDatabase } from './src/services/database';
import { loadLanguage } from './src/i18n';
import './src/i18n';
import { View, ActivityIndicator } from 'react-native';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initDatabase();
        await loadLanguage();
        setIsReady(true);
      } catch (error) {
        console.error('Initialization error:', error);
        setIsReady(true);
      }
    };

    initialize();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PaperProvider>
          <StatusBar style="auto" />
          <AppNavigator />
        </PaperProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
