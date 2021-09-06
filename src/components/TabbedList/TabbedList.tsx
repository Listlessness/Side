import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Tabs, TabScreen} from 'react-native-paper-tabs';
import { FlatListComp } from '../FlatListComp';
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
                    <View style={styles.content}>
                        {this.__createList(tabItem.shouldShowCheck())}
                    </View>
                </TabScreen>
            );
        })
    }

    __onChange = (index: number) => {
        const {
            currIndex,
            onChange,
        } = this.props;

        if (index !== currIndex) {
            onChange(index)
        }
    }

    render() {
        this.__generateTabElements()

        return (
            <View style={styles.page}>
                <Tabs
                    defaultIndex={this.props.currIndex}
                    onChangeIndex={this.__onChange}
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
        width: '100%',
    },
    content: {
        width: '100%',
        paddingTop: 20,
        height: '100%',
    }
});
