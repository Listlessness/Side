import React, { PureComponent } from 'react'
import { AnimeDetailsPageProps, AnimeDetailsPageState } from './animeDetailsPage.types'
import { AnimeById, MALItem, SnackContext } from '../../utils';
import { JikanService } from '../../services';
import { Dimensions, ImageBackground, StyleSheet, View, Image, ScrollView } from 'react-native';
import { CollapsibleParagraph, MessageComp } from '../../components';
import { Button, Caption, Divider, List, Paragraph, Subheading, Title } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

type State = AnimeDetailsPageState<AnimeById>;
type Props = AnimeDetailsPageProps;

export class AnimeDetailsPage extends PureComponent<Props, State> {
    static contextType = SnackContext;
    declare context: React.ContextType<typeof SnackContext>;
    
    constructor(props: Props) {
        super(props)
    
        this.state = {
            animeDetailsById: undefined,
            detailsMessage: undefined,
            refreshing: false
        }
    }

    async fetchAnimeDetails() {
        const { mal_id } = this.props.route.params;

        this.setState({detailsMessage: 'Fetching anime details'})

        JikanService.fetchAnime(mal_id).then(details => {
            this.setState({
                animeDetailsById: details,
                detailsMessage: undefined,
                refreshing: false
            })
        })
    }

    componentDidMount() {
        this.fetchAnimeDetails()
    }

    componentDidUpdate(prevProps: Props, prevState: State) {

        const { mal_id } = this.props.route.params;

        if (mal_id !== prevProps.route.params.mal_id) this.fetchAnimeDetails()
    }
    

    render() {

        const {
            animeDetailsById,
            detailsMessage
        } = this.state;

        return (
            <ScrollView style={styles.page} contentContainerStyle={styles.content}>
                 <ImageBackground
                    style={styles.background}
                    resizeMode="cover"
                    blurRadius={.5}
                    source={{uri: animeDetailsById?.image_url}}
                    defaultSource={require('../../../assets/img/placeholderPic.jpg')}
                >
                    <LinearGradient
                        colors={['transparent', 'transparent', '#000E14']}
                        style={styles.fadeTop}
                    />
                    
                    
                </ImageBackground>

                {animeDetailsById ? (
                        <>
                            <View style={styles.detailsContainer}>
                                <Image
                                    style={styles.picture}
                                    source={{uri: animeDetailsById?.image_url}}
                                    resizeMode="contain"
                                    defaultSource={require('../../../assets/img/placeholderPic.jpg')}
                                />
                                <Divider />
                                <View>
                                    <Title style={{ ...styles.title, color: '#fff', fontWeight: 'bold'}}>{animeDetailsById.title}</Title>
                                    { animeDetailsById.title_english &&
                                        <Subheading style={{ ...styles.title, color: '#F5F1DB'}}>{animeDetailsById.title_english}</Subheading>
                                    }
                                    { animeDetailsById.title_japanese &&
                                        <Caption style={{ ...styles.title, color: '#F5F1DB'}}>{animeDetailsById.title_japanese}</Caption>
                                    }
                                </View>

                                <Divider />

                                <View>
                                    <Button
                                        icon="animation-play-outline"
                                        mode="contained"
                                        color='#F77F00'
                                        dark
                                        onPress={() => console.log('Pressed')}
                                    >
                                        Find Sources To Watch
                                    </Button>
                                </View>

                                <Divider />

                                <View >
                                    <Subheading style={{ color: '#FCBF49'}}>Synopsis</Subheading>
                                    <CollapsibleParagraph
                                        style={{ color: '#F5F1DB' }}
                                    >
                                        {animeDetailsById.synopsis || ''}
                                    </CollapsibleParagraph>
                                </View>

                                <Divider />
                                
                                <List.Accordion
                                    title="Related Anime"
                                    left={props => <List.Icon {...props} icon="link-variant" />}
                                    style={{width: windowWidth * 0.9}}
                                >
                                    <ScrollView nestedScrollEnabled={true} style={{maxHeight: windowHeight * 0.3}}>
                                        {Object.entries(animeDetailsById.related).map(([key, value]: [string, MALItem[]]) => {
                                            return (
                                                <List.Section key={key}>
                                                    <List.Subheader>{key}</List.Subheader>
                                                    {value.map((item) => {
                                                        return <List.Item title={item.name} />
                                                    })}
                                                </List.Section>
                                            )
                                        })}
                                    </ScrollView>
                                </List.Accordion>
                                
                            </View>
                        </>
                    ) : <MessageComp message={detailsMessage} />}
                
                {/* {animeDetailsById ? (
                        <View>
                            <View style={styles.animeHeader}>
                                <View style={styles.container}>
                                    <Image
                                        style={styles.picture}
                                        source={{uri: animeDetailsById.image_url}}
                                        resizeMode="contain"
                                        defaultSource={require('../../../assets/img/placeholderPic.jpg')}
                                    />
                                </View>
                            </View>
                            <View>
                                    <Title style={{ color: '#F77F00', fontWeight: 'bold'}}>{animeDetailsById.title}</Title>
                                    { animeDetailsById.title_english &&
                                        <Subheading style={{ color: '#FCBF49'}}>{animeDetailsById.title_english}</Subheading>
                                    }
                                    { animeDetailsById.title_japanese &&
                                        <Caption style={{ color: '#FCBF49'}}>{animeDetailsById.title_japanese}</Caption>
                                    }
                                </View>
                            <Paragraph style={{ color: '#F5F1DB'}} >{animeDetailsById.synopsis}</Paragraph>
                        </View>
                    ) : <MessageComp message={detailsMessage} />} */}
                
            </ScrollView>   
        )
    }
}


const styles = StyleSheet.create({
    page: {
        backgroundColor: '#000E14',
        flex: 1,
    },
    content: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    background: {
        height: windowHeight * 0.45,
        width: windowWidth
    },
    fadeTop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: windowHeight * 0.45,
    },
    detailsContainer: {
        width: windowWidth * 0.9,
        bottom: 200,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    picture: {
        height: windowHeight * 0.3,
        width: '50%',
        borderRadius: 5
    },
    title: {
        textAlign: 'center'
    },
    animeHeader: {
        height: '40%',
        
        padding: 10
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
