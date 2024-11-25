import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';
import MainTabNavigator from './MainTabNavigator';
import LeavesScreen from '../components/LeavesScreen';
import OrderStatusScreen from '../../screens/OrderStatusScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

function RootNavigator() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Stack.Navigator>
    {isLoggedIn ? (
      // User is logged in, show the main app
      <>
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        {/* Register the Leaves and Orders screens */}
        <Stack.Screen
          name="Leaves"
          component={LeavesScreen}
          options={{ title: 'Manage Leaves' }}
        />
        <Stack.Screen
          name="Orders"
          component={OrderStatusScreen}
          options={{ title: 'Your Orders' }}
        />
      </>
    ) : (
      // User is not logged in, show authentication screens
      <>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Otp"
          component={OtpScreen}
          options={{ headerShown: false }}
        />
      </>
    )}
  </Stack.Navigator>
  );
}
