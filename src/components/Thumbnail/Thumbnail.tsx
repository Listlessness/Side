import React, { PureComponent, useCallback } from 'react';
import { ThumbnailProps } from './thumbnail.types';
import { View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Paragraph, Caption } from 'react-native-paper';
import { UseNavigation } from '../../utils';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export const Thumbnail = React.memo(
    function Thumbnail({
        mal_id,
        title,
        score,
        description,
        url,
        type,
        picture_url,
        isBasic=false
    }: ThumbnailProps) {
    
        const navigation = UseNavigation();

        const __animeDetails = useCallback(
            () => {
                navigation.navigate('Anime Details', {
                    mal_id: mal_id,
                    url: url
                })
            },
            [mal_id, url, navigation],
        );
        
        return (
            <TouchableOpacity onPress={__animeDetails} key={mal_id} style={styles.container}>
                <ImageBackground
                    style={styles.background}
                    resizeMode="cover"
                    blurRadius={5}
                    source={{uri: picture_url}}
                    loadingIndicatorSource={require('../../../assets/img/placeholderPic.jpg')}
                >
                    <Image
                        style={styles.picture}
                        source={{uri: picture_url}}
                        resizeMode="contain"
                        defaultSource={require('../../../assets/img/placeholderPic.jpg')}
                    />
                </ImageBackground>
                <View style={styles.info}>
                    <Paragraph numberOfLines={1} style={styles.title}>
                        {title}
                    </Paragraph>
                    { !isBasic && (
                        <View style={styles.meta}>
                            <Caption style={styles.score || 0}>
                                <MaterialCommunityIcons name="star-circle-outline" size={12} color="#FCBF49" /> {score}
                            </Caption>
                            <Caption style={styles.type}>
                                <MaterialCommunityIcons name="movie-filter-outline" size={12} color="#F77F00" /> {type}
                            </Caption>
                        </View>
                    )}
                    
                </View>
            </TouchableOpacity>
        )
    }
)


const styles = StyleSheet.create({
    container: {
        width: windowWidth * .3,
        height: windowHeight * .3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 10
    },
    background: {
        width: '100%',
        height: windowHeight * .22,
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
        paddingTop: 5,
        height: windowHeight * .08,
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    title: {
        color: '#F5F1DB',
        fontWeight: '500',
        textAlign: 'center'
    },
    meta: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    score: {
        color: '#FCBF49',
        fontWeight: '500',
    },
    type: {
        color: '#F77F00',
        fontWeight: '500',
    }
});

