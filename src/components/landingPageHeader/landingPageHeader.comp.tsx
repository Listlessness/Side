import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'

export function LandingPageHeader() {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>
                Home
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#00151F',
      height: '8%',
      width: '100%',
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    text: {
        paddingLeft: 10,
        color: '#fff',
        fontWeight: '500'
    }
  });

