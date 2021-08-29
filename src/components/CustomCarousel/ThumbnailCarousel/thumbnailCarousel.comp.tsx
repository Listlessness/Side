import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ThumbnailCarouselTypes } from './thumbnailCarousel.types';
import { MessageComp, Thumbnail, SeeMoreButton } from '../../';
import { UseNavigation, TopItem } from './../../../utils';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export function ThumbnailCarousel({
    items,
    title,
    topType
}: ThumbnailCarouselTypes) {

    const navigation = UseNavigation();
    
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

    let __onPress = () => {
        navigation.navigate("Top Anime", {topType: topType})
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.carouselTitle}>
                    {title}
                </Text>
                <SeeMoreButton onPress={__onPress}/>
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
                    activeSlideAlignment={'center'}
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



