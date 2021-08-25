import React from 'react';
import { StackItemProps } from './stackItem.types';
import { Text, View, Image, StyleSheet } from 'react-native';

function StackItem({
    id,
    title,
    description,
    url,
    picture_url
}: StackItemProps) {
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
    }
});

export default StackItem;

