import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/BismiStore';
import ProfileScreen from '../screens/OrderScreen';
import SettingsScreen from '../screens/SettingsScreen';
import OrdersSection from '../components/OrdersSection';
import OrderScreen from '../screens/OrderScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Store') {
            iconName = 'shopping-cart';
          } else if (route.name === 'Order') {
            iconName = 'delivery-dining';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFBF00',
        tabBarInactiveTintColor: 'gray',
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 70, 
        },
        tabBarLabelStyle: {
          marginTop: -20, // Reduce the gap between icon and label
          marginBottom: 14, // Reduce the gap between icon and label
          fontSize: 13,
        }
        
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Store" component={ChatScreen} />
      <Tab.Screen name="Order" component={OrderScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
