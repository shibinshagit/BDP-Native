import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import apiClient from '../utils/axiosConfig';
import { AuthContext } from '../context/AuthContext';
import { BaseUrl } from '../constants/BaseUrls';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await apiClient.post('/app/login', { phone });

      if (response.status === 200 && response.data.success) {
        // Navigate to OTP screen for verification
        navigation.navigate('Otp', { phone });
      } else {
        Alert.alert('Error', response.data.message || 'Login failed');
      }
    } catch (error) {
      if (error.response) {
        Alert.alert('Error', error.response.data.message || 'Server error');
      } else if (error.request) {
        Alert.alert('Error', 'Network error. Please check your connection.');
      } else {
        Alert.alert('Error', 'An unexpected error occurred.');
      }
      console.error('Login error:', error);
    }
  };

  const handlePhoneChange = (text) => {
    // Allow only digits and limit to 10 digits
    const formattedText = text.replace(/[^0-9]/g, '').slice(0, 10);
    setPhone(formattedText);
  };

  return (
    <View style={styles.container}>
     <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Enter your phone number to continue</Text>
      <TextInput
        value={phone}
        onChangeText={handlePhoneChange}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        maxLength={10}
        style={styles.input}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login / Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7', // Background color similar to the home page
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    fontSize: 18,
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: '#FFBF00', // Button color consistent with home page design
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
