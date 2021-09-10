import React, { PureComponent } from 'react'
import { AnimeDetailsPageProps, AnimeDetailsPageState } from './animeDetailsPage.types'
import { AnimeById, CharacterItem, ContextTypeNames, IAnime, MALItem, MALType, Recommendation } from '../../utils';
import { GogoAnimeService, JikanService } from '../../services';
import { Dimensions, ImageBackground, StyleSheet, View, Image, ScrollView, Linking } from 'react-native';
import { CollapsibleParagraph, CustomCarousel, MessageComp, ScrollPageWrapper, sideStreamWrapper, Thumbnail } from '../../components';
import { Badge, Button, Caption, IconButton, List, Subheading, Title, Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimeCharacter, BasicMalItem, GogoAnimeItem, GridStat } from './helpers';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

type State = AnimeDetailsPageState<AnimeById>;
type Props = AnimeDetailsPageProps;

class AnimeDetailsPageComponent extends PureComponent<Props, State> {

    scrollRef: React.RefObject<ScrollView>;
    
    constructor(props: Props) {
        super(props)
    
        this.state = {
            animeDetailsById: undefined,
            detailsMessage: undefined,
            refreshing: false
        }

        this.scrollRef = React.createRef(); 
    }

    async fetchAnimeDetails() {
        const { mal_id } = this.props.route.params;
        
        this.setState({detailsMessage: 'Fetching anime details'})

        JikanService.fetchAnime(mal_id).then(details => {
            this.setState({
                animeDetailsById: details,
                detailsMessage: undefined,
                refreshing: false,
            })
        }).catch(reason => {
            this.setState({
                detailsMessage: reason.toString(),
                refreshing: false
            })
            this.props.snackContext.showMessage({
                message: 'Failed to fetch anime details.',
                type: "info"
            });
        })

        this.scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        })
    }

    componentDidMount() {
        this.fetchAnimeDetails()
    }

    componentDidUpdate(prevProps: Props, prevState: State) {

        const { mal_id } = this.props.route.params;

        if (mal_id !== prevProps.route.params.mal_id) this.fetchAnimeDetails()
    }

    __onRefresh = () => {
        this.fetchAnimeDetails()
    }
    
    __fetchCharacters = () => {
        const { mal_id } = this.props.route.params;
        return JikanService.fetchCharacters4Anime(mal_id).then(resp => {
            return resp.characters.slice(0,20);
        })
    }

    __renderCharacters = ({item, index}: { item: CharacterItem; index: number; }) => {
        return (
            <AnimeCharacter
                {...item}
            />
        );
    }

    __fetchRecommendations = () => {
        const { mal_id } = this.props.route.params;
        return JikanService.fetchRecommendations4Anime(mal_id).then(resp => {
            return resp.recommendations.slice(0,20);
        })
    }

    __renderRecommendation = ({item, index}: { item: Recommendation; index: number; }) => {
        return (
            <Thumbnail
                key={index}
                mal_id={item.mal_id}
                title={item.title}
                url={item.url}
                isBasic
                picture_url={item.image_url}
            />
        );
    }

    __renderGogoAnimeItem = ({item, index}: { item: IAnime; index: number; }) => {
        return (
            <GogoAnimeItem
                {...item}
            />
        );
    }

    __fetchAnimeStreamSources = () => {
        const {
            animeDetailsById
        } = this.state;

        if (animeDetailsById?.title) {
            this.props.navigation.navigate("Simple List", {
                fetchItems: () =>  GogoAnimeService.searchAnime(animeDetailsById.title),
                itemsExtracter: (resp: IAnime[]) => resp,
                renderItem: this.__renderGogoAnimeItem,
                nameExtracter: () => animeDetailsById.title,
                numColumns: 1
            })
        }
    }

    __updateBookMark = () => {

        const {
            animeDetailsById
        } = this.state;

        if (animeDetailsById && this.props.ssBookmarkedAnimeContext) {
            const {
                bookmarkedAnime, updateBookmarks
            } = this.props.ssBookmarkedAnimeContext;
    
    
            if (bookmarkedAnime[animeDetailsById.mal_id]) {
                delete bookmarkedAnime[animeDetailsById.mal_id];
            } else {
                bookmarkedAnime[animeDetailsById.mal_id] = {
                    title: animeDetailsById.title,
                    mal_id: animeDetailsById.mal_id,
                    picture_url: animeDetailsById.image_url,
                    url: animeDetailsById.url,
                    score: animeDetailsById.score,
                    type: animeDetailsById.type
                }
            }

            updateBookmarks(bookmarkedAnime)
        }
    }

    render() {

        const {
            ssBookmarkedAnimeContext
        } = this.props;

        const {
            animeDetailsById,
            detailsMessage, refreshing
        } = this.state;

        return (
            <ScrollPageWrapper
                scrollRef={this.scrollRef}
                refreshing={refreshing}
                onRefresh={this.__onRefresh}
                gradientOffset={windowHeight * 0.4}
            >
                 <ImageBackground
                    style={styles.background}
                    imageStyle={styles.backgroundImage}
                    resizeMode="cover"
                    blurRadius={2}
                    source={{uri: animeDetailsById?.image_url}}
                    defaultSource={require('../../../assets/img/placeholderPic.jpg')}
                >
                    
                    <ImageBackground
                        style={styles.background}
                        imageStyle={styles.picture}
                        source={{uri: animeDetailsById?.image_url}}
                        resizeMode="contain"
                        defaultSource={require('../../../assets/img/placeholderPic.jpg')}
                    >
                        <LinearGradient
                            colors={['transparent', '#000E14']}
                            style={styles.fadeTop}
                        />
                        {(animeDetailsById && detailsMessage === undefined) ? (<>
                            <SafeAreaView style={styles.mainContainer}>
                                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                    
                                    <Caption style={{ ...styles.title, color: '#F5F1DB', borderBottomWidth: 1, borderBottomColor: '#F77F00'}}>{animeDetailsById.genres.map(val => val.name).join(', ')}</Caption>
                                    <Title style={{ ...styles.title, color: '#fff', fontWeight: 'bold'}}>{animeDetailsById.title}</Title>
                                    { animeDetailsById.title_english &&
                                        <Subheading style={{ ...styles.title, color: '#F5F1DB'}}>{animeDetailsById.title_english}</Subheading>
                                    }
                                    { animeDetailsById.title_japanese &&
                                        <Caption style={{ ...styles.title, color: '#F5F1DB'}}>{animeDetailsById.title_japanese}</Caption>
                                    }
                                </View>
                                <View style={{...styles.containers, ...styles.headerContainer}}>
                                    <View style={{}}>
                                        <Caption style={{ ...styles.title, color: '#F5F1DB'}}><Ionicons name="tv-outline" size={12} color="#F77F00" /> {animeDetailsById.episodes || '?'} Episode(s), <MaterialCommunityIcons name="clock-time-four-outline" size={12} color="#F77F00" /> {animeDetailsById.duration === 'Unknown' ? '?' : animeDetailsById.duration} </Caption>

                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                                            <Badge style={{ ...styles.title, margin: 3}}>
                                                {animeDetailsById.rating}
                                            </Badge>
                                            <Badge style={{ ...styles.title, margin: 3, backgroundColor: '#F5F1DB'}}>
                                                {animeDetailsById.type}
                                            </Badge>
                                            <Badge style={{ ...styles.title, margin: 3, backgroundColor: '#F5F1DB'}}>
                                                {animeDetailsById.status}
                                            </Badge>
                                        </View>
                                    </View>

                                    <View style={{ marginLeft: 10, maxWidth: '35%', padding: 5, borderWidth: 1, borderColor: '#F5F1DB', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                        <Caption style={{ ...styles.title, fontWeight: 'bold', color: '#F5F1DB'}}>
                                            {`${animeDetailsById.airing ? 'Broadcast' : 'Aired'}`}
                                        </Caption>
                                        <Caption style={{ ...styles.title, color: '#F5F1DB'}}>
                                            <MaterialCommunityIcons name="calendar-clock" size={12} color="#F77F00" /> {animeDetailsById.airing ? (animeDetailsById.broadcast || '?') : (animeDetailsById.aired.string || '?')}
                                        </Caption>
                                    </View>
                                </View>

                                <View style={{...styles.containers, ...styles.gridStats}}>
                                    <GridStat
                                        title="MAL Score"
                                        content={animeDetailsById.score}
                                        footer={<MaterialCommunityIcons name="star-circle-outline" size={20} color="white" />}
                                        hasRightDivider
                                    />
                                    <GridStat
                                        title="Rank"
                                        content={animeDetailsById.rank}
                                        hasRightDivider
                                        footer={<Ionicons name="ios-podium-outline" size={20} color="white" />}
                                    />
                                    <GridStat
                                        title="Premiered"
                                        content={animeDetailsById.premiered}
                                        footer={<MaterialIcons name="live-tv" size={20} color="white" />}
                                    />
                                </View>
                                <Button
                                    icon="animation-play-outline"
                                    mode="contained"
                                    color='#F77F00'
                                    style={{maxWidth: '50%', ...styles.containers}}
                                    labelStyle={{color: '#fff'}}
                                    onPress={this.__fetchAnimeStreamSources}
                                    disabled={animeDetailsById.status === 'Not yet aired'}
                                >
                                    Find Video Sources
                                </Button>
                                <Surface style={{...styles.containers, width: '100%', padding: 10, borderRadius: 10, backgroundColor: '#00151F', elevation: 5}}>
                                    <Subheading style={{ color: '#FCBF49'}}>Synopsis</Subheading>
                                    <CollapsibleParagraph
                                        style={{ color: '#F5F1DB' }}
                                    >
                                        {animeDetailsById.synopsis || '?'}
                                    </CollapsibleParagraph>
                                </Surface>

                                <View style={{...styles.containers, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                    <Button
                                        icon="youtube"
                                        mode='text'
                                        color='#F77F00'
                                        onPress={()=>{ Linking.openURL(animeDetailsById.trailer_url)}}
                                        uppercase={false}
                                        disabled={!animeDetailsById.trailer_url}
                                    >
                                        Watch Trailer
                                    </Button>
                                    <Button
                                        icon={({ size, color }) => (
                                            <Image
                                              source={require('../../../assets/img/mal.png')}
                                              style={{ width: size, height: size }}
                                            />
                                        )}
                                        mode='outlined'
                                        color='#2e51a2'
                                        style={{borderColor: '#2e51a2'}}
                                        onPress={()=>{ Linking.openURL(animeDetailsById.url)}}
                                        uppercase={false}
                                        disabled={!animeDetailsById.url}
                                    >
                                        MyAnimeList
                                    </Button>
                                    <IconButton
                                        icon={ssBookmarkedAnimeContext?.bookmarkedAnime[animeDetailsById.mal_id] ? "bookmark-minus" : "bookmark-plus"}
                                        color='#F5F1DB'
                                        size={25}
                                        onPress={this.__updateBookMark}
                                    />
                                </View>
                                
                            </SafeAreaView>

                            <CustomCarousel
                                title="Characters"
                                keyPrefix='CH'
                                refreshing={refreshing || detailsMessage !== undefined}
                                onRefreshComplete={() => {}}
                                fetchItems={this.__fetchCharacters}
                                renderItem={this.__renderCharacters}
                                type='thumbnail'
                            />

                            <CustomCarousel
                                title="Recommendations"
                                keyPrefix='RECMD'
                                refreshing={refreshing || detailsMessage !== undefined}
                                onRefreshComplete={() => {}}
                                fetchItems={this.__fetchRecommendations}
                                renderItem={this.__renderRecommendation}
                                type='thumbnail'
                            />
                            
                            <List.Accordion
                                style={styles.accordion}
                                title="Related Anime"
                                titleStyle={{
                                    color: '#F5F1DB'
                                }}
                                left={props => <List.Icon {...props} color='#F5F1DB' icon="link-variant" />}
                                right={props => <List.Icon {...props} color='#F5F1DB' icon="chevron-down" />}
                            >
                                <ScrollView nestedScrollEnabled={true} style={{maxHeight: windowHeight * 0.3}} contentContainerStyle={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                    {Object.entries(animeDetailsById.related).map(([key, value]: [string, MALItem[]]) => {
                                        return (
                                                value.map((item, index) => {
                                                    return item.type === MALType.Anime ? <BasicMalItem key={index} {...item} /> : null
                                                })
                                        )
                                    })}
                                </ScrollView>
                            </List.Accordion>

                        </>) : (
                            <SafeAreaView style={{height: windowHeight, width: windowWidth}}>
                                <MessageComp message={detailsMessage} />
                            </SafeAreaView>
                        )}
                    </ImageBackground>
                </ImageBackground> 
            </ScrollPageWrapper>   
        )
    }
}

export const AnimeDetailsPage = sideStreamWrapper(AnimeDetailsPageComponent, [ContextTypeNames.SSBookmarkedAnimeContext])


const styles = StyleSheet.create({
    background: {
        width: windowWidth,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingBottom: 20
    },
    backgroundImage: {
        height: windowHeight * 0.4
    },
    picture: {
        height: windowHeight * 0.4
    },
    fadeTop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: windowHeight * 0.4,
    },
    mainContainer: {
        marginTop: windowHeight * 0.23,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth * .9,
    },
    title: {
        textAlign: 'center'
    },
    headerContainer: {
        width: windowWidth * .9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    gridStats: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    containers: {
        marginTop: 10,
        marginBottom: 10
    },
    accordion: {
        backgroundColor: '#00151F',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        width: windowWidth * 0.9
    },
});
