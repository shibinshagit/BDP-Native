import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const deliveryPoints = [
  { name: 'Point A', type: 'single' },
  { name: 'Point B', type: 'cluster' },
  { name: 'Point C', type: 'single' },
  { name: 'Point D', type: 'cluster' },
  { name: 'Point E', type: 'single' },
];

const currentPositionIndex = 5; // Example: Delivery boy is currently at Point C

const DummyScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.timelineContainer}>
        {deliveryPoints.map((point, index) => (
          <View key={index} style={styles.pointContainer}>
            {/* Line connecting the points */}
            {index <= 0 && (
              <View
                style={[
                  styles.line,
                  index <= currentPositionIndex && styles.lineActive,
                ]}
              />
            )}
            {/* Circle representing the point */}
            <View
              style={[
                styles.circle,
                index === currentPositionIndex && styles.circleCurrent,
                index < currentPositionIndex && styles.circleCompleted,
              ]}
            />
            {/* Text describing the point */}
            <Text
              style={[
                styles.pointText,
                index === currentPositionIndex && styles.currentText,
              ]}
            >
              {point.name} ({point.type})
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  timelineContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: 20,
  },
  pointContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  line: {
    position: 'absolute',
    left: 25,
    top: 10,
    height: 40,
    width: 2,
    backgroundColor: '#ccc',
  },
  lineActive: {
    backgroundColor: '#4caf50',
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#ccc',
    marginRight: 15,
    zIndex: 1,
  },
  circleCurrent: {
    backgroundColor: '#ff9800',
  },
  circleCompleted: {
    backgroundColor: '#4caf50',
  },
  pointText: {
    fontSize: 16,
    color: '#333',
  },
  currentText: {
    fontWeight: 'bold',
    color: '#ff9800',
  },
});

export default DummyScreen;
