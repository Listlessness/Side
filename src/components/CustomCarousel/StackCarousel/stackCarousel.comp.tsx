import React, {createRef, PureComponent} from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { StackCarouselProps, StackCarouselState } from './stackCarousel.types';
import { MessageComp , SeeMoreButton} from '../../index';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');


export class StackCarousel<T> extends PureComponent<StackCarouselProps<T>, StackCarouselState<T>> {
    carouselRef: React.MutableRefObject<null>;

    constructor(props: StackCarouselProps<T>) {
        super(props)

        this.carouselRef = createRef();

        this.state = {
            activeSlide: 0,
            messageText: undefined,
            items: []
        }
    }

    componentDidMount() {
        this.setState({messageText: "Fetching anime ..."})
        this.props.fetchItems().then( resp => {
            this.setState({
                messageText: undefined,
                items: resp
            })
        }).catch(reason => {
            this.setState({
                messageText: reason.toString()
            })
        })
    }

    render() {

        const {
            title,
            renderItem,
            onPress
        } = this.props;

        const {
            activeSlide,
            messageText,
            items
        } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.carouselTitle}>
                        {title}
                    </Text>
                    <SeeMoreButton onPress={onPress} />
                </View>
                {(items && items.length > 0) ? (
                    <>
                        <Carousel
                            layout={"stack"}
                            ref={this.carouselRef}
                            data={items}
                            sliderWidth={windowWidth * .9}
                            itemWidth={windowWidth * .9}
                            renderItem={renderItem}
                            inactiveSlideOpacity={0.1}
                            inactiveSlideScale={0.1}
                            onSnapToItem={(activeSlide) => this.setState({activeSlide}) }
                            useScrollView
                            autoplay
                        />
                        <Pagination
                            dotsLength={items.length}
                            activeDotIndex={activeSlide}
                            containerStyle={styles.paginationContainer}
                            dotStyle={styles.dot}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                        />
                    </>
                ) : (
                    <MessageComp
                        message={messageText}
                    />
                )}
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
    paginationContainer: { 
        height: windowHeight * .05,
        paddingTop: 0,
        paddingBottom: 0
    },
    dot: {
        width: 5,
        height: 5,
        marginHorizontal: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.92)'
    }
});



