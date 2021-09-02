import React, { PureComponent } from 'react'
import { Dimensions, ScrollView, StyleSheet } from 'react-native'
import { GogoAnimeService } from '../../services'
import { GogoEntityBasic, IAnimeEpisodeInfo } from '../../services/GogoanimeAPI/gogoanimeScraper'
import { SnackContext } from '../../utils'
import { WatchEpisodePageProps, WatchEpisodePageState } from './watchEpisodePage.types';
import { Title } from 'react-native-paper';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export class WatchEpisodePage extends PureComponent<WatchEpisodePageProps, WatchEpisodePageState<GogoEntityBasic, IAnimeEpisodeInfo>> {

    declare context: React.ContextType<typeof SnackContext>;
    episodeMovieId: string
    
    constructor(props: WatchEpisodePageProps) {
        super(props)
        
        const {
            id,
        } = this.props.route.params;
        
        this.state = {
            currEpisodeId: id,
            episodeListMessage: undefined,
            currEpisodeMessage: undefined,
            episodeList: [],
            refreshing: false,
            currEpisodeInfo: undefined
        }

        this.episodeMovieId = ''
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

    async loadPageInfo() {
        this.setState({
            episodeListMessage: "Fetching episodes ...",
            currEpisodeMessage: "Retrieving video ..."
        })

        return this.fetchCurrentEpisodeInfo().then( async info => {
            this.setState({currEpisodeInfo: info})
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
                message: `Failed to retrieve video.`,
                type: "info"
            });
        })
    }

    async componentDidMount() {
        await this.loadPageInfo()
    }
    

    render() {

        const { episodeList, currEpisodeInfo} = this.state;

        return (
            <ScrollView style={styles.page}>
                <Title>Hello World!</Title>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#000E14',
        width: windowWidth,
    }
})
