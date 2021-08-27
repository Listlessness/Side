import React from 'react'
import { StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements'
interface SeeMoreButtonProps {
    onPress: () => void,
}

export function SeeMoreButton({
    onPress
}: SeeMoreButtonProps) {
    

    return (
        <Button
            titleStyle={styles.carouselSeeMore}
            onPress={onPress}
            icon={
                <Icon
                    name="arrow-right"
                    size={20}
                    color="#EAE2B7"
                />
            }
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
