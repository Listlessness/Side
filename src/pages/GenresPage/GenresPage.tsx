import React from 'react';
import { Dimensions } from 'react-native';
import { GenreAnimeItem, JikanTypes, JikanSearchGenre } from '../../utils';
import { Thumbnail, TabListItem, TabbedList, SideStreamComponent } from '../../components';
import { JikanService } from '../../services';
import { GenresProps, GenresState } from './genresPage.types';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');


type Props = GenresProps<GenreAnimeItem>;
type State = GenresState<GenreAnimeItem>;

export class GenresPage extends SideStreamComponent<Props, State> {
    tabListItems: TabListItem[];

    constructor(props: Props) {
        super(props)

        this.tabListItems = Object.keys(JikanSearchGenre).map(key => {
            return {
                title: key,
                shouldShowCheck: this.__shouldShowCheck.bind(this, JikanSearchGenre[key]),
                value: JikanSearchGenre[key]
            }
        })

        this.state = {
            currIndex: 0,
            currPage: this.tabListItems[0].value,
            currGenreValue: 1,
            messageText: undefined,
            items: [],
            refreshing: false,
            loadingMore: false
        }
    }

    async fetchListItems() {
        const {
            currPage,
            currGenreValue,
            items,
            loadingMore
        } = this.state;

        this.setState({
            messageText: "Fetching anime ..."
        })

        let newStateItemValue = {};

        return await JikanService.fetchGenre(JikanTypes.Anime, currGenreValue, currPage).then(resp => {
            newStateItemValue = {
                messageText: undefined,
                items: currPage === 1 ? resp.anime : items.concat(resp.anime),
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
            currGenreValue,
            refreshing
        } = this.state;

        if ((prevState.currGenreValue !== currGenreValue) || (prevState.currPage !== currPage) || ((prevState.refreshing !== refreshing) && refreshing)) 
            this.fetchListItems()
    }

    __renderItem = ({item, index}: {item: GenreAnimeItem, index: number}) => (
        <Thumbnail
            mal_id={item.mal_id}
            title={item.title}
            url={item.url}
            picture_url={item.image_url}
            score={item.score}
            type={item.type}
        />
    )

    __keyExtractor = (item: GenreAnimeItem, index: number) => `${item.title}-${index}`;

    __getItemLayout = (data: GenreAnimeItem[] | null | undefined, index: number) => (
        {length: windowHeight * .3, offset: (windowHeight * .3) * index, index}
    )

    __onChange = (index: number) => {
        this.setState({
            currPage: 1,
            currIndex: index,
            currGenreValue: this.tabListItems[index].value,
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

    __shouldShowCheck = (genreValue: number): boolean => {
        return this.state.currGenreValue === genreValue
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
