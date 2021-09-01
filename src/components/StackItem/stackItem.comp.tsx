import React, { PureComponent } from 'react';
import { StackItemProps } from './stackItem.types';
import { ImageBackground, StyleSheet, Dimensions, View } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export class StackItem extends PureComponent<StackItemProps> {

    constructor(props: StackItemProps) {
        super(props)
    }
    
    render() {
        const {
            id,
            title,
            episode,
            url,
            picture_url
        } = this.props;

        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.background}
                    resizeMode="cover"
                    blurRadius={5}
                    source={{uri: picture_url}}
                    loadingIndicatorSource={require('../../../assets/img/placeholderPic.jpg')}
                >
                    <Card style={styles.card}>
                        <ImageBackground
                            style={styles.background}
                            resizeMode="contain"
                            source={{uri: picture_url}}
                            loadingIndicatorSource={require('../../../assets/img/placeholderPic.jpg')}
                        >
                            <Card.Content style={styles.info}>
                                <Paragraph style={styles.episode}>{episode}</Paragraph>
                                <Title numberOfLines={2} style={styles.title}>{title}</Title>
                                <Card.Actions>
                                    <Button mode='outlined'>Anime Details</Button>
                                    <Button mode='contained'>Watch Now!</Button>
                                </Card.Actions>
                            </Card.Content>
                        </ImageBackground>
                    </Card>
                </ImageBackground>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: windowHeight * .38,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
    },
    background: {
        height: windowHeight * .38,
        justifyContent: 'flex-end'
    },
    card: {
        backgroundColor: 'transparent',
    },
    info: {
        height: windowHeight * .18,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: "#000000c0",
        paddingLeft: 10
    },
    title: {
        color: '#F5F1DB',
        fontWeight: '500',
    },
    episode: {
        color: '#F3D180',
        fontWeight: '500',
    }
});

