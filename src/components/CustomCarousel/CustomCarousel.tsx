import React, { createRef, PureComponent } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { CustomCarouselProps, CustomCarouselState } from './customCarousel.types';
import { MessageComp , SeeMoreButton} from '../common';
import { FlatList } from 'react-native';
import { SnackContext } from '../../utils';
import { Subheading } from 'react-native-paper';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');


export class CustomCarousel<T> extends PureComponent<CustomCarouselProps<T>, CustomCarouselState<T>> {
    carouselRef: React.MutableRefObject<null>;
    declare context: React.ContextType<typeof SnackContext>;

    constructor(props: CustomCarouselProps<T>) {
        super(props)

        this.carouselRef = createRef();

        this.state = {
            messageText: undefined,
            items: []
        }
    }
    
    async __fetchItems() {
        let newStateItemValue = {};

        this.setState({messageText: "Fetching anime ..."})

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
            this.context.showMessage({
                message: `Failed to retrieve ${this.props.title} results.`
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
            onPress
        } = this.props;

        const {
            messageText,
            items
        } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Subheading style={styles.carouselTitle}>{title}</Subheading>
                    <SeeMoreButton onPress={onPress} />
                </View>
                <FlatList
                    horizontal
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


const styles = StyleSheet.create({
    container: {
        height: windowHeight * .4,
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
        height: windowHeight * .3,
        width: windowWidth * .9
    }
});



