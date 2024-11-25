// src/components/EditProfileModal.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
// Optional: Uncomment if you decide to use icons
// import Icon from 'react-native-vector-icons/Ionicons';
import apiClient from '../utils/axiosConfig';

export default function EditProfileModal({ isVisible, onClose, userData, onSave }) {
  const [name, setName] = useState(userData?.name || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [user, setUser] = useState(userData?._id || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setName(userData.name || '');
      setEmail(userData.email || '');
      setUser(userData._id || '');
    }
  }, [userData]);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Name is required.');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Validation Error', 'Email is required.');
      return;
    }

    // Simple email regex for validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);
      const response = await apiClient.put('/app/updateProfile', { name, email, user });
      if (response.status === 200 && response.data.success) {
        onSave(response.data.userData);
        Alert.alert('Success', 'Profile updated successfully.');
        onClose();
      } else {
        Alert.alert('Error', response.data.message || 'Failed to update profile.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while updating profile.');
      console.error('Update profile error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.centeredView}
      >
        <View style={styles.overlay} />
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Profile</Text>

          {/* Optional: Uncomment if using icons
          <View style={styles.inputContainer}>
            <Icon name="person-outline" size={20} color="#555" style={styles.icon} />
            <TextInput
              placeholder="Name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              style={styles.input}
              returnKeyType="next"
              autoCapitalize="words"
            />
          </View>
          */}

          <TextInput
            placeholder="Name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
            style={styles.input}
            returnKeyType="next"
            autoCapitalize="words"
          />

          {/* Optional: Uncomment if using icons
          <View style={styles.inputContainer}>
            <Icon name="mail-outline" size={20} color="#555" style={styles.icon} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.input}
              returnKeyType="done"
              autoCapitalize="none"
            />
          </View>
          */}

          <TextInput
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
            returnKeyType="done"
            autoCapitalize="none"
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.saveButton]}
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.modalButtonText}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'stretch',
    // Optional: Add shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Optional: Add elevation for Android
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    height: 40,
    color: '#333',
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#aaa',
  },
  saveButton: {
    backgroundColor: '#FFB30E',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
