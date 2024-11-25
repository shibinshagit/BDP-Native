// src/screens/BismiStoreScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  SafeAreaView,
  Linking,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Or 'react-native-vector-icons/Ionicons' if not using Expo
import Header from '../../components/Header';
// import Footer from '../components/Footer'; // Uncomment if you have a Footer component

const { width: viewportWidth } = Dimensions.get('window');

const BismiStoreScreen = ({ navigation }) => {
  const [specialFoods, setSpecialFoods] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // State for delivery options
  const [availableMeals, setAvailableMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState('');
  const [mealOptionModalVisible, setMealOptionModalVisible] = useState(false);

  const categories = ['All', 'Drinks', 'Omblate', 'Chicken','Tea'];

  // Fetch special foods from API or use dummy data
  useEffect(() => {
    const fetchSpecialFoods = async () => {
      try {
        // Simulate API call with dummy data
        // Replace this with your actual API call
        const data = [
          {
            id: '1',
            name: 'Coca cola',
            category: 'Drinks',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVktCji1ZVQr_P9yqS1M1dYS1FSHuGD8SFxnkR4jEd9-S_GafWKM9n_KdlI6PMxjG1NUM&usqp=CAU',
            price: 75,
          },
          {
            id: '2',
            name: 'Bismi Mango',
            category: 'Drinks',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKJwh6JLj65rD8aUi73TLEsBt5BYgVh2i4lQ&s',
            price: 60,
          },
          {
            id: '3',
            name: 'Egg Omblate',
            category: 'Omblate',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBWsGRa3L78IichSryVvaxUo20d4LWg8S3NQ&s',
            price: 20,
          },
          {
            id: '4',
            name: 'Tea parcel',
            category: 'Tea',
            image: 'data:image/jpeg;base64,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8DnA21MGWWMqLwKESb1WXpVD1KP5v7SFaem1dw+zS2jvc37hkPhfviSErEROXRERAREQIbWDVrD4wfKrZwLLUWwde/iOo3E5VrLqnXwZ2mG3S4VVBsPtjPY+HXwnbpRlBFiLg5EHcZVkxVu6reYfOsrOn6y+j2nUvUwlqb7/AFZypt9n3D2ZdQ3zm2OwdSi5p1UZHHzW325jgR1jKY74rU7aK3iWGUi8GVOkno0dG/ObRMxYcWUTJTRnYIilmbJVUXJ7AIS9h6NsNepWqn5qqg7WO03kq+M9/IHUzRT4fD7NQAOzs7AG9r2CgkZXso3SenpYa+mkQyXndiIiWOSIiAtML4VDvRT2qDM0QNQ6Lo/RJ90CZaWGRfZRV7FA+EzRATDiMKlS22itbdtAG3ZfdM0QNP8Ayuj7g7riW/5TR9z8TfrN6IGClg6a+yijrsL+MzxEBERAREQEREBERATR0tomjiU9XWQMOHBlPNWGansm9EDkeseoNahd6F61MZ2t8qo61Htdq+E8lh1uwHXn3T6IMi8Tq7hqtVaz0VNRc7238tsDJ7cL3tM1/Hifbwtrl1255oDVmtibML06X0jDf9hd7Hr3du6dG0NoSjhltSXMjpO2bt2ty6hYdUkQJWWY8VaObXmxERLXBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERED/2Q==',
            price: 20,
          },
          // Add more items as needed
        ];

        setSpecialFoods(data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch special foods.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialFoods();
  }, []);

  // Function to add item to cart
  const addToCart = (item) => {
    const itemExists = cartItems.find((cartItem) => cartItem.id === item.id);
    if (itemExists) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // Function to decrease quantity or remove item from cart
  const removeFromCart = (item) => {
    const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (cartItem.quantity > 1) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } else {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    }
  };

  // Function to determine available meal options based on current time
  const determineAvailableMeals = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    let meals = [];

    if (hours < 7) {
      meals = ['Breakfast', 'Lunch', 'Dinner'];
    } else if (hours < 11) {
      meals = ['Lunch', 'Dinner'];
    } else if (hours < 18) {
      meals = ['Dinner'];
    } else {
      meals = [];
    }

    setAvailableMeals(meals);
    setSelectedMeal('');
    if (meals.length === 0) {
      Alert.alert('Delivery Unavailable', 'No delivery options are available at this time.');
    } else {
      setMealOptionModalVisible(true);
    }
  };

  // Function to generate message and redirect to WhatsApp
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart is empty', 'Please add items to cart before checkout.');
      return;
    }

    // Determine available meals based on time
    determineAvailableMeals();
  };

  // Function to proceed with checkout after selecting meal
  const proceedToCheckout = () => {
    if (!selectedMeal) {
      Alert.alert('Select Delivery Option', 'Please select a delivery option.');
      return;
    }

    let message = 'Hello, I would like to order the following items:\n\n';

    cartItems.forEach((item) => {
      message += `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });

    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    message += `\nTotal Price: ₹${totalPrice}\n`;
    message += `Delivery with: ${selectedMeal}\n`;
    message += 'Free delivery for Bismi customers.\n';
    message += 'Thank you!';

    // Encode the message
    const url = `https://wa.me/917012975494?text=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'WhatsApp is not installed on your device.');
    });

    setMealOptionModalVisible(false);
    setCartModalVisible(false);
  };

  // Filtered foods based on search query and selected category
  const filteredFoods = specialFoods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFBF00" />
      <View style={styles.container}>
        {/* <Header /> */}
        <TextInput
                style={styles.searchBar}
                placeholder="Search Foods"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
        <ScrollView contentContainerStyle={styles.mainContent}  showsVerticalScrollIndicator={false} >
          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#FFBF00" />
            </View>
          ) : (
            <>
              {/* Search Bar */}
            

              {/* Categories */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryItem,
                      selectedCategory === category && styles.categoryItemSelected,
                    ]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        selectedCategory === category && styles.categoryTextSelected,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={styles.sectionTitle}>Bismi add Ons</Text>
              <View style={styles.foodList}>
                {filteredFoods.map((item) => (
                  <View key={item.id} style={styles.foodItem}>
                    <Image source={{ uri: item.image }} style={styles.foodImage} />
                    <Text style={styles.foodName}>{item.name}</Text>
                    <Text style={styles.foodPrice}>₹{item.price}</Text>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => addToCart(item)}
                    >
                      <Text style={styles.addButtonText}>Add to Cart</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </>
          )}
        </ScrollView>

        {/* Floating Cart Button */}
        {cartItems.length > 0 && (
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => setCartModalVisible(true)}
          >
            <Ionicons name="cart" size={24} color="#fff" />
            <View style={styles.cartItemCount}>
              <Text style={styles.cartItemCountText}>{cartItems.length}</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Cart Modal */}
        <Modal
          visible={cartModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setCartModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Your Cart</Text>
              <ScrollView style={styles.cartItemsContainer}>
                {cartItems.map((item) => (
                  <View key={item.id} style={styles.cartItem}>
                    <Text style={styles.cartItemName}>{item.name}</Text>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => removeFromCart(item)}
                      >
                        <Text style={styles.quantityButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => addToCart(item)}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.cartItemPrice}>
                      ₹{item.price * item.quantity}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              <Text style={styles.totalPrice}>
                Total Price: ₹
                {cartItems.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                )}
              </Text>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={handleCheckout}
              >
                <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setCartModalVisible(false)}
              >
                <Ionicons name="close-circle" size={36} color="#FFBF00" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Meal Option Modal */}
        <Modal
          visible={mealOptionModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setMealOptionModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.mealOptionModalContent}>
              <Text style={styles.modalTitle}>Select Delivery Option</Text>
              {availableMeals.length > 0 ? (
                availableMeals.map((meal) => (
                  <TouchableOpacity
                    key={meal}
                    style={[
                      styles.mealOptionItem,
                      selectedMeal === meal && styles.mealOptionItemSelected,
                    ]}
                    onPress={() => setSelectedMeal(meal)}
                  >
                    <Text
                      style={[
                        styles.mealOptionText,
                        selectedMeal === meal && styles.mealOptionTextSelected,
                      ]}
                    >
                      {meal}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noMealsText}>No delivery options available at this time.</Text>
              )}
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={proceedToCheckout}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setMealOptionModalVisible(false)}
              >
                <Ionicons name="close-circle" size={36} color="#FFBF00" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* <Footer navigation={navigation} /> Uncomment if you have a Footer component */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFBF00',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  mainContent: {
    paddingVertical:0,
    paddingBottom: 80,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    width: '95%',
  marginHorizontal:10,
  marginVertical:20,
  padding:15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
    borderRadius: 25,
    height:50,
    // iOS shadow
    shadowColor: '#FFBF00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // Android shadow
    elevation: 123,
  },
  categoryList: {
    paddingHorizontal:20,
    // marginTop:10,
    marginBottom: 5,
  },
  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
  },
  categoryItemSelected: {
    backgroundColor: '#FFBF00',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  categoryTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 22,
    paddingHorizontal:20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  foodList: {
    flexDirection: 'row',
    marginHorizontal:20,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  foodItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  foodImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  foodPrice: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#FFBF00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFBF00',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  cartItemCount: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(203, 32, 45,1)',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  cartItemCountText: {
    color: '#fff',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  mealOptionModalContent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxHeight: '50%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItemsContainer: {
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  cartItemName: {
    flex: 1,
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#FFBF00',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  cartItemPrice: {
    fontSize: 16,
    width: 60,
    textAlign: 'right',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  checkoutButton: {
    backgroundColor: 'rgba(203, 32, 45,1)', // Red color
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeModalButton: {
    position: 'absolute',
    top: -40,
    right: 20,
  },
  mealOptionItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    marginVertical: 5,
  },
  mealOptionItemSelected: {
    backgroundColor: '#FFBF00',
  },
  mealOptionText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  mealOptionTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: 'rgba(203, 32, 45,1)',
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noMealsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default BismiStoreScreen;
