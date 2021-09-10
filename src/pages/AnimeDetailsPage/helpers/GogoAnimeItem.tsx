import React from 'react'
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native'
import { Badge, Caption, Paragraph } from 'react-native-paper'
import { IAnime, UseNavigation } from '../../../utils'
import { Ionicons } from '@expo/vector-icons';


const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export const GogoAnimeItem = React.memo(function GogoAnimeItem({
    title,
    thumbnail,
    type,
    episodeCount,
    summary,
    status,
    released,
    movieId
} : IAnime) {

    const navigation = UseNavigation();

    const goToEpisodePage = React.useCallback(() => {
        navigation.navigate('Watch Episode', {
            movieId: movieId,
            default_ep: 1
         })
    }, [movieId, navigation])

    return (
        <TouchableOpacity style={styles.container} onPress={goToEpisodePage}>
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

                <View style={styles.info}>
                    <Paragraph style={{...styles.text, color: '#FCBF49'}}>
                        {title}
                    </Paragraph>
                    <Caption numberOfLines={3} style={{...styles.text, color: '#F5F1DB'}}>
                        {summary || '?'}
                    </Caption>
                    <Caption style={{...styles.text, color: '#F5F1DB'}}>
                        <Ionicons name="tv-outline" size={12} color="#F77F00" /> {episodeCount || '?'} Episode(s) available
                    </Caption>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                        <Badge style={{ margin: 3}}>
                            {type || '?'}
                        </Badge>
                        <Badge style={{ margin: 3, backgroundColor: '#F5F1DB'}}>
                            {status || '?'}
                        </Badge>
                        <Badge style={{ margin: 3, backgroundColor: '#F5F1DB'}}>
                            {released || '?'}
                        </Badge>
                    </View>
                </View>
            </ImageBackground>
          
        </TouchableOpacity>
    )
})

const styles = StyleSheet.create({
    container: {
        width: windowWidth * .9,
        height: windowHeight * 0.2,
        backgroundColor: '#00151F',
        marginBottom: 10
    },
    background: {
        width: windowWidth * .9,
        height: windowHeight * 0.2,
        borderRadius: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    picture: {
        width: '30%',
        height: windowHeight * 0.25,
        borderRadius: 10,
        overflow: 'hidden'
    },
    info: {
        width: '67%',
        flexDirection: 'column',
        backgroundColor: "#000000c0",
        padding: 5,
        borderRadius: 10,
    },
    text: {
        width: '100%',
        textAlign: 'left'
    }
})
