import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { StackCarouselTypes } from './stackCarousel.types';
import { MessageComp } from '../../MessageComp';
import { IRecentRelease } from 'gogoanime-api';
import StackItem from '../../StackItem/stackItem.comp';
import { SeeMoreButton } from '../../common';
import { Screens } from './../../../utils/constants';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export function StackCarousel({
    items,
    title
}: StackCarouselTypes) {

    const carouselRef = React.useRef(null);
    const [activeSlide, setActiveSlide] = React.useState(0);

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
            <View style={styles.header}>
                <Text style={styles.carouselTitle}>
                    {title}
                </Text>
                <SeeMoreButton navigateTo={{name: Screens.LATEST_EPISODES_PAGE.name}} />
            </View>
            {(items && items.length > 0) ? (
                <>
                    <Carousel
                        layout={"stack"}
                        ref={carouselRef}
                        data={items}
                        sliderWidth={windowWidth * .9}
                        itemWidth={windowWidth * .9}
                        renderItem={_renderItem}
                        inactiveSlideOpacity={0.1}
                        inactiveSlideScale={0.1}
                        onSnapToItem={(index) => setActiveSlide(index) }
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
                    message="No Anime Found."
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



