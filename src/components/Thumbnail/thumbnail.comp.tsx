import React, { PureComponent } from 'react';
import { ThumbnailProps } from './thumbnail.types';
import { Text, View, StyleSheet, Dimensions, ImageBackground, ActivityIndicator } from 'react-native';
import { Button, Image } from 'react-native-elements';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');


export class Thumbnail extends PureComponent<ThumbnailProps> {

    constructor(props: ThumbnailProps) {
        super(props)
    }

    render() {
        const {
            id,
            title,
            score,
            description,
            url,
            type,
            picture_url
        } = this.props;

        return (
            <Button key={id} containerStyle={styles.container} buttonStyle={{padding: 0}} type="clear"
                icon={
                    <View key={id} style={styles.container}>
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
                                PlaceholderContent={<ActivityIndicator />}
                            />
                        </ImageBackground>
                        <View style={styles.info}>
                            <Text numberOfLines={1} style={styles.title}>
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
                }
            />
        )
    }
}


const styles = StyleSheet.create({
    container: {
        width: windowWidth * .3,
        height: windowHeight * .3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5
    },
    background: {
        width: '100%',
        height: windowHeight * .24
    },
    picture: {
        width: '100%',
        height: '100%'
    },
    info: {
        paddingTop: 5,
        height: '24%',
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    title: {
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

