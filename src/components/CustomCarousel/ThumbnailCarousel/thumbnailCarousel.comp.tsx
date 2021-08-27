import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ThumbnailCarouselTypes } from './thumbnailCarousel.types';
import Thumbnail from '../../Thumbnail/thumbnail.comp';
import { TopItem } from '../../../utils/interfaces';
import { MessageComp } from '../../MessageComp';
import { SeeMoreButton } from '../../common';
import { Screens } from '../../../utils';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export function ThumbnailCarousel({
    items,
    title,
    topType
}: ThumbnailCarouselTypes) {

    const carouselRef = React.useRef(null);
    const [currIndex, setIndex] = React.useState(0)

    let _renderItem = ({item, index}: { item: TopItem; index: number; }) => {

        return (
            <Thumbnail
                key={index}
                id={item.title}
                title={item.title}
                url={item.url}
                score={item.score}
                picture_url={item.image_url}
                type={item.type}
            />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.carouselTitle}>
                    {title}
                </Text>
                <SeeMoreButton navigateTo={{name: Screens.TOP_ANIME_PAGE.name, params: {topType: topType}}}/>
            </View>
            {(items && items.length > 0) ? (
                <Carousel
                    layout={"default"}
                    ref={carouselRef}
                    data={items}
                    sliderWidth={windowWidth * .9}
                    itemWidth={windowWidth * .3}
                    renderItem={_renderItem}
                    onSnapToItem = { index => setIndex(index) }
                    activeSlideAlignment={'start'}
                    inactiveSlideScale={.8}
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
    }
});


