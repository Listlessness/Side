import React, { PureComponent } from 'react'
import { Dimensions, FlatList, RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import { GogoAnimeService } from '../../services'
import { GogoEntityBasic, IAnimeEpisodeInfo, IEpisodePage } from '../../services/GogoanimeAPI/gogoanimeScraper'
import { SnackContext } from '../../utils'
import { WatchEpisodePageProps, WatchEpisodePageState } from './watchEpisodePage.types';
import { Appbar, Chip, Divider, List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { createRef } from 'react'
import { MessageComp } from '../../components'

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

type State = WatchEpisodePageState<IAnimeEpisodeInfo, GogoEntityBasic, IEpisodePage>;
type Props = WatchEpisodePageProps;

export class WatchEpisodePage extends PureComponent<Props, State> {

    declare context: React.ContextType<typeof SnackContext>;
    
    constructor(props: WatchEpisodePageProps) {
        super(props)
        
        const {
            id
        } = this.props.route.params;
        
        this.state = {
            currEpisodeId: id,
            episodeListMessage: undefined,
            currEpisodeMessage: undefined,
            refreshing: false,
            episodeList: [],
            currEpisodeInfo: undefined,
            currEpisodeSection: undefined
        }
    }

    async fetchEpisodeList() {

        const {
            currEpisodeInfo,
            currEpisodeSection
        } = this.state;

        if (currEpisodeInfo?.movieId && currEpisodeSection ) {
            this.setState({
                episodeListMessage: "Fetching episodes ..."
            })
            return await GogoAnimeService.fetchEpisodeList(currEpisodeInfo.movieId, currEpisodeSection.start, currEpisodeSection.end).then(list => {
                this.setState({episodeListMessage: undefined, episodeList: list})
            }).catch(reason => {
                this.setState({
                    episodeListMessage: reason.toString()
                })
                this.context.showMessage({
                    message: `Failed to retrieve episodes.`,
                    type: "info"
                });
            })
        }
        
    }

    componentDidUpdate(prevProps: Props, prevState: State) {

        const { currEpisodeInfo, currEpisodeSection, currEpisodeId } = this.state;
        if  (
            (currEpisodeInfo?.movieId !== prevState.currEpisodeInfo?.movieId) ||
            (currEpisodeSection?.start !== prevState.currEpisodeSection?.start) ||
            (currEpisodeSection?.end !== prevState.currEpisodeSection?.end)
        ) {
            this.fetchEpisodeList()
        }

        if (currEpisodeId !== prevState.currEpisodeId) this.loadPageInfo()
    }

    findEpisodeSection = (episode: number, page: IEpisodePage) => {
        return episode >= page.start && episode <= page.end
    } 

    async loadPageInfo() {
        this.setState({
            currEpisodeMessage: "Retrieving episode info ...",
            episodeListMessage: "Fetching episodes ..."
        })

        const {
            currEpisodeId,
        } = this.state;

        return await GogoAnimeService.fetchEpisodeInfo(currEpisodeId).then( async info => {
            this.setState({
                currEpisodeMessage: undefined,
                currEpisodeInfo: info,
                currEpisodeSection: info.episodePages.find(this.findEpisodeSection.bind(this, info.episode)) || {start: 0, end: info.episode}
            })
        }).catch(reason => {
            this.setState({
                currEpisodeMessage: reason.toString(),
                episodeListMessage: reason.toString()
            })
            this.context.showMessage({
                message: `Failed to current episode.`,
                type: "info"
            });
        })
    }

    __keyExtractor = (item: GogoEntityBasic, index: number) => `${item.title}-${index}`;

    __getItemLayout = (data: GogoEntityBasic[] | null | undefined, index: number) => (
        {length: windowHeight * .1, offset: (windowHeight * .1) * index, index}
    )

    async componentDidMount() {
        await this.loadPageInfo()
    }

    __onRefresh = async () => {
        await this.loadPageInfo()
    }

    __selectEpisodeSection = (section: IEpisodePage) => {
        this.setState({currEpisodeSection: section})
    }

    __selectEpisode = (id: string) => {
        this.props.navigation.setParams({
            id: id
        });

        this.setState({currEpisodeId: id})
    }

    __renderEpisodePageChip = (currPage: IEpisodePage, pages: IEpisodePage, index: number) => {
        return (
            <Chip
                selected={pages.start === currPage.start}
                style={{margin: 5}}
                key={`pages-index-${index}`}
                onPress={this.__selectEpisodeSection.bind(this, pages)}
            > {`${pages.start} - ${pages.end}`} </Chip>
        )
    }

    __renderEpisodeChip = (currId: string, episode: GogoEntityBasic) => {
        return (
            <Chip
                selected={episode.id === currId}
                style={{margin: 5}}
                icon="play-circle"
                key={`${episode.id}`}
                onPress={this.__selectEpisode.bind(this, episode.id)}
            > {episode.title} </Chip>
        )
    }

    __goFullScreen = () => {
        if (this.state.currEpisodeInfo?.videoId) {
            this.props.navigation.navigate('Episode Full Screen', {
                link: GogoAnimeService.GetVideoUrl(this.state.currEpisodeInfo.videoId)
            })
        }
    }
    
    render() {

        const {
            episodeList, currEpisodeSection, currEpisodeMessage,
            currEpisodeInfo, refreshing, episodeListMessage
         } = this.state;

        return (
            <SafeAreaView style={styles.page}>
                <ScrollView
                    nestedScrollEnabled={true}
                    style={styles.mainView}
                    refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={this.__onRefresh}
                        />
                    }
                >
                    <View style={styles.webViewVideo}>
                        {currEpisodeInfo && <WebView
                            automaticallyAdjustContentInsets={false}
                            //source={{html: `<iframe width="100%" height="200%" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" src=${GogoAnimeService.GetVideoUrl(currEpisodeInfo?.videoId)} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen />`}}
                            source={{uri: GogoAnimeService.GetVideoUrl(currEpisodeInfo?.videoId)}}
                        />}
                    </View>
                    <SafeAreaView>
                        <Appbar style={styles.appBar}>
                            <Appbar.Content title={currEpisodeInfo?.anime.title} subtitle={`Episode ${currEpisodeInfo?.episode || '...'}`} />
                            <Appbar.Action
                                icon={true ? "heart-outline" : "cards-heart" }
                                disabled 
                            />
                            <Appbar.Action
                                icon="fullscreen"
                                color="#FCBF49"
                                onPress={this.__goFullScreen}
                                disabled={!currEpisodeInfo || refreshing || (currEpisodeMessage !== undefined)}
                            />
                        </Appbar>

                        <List.AccordionGroup>
                            <View style={styles.accordionContainer}>
                                {currEpisodeSection && !currEpisodeMessage ? (
                                    <List.Accordion
                                        style={styles.accordion}
                                        id="Episode Pages"
                                        title="Episode Pages"
                                        titleStyle={styles.episodesTitle}
                                        left={props => <List.Icon {...props} color='#F5F1DB' icon="book-open-page-variant" />}
                                        right={props => <List.Icon {...props} color='#F5F1DB' icon="chevron-down" />}
                                    >
                                        <Divider />
                                        <ScrollView nestedScrollEnabled={true} style={{maxHeight: windowHeight * 0.4}} contentContainerStyle={styles.episodePages}>
                                            {currEpisodeInfo?.episodePages.map(this.__renderEpisodePageChip.bind(this, currEpisodeSection))}
                                        </ScrollView>
                                    </List.Accordion>
                                ) : <MessageComp message={currEpisodeMessage} />}
                            </View>
                            <View  style={styles.accordionContainer}>
                                {(episodeList.length > 0) && currEpisodeSection  && currEpisodeInfo && !episodeListMessage ? (
                                    <List.Accordion
                                        style={styles.accordion}
                                        id="Episode List"
                                        title={`Episodes (${currEpisodeSection.start} - ${currEpisodeSection.end})`}
                                        titleStyle={styles.episodesTitle}
                                        left={props => <List.Icon {...props} color='#F5F1DB' icon="animation-play-outline" />}
                                        right={props => <List.Icon {...props} color='#F5F1DB' icon="chevron-down" />}
                                    >
                                        <Divider />
                                        <ScrollView nestedScrollEnabled={true} style={{height: windowHeight * 0.4}} contentContainerStyle={styles.episodePages}>
                                            {episodeList.map(this.__renderEpisodeChip.bind(this, currEpisodeInfo.id))}
                                        </ScrollView>
                                    </List.Accordion>
                                ) : <MessageComp message={episodeListMessage} />}
                            </View>
                        </List.AccordionGroup>
                    </SafeAreaView>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#000E14',
        width: windowWidth,
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 10
    },
    mainView: {
        height: windowHeight
    },
    webViewVideo: {
        minHeight: windowHeight * .31,
        backgroundColor: '#00151F'
    },
    appBar: {
        backgroundColor: '#00151F'
    },
    episodePages: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: 10
    },
    episodesTitle: {
        color: '#F5F1DB',
        fontWeight: 'bold',
    },
    accordionContainer: {
        padding: 10
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
    },
    
})
