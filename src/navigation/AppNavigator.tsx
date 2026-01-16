import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAppSelector } from '../store';

import SplashScreen from '../screens/SplashScreen';
import LanguageSelectionScreen from '../screens/LanguageSelectionScreen';
import LoginScreen from '../screens/LoginScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import MainTabs from './MainTabs';
import CustomerDetailScreen from '../screens/CustomerDetailScreen';
import AddCustomerScreen from '../screens/AddCustomerScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="CustomerDetail" component={CustomerDetailScreen} />
            <Stack.Screen name="AddCustomer" component={AddCustomerScreen} />
            <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
