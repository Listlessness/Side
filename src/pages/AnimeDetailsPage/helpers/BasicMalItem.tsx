import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { Chip } from 'react-native-paper'
import { MALItem, UseNavigation } from '../../../utils'

export const BasicMalItem = React.memo(function BasicMalItem({
    mal_id,
    name,
    type,
    url
} : MALItem) {

    const navigation = UseNavigation();

    const __animeDetails = useCallback(
        () => {
            navigation.navigate('Anime Details', {
                mal_id: mal_id,
                url: url
            })
        },
        [mal_id, url, navigation]
    );

    return (

        <Chip icon="play-circle" style={styles.container} textStyle={styles.title} onPress={__animeDetails}>
            {name}
        </Chip>
        
    )
})

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        width: '80%',
    },
    title: {
        width: '80%',
        textAlign: 'center'
    }
})
