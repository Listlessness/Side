import React, { createRef, PureComponent } from 'react';
import { Dimensions, StyleSheet, View, FlatList } from 'react-native';
import {
    Tabs,
    TabScreen,
    useTabIndex,
    useTabNavigation,
  } from 'react-native-paper-tabs';
import { FlatListComp } from '../index';
import { TabbedListProps, TabbedListState } from './tabbedList.types';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export class TabbedList<T> extends PureComponent<TabbedListProps<T>, TabbedListState<T>> {

    renderList: (shouldShow: boolean) => JSX.Element;
    TAB_ITEMS: JSX.Element[];

    constructor(props: TabbedListProps<T>) {
        super(props)

        this.TAB_ITEMS = []

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
        this.TAB_ITEMS = [];

        this.props.tabsList.forEach((tabItem, index) => {
            this.TAB_ITEMS.push(
                <TabScreen key={index} label={tabItem.title}>
                    {this.__createList(tabItem.shouldShowCheck())}
                </TabScreen>
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
                <Tabs
                    // defaultIndex={0} // default = 0
                    // uppercase={false} // true/false | default=true | labels are uppercase
                    // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
                    // iconPosition // leading, top | default=leading
                    // style={{ backgroundColor:'#fff' }} // works the same as AppBar in react-native-paper
                    // dark={false} // works the same as AppBar in react-native-paper
                    // theme={} // works the same as AppBar in react-native-paper
                    // mode="scrollable" // fixed, scrollable | default=fixed
                    // onChangeIndex={(newIndex) => {}} // react on index change
                    // showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
                >
                    {this.TAB_ITEMS}
                </Tabs>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#000E14',
        width: windowWidth,
    },
    tabTitle: {
        color: '#fff'
    },
    tabs: {
        height: windowHeight * .08,
    },
    content: {
        width: windowWidth,
        paddingTop: 20,
        height: windowHeight * .8,
    }
});
