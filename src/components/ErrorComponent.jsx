// src/components/ErrorComponent.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ErrorComponent({ message, onDismiss }) {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{message}</Text>
      <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
        <Text style={styles.dismissButtonText}>Dismiss</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: '#ffcccc',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  errorText: {
    color: '#cc0000',
    fontSize: 16,
    marginBottom: 5,
  },
  dismissButton: {
    alignSelf: 'flex-end',
  },
  dismissButtonText: {
    color: '#cc0000',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
