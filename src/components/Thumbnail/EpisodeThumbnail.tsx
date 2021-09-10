import React, { useCallback, useMemo } from 'react';
import { EpisodeThumbnailProps } from './thumbnail.types';
import { View, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { extractEpisodeNumer, UseNavigation } from '../../utils';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export const EpisodeThumbnail = React.memo(
    function EpisodeThumbnail({
        id,
        title,
        episode,
        url,
        picture_url
    }: EpisodeThumbnailProps) {
    
        const navigation = UseNavigation();

        const episodeNum = useMemo(() => extractEpisodeNumer(episode), [episode]);

        const __watchEpisode = useCallback(
            () => {
                navigation.navigate('Watch Episode', {
                    episodeId: id,
                    default_ep: episodeNum,
                    img_url: picture_url
                })
            },
            [id, episodeNum, navigation, picture_url],
        );

        return (
            <TouchableOpacity style={styles.container} onPress={__watchEpisode}>
                <ImageBackground
                    style={styles.picture}
                    resizeMode="cover"
                    blurRadius={5}
                    source={{uri: picture_url}}
                    loadingIndicatorSource={require('../../../assets/img/placeholderPic.jpg')}
                >
                    <ImageBackground
                        style={styles.picture}
                        resizeMode="contain"
                        source={{uri: picture_url}}
                        loadingIndicatorSource={require('../../../assets/img/placeholderPic.jpg')}
                    >
                        <View style={styles.info}>
                            <Paragraph style={styles.episode}>
                                {episode}
                            </Paragraph>
                        </View>
                    </ImageBackground>
                </ImageBackground>
                <Paragraph  numberOfLines={2} style={styles.title}>
                        {title}
                </Paragraph>
            </TouchableOpacity>
        )
    }
)

const styles = StyleSheet.create({
    container: {
        width: windowWidth * .3,
        height: windowHeight * .3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10,
        borderRadius: 10
    },
    picture: {
        width: '100%',
        height: windowHeight * .23,
        justifyContent: 'flex-end',
        borderRadius: 10,
        overflow: 'hidden'
    },
    title: {
        textAlign: 'center',
        color: '#F5F1DB',
        fontWeight: '600',
        height: windowHeight * .05,
        paddingTop: 3
    },
    info: {
        height: windowHeight * .05,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: "#000000c0"
    },
    episode: {
        textAlign: 'center',
        color: '#FCBF49',
        fontWeight: 'bold'
    }
});

