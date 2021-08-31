import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { ThumbnailCarousel, StackCarousel, StackItem, Thumbnail } from '../../components';
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

const __fetchThumbnailItems = (subType: SubTypes) => JikanService.fetchTop(JikanTypes.Anime, 1, subType).then(resp => {
    return resp.top.slice(0,10);
})

export class LandingPage extends PureComponent<LandingPageProps> {

    constructor(props: LandingPageProps) {
        super(props)

        props.navigation.setOptions({
            headerRight: () => (
                <Button
                  icon={
                    <Icon
                      name="search"
                      size={20}
                      color="white"
                    />
                  }
                  type="clear"
                  onPress={() => props.navigation.navigate('Search')}
                />
              ),
          });
    }

    render() {
        const { route, navigation } = this.props;
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
                    fetchItems={() => __fetchThumbnailItems(JikanAnimeSubTypes.Airing)}
                    renderItem={__renderThumbnailItem}
                    onPress={() => {
                        navigation.navigate("Top Anime", {topType: JikanAnimeSubTypes.Airing})
                    }}
                />
                <ThumbnailCarousel
                    title="Top Upcoming Anime"
                    fetchItems={() => __fetchThumbnailItems(JikanAnimeSubTypes.Upcoming)}
                    renderItem={__renderThumbnailItem}
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
