import React from 'react'
import { StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';


interface SeeMoreButtonProps {
    navigateTo: {
        name: string,
        params?: {[index: string]: any}
    }
}

export function SeeMoreButton({
    navigateTo
}: SeeMoreButtonProps) {
    const navigation = useNavigation();

    return (
        <Button
            titleStyle={styles.carouselSeeMore}
            onPress={() => navigation.navigate(navigateTo.name, navigateTo.params)}
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
