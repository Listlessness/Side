import React, { Component } from 'react';
import { useRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { StackCarouselTypes } from './stackCarousel.types';
import { MessageComp } from '../../MessageComp';
import { IRecentRelease } from 'gogoanime-api';
import StackItem from '../../StackItem/stackItem.comp';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export function StackCarousel({
    items,
    title
}: StackCarouselTypes) {

    const carouselRef = React.useRef(null);
    const [currIndex, setIndex] = React.useState(0)

    let _renderItem = ({item, index}: { item: IRecentRelease; index: number; }) => {

        return (
            <StackItem
                key={index}
                id={item.id}
                title={item.title}
                picture_url={item.thumbnail}
                url={item.link}
                description={item.episode}
            />
        );
    }

    return (
        <View style={styles.container}>
            {(items && items.length > 0) ? (
                <Carousel
                    layout={"tinder"}
                    ref={carouselRef}
                    data={items}
                    sliderWidth={windowWidth * .9}
                    itemWidth={windowWidth * .9}
                    renderItem={_renderItem}
                    onSnapToItem = { index => setIndex(index) }
                    activeSlideAlignment={'center'}
                    inactiveSlideScale={1}
                />
            ) : (
                <MessageComp
                    message="No Anime Found."
                />
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        height: windowHeight * .25,
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
    carouselSeeMore: {
        color: '#EAE2B7',
        fontWeight: '500',
        textAlign: 'right',
        width: '50%',
        paddingBottom: 5,
    }
});



