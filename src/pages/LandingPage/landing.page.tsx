import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ThumbnailCarousel } from '../../components/CustomCarousel/ThumbnailCarousel';
import JikanAPI from '../../services/JikanAPI';
import GogoAnimeAPI from '../../services/GogoanimeAPI';
import { TopItem, JikanTypesObj, JikanAnimeSubTypesObj } from '../../utils';
import { IRecentRelease } from 'gogoanime-api';
import { StackCarousel } from '../../components/CustomCarousel/StackCarousel';
import { SafeAreaView } from 'react-native-safe-area-context';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export function LandingPage() {

    const [newEpisodeList, setNewEpisodeList] = useState<IRecentRelease[]>([])

    const [topAiringList, setTopAiringList] = useState<TopItem[]>([]);

    const [topUpcomingList, setTopUpcomingList] = useState<TopItem[]>([]);

    useEffect(() => {
        GogoAnimeAPI.fetchRecentlyAddedEpisodes().then(resp => {
            setNewEpisodeList(resp.data.slice(0,7));
        })
    }, [newEpisodeList?.length])


    useEffect(() => {
        JikanAPI.fetchTop(JikanTypesObj.Anime, 1, JikanAnimeSubTypesObj.Airing).then(resp => {
            setTopAiringList(resp.top.slice(0,10));
        })
    }, [topAiringList?.length])

    useEffect(() => {
        JikanAPI.fetchTop(JikanTypesObj.Anime, 1, JikanAnimeSubTypesObj.Upcoming).then(resp => {
            setTopUpcomingList(resp.top.slice(0,10));
        })
    }, [topUpcomingList?.length])

    return (
        <SafeAreaView style={styles.landingPage}>
            <View style={styles.content}>
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
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  landingPage: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000E14',
    height: 'auto'
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    height: 'auto',
    paddingBottom: 30
  }
});
