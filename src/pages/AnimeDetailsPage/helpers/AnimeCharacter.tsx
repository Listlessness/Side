import React, { useCallback } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Avatar, Caption, Paragraph, Subheading, Title } from 'react-native-paper'
import { CharacterItem, MALItem, UseNavigation } from '../../../utils'

export const AnimeCharacter = React.memo(function AnimeCharacter({
    mal_id,
    name,
    image_url,
    url,
    role,
    voice_actors
} : CharacterItem) {

    return (
        <View style={styles.container}>
            <Avatar.Image size={150} source={{uri: image_url}} />
            <Paragraph style={styles.title}>
               {name}
            </Paragraph>
            <Caption style={styles.title}>
               {role}
            </Caption>

        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    title: {
        width: '100%',
        color: '#F5F1DB',
        textAlign: 'center'
    }
})
