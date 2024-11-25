// src/screens/OrderScreen.js

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ScrollView,
  Modal,
  Linking,
  Alert,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

const OrderScreen = () => {
  // State to determine if the user has an active order
  const [hasOrder, setHasOrder] = useState(true); // Set to false to simulate no order

  // State for delivery status
  const [orderStatus, setOrderStatus] = useState('Out for Delivery'); // 'Packed', 'Out for Delivery', 'Delivered'

  // State for estimated time
  const [estimatedTime, setEstimatedTime] = useState('9:27 AM'); // Example estimated time

  // State to control Contact Delivery Boy modal
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);

  // State for Upcoming Food
  const [upcomingFoods, setUpcomingFoods] = useState([
    {
      id: 1,
      name: 'Grilled Chicken',
      time: '6:00 PM',
      image: 'https://bismimess.online/assets/img/gallery/bg7.jpg',
    },
    {
      id: 2,
      name: 'Veggie Pasta',
      time: '7:30 PM',
      image: 'https://bismimess.online/assets/img/gallery/bg2.jpg',
    },
    {
      id: 3,
      name: 'Beef Steak',
      time: '8:45 PM',
      image: 'https://bismimess.online/assets/img/gallery/bg6.jpg',
    },
  ]);

  // State for Add Slides
  const [addSlides, setAddSlides] = useState([
    {
      id: 1,
      image: 'https://www.spazeone.com/uploads/place117025006667816.webp',
    },
    {
      id: 2,
      image: 'https://pbs.twimg.com/media/F4Djr90WcAASkfK.jpg:large',
    },
    {
      id: 3,
      image: 'https://brototype.com/careers/images/contentt.JPG',
    },
  ]);

  // Determine current meal based on time
  const getCurrentMeal = () => {
    const currentHour = moment().hour();

    if (currentHour < 11) {
      return 'Breakfast';
    } else if (currentHour < 17) {
      return 'Lunch';
    } else if (currentHour < 24) {
      return 'Dinner';
    } else {
      return 'Dinner';
    }
  };

  const currentMeal = getCurrentMeal();

  // Function to handle Pickup action
  const handlePickup = () => {
    Alert.alert('Pickup', 'Your order has been picked up!');
    setOrderStatus('Delivered');
  };

  // Function to handle contacting delivery boy
  const handleContactDeliveryBoy = () => {
    const phoneNumber = '1234567890'; // Replace with actual number
    Linking.openURL(`tel:${phoneNumber}`).catch(() =>
      Alert.alert('Error', 'Unable to make a call.')
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFBF00" barStyle="dark-content" />

  {/* Current Meal */}
  <View style={styles.mealContainer}>
              <Text style={styles.mealText}>{currentMeal}</Text>
            </View>

            {/* Delivery Status Timeline */}
            <View style={styles.timelineContainer}>
              <View style={styles.timeline}>
                {/* Packed */}
                <View style={styles.timelineStep}>
                  <View
                    style={[
                      styles.circle,
                      orderStatus === 'Packed' ||
                      orderStatus === 'Out for Delivery' ||
                      orderStatus === 'Delivered'
                        ? styles.activeCircle
                        : styles.inactiveCircle,
                    ]}
                  >
                    {orderStatus !== 'Packed' && (
                      <Ionicons name="checkmark" size={12} color="#fff" />
                    )}
                  </View>
                  <Text style={styles.timelineLabel}>Packed</Text>
                  {/* Estimated Time */}
                  {orderStatus === 'Packed' && (
                    <Text style={styles.estimatedTimeText}>Est: {estimatedTime}</Text>
                  )}
                </View>

                {/* Line */}
                <View style={styles.timelineLine} />

                {/* Out for Delivery */}
                <View style={styles.timelineStep}>
                  <View
                    style={[
                      styles.circle,
                      orderStatus === 'Out for Delivery' ||
                      orderStatus === 'Delivered'
                        ? styles.activeCircle
                        : styles.inactiveCircle,
                    ]}
                  >
                    {orderStatus !== 'Out for Delivery' && orderStatus === 'Delivered' && (
                      <Ionicons name="checkmark" size={12} color="#fff" />
                    )}
                  </View>
                  <Text style={styles.timelineLabel}>Out for Delivery</Text>
                  {/* Estimated Time */}
                  {orderStatus === 'Out for Delivery' && (
                    <Text style={styles.estimatedTimeText}>Est: {estimatedTime}</Text>
                  )}
                </View>

                {/* Line */}
                <View style={styles.timelineLine} />

                {/* Delivered */}
                <View style={styles.timelineStep}>
                  <View
                    style={[
                      styles.circle,
                      orderStatus === 'Delivered' ? styles.activeCircle : styles.inactiveCircle,
                    ]}
                  >
                    {orderStatus === 'Delivered' && (
                      <Ionicons name="checkmark" size={12} color="#fff" />
                    )}
                  </View>
                  <Text style={styles.timelineLabel}>Delivered</Text>
                  {/* Estimated Time */}
                  {orderStatus === 'Delivered' && (
                    <Text style={styles.estimatedTimeText}>Delivered at {estimatedTime}</Text>
                  )}
                </View>
              </View>
            </View>

            {/* Pickup Button */}
            {orderStatus === 'Out for Delivery' && (
              <TouchableOpacity style={styles.pickupButton} onPress={handlePickup}>
                <Text style={styles.pickupButtonText}>Pickup</Text>
              </TouchableOpacity>
            )}
 {/* Add Slides Carousel */}
 <View style={styles.addSlidesContainer}>
          <Swiper
            style={styles.wrapper}
            showsButtons={false}
            autoplay={true}
            autoplayTimeout={3}
            dotStyle={styles.dotStyle}
            activeDotStyle={styles.activeDotStyle}
          >
            {addSlides.map((slide) => (
              <View key={slide.id} style={styles.slide}>
                <Image
                  source={{ uri: slide.image }}
                  style={styles.addSlideImage}
                  resizeMode="cover"
                />
              </View>
            ))}
          </Swiper>
        </View>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Conditional Rendering based on Order State */}
        {hasOrder ? (
          <>
          

            {/* Upcoming Food Section */}
            <View style={styles.upcomingFoodContainer}>
              <Text style={styles.sectionTitle}>Todays Menu</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {upcomingFoods.map((food) => (
                  <View key={food.id} style={styles.foodCard}>
                    <Image
                      source={{ uri: food.image }}
                      style={styles.foodImage}
                      resizeMode="cover"
                    />
                    <Text style={styles.foodName}>{food.name}</Text>
                    <Text style={styles.foodTime}>{food.time}</Text>
                  </View>
                ))}
              </ScrollView>
              <View style={styles.upcomingFoodActions}>
                <TouchableOpacity style={styles.viewMoreButton}>
                  <Text style={styles.viewMoreButtonText}>View More</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.exploreStoreButton}>
                  <Text style={styles.exploreStoreButtonText}>Explore Store</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </>
        ) : (
          // No Order Section
          <View style={styles.noOrderContainer}>
            <Text style={styles.noOrderText}>You don't have an order yet.</Text>
            <TouchableOpacity
              style={styles.orderNowButton}
              onPress={() => Alert.alert('Order Now', 'Navigate to Order Screen')}
            >
              <Text style={styles.orderNowButtonText}>Order Now</Text>
            </TouchableOpacity>
          </View>
        )}

      
      </ScrollView>

      {/* Floating Contact Button */}
      {hasOrder && orderStatus === 'Out for Delivery' && (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setIsContactModalVisible(true)}
        >
          <Ionicons name="call" size={24} color="#fff" />
        </TouchableOpacity>
      )}

      {/* Contact Delivery Boy Modal */}
      <Modal
        visible={isContactModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsContactModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setIsContactModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Contact Delivery Boy</Text>
            <Text style={styles.modalText}>Would you like to call the delivery boy?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleContactDeliveryBoy}
              >
                <Text style={styles.modalButtonText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setIsContactModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, styles.modalCancelButtonText]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    paddingBottom: 150, // To ensure add slides are visible
  },
  mealContainer: {
    alignItems: 'center',
    padding: 20,
  },
  mealText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFBF00',
  },
  timelineContainer: {
    marginBottom: 30,
    
  },
  timeline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timelineStep: {
    alignItems: 'center',
    width: width * 0.25,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  activeCircle: {
    backgroundColor: '#FFBF00',
  },
  inactiveCircle: {
    backgroundColor: '#e0e0e0',
  },
  timelineLabel: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  estimatedTimeText: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
    textAlign: 'center',
  },
  timelineLine: {
    height: 2,
    backgroundColor: '#e0e0e0',
    flex: 1,
  },
  pickupButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  pickupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  upcomingFoodContainer: {
    marginTop: 0,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  foodCard: {
    width: 150,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    alignItems: 'center',
  },
  foodImage: {
    width: 120,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  foodTime: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  upcomingFoodActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  viewMoreButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  viewMoreButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  exploreStoreButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  exploreStoreButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  noOrderContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  noOrderText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  orderNowButton: {
    backgroundColor: '#FFBF00',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  orderNowButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addSlidesContainer: {
    height: 150,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  addSlideImage: {
    width: width - 40,
    height: 140,
    borderRadius: 10,
    alignSelf: 'center',
  },
  dotStyle: {
    backgroundColor: '#e0e0e0',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDotStyle: {
    backgroundColor: '#FFBF00',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20, // Positioned above the add slides
    right: 30,
    backgroundColor: '#FFBF00',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width - 80,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#FFBF00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  modalCancelButton: {
    backgroundColor: '#ccc',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalCancelButtonText: {
    color: '#333',
  },
});

export default OrderScreen;
