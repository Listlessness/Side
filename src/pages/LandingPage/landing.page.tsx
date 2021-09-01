import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Colors, IconButton } from 'react-native-paper';
import { CustomCarousel, StackItem, Thumbnail } from '../../components';
import { JikanService, GogoAnimeService } from '../../services';
import { GogoRecentRelease } from '../../services/GogoanimeAPI/gogoanimeScraper';
import { TopItem, JikanTypes, JikanAnimeSubTypes, SubTypes } from '../../utils';
import { LandingPageProps } from './landing.page.types';

const __renderStackItem = ({item, index}: { item: GogoRecentRelease; index: number; }) => {
    return (
        <StackItem
            key={index}
            id={item.id}
            title={item.title}
            picture_url={item.thumbnail}
            url={item.link}
            episode={item.episode}
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

const __fetchThumbnailItems = (subType: SubTypes) => JikanService.fetchTop(JikanTypes.Anime, 1, subType).then(resp => {
    return resp.top.slice(0,10);
})

export class LandingPage extends PureComponent<LandingPageProps> {

    constructor(props: LandingPageProps) {
        super(props)

        props.navigation.setOptions({
            headerRight: () => (
                <IconButton
                    icon='search'
                    color={Colors.white}
                    size={20}
                    onPress={() => props.navigation.navigate('Search')}
                />
              ),
          });
    }

    render() {
        const { route, navigation } = this.props;
        return (
            <ScrollView style={styles.landingPage} contentContainerStyle={styles.content}>
                <CustomCarousel
                    title="Latest Episodes"
                    keyPrefix='LE'
                    fetchItems={__fetchStackItems}
                    renderItem={__renderStackItem}
                    type='stack'
                    onPress={() => {
                        navigation.navigate("Latest Episodes")
                    }}
                />
                <CustomCarousel
                    title="Top Airing Anime"
                    keyPrefix='TAA'
                    fetchItems={() => __fetchThumbnailItems(JikanAnimeSubTypes.Airing)}
                    renderItem={__renderThumbnailItem}
                    type='thumbnail'
                    onPress={() => {
                        navigation.navigate("Top Anime", {topType: JikanAnimeSubTypes.Airing})
                    }}
                />
                <CustomCarousel
                    title="Top Upcoming Anime"
                    keyPrefix='TUA'
                    fetchItems={() => __fetchThumbnailItems(JikanAnimeSubTypes.Upcoming)}
                    renderItem={__renderThumbnailItem}
                    type='thumbnail'
                    onPress={() => {
                        navigation.navigate("Top Anime", {topType: JikanAnimeSubTypes.Upcoming})
                    }}
                />
            </ScrollView>
        );
    }
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
