import React, { createRef, PureComponent } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { CustomCarouselProps, CustomCarouselState } from './customCarousel.types';
import { MessageComp , SeeMoreButton} from '../index';
import { FlatList } from 'react-native';
import { SnackContext } from '../../utils';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');


export class CustomCarousel<T> extends PureComponent<CustomCarouselProps<T>, CustomCarouselState<T>> {
    carouselRef: React.MutableRefObject<null>;
    declare context: React.ContextType<typeof SnackContext>;

    constructor(props: CustomCarouselProps<T>) {
        super(props)

        this.carouselRef = createRef();

        this.state = {
            messageText: undefined,
            items: [],
            refreshing: false
        }
    }
    
    __fetchItems() {
        let newStateItemValue = {};

        this.setState({messageText: "Fetching anime ..."})

        this.props.fetchItems().then( resp => {
            newStateItemValue = {
                messageText: undefined,
                items: resp
            };
        }).catch(reason => {
            newStateItemValue = {
                messageText: reason.toString(),
                items: []
            }
            this.context.showMessage({
                message: `Failed to retrieve ${this.props.title} results.`
            });
        }).finally(() => {
            this.setState({...newStateItemValue, refreshing: false})
        })
    }

    componentDidMount() {
        this.__fetchItems()
    }
    
    __onRefresh() {
        this.setState({refreshing: true})
        this.__fetchItems()
    }

    __keyExtractor = (item: T, index: number) => `${this.props.keyPrefix}-${index}`;
    
    __getItemLayout = (data: T[] | null | undefined, index: number) => (
        {length: windowHeight * .35, offset: (windowHeight * .35) * index, index}
    )

    render() {

        const {
            title,
            renderItem,
            onPress
        } = this.props;

        const {
            messageText,
            items,
            refreshing
        } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.carouselTitle}>
                        {title}
                    </Text>
                    <SeeMoreButton onPress={onPress} />
                </View>
                <FlatList
                    horizontal
                    contentContainerStyle={styles.list}
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={this.__keyExtractor}
                    getItemLayout={this.__getItemLayout}
                    onRefresh={this.__onRefresh}
                    refreshing={refreshing}
                    bounces={false}
                    ListEmptyComponent={<View style={styles.content}>
                        <MessageComp message={messageText} />
                    </View>}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        height: windowHeight * .4,
        minWidth: windowWidth * .9
    },
    carouselTitle: {
        color: '#fff',
        fontWeight: '500',
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
        paddingTop: 10,
        paddingBottom: 10,
        height: windowHeight * .3
    },
    content: {
        height: windowHeight * .3,
        width: windowWidth * .9
    }
});



