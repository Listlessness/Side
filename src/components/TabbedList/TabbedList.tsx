import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Tabs, TabScreen} from 'react-native-paper-tabs';
import { sideStreamWrapper, SimpleScreenWrapper } from '../common';
import { FlatListComp } from '../FlatListComp';
import { TabbedListProps, TabbedListState } from './tabbedList.types';

class TabbedListComponent<T> extends PureComponent<TabbedListProps<T>, TabbedListState<T>> {

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

        const {
          currIndex, tabsList
        } = this.props;

        return (
            <SimpleScreenWrapper>
                <Tabs
                  uppercase={false}
                  defaultIndex={currIndex}
                  onChangeIndex={this.__onChange}
                  mode={tabsList.length > 4 ? "scrollable" : undefined}
                >
                    {this.TAB_ITEMS}
                </Tabs>
            </SimpleScreenWrapper>
        );
    }
}

export const TabbedList = sideStreamWrapper(TabbedListComponent)

const styles = StyleSheet.create({
    content: {
        width: '100%',
        paddingTop: 20,
        height: '100%',
    }
});
