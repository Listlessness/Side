import React from 'react'
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper'

interface SeeMoreButtonProps {
    onPress: () => void,
}

export const SeeMoreButton = React.memo(function SeeMoreButton({
    onPress
}: SeeMoreButtonProps) {
    

    return (
        <Button
            onPress={onPress}
            icon='arrow-right'
            style={styles.container}
            contentStyle={styles.content}
            labelStyle={styles.label}
            mode='text'
            children="see more"
        />
    )
})

const styles = StyleSheet.create({
    container: {
        width: '50%'
    },
    content: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        paddingBottom: 5
    },
    label: {
        color: '#EAE2B7',
        fontWeight: '500',
        textAlign: 'right'
    }
});
