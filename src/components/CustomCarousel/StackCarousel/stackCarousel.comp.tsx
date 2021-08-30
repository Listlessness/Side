import React, {useRef, useEffect, useState} from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { StackCarouselProps } from './stackCarousel.types';
import { MessageComp , SeeMoreButton} from '../../index';
import { GogoAnimeService } from '../../../services';
import { ListItemsState } from '../../../utils';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export function StackCarousel<T>({
    fetchItems,
    title,
    renderItem,
    onPress
}: StackCarouselProps<T>) {

    const carouselRef = useRef(null);

    const [activeSlide, setActiveSlide] = useState(0);

    const [itemState, setItemState] = useState<ListItemsState<T>>(
        {
            messageText: "Fetching anime ...",
            items: []
        }
    )

    useEffect(() => {
        fetchItems().then( resp => {
            setItemState({
                messageText: undefined,
                items: resp
            })
        }).catch(reason => {
            console.log("REASON", reason)
            setItemState({
                messageText: reason.toString(),
                items: []
            })
        })
    }, [itemState.items.length])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.carouselTitle}>
                    {title}
                </Text>
                <SeeMoreButton onPress={onPress} />
            </View>
            {(itemState.items && itemState.items.length > 0) ? (
                <>
                    <Carousel
                        layout={"stack"}
                        ref={carouselRef}
                        data={itemState.items}
                        sliderWidth={windowWidth * .9}
                        itemWidth={windowWidth * .9}
                        renderItem={renderItem}
                        inactiveSlideOpacity={0.1}
                        inactiveSlideScale={0.1}
                        onSnapToItem={(index) => setActiveSlide(index) }
                        useScrollView
                        autoplay
                    />
                    <Pagination
                        dotsLength={itemState.items.length}
                        activeDotIndex={activeSlide}
                        containerStyle={styles.paginationContainer}
                        dotStyle={styles.dot}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                    />
                </>
            ) : (
                <MessageComp
                    message={itemState.messageText}
                />
            )}
        </View>
    )
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



