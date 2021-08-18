import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { SeasonalAnimeList } from '../model/landing.page.types';
import { SeasonalRelease } from '../model/types';
import { GetCurrentSeasonalRelease } from '../services/malScrapperUntil'
import CustomCarousel from '../components/customCarousel.comp';

export default function LandingPage() {
    const [seasonalAnimeList, setSeasonalAnimeList] = useState<SeasonalAnimeList | undefined>(undefined);


    useEffect(() => {
        GetCurrentSeasonalRelease().then((seasonalRelease: SeasonalRelease) => {
            let listSection: SeasonalAnimeList = {
                tvNewList: seasonalRelease.TVNew,
                tvConList: seasonalRelease.TVCon
            };

            setSeasonalAnimeList(listSection);
        })
    }, [seasonalAnimeList?.tvNewList.length, seasonalAnimeList?.tvConList.length])

    return (
        <SafeAreaView style={styles.landingPage}>
            <CustomCarousel
                items={seasonalAnimeList?.tvNewList}
            />
            <CustomCarousel
                items={seasonalAnimeList?.tvConList}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  landingPage: {
    flex: 1
  },
});
