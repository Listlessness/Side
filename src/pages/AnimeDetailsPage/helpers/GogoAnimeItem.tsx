import React, { useCallback } from 'react'
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Avatar, Badge, Caption, Paragraph, Subheading, Title } from 'react-native-paper'
import { IAnime } from '../../../services/GogoanimeAPI/gogoanimeScraper'
import { UseNavigation } from '../../../utils'

export const GogoAnimeItem = React.memo(function GogoAnimeItem({
    id,
    title,
    thumbnail,
    type,
    link,
    episodeCount,
    summary,
    status,
    genres,
    released
} : IAnime) {

    return (
        <TouchableOpacity style={styles.container}>
            <ImageBackground
                style={styles.background}
                resizeMode="cover"
                blurRadius={5}
                source={{uri: thumbnail}}
                loadingIndicatorSource={require('../../../../assets/img/placeholderPic.jpg')}
            >
                <Image
                    style={styles.picture}
                    source={{uri: thumbnail}}
                    resizeMode="contain"
                    defaultSource={require('../../../../assets/img/placeholderPic.jpg')}
                />
            </ImageBackground>
            <View>
                <Subheading style={styles.title}>
                    {title}
                </Subheading>
                <Paragraph numberOfLines={3}>
                    {summary || '?'}
                </Paragraph>
                <Caption style={styles.title}>
                    {episodeCount || '?'} Episodes
                </Caption>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                    <Badge style={{ ...styles.title, margin: 3}}>
                        {type || '?'}
                    </Badge>
                    <Badge style={{ ...styles.title, margin: 3, backgroundColor: '#F5F1DB'}}>
                        {status || '?'}
                    </Badge>
                    <Badge style={{ ...styles.title, margin: 3, backgroundColor: '#F5F1DB'}}>
                        {released || '?'}
                    </Badge>
                </View>
            </View>

        </TouchableOpacity>
    )
})

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    background: {
        width: '40%',
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden'
    },
    picture: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden'
    },
    info: {
        flex: 1,
        flexDirection: 'column'
    },
    title: {
        width: '100%',
        color: '#F5F1DB',
        textAlign: 'left'
    }
})
