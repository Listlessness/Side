import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ThumbnailCarousel, StackCarousel, StackItem, Thumbnail } from '../../components';
import { JikanService, GogoAnimeService } from '../../services';
import { TopItem, JikanTypesObj, JikanAnimeSubTypesObj, SubTypes } from '../../utils';
import { GogoRecentRelease } from 'gogoanime-api';
import { LandingPageProps } from './landing.page.types';

const __renderStackItem = ({item, index}: { item: GogoRecentRelease; index: number; }) => {
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

const __renderThumbnailItem = ({item, index}: { item: TopItem; index: number; }) => {
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

const __fetchStackItems = () => GogoAnimeService.fetchRecentlyAddedEpisodes().then(resp => {
    return resp.data.slice(0,10);
})

const __fetchThumbnailItems = (subType: SubTypes) => JikanService.fetchTop(JikanTypesObj.Anime, 1, subType).then(resp => {
    return resp.top.slice(0,10);
})

export function LandingPage({ route, navigation }: LandingPageProps) {

    return (
        <ScrollView style={styles.landingPage} contentContainerStyle={styles.content}>
            <StackCarousel
                title="Latest Episodes"
                fetchItems={__fetchStackItems}
                renderItem={__renderStackItem}
                onPress={() => {
                    navigation.navigate("Latest Episodes")
                }}
            />
            <ThumbnailCarousel
                title="Top Airing Anime"
                fetchItems={() => __fetchThumbnailItems(JikanAnimeSubTypesObj.Airing)}
                renderItem={__renderThumbnailItem}
                onPress={() => {
                    navigation.navigate("Top Anime", {topType: JikanAnimeSubTypesObj.Airing})
                }}
            />
            <ThumbnailCarousel
                title="Top Upcoming Anime"
                fetchItems={() => __fetchThumbnailItems(JikanAnimeSubTypesObj.Upcoming)}
                renderItem={__renderThumbnailItem}
                onPress={() => {
                    navigation.navigate("Top Anime", {topType: JikanAnimeSubTypesObj.Upcoming})
                }}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  landingPage: {
    backgroundColor: '#000E14',
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 20
  }
});
