import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, FlatList } from 'react-native';
import { FAB, Icon, Tab, TabView, Text } from 'react-native-elements';
import { RECENT_RELEASE_TYPE } from '../../utils';
import { IRecentRelease } from 'gogoanime-api';
import { MessageComp } from '../../components/MessageComp';
import GogoAnimeAPI from '../../services/GogoanimeAPI';
import EpisodeThumbnail from '../../components/Thumbnail/episodeThumbnail.comp';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const __renderList = (ref: any, shouldShow: boolean, items: IRecentRelease[], onEndReached: (info: {distanceFromEnd: number}) => void, onScroll: () => void) => {
    return shouldShow && (
        <FlatList
            ref={ref}
            contentContainerStyle={styles.list}
            numColumns={3}
            data={items}
            renderItem={({item, index}) => (
                <EpisodeThumbnail
                    key={index}
                    id={item.title}
                    title={item.title}
                    url={item.link}
                    picture_url={item.thumbnail}
                    episode={item.episode}
                />
            )}
            keyExtractor={(item, index) => `${item.title}-${index}`}
            getItemLayout={(data, index) => (
                {length: windowHeight * .35, offset: (windowHeight * .35) * index, index}
              )}
            onEndReached={onEndReached}
            onScroll={onScroll}
            ListEmptyComponent={<View style={styles.content}><MessageComp message="No Anime Found." /></View>}
        />
    )
}

export function LatestEpisodesPage() {

    const listRef = React.createRef<FlatList>();
    const [currIndex, setIndex] = React.useState(0);
    const [currPage, setPage] = React.useState(1);
    const [currPagination, setPagination] = React.useState<number[]>([]);
    const [items, setItems] = React.useState<IRecentRelease[]>([]);
    const [fabVisibility, setFabVisibility] = React.useState(false);

    useEffect(() => {
        GogoAnimeAPI.fetchRecentlyAddedEpisodes(currPage, currIndex + 1).then(resp => {
            setItems(currPage === 1 ? resp.data : items.concat(resp.data))
            setPagination(resp.paginations)
        })
    }, [currIndex, currPage])

    const __onChange = (index: number) => {
        setItems([]);
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


    return (
        <View style={styles.page}>
            <Tab value={currIndex} onChange={__onChange}>
                <Tab.Item containerStyle={styles.tabs} titleStyle={styles.tabTitle} title="Sub" />
                <Tab.Item containerStyle={styles.tabs} titleStyle={styles.tabTitle} title="Dub" />
                <Tab.Item containerStyle={styles.tabs} titleStyle={styles.tabTitle} title="Chinese" />
            </Tab>
            <TabView value={currIndex} onChange={__onChange} >
                <TabView.Item style={styles.content} >
                    {__renderList(listRef, (currIndex + 1) === RECENT_RELEASE_TYPE.SUB, items, __onEndReached, __onScroll)}
                </TabView.Item>
                <TabView.Item style={styles.content} collapsable={true}>
                    {__renderList(listRef, (currIndex + 1) === RECENT_RELEASE_TYPE.DUB, items, __onEndReached, __onScroll)}
                </TabView.Item>
                <TabView.Item style={styles.content} collapsable={true}>
                    {__renderList(listRef, (currIndex + 1) === RECENT_RELEASE_TYPE.CHINESE, items, __onEndReached, __onScroll)}
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
