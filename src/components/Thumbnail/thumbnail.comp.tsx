import React from 'react';
import { ThumbnailProps } from './thumbnail.types';
import { Text, View, Image, StyleSheet } from 'react-native';

function Thumbnail({
    id,
    title,
    score,
    description,
    url,
    type,
    picture_url
}: ThumbnailProps) {
    return (
        <View key={id} style={styles.container}>
            <Image
                style={styles.picture}
                source={{uri: picture_url}}
                loadingIndicatorSource={require('../../../assets/img/placeholderPic.jpg')}
            />
            <View style={styles.info}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <View style={styles.meta}>
                    <Text style={styles.score}>
                        {score}
                    </Text>
                    <Text style={styles.type}>
                        {type}
                    </Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5
    },
    picture: {
        width: '100%',
        height: '75%',
        resizeMode: 'cover',
    },
    info: {
        paddingTop: 5,
        height: '25%',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    title: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: '#F5F1DB',
        fontWeight: '500',
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

export default Thumbnail;

