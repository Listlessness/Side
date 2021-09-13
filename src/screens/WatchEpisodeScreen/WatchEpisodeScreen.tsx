import React, { PureComponent } from 'react'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import { GogoAnimeService } from '../../services'
import { WatchEpisodeScreenProps, WatchEpisodeScreenState } from './watchEpisodeScreen.types';
import { Appbar, Chip, Divider, List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { MessageComp, ScrollScreenWrapper, sideStreamWrapper } from '../../components'
import { IAnimeEpisodeInfo, GogoEntityBasic, IEpisodePage, ContextTypeNames } from '../../utils';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

type State = WatchEpisodeScreenState<IAnimeEpisodeInfo, GogoEntityBasic, IEpisodePage>;
type Props = WatchEpisodeScreenProps;

class WatchEpisodeScreenComponent extends PureComponent<Props, State> {
    
    constructor(props: WatchEpisodeScreenProps) {
        super(props)
        
        const {
            episodeId
        } = this.props.route.params;
        
        this.state = {
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
            movieId
        } = this.props.route.params;

        const {
            currEpisodeInfo,
            currEpisodeSection
        } = this.state;

        const currMovieId = movieId ? movieId : currEpisodeInfo?.movieId;
        const epStart = currEpisodeSection ? currEpisodeSection.start : 0;
        const epEnd = currEpisodeSection ? currEpisodeSection.end : 1;

        if (currMovieId) {
            this.setState({
                episodeListMessage: "Fetching episodes ..."
            })
            return await GogoAnimeService.fetchEpisodeList(currMovieId, epStart, epEnd).then(list => {
                this.setState({episodeListMessage: undefined, episodeList: list})
                return list;
            }).catch(reason => {
                this.setState({
                    episodeListMessage: reason.toString()
                })
                 this.props.snackContext.showMessage({
                    message: `Failed to retrieve episodes.`,
                    type: "info"
                });
                throw reason.toString()
            })
        } else {
            return Promise.resolve(undefined);
        }
        
    }

    __updateLastWatched() {
        const {
            currEpisodeInfo
        } = this.state;

        if (currEpisodeInfo && this.props.ssLastWatchedAnimeContext) {
            const {
                lastWatchedAnime, updateLastWatched
            } = this.props.ssLastWatchedAnimeContext;
    
            lastWatchedAnime[currEpisodeInfo.movieId] = {
                title: currEpisodeInfo.anime.title,
                id: currEpisodeInfo.id,
                picture_url: this.props.route.params.img_url,
                url: currEpisodeInfo.anime.link,
                episode: `Episode ${currEpisodeInfo.episode}`,
                dateAdded: new Date().toString(),
                movieId: currEpisodeInfo.movieId
            }

            const lastwatchedArray =  Object.values(this.props.ssLastWatchedAnimeContext.lastWatchedAnime).sort((a, b) => new Date(b.dateAdded).valueOf() - new Date(a.dateAdded).valueOf());

            if (lastwatchedArray.length === 12) {
                delete lastWatchedAnime[lastwatchedArray[11].movieId]
            }

            updateLastWatched(lastWatchedAnime)
        }
    }

    componentDidUpdate(prevProps: Props, prevState: State) {

        const { currEpisodeInfo, currEpisodeSection } = this.state;
        if  (
            (currEpisodeInfo?.movieId !== prevState.currEpisodeInfo?.movieId) ||
            (currEpisodeSection?.start !== prevState.currEpisodeSection?.start) ||
            (currEpisodeSection?.end !== prevState.currEpisodeSection?.end)
        ) {
            this.fetchEpisodeList()
        }

        if  (
            (currEpisodeInfo?.id !== prevState.currEpisodeInfo?.id)
        ) {
            this.__updateLastWatched()
        }

        const {
            episodeId
        } = this.props.route.params;

        if (episodeId !== prevProps.route.params.episodeId) this.loadPageInfo()
    }

    findEpisodeSection = (info: IAnimeEpisodeInfo) => {

        const {
            episodePages, episode
        } = info;

        return episodePages.find((page) => episode >= page.start && episode <= page.end) || {start: 0, end: info.episode} 
    } 

    async loadPageInfo() {
        this.setState({
            currEpisodeMessage: "Retrieving episode info ..."
        })

        const {
            episodeId
        } = this.props.route.params;

        if (episodeId) {

            return await GogoAnimeService.fetchEpisodeInfo(episodeId).then( async info => {
                this.setState({
                    currEpisodeMessage: undefined,
                    currEpisodeInfo: info,
                    currEpisodeSection: this.findEpisodeSection(info),
                    refreshing: false
                })
            }).catch(reason => {
                this.setState({
                    currEpisodeMessage: reason.toString(),
                    episodeListMessage: reason.toString(),
                    refreshing: false
                })
                 this.props.snackContext.showMessage({
                    message: 'Failed to retrieve current episode.',
                    type: "info"
                });
            })

        }
    }

    async componentDidMount() {
        const {
            episodeId, movieId
        } = this.props.route.params;

        if (episodeId) {
            await this.loadPageInfo()
        } else if (movieId) {
            await this.fetchEpisodeList().then(list => {
                if ((list !== undefined) && list.length > 0) {
                    this.props.navigation.setParams({
                        episodeId: list[0].id
                    });
                }
            })
        }
    }

    __onRefresh = async () => {
        this.setState({refreshing: true})
        await this.loadPageInfo()
    }

    __selectEpisodeSection = (section: IEpisodePage) => {
        this.setState({currEpisodeSection: section})
    }

    __selectEpisode = (id: string) => {
        this.props.navigation.setParams({
            episodeId: id
        });
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

    __renderEpisodeChip = (currId: string, item: GogoEntityBasic) => {
        return (
            <Chip
                selected={item.id === currId}
                style={{margin: 5}}
                icon="play-circle"
                key={`${item.id}`}
                onPress={this.__selectEpisode.bind(this, item.id)}
            > {item.title} </Chip>
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
            <ScrollScreenWrapper
                refreshing={refreshing}
                onRefresh={this.__onRefresh}
            >
                <SafeAreaView style={styles.mainView}>
                    <View style={styles.webViewVideo}>
                        {currEpisodeInfo && !refreshing && <WebView
                            automaticallyAdjustContentInsets={false}
                            //source={{html: `<iframe width="100%" height="200%" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" src=${GogoAnimeService.GetVideoUrl(currEpisodeInfo?.videoId)} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen />`}}
                            source={{uri: GogoAnimeService.GetVideoUrl(currEpisodeInfo?.videoId)}}
                        />}
                    </View>
                    <SafeAreaView>
                        <Appbar style={styles.appBar}>
                            <Appbar.Content title={currEpisodeInfo?.anime.title} subtitle={`Episode ${currEpisodeInfo?.episode || '...'}`} />
                            {/* <Appbar.Action
                                icon={true ? "bookmark-plus" : "bookmark-minus"}
                                disabled 
                            /> */}
                            <Appbar.Action
                                icon="fullscreen"
                                color="#FCBF49"
                                onPress={this.__goFullScreen}
                                disabled={!currEpisodeInfo || refreshing || (currEpisodeMessage !== undefined)}
                            />
                        </Appbar>
                        {(episodeList.length > 0) && currEpisodeSection  && currEpisodeInfo &&
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
                        }
                    </SafeAreaView>
                </SafeAreaView>
            </ScrollScreenWrapper>
        )
    }
}

export const WatchEpisodeScreen = sideStreamWrapper(WatchEpisodeScreenComponent, [ContextTypeNames.SSLastWatchedAnimeContext])

const styles = StyleSheet.create({
    mainView: {
        width: '100%',
        minHeight: windowHeight
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
    }
})
