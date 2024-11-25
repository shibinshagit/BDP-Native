// src/components/OrdersSection.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  Modal,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import OrderItem from './OrderItem';

export default function OrdersSection({user, userOrders, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState(1); // 1: Select Plan, 2: Select Meals (conditional), 3: Enter Location
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [location, setLocation] = useState('');

  const plans = [
    { id: 1, name: '3 Times a Month', mealLimit: 0 }, // No meal selection needed
    { id: 2, name: '2 Times a Month', mealLimit: 2 },
    { id: 3, name: '1 Time a Month', mealLimit: 1 },
  ];

  const meals = ['Breakfast', 'Lunch', 'Dinner'];

  const handleAddOrder = () => {
    setModalVisible(true);
    setStep(1);
    setSelectedPlan(null);
    setSelectedMeals([]);
    setLocation('');
  };

  const handleSubmitOrder = () => {
    if (!selectedPlan) {
      Alert.alert('Error', 'Please select a plan.');
      return;
    }

    if (selectedPlan.mealLimit > 0 && selectedMeals.length !== selectedPlan.mealLimit) {
      Alert.alert('Error', `Please select exactly ${selectedPlan.mealLimit} meals.`);
      return;
    }

    if (!location.trim()) {
      Alert.alert('Error', 'Please enter your location.');
      return;
    }

    // Compile order details
    let message = `*New Order*\n\n*Name:* ${user.name? user.name : 'not available'}\n*Plan Selected:* ${selectedPlan.name}\n`;
    if (selectedPlan.mealLimit > 0) {
      message += `*Meals Selected:* ${selectedMeals.join(', ')}\n`;
    }
    message += `*Location:* ${location}\n`;

    // Redirect to WhatsApp
    const phoneNumber = '7012975494';
    const url = `whatsapp://send?phone=+91${phoneNumber}&text=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'WhatsApp is not installed on your device.');
    });

    // Close the modal after submission
    setModalVisible(false);
  };

  const renderPlanSelection = () => (
    <ScrollView contentContainerStyle={styles.modalContent}>
      <Text style={styles.modalTitle}>Select a Plan</Text>
      {plans.map(plan => (
        <TouchableOpacity
          key={plan.id}
          style={[
            styles.optionButton,
            selectedPlan?.id === plan.id && styles.selectedOptionButton,
          ]}
          onPress={() => {
            setSelectedPlan(plan);
            if (plan.mealLimit > 0) {
              setStep(2);
            } else {
              setStep(3);
            }
          }}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.optionButtonText,
              selectedPlan?.id === plan.id && styles.selectedOptionButtonText,
            ]}
          >
            {plan.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const toggleMealSelection = meal => {
    if (selectedMeals.includes(meal)) {
      setSelectedMeals(selectedMeals.filter(m => m !== meal));
    } else {
      if (selectedMeals.length < selectedPlan.mealLimit) {
        setSelectedMeals([...selectedMeals, meal]);
      } else {
        Alert.alert('hmm..', `You choosed ${selectedPlan.mealLimit} time plan.`);
      }
    }
  };

  const renderMealSelection = () => (
    <ScrollView contentContainerStyle={styles.modalContent}>
      <Text style={styles.modalTitle}>Select Meals</Text>
      <Text style={styles.subtitle}>
        Select {selectedPlan.mealLimit} meal{selectedPlan.mealLimit > 1 ? 's' : ''}
      </Text>
      {meals.map(meal => (
        <TouchableOpacity
          key={meal}
          style={[
            styles.optionButton,
            selectedMeals.includes(meal) && styles.selectedOptionButton,
          ]}
          onPress={() => toggleMealSelection(meal)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.optionButtonText,
              selectedMeals.includes(meal) && styles.selectedOptionButtonText,
            ]}
          >
            {meal}
          </Text>
        </TouchableOpacity>
      ))}
      <View style={styles.modalNavigation}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setStep(1)}
          activeOpacity={0.8}
        >
          <Text style={styles.navButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navButton,
            selectedMeals.length !== selectedPlan.mealLimit && styles.disabledButton,
          ]}
          onPress={() => {
            if (selectedMeals.length === selectedPlan.mealLimit) {
              setStep(3);
            }
          }}
          disabled={selectedMeals.length !== selectedPlan.mealLimit}
          activeOpacity={selectedMeals.length === selectedPlan.mealLimit ? 0.8 : 1}
        >
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderLocationEntry = () => (
    <ScrollView contentContainerStyle={styles.modalContent}>
      <Text style={styles.modalTitle}>Enter Your Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your location"
        value={location}
        onChangeText={setLocation}
        placeholderTextColor="#888"
      />
      <View style={styles.modalNavigation}>
        {selectedPlan.mealLimit > 0 && (
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setStep(2)}
            activeOpacity={0.8}
          >
            <Text style={styles.navButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.navButton,
            !location.trim() && styles.disabledButton,
          ]}
          onPress={handleSubmitOrder}
          disabled={!location.trim()}
          activeOpacity={location.trim() ? 0.8 : 1}
        >
          <Text style={styles.navButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderModalContent = () => {
    switch (step) {
      case 1:
        return renderPlanSelection();
      case 2:
        return renderMealSelection();
      case 3:
        return renderLocationEntry();
      default:
        return null;
    }
  };

  const handleViewOrders = () => {
    // Navigate to Orders Screen (ensure this screen exists in your navigation)
    navigation.navigate('Orders');
  };

  return (
    <View style={styles.container}>
      {userOrders && userOrders.length > 0 ? (
        <View style={styles.ordersContainer}>
          <Text style={styles.ordersTitle}>Your Current Order</Text>
          <TouchableOpacity onPress={handleViewOrders} activeOpacity={0.8}>
            <OrderItem order={userOrders[0]} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.noOrdersContainer}>
          <Text style={styles.noOrdersText}>You have no active orders.</Text>
          <TouchableOpacity
            style={styles.addOrderButton}
            onPress={handleAddOrder}
            activeOpacity={0.8}
          >
            <Text style={styles.addOrderButtonText}>Place an Order Now!</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Order Process Modal */}
      <Modal
        visible={modalVisible}
        animationType="none"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                {renderModalContent()}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noOrdersContainer: {
    alignItems: 'center',
    marginVertical: 30,
    padding: 20,
    borderRadius: 12,
  },
  noOrdersText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 15,
    textAlign: 'center',
  },
  addOrderButton: {
    backgroundColor: '#FFBF00', // Changed to yellow
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#FFBF00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addOrderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  ordersContainer: {
    width: '100%',
    marginVertical: 20,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  ordersTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 3,
  },
  viewOrdersButton: {
    backgroundColor: '#FFBF00', // Changed to yellow
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#FFBF00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  viewOrdersButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    elevation: 10,
  },
  modalContent: {
    // Ensures content is scrollable if it overflows
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  optionButton: {
    padding: 15,
    borderWidth: 2,
    borderColor: '#FFBF00', // Changed to yellow
    borderRadius: 12,
    marginVertical: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    transition: 'background-color 0.3s',
  },
  selectedOptionButton: {
    backgroundColor: '#FFBF00', // Changed to yellow
  },
  optionButtonText: {
    fontSize: 16,
    color: '#FFBF00', // Changed to yellow
    fontWeight: '500',
  },
  selectedOptionButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  navButton: {
    backgroundColor: '#FFBF00', // Changed to yellow
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#FFBF00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: '#ccc',
    shadowColor: '#ccc',
    elevation: 0,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: '#ff0000',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#FFBF00', // Changed to yellow
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginTop: 10,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
});
