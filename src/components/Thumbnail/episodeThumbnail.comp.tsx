import React, { PureComponent } from 'react';
import { EpisodeThumbnailProps } from './thumbnail.types';
import { Text, View, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';

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
            picture_url
        } = this.props;
        
        return (
            <TouchableOpacity style={styles.container}>
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
                            <Text style={styles.episode}>
                                {episode}
                            </Text>
                        </View>
                    </ImageBackground>
                </ImageBackground>
                <Text  numberOfLines={2} style={styles.title}>
                        {title}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth * .3,
        height: windowHeight * .35,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10
    },
    picture: {
        width: '100%',
        height: windowHeight * .3,
        justifyContent: 'flex-end'
    },
    title: {
        textAlign: 'center',
        color: '#F5F1DB',
        fontWeight: '500',
        height: windowHeight * .05
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
        fontWeight: '500'
    }
});

