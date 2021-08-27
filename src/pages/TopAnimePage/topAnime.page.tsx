import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { FAB, Icon, Tab, TabView } from 'react-native-elements';
import { JikanAnimeSubTypesObj, JikanTypesObj, SubTypes, TopItem } from '../../utils';
import { MessageComp } from '../../components/MessageComp';
import Thumbnail from './../../components/Thumbnail/thumbnail.comp';
import JikanAPI from '../../services/JikanAPI';
import { TopAnimeProps } from './topAnime.page.types';

const __renderList = (
    ref: any,
    shouldShow: boolean,
    items: TopItem[],
    onEndReached: (info: {distanceFromEnd: number}) => void,
    onScroll: () => void,
    __onRefresh: () => void,
    refreshing: boolean
) => {
    return shouldShow && (
        <FlatList
            ref={ref}
            contentContainerStyle={styles.list}
            columnWrapperStyle={styles.column}
            numColumns={3}
            data={items}
            renderItem={({item, index}) => (
                <Thumbnail
                    id={index}
                    title={item.title}
                    url={item.url}
                    picture_url={item.image_url}
                    score={item.score}
                    type={item.type}
                />
            )}
            keyExtractor={(item, index) => `${item.title}-${index}`}
            onEndReached={onEndReached}
            onScroll={onScroll}
            onRefresh={__onRefresh}
            refreshing={refreshing}
            ListEmptyComponent={<View style={styles.content}><MessageComp message="No Anime Found." /></View>}
        />
    )
}

export function TopAnimePage({ route, navigation }: TopAnimeProps) {

    const typeTopValue = {
        [JikanAnimeSubTypesObj.Airing.toString()]: 0,
        [JikanAnimeSubTypesObj.Upcoming.toString()]: 1,
    }

    const valueToType : {[index: number]: SubTypes} = {
        0: JikanAnimeSubTypesObj.Airing,
        1: JikanAnimeSubTypesObj.Upcoming,
    }

    const { topType } = route.params;

    const listRef = React.createRef<FlatList>();

    const [currValue, setValue] = useState(typeTopValue[topType ? topType.toString() : JikanAnimeSubTypesObj.Airing.toString()]);
    const [currPage, setPage] = React.useState(1);
    const [items, setItems] = useState<TopItem[]>([]);

    const [fabVisibility, setFabVisibility] = React.useState(false);

    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        JikanAPI.fetchTop(JikanTypesObj.Anime, currPage, topType).then(resp => {
            setItems(currPage === 1 ? resp.top : items.concat(resp.top))
        })
    }, [topType, currPage])

    let __onChange = (index: number) => {
        navigation.setParams({
            topType: valueToType[index],
        });
        setItems([]);
        setPage(1);
        setValue(index);
    }

    const __onEndReached = (info: {distanceFromEnd: number}) => {
        setPage(currPage + 1);
    }

    const __scrollToTop = () => {
        listRef.current?.scrollToIndex({index: 0});
        new Promise(resolve => setTimeout(resolve, 2000)).then(() => setFabVisibility(false))
        
    }

    const __onScroll = () => {
        setFabVisibility(true)
    }

    const __onRefresh = async () => {
        setRefreshing(true);
        await JikanAPI.fetchTop(JikanTypesObj.Anime, currPage, topType).then(resp => {
            setItems(currPage === 1 ? resp.top : items.concat(resp.top))
        }).then(() => setRefreshing(false))
    }

    return (
        <View style={styles.page}>
            <Tab value={currValue} onChange={__onChange}>
                <Tab.Item containerStyle={styles.tabs} titleStyle={styles.tabTitle} title="Airing" />
                <Tab.Item containerStyle={styles.tabs} titleStyle={styles.tabTitle} title="Upcoming" />
            </Tab>
            <TabView value={currValue} onChange={__onChange} >
                <TabView.Item style={styles.content} >
                    {__renderList(
                            listRef,
                            valueToType[currValue] === JikanAnimeSubTypesObj.Airing,
                            items,
                            __onEndReached,
                            __onScroll,
                            __onRefresh,
                            refreshing
                        )}
                </TabView.Item>
                <TabView.Item style={styles.content}>
                {__renderList(
                            listRef,
                            valueToType[currValue] === JikanAnimeSubTypesObj.Upcoming,
                            items,
                            __onEndReached,
                            __onScroll,
                            __onRefresh,
                            refreshing
                        )}
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
        height: '100vh',
        maxWidth: '100vw',
        overflow: 'hidden'
    },
    tabTitle: {
        color: '#fff'
    },
    tabs: {
        height: '8vh',
        paddingRight: 10,
        paddingLeft: 10
    },
    content: {
        paddingTop: '2vh',
        width: '100vw',
        height: '80vh',
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
