// src/components/ProfileHeader.js
import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import an icon library

import { AuthContext } from '../context/AuthContext';

const { width } = Dimensions.get('window');

export default function ProfileHeader({ userData, onEditPress }) {
  const { logout } = useContext(AuthContext);
  const { name, email, phone } = userData || {};

const profileImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
  name || 'User'
)}&background=FFFFFF&color=000000&size=256`;

  return (
    <View style={styles.profileContainer}>
      {/* Profile Picture */}
      <Image
        source={{ uri: profileImageUrl }}
        style={styles.profilePicture}
      />
      i
      {/* User Info */}
      <Text style={styles.userName}>{name || 'Add Name'}</Text>
      <Text style={styles.userEmail}>{email || 'Email: Not Registered'}</Text>
      {phone && <Text style={styles.userPhone}>{phone}</Text>}

      <View style={styles.buttonContainer}>
        {/* Edit Profile Button */}
        <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
        <Icon name="edit" size={24} color="#fff"  />
          <Text style={styles.buttonText}>Edit </Text>
        </TouchableOpacity>
        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Icon name="account-balance-wallet" size={24} color="#fff"  />
        <Text style={styles.buttonText}>₹ 200</Text>
          
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity> */}
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 15,
    // margin: 20,
    // Shadow for iOS
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // Elevation for Android
    // elevation: 3,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFB30E',
    marginBottom: 15,
    // Shadow for profile picture
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.8,
  },
  editButton: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    // Shadow for buttons
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  logoutButton: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
    // Shadow for buttons
    shadowColor: '#FF5C5C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
});
