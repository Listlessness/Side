import React, { PureComponent, useCallback, useMemo } from 'react';
import { StackItemProps } from './stackItem.types';
import { ImageBackground, StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';
import { Paragraph, Caption, Button, Subheading } from 'react-native-paper';
import { extractEpisodeNumer, UseNavigation } from '../../utils';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export const StackItem = React.memo(
    function StackItem({
        id,
        title,
        episode,
        url,
        picture_url
    }: StackItemProps) {
        
        const navigation = UseNavigation();

        const episodeNum = useMemo(() => extractEpisodeNumer(episode), [episode]);

        const __watchEpisode = useCallback(
            () => {
                navigation.navigate('Watch Episode', {
                    episodeId: id,
                    default_ep: episodeNum
                })
            },
            [id, episodeNum, navigation],
        );
          
        return (
            <TouchableOpacity style={styles.container} onPress={__watchEpisode}>
                <ImageBackground
                    style={styles.background}
                    resizeMode="cover"
                    blurRadius={5}
                    source={{uri: picture_url}}
                    loadingIndicatorSource={require('../../../assets/img/placeholderPic.jpg')}
                >
                    <MaterialCommunityIcons style={styles.playButton} name="play-circle" size={50} color="#F5F1DB" />
                    <View style={styles.card}>
                        <ImageBackground
                            style={styles.picture}
                            resizeMode="contain"
                            source={{uri: picture_url}}
                            loadingIndicatorSource={require('../../../assets/img/placeholderPic.jpg')}
                        >
                            <LinearGradient
                                colors={['transparent', "black"]}
                                style={styles.fadeTop}
                            />
                            <View style={styles.info}>
                                <Caption style={styles.episode}> <Ionicons name="tv-outline" size={12} color="#F77F00" /> {episode}</Caption>
                                <Paragraph numberOfLines={1} style={styles.title}>{title}</Paragraph>
                            </View>
                        </ImageBackground>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
)

const styles = StyleSheet.create({
    container: {
        width: windowWidth * .65,
        height: windowHeight * .18,
        paddingRight: 15,
        marginBottom: 5,
    },
    fadeTop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: windowHeight * .18,
    },
    background: {
        height: windowHeight * .18,
        borderRadius: 10,
        overflow: 'hidden'
    },
    picture: {
        height: windowHeight * .18,
        justifyContent: 'flex-end',
        paddingLeft: 10,
    },
    card: {
        backgroundColor: 'transparent',
    },
    info: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 10,
        borderLeftColor: '#F77F00',
        borderLeftWidth: 2,
        marginBottom: 15
    },
    title: {
        color: '#F5F1DB',
        fontWeight: '500',
        width: '90%'
    },
    episode: {
        color: '#F3D180',
        fontWeight: 'bold'
    },
    playButton: {
      position: 'absolute',
      right: 5,
      top: 0
    }
});