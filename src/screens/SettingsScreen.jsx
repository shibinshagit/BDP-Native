// src/screens/ProfileScreen.js
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import ProfileHeader from '../components/ProfileHeader';
import OrdersSection from '../components/OrdersSection';
import EditProfileModal from '../components/EditProfileModal';
import ErrorComponent from '../components/ErrorComponent';
import apiClient from '../utils/axiosConfig';
import { useFocusEffect } from '@react-navigation/native';

export default function ProfileScreen({ navigation }) {
  const { logout, userData, setUserData } = useContext(AuthContext);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userOrders, setUserOrders] = useState([]);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      // Fetch orders without sending user ID (ID is obtained from JWT token)
      const response = await apiClient.get('/app/orders');
      if (response.status === 200 && response.data.success) {
        setUserOrders(response.data.orders);
      } else {
        setError(response.data.message || 'Check your connection and try again');
      }
    } catch (err) {
      setError('we are on maintanance ! sorry for the Inconvenience.');
      console.error('Fetch orders error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch orders when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchUserOrders();
    }, [])
  );

  const handleLogout = () => {
    logout();
  };

  const handleEditProfile = async (updatedUserData) => {
    setUserData(updatedUserData);

    // Update stored user data in AsyncStorage
    await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));

    setIsEditModalVisible(false);
  };

  const handleErrorDismiss = () => {
    setError(null);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserOrders();
  };



  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {error && <ErrorComponent message={error} onDismiss={handleErrorDismiss} />}
      <ProfileHeader
        userData={userData}
        onEditPress={() => setIsEditModalVisible(true)}
      />
      <OrdersSection
        user={userData}
        userOrders={userOrders}
        navigation={navigation}
      />
      {/* Edit Profile Modal */}
      <EditProfileModal
        isVisible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        userData={userData}
        onSave={handleEditProfile}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
