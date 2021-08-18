import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import LandingPage from './src/pages/landing.page';

export default function App() {


  return (
    <SafeAreaView style={styles.container}>
      <LandingPage />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003049',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
