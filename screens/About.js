 import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This App</Text>
      <Text style={styles.description}>
        This app was built using React Native and deep learning image classifiers such as TensorFlow and Keras. These technologies allow the app to accurately analyze and categorize images, providing users with a powerful tool for image recognition and classification.
      </Text>
      <Text style={styles.developers}>
        Developed by: @shehzad
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  developers: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default AboutScreen;
