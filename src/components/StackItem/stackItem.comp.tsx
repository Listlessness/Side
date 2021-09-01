import React, { PureComponent } from 'react';
import { StackItemProps } from './stackItem.types';
import { ImageBackground, StyleSheet, Dimensions, View } from 'react-native';
import { Card, Paragraph, Button, Subheading } from 'react-native-paper';

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
                            style={styles.picture}
                            resizeMode="contain"
                            source={{uri: picture_url}}
                            loadingIndicatorSource={require('../../../assets/img/placeholderPic.jpg')}
                        >
                            <Card.Content style={styles.info}>
                                <Paragraph style={styles.episode}>{episode}</Paragraph>
                                <Subheading numberOfLines={1} style={styles.title}>{title}</Subheading>
                                <Card.Actions style={styles.actions}>
                                    <Button color='#FCBF49' style={{borderColor: '#FCBF49'}} mode='outlined'>Anime Details</Button>
                                    <Button color='#F77F00' labelStyle={{color: '#fff'}} mode='contained'>Watch Now!</Button>
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
        width: windowWidth * .8,
        height: windowHeight * .3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        paddingRight: 10,
        borderRadius: 5
    },
    background: {
        height: windowHeight * .3
    },
    picture: {
        height: windowHeight * .3,
        justifyContent: 'flex-end'
    },
    card: {
        backgroundColor: 'transparent',
    },
    info: {
        height: windowHeight * .15,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: "#000000c0",
        paddingLeft: 10
    },
    title: {
        color: '#F5F1DB',
        fontWeight: '500',
    },
    episode: {
        color: '#F3D180',
        fontWeight: 'bold'
    },
    actions: {
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

