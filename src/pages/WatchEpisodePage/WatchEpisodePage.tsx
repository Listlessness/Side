import React, { PureComponent } from 'react'
import { Dimensions, FlatList, ScrollView, StyleSheet, View } from 'react-native'
import { GogoAnimeService } from '../../services'
import { GogoEntityBasic, IAnimeEpisodeInfo, IEpisodePage } from '../../services/GogoanimeAPI/gogoanimeScraper'
import { SnackContext } from '../../utils'
import { WatchEpisodePageProps, WatchEpisodePageState } from './watchEpisodePage.types';
import { Appbar, Chip, Divider, List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { createRef } from 'react'

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

type State = WatchEpisodePageState<IAnimeEpisodeInfo, GogoEntityBasic, IEpisodePage>;

export class WatchEpisodePage extends PureComponent<WatchEpisodePageProps, State> {

    declare context: React.ContextType<typeof SnackContext>;
    episodeMovieId: string
    player: React.RefObject<unknown>
    episodeVideoId: string
    
    constructor(props: WatchEpisodePageProps) {
        super(props)
        
        const {
            id,
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

        this.player = createRef()
        this.episodeMovieId = ''
        this.episodeVideoId = ''
    }

    async fetchEpisodeList(epMovieId?: string) {

        const movieId = epMovieId === undefined ? this.episodeMovieId : epMovieId;

        const {
            ep_start,
            ep_end
        } = this.props.route.params;

        return await GogoAnimeService.fetchEpisodeList(movieId, ep_start, ep_end)
    }

    async fetchCurrentEpisodeInfo() {
        const {
            id,
        } = this.props.route.params;

        return await GogoAnimeService.fetchEpisodeInfo(id)
    }

    findEpisodeSection = (episode: number, page: IEpisodePage) => {
        return episode >= page.start && episode <= page.end
    } 

    async loadPageInfo() {
        this.setState({
            episodeListMessage: "Fetching episodes ...",
            currEpisodeMessage: "Retrieving episode info ..."
        })

        return this.fetchCurrentEpisodeInfo().then( async info => {
            this.setState({currEpisodeInfo: info, currEpisodeSection: info.episodePages.find(this.findEpisodeSection.bind(this, info.episode)) })
            await this.fetchEpisodeList(info.movieId).then(list => {
                this.setState({episodeList: list})
            }).catch(reason => {
                this.setState({
                    episodeListMessage: reason.toString()
                })
                this.context.showMessage({
                    message: `Failed to retrieve episodes.`,
                    type: "info"
                });
            })
        }).catch(reason => {
            this.setState({
                currEpisodeMessage: reason.toString()
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

    // generateEpisodeList = (episodePages: IEpisodePage[], episodeList: GogoEntityBasic[]) => {
    //     const listElement = (
            // <List.AccordionGroup>
            //     {episodePages.map((pages, index) => {
            //         let id = `pages-index-${index}`;
            //         return (
            //             <View
            //                 key={id}
            //                 style={styles.pagers}
            //             >
            //                 <List.Accordion
            //                     style={styles.accordion}
            //                     title={`Episodes ${pages.start} - ${pages.end}`}
            //                     id={id}
            //                     titleStyle={styles.episodesTitle}
            //                     right={props => <List.Icon {...props} color='#F5F1DB' icon="chevron-down" />}
            //                 >
            //                     <FlatList
            //                         nestedScrollEnabled={true}
            //                         keyExtractor={this.__keyExtractor}
            //                         getItemLayout={this.__getItemLayout}
            //                         style={styles.episodeList}
            //                         data={episodeList.slice(pages.start, pages.end)}
            //                         renderItem={this.__renderListItem}
            //                     />
            //                 </List.Accordion>
            //             </View>
            //         )
            //     })}
            // </List.AccordionGroup>
    //     )
    //     this.setState({episodeList: listElement})
    // } 

    async componentDidMount() {
        await this.loadPageInfo()
    }
    

    render() {

        const { episodeList, currEpisodeSection, currEpisodeInfo } = this.state;

        console.log("currEpisodeInfo", currEpisodeInfo)
        return (
            <SafeAreaView style={styles.page}>
                <ScrollView nestedScrollEnabled={true} style={styles.mainView}>
                    <View style={styles.webViewVideo}>
                        {currEpisodeInfo && <WebView
                            automaticallyAdjustContentInsets={false}
                            //source={{html: `<iframe width="100%" height="200%" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" src=${GogoAnimeService.GetVideoUrl(currEpisodeInfo?.videoId)} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen />`}}
                            source={{uri: `https://streamani.net/streaming.php?id=${currEpisodeInfo?.videoId}`}}
                        />}
                    </View>
                    <SafeAreaView>
                        <Appbar style={styles.appBar}>
                            <Appbar.Content title={currEpisodeInfo?.anime.title} subtitle={`Episode ${currEpisodeInfo?.episode}`} />
                            <Appbar.Action icon={true ? "heart-outline" : "cards-heart" }onPress={() => console.log('Pressed mail')} />
                            <Appbar.Action icon="fullscreen" color="#FCBF49" onPress={() => console.log('Pressed label')} />
                        </Appbar>

                        <List.AccordionGroup>

                                <List.Accordion
                                    style={styles.accordion}
                                    id="Episode Sections"
                                    title="Episode Sections"
                                    titleStyle={styles.episodesTitle}
                                    right={props => <List.Icon {...props} color='#F5F1DB' icon="chevron-down" />}
                                >
                                    <Divider />
                                    <ScrollView nestedScrollEnabled={true} style={{height: windowHeight * 0.2}} contentContainerStyle={styles.episodePages}>
                                        {currEpisodeInfo?.episodePages.map((pages, index) => {
                                            return (
                                                <Chip
                                                    style={{margin: 5}}
                                                    key={`pages-index-${index}`}
                                                    onPress={() => console.log('Pressed')}
                                                > {`${pages.start} - ${pages.end}`} </Chip>
                                            )
                                        })}
                                    </ScrollView>
                                </List.Accordion>
                                <List.Accordion
                                    style={styles.accordion}
                                    id="Episode List"
                                    title="Episode Sections"
                                    titleStyle={styles.episodesTitle}
                                    right={props => <List.Icon {...props} color='#F5F1DB' icon="chevron-down" />}
                                >
                                    <Divider />
                                    <ScrollView nestedScrollEnabled={true} style={{height: windowHeight * 0.2}} contentContainerStyle={styles.episodePages}>
                                        {episodeList.slice(currEpisodeSection?.start, currEpisodeSection?.end).map((episode, index) => {
                                            return (
                                                <Chip
                                                    style={{margin: 5}}
                                                    key={`${episode.id}`}
                                                    onPress={() => console.log('Pressed')}
                                                > {episode.title} </Chip>
                                            )
                                        })}
                                    </ScrollView>
                                </List.Accordion>
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
        justifyContent: 'space-evenly',
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
