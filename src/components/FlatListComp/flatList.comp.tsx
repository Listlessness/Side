import React from 'react';
import { Dimensions, StyleSheet, View, FlatList } from 'react-native';
import { MessageComp } from '../index';
import { TopItem } from "../../utils"
import { FlatListProps } from "./flatList.types"

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export function FlatListComp<T>({
    listRef,
    shouldShow,
    items,
    numColumns = 3,
    renderItem,
    onEndReached,
    keyExtractor,
    getItemLayout,
    onScroll,
    onRefresh,
    refreshing,
    messageText
}: FlatListProps<T>) {
    
    return shouldShow ? (
        <FlatList
            ref={listRef}
            contentContainerStyle={styles.list}
            columnWrapperStyle={styles.column}
            numColumns={numColumns !== undefined ? numColumns : 3}
            data={items}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            onEndReached={onEndReached}
            onScroll={onScroll}
            onRefresh={onRefresh}
            refreshing={refreshing}
            ListEmptyComponent={<View style={styles.content}>
                <MessageComp message={messageText} />
            </View>}
        />
    ) : <></>
}

const styles = StyleSheet.create({
    list: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    column: {
        paddingBottom: 15
    },
    content: {
        paddingTop: 10,
        width: windowWidth,
        height: windowHeight * .8,
        paddingRight: 10,
        paddingLeft: 10
    },
});