import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { ThumbnailCarousel } from '../../components/CustomCarousel/ThumbnailCarousel';
import { LandingPageHeader } from '../../components/landingPageHeader';
import JikanAPI from '../../services/JikanAPI';
import GogoAnimeAPI from '../../services/GogoanimeAPI';
import { TopItem, JikanTypesObj, JikanAnimeSubTypesObj } from '../../utils';
import { IRecentRelease } from 'gogoanime-api';
import { StackCarousel } from '../../components/CustomCarousel/StackCarousel';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export default function LandingPage() {

    const [newEpisodeList, setNewEpisodeList] = useState<IRecentRelease[]>([])

    const [topAiringList, setTopAiringList] = useState<TopItem[]>([]);

    const [topUpcomingList, setTopUpcomingList] = useState<TopItem[]>([]);

    useEffect(() => {
        GogoAnimeAPI.fetchRecentlyAddedEpisodes().then(resp => {
            setNewEpisodeList(resp.data);
        })
    }, [newEpisodeList?.length])


    useEffect(() => {
        JikanAPI.fetchTop(JikanTypesObj.Anime, 1, JikanAnimeSubTypesObj.Airing).then(resp => {
            setTopAiringList(resp.top);
        })
    }, [topAiringList?.length])

    useEffect(() => {
        JikanAPI.fetchTop(JikanTypesObj.Anime, 1, JikanAnimeSubTypesObj.Upcoming).then(resp => {
            setTopUpcomingList(resp.top);
        })
    }, [topUpcomingList?.length])

    return (
        <SafeAreaView style={styles.landingPage}>
            <LandingPageHeader/>
            <View style={styles.content}>
                <StackCarousel
                    title="fs"
                    items={newEpisodeList}
                />
                <ThumbnailCarousel
                    title="Top Airing Anime"
                    items={topAiringList}
                />
                <ThumbnailCarousel
                    title="Top Upcoming Anime"
                    items={topUpcomingList}
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
    height: windowHeight * 2
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  }
});
