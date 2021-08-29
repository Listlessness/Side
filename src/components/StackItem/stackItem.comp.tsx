import React from 'react';
import { StackItemProps } from './stackItem.types';
import { Text, View, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export function StackItem({
    id,
    title,
    description,
    url,
    picture_url
}: StackItemProps) {
    return (
        <Button key={id} containerStyle={styles.container} buttonStyle={{padding: 0}} type="clear"
            icon={
                <View key={id} style={styles.container}>
                    <ImageBackground
                        style={styles.picture}
                        resizeMode="cover"
                        blurRadius={5}
                        source={{uri: picture_url}}
                    >
                        <ImageBackground
                            style={styles.picture}
                            resizeMode="contain"
                            source={{uri: picture_url}}
                        >
                            <View style={styles.info}>
                                <Text style={styles.title}>
                                    {title}
                                </Text>
                                <Text style={styles.episode}>
                                    {description}
                                </Text>
                            </View>
                        </ImageBackground>
                    </ImageBackground>
                </View>
            }
        />
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: windowHeight * .28,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
    },
    picture: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    info: {
        height: windowHeight * .1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: "#000000c0",
        paddingLeft: 10
    },
    title: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: '#F5F1DB',
        fontWeight: '500',
    },
    episode: {
        color: '#F3D180',
        fontWeight: '500',
    }
});

