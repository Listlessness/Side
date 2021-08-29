import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, FlatList } from 'react-native';
import { FAB, Icon, Tab, TabView } from 'react-native-elements';
import { JikanAnimeSubTypesObj, JikanTypesObj, ListItemsState, SubTypes, TopItem } from '../../utils';
import { Thumbnail, FlatListComp } from '../../components';
import { JikanService } from '../../services';
import { TopAnimeProps } from './topAnime.page.types';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const __renderItem = ({item, index}: {item: TopItem, index: number}) => (
    <Thumbnail
        id={index}
        title={item.title}
        url={item.url}
        picture_url={item.image_url}
        score={item.score}
        type={item.type}
    />
)

const __keyExtractor = (item: TopItem, index: number) => `${item.title}-${index}`;

const __getItemLayout = (data: TopItem[] | null | undefined, index: number) => (
    {length: windowHeight * .3, offset: (windowHeight * .3) * index, index}
)

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

    const [itemState, setItemState] = useState<ListItemsState<TopItem>>(
        {
            messageText: "Fetching anime ...",
            items: []
        }
    )

    const [fabVisibility, setFabVisibility] = React.useState(false);

    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        JikanService.fetchTop(JikanTypesObj.Anime, currPage, topType).then(resp => {
            setItemState({
                messageText: undefined,
                items: currPage === 1 ? resp.top : itemState.items.concat(resp.top)
            })
        }).catch(reason => {
            setItemState({
                messageText: reason,
                items: []
            })
        })

        return () => {if (refreshing) setRefreshing(false)}

    }, [topType, currPage])

    let __onChange = (index: number) => {
        navigation.setParams({
            topType: valueToType[index],
        });
        setItemState({
            messageText: "Fetching anime ...",
            items: []
        })
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
        setPage(1)
    }

    const __createList = (value: SubTypes) => {
        return <FlatListComp
            listRef={listRef}
            shouldShow={valueToType[currValue] === value}
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
            <Tab value={currValue} onChange={__onChange}>
                <Tab.Item containerStyle={styles.tabs} titleStyle={styles.tabTitle} title="Airing" />
                <Tab.Item containerStyle={styles.tabs} titleStyle={styles.tabTitle} title="Upcoming" />
            </Tab>
            <TabView value={currValue} onChange={__onChange} >
                <TabView.Item style={styles.content} >
                    {__createList(JikanAnimeSubTypesObj.Airing)}
                </TabView.Item>
                <TabView.Item style={styles.content}>
                    {__createList(JikanAnimeSubTypesObj.Upcoming)}
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
