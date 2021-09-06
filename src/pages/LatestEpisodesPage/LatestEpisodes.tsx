import React, { PureComponent } from 'react';
import { Dimensions } from 'react-native';
import { extractEpisodeNumer, RECENT_RELEASE_TYPE, SnackContext } from '../../utils';
import { EpisodeThumbnail, TabbedList, TabListItem } from '../../components';
import { GogoAnimeService } from '../../services';
import { GogoRecentRelease } from '../../services/GogoanimeAPI/gogoanimeScraper';
import { LatestEpisodeProps, LatestEpisodeState } from './latestEpisodes.types';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

type Props = LatestEpisodeProps<GogoRecentRelease>;
type State = LatestEpisodeState<GogoRecentRelease>;

export class LatestEpisodesPage extends PureComponent<Props, State> {
    tabListItems: TabListItem[];
    static contextType = SnackContext;
    declare context: React.ContextType<typeof SnackContext>;

    constructor(props: Props) {
        super(props)
    
        this.state = {
            currIndex: 0,
            currPage: 1,
            currPagination: [],
            messageText: undefined,
            items: [],
            refreshing: false,
            loadingMore: false
        }

        this.tabListItems = [
            {
                title: 'Sub',
                shouldShowCheck: this.__shouldShowCheck.bind(this, RECENT_RELEASE_TYPE.SUB)
            },
            {
                title: 'Dub',
                shouldShowCheck: this.__shouldShowCheck.bind(this, RECENT_RELEASE_TYPE.DUB)
            },
            {
                title: 'Chinese',
                shouldShowCheck: this.__shouldShowCheck.bind(this, RECENT_RELEASE_TYPE.CHINESE)
            }
        ]
    }

    async fetchListItems() {
        const {
            currPage,
            currIndex,
            items,
            loadingMore
        } = this.state;

        this.setState({
            messageText: "Fetching anime ..."
        })
        let newStateItemValue = {};

        return await GogoAnimeService.fetchRecentlyAddedEpisodes(currPage, currIndex + 1).then(resp => {
            newStateItemValue = {
                messageText: undefined,
                items: currPage === 1 ? resp.data : items.concat(resp.data),
                currPagination: resp.paginations,
                refreshing: false,
                loadingMore: false
            }
        }).catch(reason => {
            newStateItemValue = {
                messageText: reason.toString(),
                refreshing: false,
                loadingMore: false
            }
            this.context.showMessage({
                message: `Failed to retrieve ${loadingMore ? 'more' : ''} results.`,
                type: "info"
            });
        }).finally(() => {
            this.setState(newStateItemValue)
        })
    }

    componentDidMount() {
        this.fetchListItems()
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        const {
            currPage,
            currIndex,
            refreshing
        } = this.state;

        if ((prevState.currIndex !== currIndex) || (prevState.currPage !== currPage) || ((prevState.refreshing !== refreshing) && refreshing)) 
            this.fetchListItems()
    }

    __onChange = (index: number) => {
        this.setState({
            currPage: 1,
            currIndex: index,
            items: []
        })
    }

    __onEndReached = (info: {distanceFromEnd: number}) => {
        if (info.distanceFromEnd < 0) return;
        
        const {
            currPagination,
            currPage
        } = this.state;

        if (currPagination.includes(currPage + 1)) this.setState({currPage: (currPage + 1), loadingMore: true});
    }

    __onRefresh = () => {
        this.setState({
            currPage: 1,
            refreshing: true
        })
    }

    __shouldShowCheck = (releaseType: number): boolean => {
        return (this.state.currIndex + 1) === releaseType
    }

    __renderItem = ({item, index}: {item: GogoRecentRelease, index: number}) => {
        const episodeNum = extractEpisodeNumer(item.episode);
        return (
            <EpisodeThumbnail
                key={index}
                id={item.id}
                title={item.title}
                url={item.link}
                picture_url={item.thumbnail}
                episode={item.episode}
            />
        )
    }
    
    __keyExtractor = (item: GogoRecentRelease, index: number) => `${item.title}-${index}`;
    
    __getItemLayout = (data: GogoRecentRelease[] | null | undefined, index: number) => (
        {length: windowHeight * .35, offset: (windowHeight * .35) * index, index}
    )

    render() {
        const {
            messageText,
            items,
            currIndex,
            refreshing,
            loadingMore
        } = this.state;

        return (
            <TabbedList
                items={items}
                messageText={messageText}
                renderItem={this.__renderItem}
                onEndReached={this.__onEndReached}
                keyExtractor={this.__keyExtractor}
                getItemLayout={this.__getItemLayout}
                onRefresh={this.__onRefresh}
                currIndex={currIndex}
                onChange={this.__onChange}
                tabsList={this.tabListItems}
                refreshing={refreshing}
                loadingMore={loadingMore}
            />
        );
    }
}