import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import apiClient from '../utils/axiosConfig';

export default function LeavesScreen({ route, navigation }) {
  const { orderId } = route.params;
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState({ visible: false, type: '' });

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/app/orders/${orderId}/leaves`);
      if (response.status === 200 && response.data.success) {
        setLeaves(response.data.leaves);
      } else {
        setError(response.data.message || 'Failed to fetch leaves.');
      }
    } catch (err) {
      setError('An error occurred while fetching leaves.');
      console.error('Fetch leaves error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleAddLeave = async () => {
    if (!startDate || !endDate) {
      Alert.alert('Validation Error', 'Please select both start and end dates.');
      return;
    }

    try {
      const response = await apiClient.post(`/app/orders/${orderId}/leaves`, {
        startDate,
        endDate,
      });

      if (response.status === 200 && response.data.success) {
        Alert.alert('Success', 'Leave added successfully.');
        setIsModalVisible(false);
        fetchLeaves();
      } else {
        Alert.alert('Error', response.data.message || 'Failed to add leave.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while adding leave.');
      console.error('Add leave error:', error);
    }
  };

  const handleDeleteLeave = async (leaveId) => {
    try {
      const response = await apiClient.delete(`/app/orders/${orderId}/leaves/${leaveId}`);
      if (response.status === 200 && response.data.success) {
        Alert.alert('Success', 'Leave deleted successfully.');
        fetchLeaves();
      } else {
        Alert.alert('Error', response.data.message || 'Failed to delete leave.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while deleting leave.');
      console.error('Delete leave error:', error);
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker({ visible: false, type: '' });
    if (selectedDate) {
      if (showDatePicker.type === 'start') {
        setStartDate(selectedDate.toISOString().split('T')[0]);
      } else if (showDatePicker.type === 'end') {
        setEndDate(selectedDate.toISOString().split('T')[0]);
      }
    }
  };

  const renderLeaveItem = ({ item }) => (
    <View style={styles.leaveItem}>
      <Text style={styles.leaveDates}>
        {item.startDate} to {item.endDate}
      </Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteLeave(item._id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFBF00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error && <ErrorComponent message={error} onDismiss={() => setError(null)} />}
      <Text style={styles.title}>Manage Leaves</Text>
      <FlatList
        data={leaves}
        keyExtractor={(item) => item._id}
        renderItem={renderLeaveItem}
        contentContainerStyle={styles.leavesList}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Leave</Text>
      </TouchableOpacity>

      {/* Add Leave Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Leave</Text>

            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker({ visible: true, type: 'start' })}
            >
              <Text style={styles.datePickerText}>
                {startDate ? `Start Date: ${startDate}` : 'Select Start Date'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker({ visible: true, type: 'end' })}
            >
              <Text style={styles.datePickerText}>
                {endDate ? `End Date: ${endDate}` : 'Select End Date'}
              </Text>
            </TouchableOpacity>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleAddLeave}>
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Date Picker */}
      {showDatePicker.visible && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={onDateChange}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 16,
    },
    leavesList: {
      paddingBottom: 100,
    },
    leaveItem: {
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    leaveDates: {
      fontSize: 16,
      color: '#555',
      fontWeight: '500',
    },
    deleteButton: {
      backgroundColor: '#FF6E6E',
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    deleteButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#FFF',
    },
    addButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#FFBF00',
      borderRadius: 50,
      paddingVertical: 14,
      paddingHorizontal: 24,
      shadowColor: '#FFBF00',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 4,
    },
    addButtonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#FFF',
      borderRadius: 16,
      width: '90%',
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
      color: '#333',
    },
    input: {
      backgroundColor: '#F5F5F5',
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
      fontSize: 14,
      color: '#333',
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
    },
    modalButton: {
      backgroundColor: '#FFBF00',
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    modalButtonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 14,
    },
    datePickerButton: {
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
      },
      datePickerText: {
        fontSize: 14,
        color: '#333',
      },
  });
  