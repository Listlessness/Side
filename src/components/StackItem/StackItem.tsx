import React, { PureComponent, useCallback, useMemo } from 'react';
import { StackItemProps } from './stackItem.types';
import { ImageBackground, StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';
import { Card, Paragraph, Button, Subheading } from 'react-native-paper';
import { extractEpisodeNumer, UseNavigation } from '../../utils';
import { LinearGradient } from 'expo-linear-gradient';

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
                    id: id,
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
                    <Card style={styles.card}>
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
                            <Card.Content style={styles.info}>
                                <Paragraph style={styles.episode}>{episode}</Paragraph>
                                <Subheading numberOfLines={1} style={styles.title}>{title}</Subheading>
                            </Card.Content>
                        </ImageBackground>
                    </Card>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
)



const styles = StyleSheet.create({
    container: {
        width: windowWidth * .8,
        height: windowHeight * .29,
        paddingRight: 10,
        
    },
    fadeTop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: windowHeight * 0.4,
    },
    background: {
        height: windowHeight * .29,
        borderRadius: 10,
        overflow: 'hidden'
    },
    picture: {
        height: windowHeight * .29,
        justifyContent: 'flex-end'
    },
    card: {
        backgroundColor: 'transparent',
    },
    info: {
        height: windowHeight * .15,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 10,
        borderLeftColor: '#F77F00'
    },
    title: {
        color: '#F5F1DB',
        fontWeight: '500',
    },
    episode: {
        color: '#F3D180',
        fontWeight: 'bold'
    },
    actions: {
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});