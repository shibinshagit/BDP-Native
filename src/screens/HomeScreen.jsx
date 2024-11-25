import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, StatusBar, Dimensions, SafeAreaView, Linking, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const { width: viewportWidth } = Dimensions.get('window');

// Dummy data for carousel and featured plans
const carouselData = [
  { id: '1', image: 'https://bismimess.online/assets/img/gallery/bg3.jpg', title: '3 times a day', price: '₹3200/-' },
  { id: '2', image: 'https://bismimess.online/assets/img/gallery/bg6.jpg', title: '2 times a day', price: '₹2750/-' },
  { id: '3', image: 'https://bismimess.online/assets/img/gallery/bg1.jpg', title: '1 time a day', price: '₹1500/-' },
];

const featuredPlans = [
  { id: '1', image: 'https://bismimess.online/assets/img/gallery/bg1.jpg', title: 'Chappathi', description: 'Breakfast' },
  { id: '3', image: 'https://bismimess.online/assets/img/gallery/bg3.jpg', title: 'Biriyani', description: 'Lunch' },
  { id: '2', image: 'https://bismimess.online/assets/img/gallery/bg2.jpg', title: 'Dosa', description: 'Dinner' },
  { id: '4', image: 'https://bismimess.online/assets/img/gallery/bg6.jpg', title: 'Appam', description: 'Breakfast' },
];

const featuredPlaces = [
  { id: '1', name: 'Brototype', image: 'https://brototype.com/careers/images/contentt.JPG' },
  { id: '2', name: 'Nucleus', image: 'https://www.spazeone.com/uploads/place117025006667816.webp' },
  { id: '3', name: 'Forum', image: 'https://pbs.twimg.com/media/F4Djr90WcAASkfK.jpg:large' },
];

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchStarted, setSearchStarted] = useState(false);
  
  const scrollRef = useRef(null);
  const scrollInterval = useRef(null);
  const currentIndex = useRef(0);
  const placesScrollRef = useRef(null);
  const placesScrollInterval = useRef(null);
  const placesIndex = useRef(0);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      setIsSearching(true);
      setTimeout(() => {
        const results = featuredPlaces.filter(place =>
          place.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredPlaces(results);
        setIsSearching(false);
      }, 1000); // Simulate network delay for loader effect
    } else {
      setFilteredPlaces([]);
    }
  };

  const handlePlaceClick = (placeName) => {
    const message = `Hi, I would like to know more about ${placeName}.`;
    Linking.openURL(`https://wa.me/917012975494?text=${encodeURIComponent(message)}`);
  };

  const handleChatNow = () => {
    const message = `Hi, I couldn't find my location in your list. Please help me out.`;
    Linking.openURL(`https://wa.me/917012975494?text=${encodeURIComponent(message)}`);
  };


  useEffect(() => {
    scrollInterval.current = setInterval(() => {
      if (scrollRef.current) {
        currentIndex.current = (currentIndex.current + 1) % carouselData.length;
        scrollRef.current.scrollTo({
          x: currentIndex.current * viewportWidth * 0.8,
          animated: true,
        });
      }
    }, 3000);

    placesScrollInterval.current = setInterval(() => {
      if (placesScrollRef.current) {
        placesIndex.current = (placesIndex.current + 1) % featuredPlaces.length;
        placesScrollRef.current.scrollTo({
          x: placesIndex.current * viewportWidth * 0.4,
          animated: true,
        });
      }
    }, 3000);

    return () => {
      clearInterval(scrollInterval.current);
      clearInterval(placesScrollInterval.current);
    };
  }, []);


  const handleOrderNow = () => {
    Linking.openURL('tel:+917012975494');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFBF00" />
      <View style={styles.container}>
        <Header />
        <ScrollView contentContainerStyle={styles.mainContent}>
        {/* <TextInput
            style={styles.searchBar}
            placeholder="Search Your Location"
            value={searchQuery}
            onChangeText={handleSearch}
            onFocus={() => setSearchStarted(true)}
          />
          {searchStarted && (
            <>
              {isSearching ? (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size="large" color="#FFBF00" />
                </View>
              ) : (
                <>
                  {filteredPlaces.length > 0 ? (
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={styles.featuredPlaces}
                    >
                      {filteredPlaces.map((place) => (
                        <TouchableOpacity key={place.id} style={styles.placeItem} onPress={() => handlePlaceClick(place.name)}>
                          <Image source={{ uri: place.image }} style={styles.placeImage} />
                          <Text style={styles.placeName}>{place.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  ) : (
                    <TouchableOpacity style={styles.chatNowButton} onPress={handleChatNow}>
                      <Text style={styles.chatNowButtonText}>Chat Now</Text>
                    </TouchableOpacity>
                  )}
                </>
              )} 
            </>
           
          )} */}

          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
            ref={scrollRef}
          >
            {carouselData.map((item) => (
              <View key={item.id} style={styles.carouselItem}>
                <Image source={{ uri: item.image }} style={styles.carouselImage} />
                <Text style={styles.carouselText}>
                  <Text style={styles.carouselTitle}>{item.title}</Text>
                  {'\n'}
                  <Text style={styles.carouselPrice}>{item.price}</Text>
                </Text>
              </View>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Todays Special</Text>
          <View style={styles.featuredPlansContainer}>
            {featuredPlans.map((item) => (
              <View key={item.id} style={[styles.planItem, item.id === '1' && styles.trendingPlan]}>
                <Image source={{ uri: item.image }} style={styles.planImage} />
                <Text style={styles.planTitle}>{item.title}</Text>
                <Text style={styles.planDescription}>{item.description}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.orderNowButton} onPress={handleOrderNow}>
          <Text style={styles.orderNowButtonText}>Order Now</Text>
        </TouchableOpacity>
        </ScrollView>
       
        {/* <Footer navigation={navigation} /> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000', // Yellow color for the safe area
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  mainContent: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 80, // To ensure content is not hidden behind the button
  },
  searchBar: {
    width: '100%',
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  loaderContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  featuredPlaces: {
    width: viewportWidth,
    height: 100,
    marginVertical: 10,
  },
  placeItem: {
    width: viewportWidth * 0.4,
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  placeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeName: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
  },
  chatNowButton: {
    width: '100%',
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#32CD32', // Green color
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatNowButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  carousel: {
    width: viewportWidth,
    height: 200,
    marginVertical: 10,
  },
  carouselItem: {
    width: viewportWidth * 0.8,
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    resizeMode: 'cover',
  },
  carouselText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(203, 32, 45,0.9)',
    padding: 5,
  },
  carouselTitle: {
    fontSize: 16,
  },
  carouselPrice: {
    fontSize: 14,
    color: '#FFD700',
  },
  featuredPlaces: {
    width: viewportWidth,
    height: 100,
    marginVertical: 10,
  },
  placeItem: {
    width: viewportWidth * 0.4,
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  placeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeName: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
  },
  chatNowButton: {
    width: '100%',
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(203, 32, 45,1)',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatNowButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    alignSelf: 'flex-start',
  },
  featuredPlansContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  planItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 10,
    overflow: 'hidden',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    padding: 10,
  },
  trendingPlan: {
    borderWidth: 2,
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 10,
  },
  planImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  planDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginTop: 5,
  },
  orderNowButton: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: '#FFBF00',
    borderRadius: 25,
    marginHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderNowButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
