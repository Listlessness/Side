import React, { createRef, PureComponent } from 'react';
import { Dimensions, StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { FAB, Icon } from 'react-native-elements';
import { MessageComp } from '../index';
import { FlatListProps, FlatListState } from "./flatList.types"

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export class FlatListComp<T> extends PureComponent<FlatListProps<T>, FlatListState<T>> {

    listRef: React.RefObject<FlatList<any>>;

    constructor(props: FlatListProps<T>) {
        super(props)

        this.listRef = createRef<FlatList>();

        this.state = {
            fabVisibility: false
        }
    }

    __onScroll = () => {
        this.setState({fabVisibility: true})
    }

    __scrollToTop = async () => {
        this.listRef.current?.scrollToIndex({index: 0})
        await new Promise(resolve => setTimeout(resolve, 2000)).then(() => this.setState({fabVisibility: false}))
    }
    
    render() {
        const {
            shouldShow,
            items,
            numColumns = 3,
            renderItem,
            onEndReached,
            keyExtractor,
            getItemLayout,
            onRefresh,
            refreshing,
            messageText,
            loadingMore
        } = this.props;

        return (
                shouldShow ? (
                <>
                    <FlatList
                        ref={this.listRef}
                        contentContainerStyle={styles.list}
                        columnWrapperStyle={styles.column}
                        numColumns={numColumns !== undefined ? numColumns : 3}
                        data={items}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        getItemLayout={getItemLayout}
                        onEndReached={onEndReached}
                        onScroll={this.__onScroll}
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                        bounces={false}
                        ListEmptyComponent={<View style={styles.content}>
                            <MessageComp message={messageText} />
                        </View>}
                        extraData={loadingMore}
                        ListFooterComponent={
                            <View style={styles.loading}>
                                <ActivityIndicator size={"large"} color="#F77F00" animating={loadingMore} />
                            </View>
                        }
                    />
                    <FAB
                        icon={
                            <Icon
                            name="arrow-upward"
                            size={20}
                            color="white"
                            />
                        }
                        onPress={this.__scrollToTop}
                        placement="right"
                        visible={this.state.fabVisibility}
                    />
                </>
            ) : <></>
        )
    }
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
    loading: {
        width: windowWidth,
        height: windowHeight * .1,
    }
});