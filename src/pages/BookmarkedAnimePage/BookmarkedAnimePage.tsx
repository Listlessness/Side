import React, { PureComponent } from 'react';
import { createRef } from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatListComp, CustomModal, sideStreamWrapper, SimplePageWrapper, ThumbnailProps, Thumbnail } from '../../components';
import { ContextTypeNames } from '../../utils';
import { BookmarkedAnimePageProps, BookmarkedAnimePageState } from './bookmarkedPage.types';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

type Props = BookmarkedAnimePageProps<ThumbnailProps>;
type State = BookmarkedAnimePageState<ThumbnailProps>;

class BookmarkedAnimePageComponent extends PureComponent<Props, State> {
    modalRef: React.RefObject<CustomModal>;

    constructor(props: Props) {
        super(props)
    
        this.state = {
            messageText: undefined,
            items: [],
            refreshing: false,
            fetching: false
        }

        this.modalRef = createRef()
    }

    async fetchListItems() {

        let newStateItemValue = {};

        this.setState({
            messageText: "Fetching items ...",
            fetching: true
        })

        return Promise.resolve(this.props.ssBookmarkedAnimeContext?.bookmarkedAnime || {}).then(bookmarks => {
            newStateItemValue = {
                messageText: undefined,
                items: Object.values(bookmarks),
                refreshing: false,
                fetching: false,
            }
        }).catch(reason => {
            newStateItemValue = {
                messageText: reason.toString(),
                refreshing: false,
                fetching: false,
            }
             this.props.snackContext.showMessage({
                message: 'Failed to retrieve your bookmarked anime.',
                type: "info",
            });
        }).finally(() => {
            this.setState(newStateItemValue)
        }) 
    }

    componentDidMount() {
        this.fetchListItems()
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        const {
            refreshing,
        } = this.state;

        if (
            ((prevState.refreshing !== refreshing) && refreshing)
        ) {
            this.fetchListItems()
        }
    }

    __onRefresh = () => {
        this.setState({
            refreshing: true
        })
    }
    
    __keyExtractor = (item: ThumbnailProps, index: number) => `BA-${index}`;
    
    __getItemLayout = (data: ThumbnailProps[] | null | undefined, index: number) => (
        {length: windowHeight * .35, offset: (windowHeight * .35) * index, index}
    )

    __renderItem = ({item, index}: { item: ThumbnailProps; index: number; }) => {
        return (
            <Thumbnail
                {...item}
            />
        );
    }

    render() {
        const {
            messageText,
            items,
            refreshing,
            fetching
        } = this.state;

        return (
            <SimplePageWrapper>
                <SafeAreaView>
                    <this.props.OnScreenFocusComp callback={this.fetchListItems.bind(this)} />
                    <FlatListComp
                        shouldShow
                        items={items}
                        messageText={messageText}
                        renderItem={this.__renderItem}
                        keyExtractor={this.__keyExtractor}
                        getItemLayout={this.__getItemLayout}
                        onRefresh={this.__onRefresh}
                        refreshing={refreshing}
                        loadingMore={fetching}
                    />
                </SafeAreaView>
            </SimplePageWrapper>
        );
    }
}

export const BookmarkedAnimePage = sideStreamWrapper(BookmarkedAnimePageComponent, [ContextTypeNames.SSBookmarkedAnimeContext])
