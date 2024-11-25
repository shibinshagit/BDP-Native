// src/components/OrderItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OrderItem({ order }) {
  return (
    <View style={styles.orderItemContainer}>
      <Text style={styles.orderTitle}>Order {'3'}</Text>
      <Text style={styles.orderDetail}>Plan: {order.plan.join(', ')}</Text>
      <Text style={styles.orderDetail}>
  Start Date: {new Date(order.orderStart).toLocaleDateString()}
</Text>
<Text style={styles.orderDetail}>
  End Date: {new Date(order.orderEnd).toLocaleDateString()}
</Text>

      <Text style={styles.orderDetail}>Status: {order.status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  orderItemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderDetail: {
    fontSize: 16,
    color: '#666',
  },
});
