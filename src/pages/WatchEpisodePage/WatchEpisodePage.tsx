import React, { PureComponent } from 'react'
import { Dimensions, ScrollView, StyleSheet } from 'react-native'
import { GogoAnimeService } from '../../services'
import { GogoEntityBasic, IAnimeEpisodeInfo } from '../../services/GogoanimeAPI/gogoanimeScraper'
import { SnackContext } from '../../utils'
import { WatchEpisodePageProps, WatchEpisodePageState } from './watchEpisodePage.types';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export class WatchEpisodePage extends PureComponent<WatchEpisodePageProps, WatchEpisodePageState<GogoEntityBasic, IAnimeEpisodeInfo>> {

    declare context: React.ContextType<typeof SnackContext>;
    
    constructor(props: WatchEpisodePageProps) {
        super(props)
    
        this.state = {
            currEpisode: 0,
            messageText: undefined,
            episodeList: [],
            refreshing: false,
            currEpisodeInfo: undefined
        }
    }

    async fetchEpisodeList() {
        const {
            movieId,
            ep_start,
            ep_end
        } = this.props.route.params;

        return await GogoAnimeService.fetchEpisodeList(movieId, ep_start, ep_end).then(resp => {
            return  resp
        }).catch(reason => {
            return reason.toString()
        })

    }

    async fetchCurrentEpisodeInfo() {
        const {
            movieId,
            ep_start,
            ep_end
        } = this.props.route.params;

        return await GogoAnimeService.fetchEpisodeList(movieId, ep_start, ep_end).then(resp => {
            return resp
        }).catch(reason => {
            return reason.toString()
        })
    }

    async loadPageInfo() {
        this.setState({
            messageText: "Fetching anime ..."
        })

        let newStateItemValue = {};

        return await Promise.all([
            this.fetchEpisodeList(), this.fetchCurrentEpisodeInfo()
        ]).then((responses: any[]) => {

            newStateItemValue = {
                episodeList: responses[0],
                currEpisodeInfo: responses[1]
            }

        }).catch((reasons: String[]) => {
            newStateItemValue = {
                messageText: reasons.join(' ... ')
            }
            this.context.showMessage({
                message: `Failed to retrieve results.`,
                type: "info"
            });
        }).finally(() => {
            this.setState({...newStateItemValue, refreshing: false})
        })
    }

    async componentDidMount() {
        await this.loadPageInfo()
    }
    

    render() {

        const { episodeList, currEpisodeInfo} = this.state;

        console.log("currEpisodeInfo", currEpisodeInfo)
        return (
            <ScrollView style={styles.page}>
                Hello World!
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
