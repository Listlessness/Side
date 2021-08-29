import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, FlatList } from 'react-native';
import { FAB, Icon, Tab, TabView, Text } from 'react-native-elements';
import { ListItemsState, RECENT_RELEASE_TYPE } from '../../utils';
import { IRecentRelease } from 'gogoanime-api';
import { EpisodeThumbnail, FlatListComp } from '../../components';
import { GogoAnimeService } from '../../services';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const __renderItem = ({item, index}: {item: IRecentRelease, index: number}) => (
    <EpisodeThumbnail
        key={index}
        id={item.title}
        title={item.title}
        url={item.link}
        picture_url={item.thumbnail}
        episode={item.episode}
    />
)

const __keyExtractor = (item: IRecentRelease, index: number) => `${item.title}-${index}`;

const __getItemLayout = (data: IRecentRelease[] | null | undefined, index: number) => (
    {length: windowHeight * .35, offset: (windowHeight * .35) * index, index}
)

export function LatestEpisodesPage() {

    const listRef = React.createRef<FlatList>();

    const [currIndex, setIndex] = useState(0);
    const [currPage, setPage] = useState(1);
    const [currPagination, setPagination] = useState<number[]>([]);
    
    const [itemState, setItemState] = useState<ListItemsState<IRecentRelease>>(
        {
            messageText: "Fetching anime ...",
            items: []
        }
    )

    const [fabVisibility, setFabVisibility] = useState(false);

    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        GogoAnimeService.fetchRecentlyAddedEpisodes(currPage, currIndex + 1).then(resp => {
            setItemState({
                messageText: undefined,
                items: currPage === 1 ? resp.data : resp.data.concat(resp.data)
            })
            setPagination(resp.paginations)
        })

        return () => {if (refreshing) setRefreshing(false)}

    }, [currIndex, currPage])

    const __onChange = (index: number) => {
        setItemState({
            messageText: "Fetching anime ...",
            items: []
        })
        setPage(1);
        setIndex(index)
    }

    const __onEndReached = (info: {distanceFromEnd: number}) => {
        if (currPagination.includes(currPage + 1)) setPage(currPage + 1);
    }

    const __scrollToTop = async () => {
        listRef.current?.scrollToIndex({index: 0})
        await new Promise(resolve => setTimeout(resolve, 2000)).then(() => setFabVisibility(false))
    }

    const __onScroll = () => {
        setFabVisibility(true)
    }

    const __onRefresh = async () => {
        setRefreshing(true);
        setPage(1)
    }

    const __createList = (releaseType: number) => {
        return <FlatListComp
            listRef={listRef}
            shouldShow={(currIndex + 1) === releaseType}
            items={itemState.items}
            messageText={itemState.messageText}
            renderItem={__renderItem}
            keyExtractor={__keyExtractor}
            getItemLayout={__getItemLayout}
            onEndReached={__onEndReached}
            onScroll={__onScroll}
            onRefresh={__onRefresh}
            refreshing={refreshing}
        />
    }

    return (
        <View style={styles.page}>
            <Tab value={currIndex} onChange={__onChange}>
                <Tab.Item containerStyle={styles.tabs} titleStyle={styles.tabTitle} title="Sub" />
                <Tab.Item containerStyle={styles.tabs} titleStyle={styles.tabTitle} title="Dub" />
                <Tab.Item containerStyle={styles.tabs} titleStyle={styles.tabTitle} title="Chinese" />
            </Tab>
            <TabView value={currIndex} onChange={__onChange} >
                <TabView.Item style={styles.content} >
                    {__createList(RECENT_RELEASE_TYPE.SUB)}
                </TabView.Item>
                <TabView.Item style={styles.content} collapsable={true}>
                    {__createList(RECENT_RELEASE_TYPE.DUB)}
                </TabView.Item>
                <TabView.Item style={styles.content} collapsable={true}>
                    {__createList(RECENT_RELEASE_TYPE.CHINESE)}
                </TabView.Item>
            </TabView>
            
            <FAB
             icon={
                <Icon
                  name="arrow-upward"
                  size={20}
                  color="white"
                />
             }
                onPress={__scrollToTop}
                placement="right"
                visible={fabVisibility}
            />
            
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#000E14',
        width: windowWidth,
        overflow: 'hidden',
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
    }
});
