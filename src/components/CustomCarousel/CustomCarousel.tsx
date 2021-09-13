import React, { createRef, PureComponent } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { CustomCarouselBaseProps, CustomCarouselProps, CustomCarouselState } from './customCarousel.types';
import { MessageComp , SeeMoreButton, sideStreamWrapper} from '../common';
import { FlatList } from 'react-native';
import { Subheading } from 'react-native-paper';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

type Props<T> = CustomCarouselProps<T>;
type State<T> = CustomCarouselState<T>;

class CustomCarouselComponent<T> extends PureComponent<Props<T>, State<T>> {
    carouselRef: React.MutableRefObject<null>;

    constructor(props: Props<T>) {
        super(props)

        this.carouselRef = createRef();

        this.state = {
            messageText: undefined,
            items: []
        }
    }
    
    async __fetchItems() {
        let newStateItemValue = {};

        if (this.props.refreshing) {
            this.setState({messageText: "Refreshing ...", items: []})
        } else {
            this.setState({messageText: "Fetching items ..."})
        }
        

        return await this.props.fetchItems().then( resp => {
            newStateItemValue = {
                messageText: undefined,
                items: resp
            };
        }).catch(reason => {
            newStateItemValue = {
                messageText: reason.toString(),
                items: []
            }
             this.props.snackContext?.showMessage({
                message: `Failed to retrieve "${this.props.title}" result.`
            });
        }).finally(() => {
            this.setState(newStateItemValue)
        })
    }

    componentDidMount() {
        this.__fetchItems()
    }

    componentDidUpdate(prevProps: CustomCarouselProps<T>) {
        const { refreshing, onRefreshComplete } = this.props;
        
        if ((prevProps.refreshing !== refreshing) && refreshing) {
            this.__fetchItems().then(onRefreshComplete)
        }
    }

    __keyExtractor = (item: T, index: number) => `${this.props.keyPrefix}-${index}`;
    
    __getItemLayout = (data: T[] | null | undefined, index: number) => (
        {length: windowHeight * .35, offset: (windowHeight * .35) * index, index}
    )

    render() {

        const {
            title,
            renderItem,
            onPress,
            horizontal=true,
            checkOnFocus=true
        } = this.props;

        const {
            messageText,
            items
        } = this.state;

        return (
            <View style={styles.container}>
                {checkOnFocus && this.props.OnScreenFocusComp && <this.props.OnScreenFocusComp callback={this.__fetchItems.bind(this)} />}
                <View style={styles.header}>
                    <Subheading style={styles.carouselTitle}>{title}</Subheading>
                    {onPress && <SeeMoreButton onPress={onPress} />}
                </View>
                <FlatList
                    horizontal={horizontal}
                    numColumns={!horizontal ? 3 : undefined}
                    nestedScrollEnabled={!horizontal}
                    indicatorStyle='white'
                    contentContainerStyle={styles.list}
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={this.__keyExtractor}
                    getItemLayout={this.__getItemLayout}
                    bounces={false}
                    ListEmptyComponent={<View style={styles.content}>
                        <MessageComp message={messageText} />
                    </View>}
                />
            </View>
        )
    }
}

export const CustomCarousel = sideStreamWrapper<CustomCarouselBaseProps<any>>(CustomCarouselComponent)


const styles = StyleSheet.create({
    container: {
        maxHeight: windowHeight * .4,
        width: windowWidth * .9,
        paddingBottom: 20,
        paddingTop: 10
    },
    carouselTitle: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'left',
        width: '50%',
        paddingBottom: 5,
    },
    header: {
        flexDirection: 'row',
        borderBottomColor: '#E75414',
        borderBottomWidth: 3,
        marginBottom: 15,
    },
    list: { 
    },
    content: {
        height: windowHeight * .15,
        width: windowWidth * .9
    }
});