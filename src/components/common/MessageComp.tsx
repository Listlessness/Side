import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Surface } from 'react-native-paper';

interface MessageCompProps {
    message?: string
}

export const MessageComp = React.memo(function MessageComp({
    message = "No Item Found."
}: MessageCompProps) {
    return (
        <View style={styles.container}>
            <Surface style={styles.box}>
                <Text style={styles.message}>
                    {message}
                </Text>
            </Surface>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        backgroundColor: '#00151F',
        height: 'auto',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
   },
    message: {
        color: '#fff',
        fontWeight: '500',
        padding: 10,
        textAlign: 'center'
    }
});
