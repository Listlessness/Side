import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ThumbnailCarouselProps } from './thumbnailCarousel.types';
import { MessageComp, SeeMoreButton } from '../../';
import { ListItemsState } from '../../../utils';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export function ThumbnailCarousel<T>({
    fetchItems,
    title,
    renderItem,
    onPress,
    messageText
}: ThumbnailCarouselProps<T>) {
    
    const carouselRef = useRef(null);

    const [currIndex, setIndex] = useState(0)

    const [itemState, setItemState] = useState<ListItemsState<T>>(
        {
            messageText: "Fetching anime ...",
            items: []
        })

    useEffect(() => {
        fetchItems().then( resp => {
            setItemState({
                messageText: undefined,
                items: resp
            })
        }).catch(reason => {
            setItemState({
                messageText: reason,
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
                <SeeMoreButton onPress={onPress}/>
            </View>
            {(itemState.items && itemState.items.length > 0) ? (
                <Carousel
                    layout={"default"}
                    ref={carouselRef}
                    data={itemState.items}
                    sliderWidth={windowWidth * .9}
                    itemWidth={windowWidth * .3}
                    renderItem={renderItem}
                    onSnapToItem = { index => setIndex(index) }
                    activeSlideAlignment={'center'}
                    inactiveSlideScale={.8}
                />
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



