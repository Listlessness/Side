import React, { PureComponent } from 'react';
import { createRef } from 'react';
import { Dimensions, NativeSyntheticEvent, ScrollView, StyleSheet, TextInputEndEditingEventData, View } from 'react-native';
import { ActivityIndicator, Button, Headline, IconButton, Searchbar, Text } from 'react-native-paper';
import { Thumbnail, FlatListComp, CustomModal, CustomPicker, SimplePageWrapper } from '../../components';
import { JikanService } from '../../services';
import { JikanSearchAnimeSubType, JikanSearchGenre, JikanSearchOrderBy, JikanSearchRated, JikanSearchSort, JikanSearchType, SearchResultItem, SeasonAnime, SeasonResult, SnackContext } from '../../utils';
import { SimpleListPageProps, SimpleListPageState } from './simpleListPage.types';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

type Props<T> = SimpleListPageProps<T>;
type State<T, R> = SimpleListPageState<T, R>;

export class SimpleListPage<T, R> extends PureComponent<Props<T>, State<T, R>> {
    modalRef: React.RefObject<CustomModal>;
    static contextType = SnackContext;
    declare context: React.ContextType<typeof SnackContext>;

    constructor(props: Props<T>) {
        super(props)
    
        this.state = {
            currPage: 1,
            messageText: undefined,
            items: [],
            refreshing: false,
            loadingMore: false,
            lastPage: undefined,
            fetching: false,
        }

        this.modalRef = createRef()
    }

    async fetchListItems() {
        
        const {
            fetchItems,
            itemsExtracter
        } = this.props.route.params;

        const {
            loadingMore
        } = this.state;

        let newStateItemValue = {};

        this.setState({
            messageText: "Fetching items ...",
            fetching: true
        })

        fetchItems().then(resp => {
            newStateItemValue = {
                messageText: undefined,
                items: itemsExtracter(resp),
                refreshing: false,
                loadingMore: false,
                fetching: false,
            }
        }).catch(reason => {
            newStateItemValue = {
                messageText: reason.toString(),
                refreshing: false,
                fetching: false,
                loadingMore: false
            }
            this.context.showMessage({
                message: `Failed to retrieve ${loadingMore ? 'more' : ''} results.`,
                type: "info",
            });
        }).finally(() => {
            this.setState(newStateItemValue)
        })   
    }

    componentDidMount() {
        this.fetchListItems()
    }

    componentDidUpdate(prevProps: Props<T>, prevState: State<T, R>) {
        const {
            currPage,
            refreshing
        } = this.state;

        if (
            (prevState.currPage !== currPage) || 
            ((prevState.refreshing !== refreshing) && refreshing)
        ) {
            this.fetchListItems()
        }
    }

    __onEndReached = (info: {distanceFromEnd: number}) => {
        if (info.distanceFromEnd < 0) return;
        
        const {
            lastPage,
            currPage
        } = this.state;

        if ((lastPage !== undefined) && ((currPage + 1) <= lastPage) ) {
            this.setState({currPage: (currPage + 1), loadingMore: true});
        }
    }

    __onRefresh = () => {
        this.setState({
            currPage: 1,
            refreshing: true
        })
    }
    
    __keyExtractor = (item: R, index: number) => `SLP-${index}`;
    
    __getItemLayout = (data: R[] | null | undefined, index: number) => (
        {length: windowHeight * .35, offset: (windowHeight * .35) * index, index}
    )

    render() {
        const {
            messageText,
            items,
            refreshing,
            loadingMore,
            fetching
        } = this.state;

        const {
            renderItem
        } = this.props.route.params

        return (
            <SimplePageWrapper>
                <FlatListComp
                    shouldShow
                    items={items}
                    messageText={messageText}
                    renderItem={renderItem}
                    onEndReached={this.__onEndReached}
                    keyExtractor={this.__keyExtractor}
                    getItemLayout={this.__getItemLayout}
                    onRefresh={this.__onRefresh}
                    refreshing={refreshing}
                    loadingMore={loadingMore}
                />
            </SimplePageWrapper>
        );
    }
}

const styles = StyleSheet.create({
    tools: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    inputContainer: {
        backgroundColor: '#00151F',
        width: windowWidth * 0.7,
    },
    inputText: {
        color: '#F5F1DB',
        minHeight: windowHeight * .04
    },
    modal: {
        width: windowWidth * .6,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalTitle: {
        color: '#E75414'
    }
});
