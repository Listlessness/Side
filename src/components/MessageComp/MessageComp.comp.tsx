import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MessageCompProps } from './MessageComp.types';

export function MessageComp({
    message
}: MessageCompProps) {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.message}>
                    {message}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        backgroundColor: '#00151F',
        height: '20%',
        minWidth: '50%',
        justifyContent: 'center',
        alignItems: 'center'
   },
    message: {
        color: '#fff',
        fontWeight: '500'
    }
});
