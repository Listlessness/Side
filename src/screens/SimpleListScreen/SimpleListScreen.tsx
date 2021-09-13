import React, { PureComponent } from 'react';
import { createRef } from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatListComp, CustomModal, sideStreamWrapper, SimpleScreenWrapper } from '../../components';
import { SimpleListScreenProps, SimpleListScreenState } from './simpleListScreen.types';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

type Props<T> = SimpleListScreenProps<T>;
type State<T, R> = SimpleListScreenState<T, R>;

class SimpleListScreenComponent<T, R> extends PureComponent<Props<T>, State<T, R>> {
    modalRef: React.RefObject<CustomModal>;

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
            ScreenName: ''
        }

        this.modalRef = createRef()
    }

    async fetchListItems() {
        
        const {
            fetchItems,
            itemsExtracter,
            nameExtracter
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
                ScreenName: nameExtracter(resp)
            }
        }).catch(reason => {
            newStateItemValue = {
                messageText: reason.toString(),
                refreshing: false,
                fetching: false,
                loadingMore: false
            }
             this.props.snackContext.showMessage({
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
            refreshing,
            ScreenName
        } = this.state;

        if (
            (prevState.currPage !== currPage) || 
            ((prevState.refreshing !== refreshing) && refreshing)
        ) {
            this.fetchListItems()
        }

        if (prevState.ScreenName !== ScreenName) this.props.navigation.setOptions({
            headerTitle: ScreenName
        })
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
            renderItem,
            numColumns
        } = this.props.route.params

        return (
            <SimpleScreenWrapper>
                <SafeAreaView>
                    <FlatListComp
                        shouldShow
                        items={items}
                        numColumns={numColumns}
                        messageText={messageText}
                        renderItem={renderItem}
                        onEndReached={this.__onEndReached}
                        keyExtractor={this.__keyExtractor}
                        getItemLayout={this.__getItemLayout}
                        onRefresh={this.__onRefresh}
                        refreshing={refreshing}
                        loadingMore={loadingMore || fetching}
                    />
                </SafeAreaView>
            </SimpleScreenWrapper>
        );
    }
}

export const SimpleListScreen = sideStreamWrapper(SimpleListScreenComponent)
