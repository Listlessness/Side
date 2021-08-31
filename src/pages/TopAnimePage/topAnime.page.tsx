import React, { useState, useEffect, PureComponent } from 'react';
import { Dimensions, StyleSheet, View, FlatList } from 'react-native';
import { FAB, Icon, Tab, TabView } from 'react-native-elements';
import { JikanAnimeSubTypesObj, JikanTypesObj, ListItemsState, SubTypes, TopItem } from '../../utils';
import { Thumbnail, FlatListComp, TabListItem, TabbedList } from '../../components';
import { JikanService } from '../../services';
import { TopAnimeProps, TopAnimeState } from './topAnime.page.types';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');


type Props = TopAnimeProps<TopItem>;
type State = TopAnimeState<TopItem>;

export class TopAnimePage extends PureComponent<Props, State> {
    valueToType: { [x: number]: SubTypes; };
    tabListItems: TabListItem[];
    typeTopValue: { [x: string]: number; };

    constructor(props: Props) {
        super(props)

        this.typeTopValue = {
            [JikanAnimeSubTypesObj.Airing.toString()]: 0,
            [JikanAnimeSubTypesObj.Upcoming.toString()]: 1,
        }
    
        this.valueToType = {
            0: JikanAnimeSubTypesObj.Airing,
            1: JikanAnimeSubTypesObj.Upcoming,
        }
        
        const { topType } = this.props.route.params;

        this.state = {
            currIndex: this.typeTopValue[topType ? topType.toString() : JikanAnimeSubTypesObj.Airing.toString()],
            currPage: 1,
            messageText: undefined,
            items: [],
            refreshing: false,
            loadingMore: false
        }

        this.tabListItems = [
            {
                title: 'Airing',
                shouldShowCheck: this.__shouldShowCheck.bind(this, JikanAnimeSubTypesObj.Airing)
            },
            {
                title: 'Upcoming',
                shouldShowCheck: this.__shouldShowCheck.bind(this, JikanAnimeSubTypesObj.Upcoming)
            }
        ]
    }

    fetchListItems() {
        const {
            currPage,
            items
        } = this.state;

        const { topType } = this.props.route.params;

        this.setState({
            messageText: "Fetching anime ..."
        })

        JikanService.fetchTop(JikanTypesObj.Anime, currPage, topType).then(resp => {
            this.setState({
                messageText: undefined,
                items: currPage === 1 ? resp.top : items.concat(resp.top),
                refreshing: false,
                loadingMore: false
            })
        }).catch(reason => {
            this.setState({
                messageText: reason.toString(),
                refreshing: false,
                loadingMore: false
            })
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
            id={index}
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

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#000E14',
        width: windowWidth,
        overflow: 'hidden'
    },
    tabTitle: {
        color: '#fff'
    },
    tabs: {
        height: windowHeight * .08,
        paddingRight: 10,
        paddingLeft: 10
    },
    content: {
        paddingTop: 10,
        width: windowWidth,
        height: windowHeight * .8,
        paddingRight: 10,
        paddingLeft: 10
    },
    list: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    column: {
        paddingBottom: 15
    }
});
