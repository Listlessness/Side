import React, { createRef, PureComponent } from 'react';
import { Dimensions, StyleSheet, View, FlatList } from 'react-native';
import { Tab, TabView } from 'react-native-elements';
import { FlatListComp } from '../index';
import { TabbedListProps, TabbedListState } from './tabbedList.types';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export class TabbedList<T> extends PureComponent<TabbedListProps<T>, TabbedListState<T>> {

    renderList: (shouldShow: boolean) => JSX.Element;
    TAB_ITEMS: { tabItems: JSX.Element[]; tabViewItems: JSX.Element[]; };

    constructor(props: TabbedListProps<T>) {
        super(props)

        this.TAB_ITEMS = {
            tabItems: [],
            tabViewItems: []
        }

        this.renderList = this.__createList.bind(this)
    }

    __createList = (shouldShow: boolean) => {
        const {
            items,
            messageText,
            renderItem,
            keyExtractor,
            getItemLayout,
            onEndReached,
            onRefresh,
            refreshing,
            loadingMore
        } = this.props;

        return (<FlatListComp
            shouldShow={shouldShow}
            items={items}
            messageText={messageText}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            onEndReached={onEndReached}
            onRefresh={onRefresh}
            refreshing={refreshing}
            loadingMore={loadingMore}
        />)
    }

    __generateTabElements() {
        this.TAB_ITEMS = {
            tabItems: [],
            tabViewItems: []
        }

        this.props.tabsList.forEach((tabItem, index) => {
            this.TAB_ITEMS.tabItems.push(
                <Tab.Item key={index} containerStyle={styles.tabs} titleStyle={styles.tabTitle} title={tabItem.title} />
            );
            this.TAB_ITEMS.tabViewItems.push(
                <TabView.Item key={index} style={styles.content} >
                        {this.__createList(tabItem.shouldShowCheck())}
                </TabView.Item>
            );
        })
    }

    render() {

        const {
            currIndex,
            onChange,
        } = this.props;

        this.__generateTabElements()

        return (
            <View style={styles.page}>
                <Tab value={currIndex} onChange={onChange}>
                    {this.TAB_ITEMS.tabItems}
                </Tab>
                <TabView value={currIndex} onChange={onChange} >
                    {this.TAB_ITEMS.tabViewItems}
                </TabView>
            </View>
        );
    }
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
