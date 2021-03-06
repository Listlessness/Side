import React, { PureComponent } from 'react';
import { Dimensions } from 'react-native';
import { JikanAnimeSubTypes, JikanTypes, SubTypes, TopItem } from '../../utils';
import { Thumbnail, TabListItem, TabbedList, sideStreamWrapper } from '../../components';
import { JikanService } from '../../services';
import { TopAnimeProps, TopAnimeState } from './topAnimePage.types';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');


type Props = TopAnimeProps<TopItem>;
type State = TopAnimeState<TopItem>;

class TopAnimePageComponent extends PureComponent<Props, State> {
    valueToType: { [x: number]: SubTypes; };
    tabListItems: TabListItem[];
    typeTopValue: { [x: string]: number; };

    constructor(props: Props) {
        super(props)

        this.typeTopValue = {
            [JikanAnimeSubTypes.Airing.toString()]: 0,
            [JikanAnimeSubTypes.Upcoming.toString()]: 1,
        }
    
        this.valueToType = {
            0: JikanAnimeSubTypes.Airing,
            1: JikanAnimeSubTypes.Upcoming,
        }
        
        const { topType } = this.props.route.params;

        this.state = {
            currIndex: this.typeTopValue[topType ? topType.toString() : JikanAnimeSubTypes.Airing.toString()],
            currPage: 1,
            messageText: undefined,
            items: [],
            refreshing: false,
            loadingMore: false
        }

        this.tabListItems = [
            {
                title: 'Airing',
                shouldShowCheck: this.__shouldShowCheck.bind(this, JikanAnimeSubTypes.Airing)
            },
            {
                title: 'Upcoming',
                shouldShowCheck: this.__shouldShowCheck.bind(this, JikanAnimeSubTypes.Upcoming)
            }
        ]
    }

    async fetchListItems() {
        const {
            currPage,
            items,
            loadingMore
        } = this.state;

        const { topType } = this.props.route.params;

        this.setState({
            messageText: "Fetching anime ..."
        })

        let newStateItemValue = {};

        return await JikanService.fetchTop(JikanTypes.Anime, currPage, topType).then(resp => {
            newStateItemValue = {
                messageText: undefined,
                items: currPage === 1 ? resp.top : items.concat(resp.top),
                refreshing: false,
                loadingMore: false
            }
        }).catch(reason => {
            newStateItemValue = {
                messageText: reason.toString(),
                refreshing: false,
                loadingMore: false
            }
             this.props.snackContext.showMessage({
                message: `Failed to retrieve ${loadingMore ? 'more' : ''} results.`,
                type: "info",
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

    __renderItem = ({item, index}: {item: TopItem, index: number}) => (
        <Thumbnail
            mal_id={item.mal_id}
            title={item.title}
            url={item.url}
            picture_url={item.image_url}
            score={item.score}
            type={item.type}
        />
    )

    __keyExtractor = (item: TopItem, index: number) => `${item.title}-${index}`;

    __getItemLayout = (data: TopItem[] | null | undefined, index: number) => (
        {length: windowHeight * .3, offset: (windowHeight * .3) * index, index}
    )

    __onChange = (index: number) => {
        this.props.navigation.setParams({
            topType: this.valueToType[index],
        });

        this.setState({
            currPage: 1,
            currIndex: index,
            items: []
        })
    }

    __onEndReached = (info: {distanceFromEnd: number}) => {
        if (info.distanceFromEnd < 0) return;

        const {
            currPage
        } = this.state;

        this.setState({
            currPage: currPage + 1,
            loadingMore: true
        })
    }

    __onRefresh = async () => {
        this.setState({
            currPage: 1,
            refreshing: true
        })
    }

    __shouldShowCheck = (subType: SubTypes): boolean => {
        return this.props.route.params.topType === subType
    }

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

export const TopAnimePage = sideStreamWrapper(TopAnimePageComponent)