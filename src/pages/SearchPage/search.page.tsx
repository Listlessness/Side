import React, { PureComponent } from 'react';
import { createRef } from 'react';
import { Dimensions, NativeSyntheticEvent, ScrollView, StyleSheet, TextInputEndEditingEventData, View } from 'react-native';
import { Button, Icon, SearchBar, Text } from 'react-native-elements';
import { Thumbnail, FlatListComp, CustomOverlay, CustomPicker } from '../../components';
import { JikanService } from '../../services';
import { JikanSearchAnimeSubType, JikanSearchGenre, JikanSearchOrderBy, JikanSearchRated, JikanSearchSort, JikanSearchType, SearchResultItem } from '../../utils';
import { SearchPageProps, SearchPageState } from './search.page.types';
import { showMessage } from "react-native-flash-message";

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

type Props = SearchPageProps<SearchResultItem>;
type State = SearchPageState<SearchResultItem>;

export class SearchPage extends PureComponent<Props, State> {
    overlayRef: React.RefObject<CustomOverlay>;

    constructor(props: Props) {
        super(props)
    
        this.state = {
            queryText: '',
            tempText: '',
            filters: {
                sort: JikanSearchSort.DESCENDING
            },
            currPage: 1,
            messageText: undefined,
            items: [],
            refreshing: false,
            loadingMore: false,
            lastPage: undefined,
            fetching: false,
            justFiltered: false
        }

        this.overlayRef = createRef()
    }

    fetchListItems() {
        const {
            queryText,
            filters,
            currPage,
            items,
            loadingMore
        } = this.state;

        if (queryText.length > 2) {
            this.setState({
                fetching: true,
                messageText: "Fetching anime ..."
            })
    
            JikanService.DoSearch(queryText, JikanSearchType.ANIME, currPage, filters).then(resp => {
                this.setState({
                    messageText: undefined,
                    items: currPage === 1 ? resp.results : items.concat(resp.results),
                    refreshing: false,
                    loadingMore: false,
                    fetching: false,
                    lastPage: resp.last_page,
                    justFiltered: false
                })
            }).catch(reason => {
                this.setState({
                    messageText: reason.toString(),
                    refreshing: false,
                    fetching: false,
                    justFiltered: false,
                    loadingMore: false
                })
                showMessage({
                    message: `Failed to retrieve ${loadingMore ? 'more' : ''} results.`,
                    type: "info",
                });
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
            justFiltered,
            currPage,
            refreshing
        } = this.state;

        if (
            (prevState.queryText !== queryText) || (prevState.currPage !== currPage) || 
            ((prevState.refreshing !== refreshing) && refreshing) || 
            ((prevState.justFiltered !== justFiltered) && justFiltered)
        ) {
            this.fetchListItems()
        }
    }

    __updateSearch = (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
        this.setState({ queryText: e.nativeEvent.text, currPage: 1 });
    };

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

    getFilters = () => {
        const filters = Object.assign({}, this.state.filters);

        this.overlayRef.current?.setContent(
            <ScrollView
                contentContainerStyle={styles.overlay}
                horizontal={false}
            >
                <Text h3 style={styles.overlayTitle} >Select Filters</Text>
                 <CustomPicker
                    title='Anime Type: '
                    selectedValue={filters.type}
                    setSelectedValue={(val) => {val === '' ? delete filters.type : filters.type = val}}
                    listObject={JikanSearchAnimeSubType}
                />
                <CustomPicker
                    title='Genre: '
                    selectedValue={filters.genre}
                    setSelectedValue={(val) => {val === '' ? delete filters.genre : filters.genre = val}}
                    listObject={JikanSearchGenre}
                />
                <CustomPicker
                    title='Rated: '
                    selectedValue={filters.rated}
                    setSelectedValue={(val) => {val === '' ? delete filters.rated : filters.rated = val}}
                    listObject={JikanSearchRated}
                />
                <CustomPicker
                    title='Order By: '
                    selectedValue={filters.order_by}
                    setSelectedValue={(val) => {val === '' ? delete filters.order_by : filters.order_by = val}}
                    listObject={JikanSearchOrderBy}
                />
                <CustomPicker
                    title='Sort By: '
                    selectedValue={filters.sort}
                    setSelectedValue={(val) => {filters.sort = val}}
                    listObject={JikanSearchSort}
                    addEmptyValue={false}
                />
                <Button
                    type='solid'
                    onPress={() => {this.setState({filters, justFiltered: true, currPage: 1}); this.overlayRef.current?.closeOverlay()}}
                    title="Done"
                    containerStyle={{paddingTop: 10}}
                    buttonStyle={{backgroundColor: '#E75414', padding: 10}}
                />
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
            tempText,
            fetching
        } = this.state;

        return (
            <View style={styles.page}>
                <CustomOverlay ref={this.overlayRef} />
                <View style={styles.tools}>
                    <SearchBar
                        autoFocus
                        placeholder="Type here ..."
                        onEndEditing={this.__updateSearch}
                        onChangeText={(text) => this.setState({tempText: text})}
                        value={tempText}
                        showLoading={fetching}
                        containerStyle={styles.searchbar}
                        inputContainerStyle={styles.inputContainer}
                        inputStyle={styles.inputText}
                        searchIcon={{
                            name: 'search',
                            color: '#F77F00'
                        }}
                        loadingProps={{
                          animating: fetching,
                          color: '#F77F00',
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
                        onPress={this.getFilters}
                        disabled={fetching || refreshing}
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
        borderBottomWidth: 0,
        width: windowWidth * 0.7,
    },
    inputContainer: {
        backgroundColor: '#00151F',
    },
    inputText: {
        color: '#F5F1DB',
        borderBottomColor: '#F77F00',
        borderBottomWidth: 1,
        minHeight: windowHeight * .04
    },
    overlay: {
        width: windowWidth * .6,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlayTitle: {
        color: '#E75414'
    }
});
