import React from 'react';
import { EpisodeThumbnailProps } from './thumbnail.types';
import { Text, View, Image, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export function EpisodeThumbnail({
    id,
    title,
    episode,
    url,
    picture_url
}: EpisodeThumbnailProps) {
    return (
        <Button key={id} containerStyle={styles.container} buttonStyle={{padding: 0}} type="clear"
            icon={
                <View style={styles.container}>
                    <ImageBackground
                        style={styles.picture}
                        resizeMode="cover"
                        source={{uri: picture_url}}
                        loadingIndicatorSource={require('../../../assets/img/placeholderPic.jpg')}
                    >
                        <View style={styles.info}>
                            <Text style={styles.episode}>
                                {episode}
                            </Text>
                        </View>
                    </ImageBackground>
                    <Text style={styles.title}>
                            {title}
                    </Text>
                </View>
            }
        />
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        height: '25vh',
        justifyContent: 'flex-end'
    },
    title: {
        overflow: 'hidden',
        textAlign: 'center',
        width: '100%',
        height: '10vh',
        color: '#F5F1DB',
        fontWeight: '500'
    },
    info: {
        height: '15%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: "#000000c0"
    },
    episode: {
        textAlign: 'center',
        color: '#FCBF49',
        fontWeight: '500'
    }
});

