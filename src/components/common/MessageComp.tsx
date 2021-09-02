import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface MessageCompProps {
    message?: string
}

export const MessageComp = React.memo(function MessageComp({
    message = "No Anime Found."
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
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        backgroundColor: '#00151F',
        height: 'auto',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
   },
    message: {
        color: '#fff',
        fontWeight: '500',
        padding: 10,
        textAlign: 'center'
    }
});
