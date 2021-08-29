import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, ScrollView } from 'react-native';
import { ThumbnailCarousel, StackCarousel } from '../../components';
import { JikanService, GogoAnimeService } from '../../services';
import { TopItem, JikanTypesObj, JikanAnimeSubTypesObj } from '../../utils';
import { IRecentRelease } from 'gogoanime-api';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export function LandingPage() {

    const [newEpisodeList, setNewEpisodeList] = useState<IRecentRelease[]>([])

    const [topAiringList, setTopAiringList] = useState<TopItem[]>([]);

    const [topUpcomingList, setTopUpcomingList] = useState<TopItem[]>([]);

    useEffect(() => {
        GogoAnimeService.fetchRecentlyAddedEpisodes().then(resp => {
            setNewEpisodeList(resp.data.slice(0,7));
        })
    }, [newEpisodeList.length])


    useEffect(() => {
        JikanService.fetchTop(JikanTypesObj.Anime, 1, JikanAnimeSubTypesObj.Airing).then(resp => {
            setTopAiringList(resp.top.slice(0,10));
        })
    }, [topAiringList.length])

    useEffect(() => {
        JikanService.fetchTop(JikanTypesObj.Anime, 1, JikanAnimeSubTypesObj.Upcoming).then(resp => {
            setTopUpcomingList(resp.top.slice(0,10));
        })
    }, [topUpcomingList.length])

    return (
        <ScrollView style={styles.landingPage} contentContainerStyle={styles.content}>
            <StackCarousel
                title="Latest Episodes"
                items={newEpisodeList}
            />
            <ThumbnailCarousel
                title="Top Airing Anime"
                items={topAiringList}
                topType={JikanAnimeSubTypesObj.Airing}
            />
            <ThumbnailCarousel
                title="Top Upcoming Anime"
                items={topUpcomingList}
                topType={JikanAnimeSubTypesObj.Upcoming}
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
