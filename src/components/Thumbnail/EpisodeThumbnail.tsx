import React, { PureComponent } from 'react';
import { EpisodeThumbnailProps } from './thumbnail.types';
import { View, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { Paragraph } from 'react-native-paper';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');


export class EpisodeThumbnail extends PureComponent<EpisodeThumbnailProps> {

    constructor(props: EpisodeThumbnailProps) {
        super(props)
    }

    render () {
        const {id,
            title,
            episode,
            url,
            picture_url,
            watchEpisode
        } = this.props;
        
        return (
            <TouchableOpacity style={styles.container} onPress={watchEpisode}>
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
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth * .3,
        height: windowHeight * .3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10
    },
    picture: {
        width: '100%',
        height: windowHeight * .25,
        justifyContent: 'flex-end'
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

