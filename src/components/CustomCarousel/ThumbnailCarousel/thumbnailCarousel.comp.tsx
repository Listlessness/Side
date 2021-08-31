import React, { createRef, PureComponent } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ThumbnailCarouselProps, ThumbnailCarouselState } from './thumbnailCarousel.types';
import { MessageComp, SeeMoreButton } from '../../index';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export class ThumbnailCarousel<T> extends PureComponent<ThumbnailCarouselProps<T>, ThumbnailCarouselState<T>> {
    carouselRef: React.MutableRefObject<null>;

    constructor(props: ThumbnailCarouselProps<T>) {
        super(props)

        this.carouselRef = createRef();

        this.state = {
            currIndex: 0,
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
            currIndex,
            messageText,
            items
        } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.carouselTitle}>
                        {title}
                    </Text>
                    <SeeMoreButton onPress={onPress}/>
                </View>
                {(items && items.length > 0) ? (
                    <Carousel
                        layout={"default"}
                        ref={this.carouselRef}
                        data={items}
                        sliderWidth={windowWidth * .9}
                        itemWidth={windowWidth * .3}
                        renderItem={renderItem}
                        onSnapToItem = { currIndex => this.setState({currIndex}) }
                        activeSlideAlignment={'center'}
                        inactiveSlideScale={.8}
                    />
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
        paddingTop: 10,
        height: windowHeight * .4,
        width: windowWidth * .9
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
    }
});



