import React from 'react'
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper'

interface SeeMoreButtonProps {
    onPress: () => void,
}

export function SeeMoreButton({
    onPress
}: SeeMoreButtonProps) {
    

    return (
        <Button
            onPress={onPress}
            icon='arrow-right'
            containerStyle={{
                width: '50%',
                paddingBottom: 5
            }}
            buttonStyle={{padding: 0, justifyContent: 'flex-start'}}
            iconRight
            title="see more"
            type="clear"
        />
    )
}

const styles = StyleSheet.create({
    carouselSeeMore: {
        color: '#EAE2B7',
        fontWeight: '500',
        fontSize: 14,
        textAlign: 'right'
    }
});
