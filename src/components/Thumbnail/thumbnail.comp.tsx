import React from 'react';
import { ThumbnailProps } from './thumbnail.comp.types';
import { Text, View, Image, StyleSheet } from 'react-native';

function Thumbnail({
    id,
    title,
    description,
    url,
    picture_url
}: ThumbnailProps) {
    return (
        <View key={id} style={styles.container}>
            <Image
                style={styles.picture}
                source={{uri: picture_url}}
                loadingIndicatorSource={require('../../../assets/img/placeholderPic.jpg')}
            />
            <Text style={styles.title}>
                {title}
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    picture: {
        width: '100%',
        height: '75%',
        resizeMode: 'contain',
    },
    title: {
        color: '#fff',
        fontWeight: '500'
    }
});

export default Thumbnail;

