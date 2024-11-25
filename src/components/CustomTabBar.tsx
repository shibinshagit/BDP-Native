import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import  {tw} from 'nativewind'; 

interface CustomTabBarProps {
  state: any;
  navigation: any;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({ state, navigation }) => {
  return (
    <View style={tw`bg-white flex-row justify-around py-2 border-t border-gray-200 absolute bottom-0 left-0 right-0 shadow-lg`}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        let iconName;
        if (route.name === 'Home') iconName = 'home';
        else if (route.name === 'Order Status') iconName = 'assignment';
        else if (route.name === 'Chat') iconName = 'chat';
        else if (route.name === 'Profile') iconName = 'person';

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={tw`items-center justify-center px-2`}
            accessibilityLabel={route.name}
            accessibilityRole="button"
          >
            <Icon name={iconName} size={24} color={isFocused ? '#ff5722' : 'gray'} />
            <Text style={tw`${isFocused ? 'text-amber-500' : 'text-gray-500'} text-xs mt-1`}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
