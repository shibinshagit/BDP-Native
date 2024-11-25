// src/screens/OtpScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import apiClient from '../utils/axiosConfig';
import { AuthContext } from '../context/AuthContext';
import { BaseUrl } from '../constants/BaseUrls';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OtpScreen({ route, navigation }) {
  const { phone } = route.params;
  const [otp, setOtp] = useState('');
  const { login } = useContext(AuthContext);

  const handleOtpVerification = async () => {
    try {
      const response = await apiClient.post(`/app/otpCheck`, { phone, otp });

      if (response.status === 200 && response.data.success) {
        // Save user data and token, update auth state
        const { token, userData } = response.data;

        // Store token and user data
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userData', JSON.stringify(userData));

        // Update auth context
        login(userData);
      } else {
        Alert.alert('Error', response.data.message || 'OTP verification failed');
      }
    } catch (error) {
      if (error.response) {
        Alert.alert('Error', error.response.data.message || 'Server error');
      } else if (error.request) {
        Alert.alert('Error', 'Network error. Please check your connection.');
      } else {
        Alert.alert('Error', 'An unexpected error occurred.');
      }
      console.error('OTP verification error:', error);
    }
  };
  const handleOtpChange = (text) => {
    // Allow only digits and limit to 6 digits
    const formattedText = text.replace(/[^0-9]/g, '').slice(0, 6);
    setOtp(formattedText);
  };


  return (
  
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Enter OTP sent to {phone}:</Text>
      
          <TextInput
            value={otp}
            onChangeText={handleOtpChange}
            placeholder="OTP"
            keyboardType="number-pad"
            maxLength={6}
            style={styles.input}
          />
        
        <TouchableOpacity style={styles.submitButton} onPress={handleOtpVerification}>
          <Text style={styles.submitButtonText}>Submit OTP</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7', // Background color consistent with other screens
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  otpInputContainer: {
    marginBottom: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#FFBF00', // Button color consistent with other screens
    paddingVertical: 15,
    marginTop:10,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
