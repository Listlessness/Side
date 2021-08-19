import React, { Component } from 'react';
import { useRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-anchor-carousel';
import { CustomCarouselTypes } from './customCarousel.comp.types';
import Thumbnail from '../Thumbnail/thumbnail.comp';
import { TopItem } from '../../utils/interfaces';

const {width: windowWidth} = Dimensions.get('window');

export function CustomCarousel({
    items
}: CustomCarouselTypes) {

    const carouselRef = React.useRef(null);

    let _renderItem = ({item, index}: { item: TopItem; index: number; }) => {

        return (
            <Thumbnail
                id={item.title}
                title={item.title}
                url={item.url}
                picture_url={item.image_url}
            />
        );
    }

    return (
    
        (items && items.length > 0) ? (
            <Carousel
                style={styles.container}
                ref={carouselRef}
                data={items}
                renderItem={_renderItem}
                itemWidth={windowWidth * 0.4}
                containerWidth={windowWidth}
                separatorWidth={0}
                minScrollDistance={0}
                itemContainerStyle={styles.itemContainer}
            />
        ) : (
            <View>
                <Text>
                    No anime found.
                </Text>
            </View>
        )
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 50
    },
    itemContainer: {
        width: 100
    }
});