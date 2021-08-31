import React, { PureComponent } from 'react';
import { createRef } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Icon, SearchBar } from 'react-native-elements';
import { Thumbnail, FlatListComp, CustomOverlay } from '../../components';
import { JikanService } from '../../services';
import { JikanSearchTypeObj, SearchResultItem } from '../../utils';
import { SearchPageProps, SearchPageState } from './search.page.types';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

type Props = SearchPageProps<SearchResultItem>;
type State = SearchPageState<SearchResultItem>;

export class SearchPage extends PureComponent<Props, State> {
    overlayRef: React.RefObject<CustomOverlay>;

    constructor(props: Props) {
        super(props)
    
        this.state = {
            queryText: '',
            filters: undefined,
            currPage: 1,
            messageText: undefined,
            items: [],
            refreshing: false,
            loadingMore: false,
            lastPage: undefined,
            fetching: false
        }

        this.overlayRef = createRef()
    }

    fetchListItems() {
        const {
            queryText,
            filters,
            currPage,
            items
        } = this.state;

        if (queryText.length > 2) {
            this.setState({
                fetching: true,
                messageText: "Fetching anime ..."
            })
    
            JikanService.DoSearch(queryText, JikanSearchTypeObj.ANIME, currPage, filters).then(resp => {
                this.setState({
                    messageText: undefined,
                    items: currPage === 1 ? resp.results : items.concat(resp.results),
                    refreshing: false,
                    loadingMore: false,
                    fetching: false,
                    lastPage: resp.last_page
                })
            }).catch(reason => {
                this.setState({
                    messageText: reason.toString(),
                    refreshing: false,
                    fetching: false,
                    items: [],
                    loadingMore: false
                })
            })
        } else {
            this.setState({
                messageText: undefined,
                items: []
            })
        }     
    }

    componentDidMount() {
        this.fetchListItems()
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        const {
            queryText,
            filters,
            currPage,
            refreshing
        } = this.state;

        if ((prevState.queryText !== queryText) || (prevState.currPage !== currPage) || ((prevState.refreshing !== refreshing) && refreshing)) 
            this.fetchListItems()
    }

    __updateSearch = (text: string) => {
        this.setState({ queryText: text });
    };

    __onEndReached = (info: {distanceFromEnd: number}) => {
        if (info.distanceFromEnd < 0) return;
        
        const {
            lastPage,
            currPage
        } = this.state;

        if ((lastPage !== undefined) && ((currPage + 1) <= lastPage) ) this.setState({currPage: (currPage + 1), loadingMore: true});
    }

    __onRefresh = () => {
        this.setState({
            currPage: 1,
            refreshing: true
        })
    }

    __renderItem = ({item, index}: {item: SearchResultItem, index: number}) => (
        <Thumbnail
            key={index}
            id={item.title}
            title={item.title}
            url={item.url}
            picture_url={item.image_url}
            score={item.score}
            type={item.type}
        />
    )
    
    __keyExtractor = (item: SearchResultItem, index: number) => `${item.title}-${index}`;
    
    __getItemLayout = (data: SearchResultItem[] | null | undefined, index: number) => (
        {length: windowHeight * .35, offset: (windowHeight * .35) * index, index}
    )

    getFilters() {
        this.overlayRef.current?.setContent(
            <ScrollView
                horizontal
            >

            </ScrollView>
        ).showOverlay()
    }

    render() {
        const {
            messageText,
            items,
            refreshing,
            loadingMore,
            queryText,
            fetching
        } = this.state;

        return (
            <View style={styles.page}>
                <CustomOverlay ref={this.overlayRef} />
                <View style={styles.tools}>
                    <SearchBar
                        placeholder="Type here ..."
                        onChangeText={this.__updateSearch}
                        value={queryText}
                        showLoading={fetching}
                        containerStyle={styles.searchbar}
                        inputContainerStyle={styles.inputContainer}
                        inputStyle={styles.inputText}
                        searchIcon={{
                            name: 'search',
                            color: '#F77F00'
                        }}
                    />
                    <Button
                        icon={
                            <Icon
                                name="filter-list-alt"
                                size={25}
                                color="#F77F00"
                            />
                        }
                        type='outline'
                    />
                </View>
                <FlatListComp
                    shouldShow
                    items={items}
                    messageText={messageText}
                    renderItem={this.__renderItem}
                    onEndReached={this.__onEndReached}
                    keyExtractor={this.__keyExtractor}
                    getItemLayout={this.__getItemLayout}
                    onRefresh={this.__onRefresh}
                    refreshing={refreshing}
                    loadingMore={loadingMore}
                />
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
    tools: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    searchbar: {
        backgroundColor: '#000E14',
        borderTopWidth: 0,
        borderBottomWidth: 0
    },
    inputContainer: {
        backgroundColor: '#00151F',
    },
    inputText: {
        color: '#F5F1DB',
        borderBottomColor: '#F77F00',
        borderBottomWidth: 1,
        minHeight: windowHeight * .04
    }
});
