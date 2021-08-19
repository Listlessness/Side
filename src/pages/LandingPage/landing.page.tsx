import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { CustomCarousel } from '../../components/CustomCarousel';
import JikanAPI from '../../services/JikanAPI';
import { Constants, JikanInterfaces } from '../../utils';


export default function LandingPage() {
    const [topAiringList, setTopAiringList] = useState<JikanInterfaces.TopItem[]>([]);

    const [topUpcomingList, setTopUpcomingList] = useState<JikanInterfaces.TopItem[]>([]);


    useEffect(() => {
        JikanAPI.fetchTop(Constants.JikanTypesObj.anime, 1, Constants.JikanAnimeSubTypesObj.airing).then((resp: JikanInterfaces.TopResult) => {
            setTopAiringList(resp.top);
        })
    }, [topAiringList.length])

    useEffect(() => {
        JikanAPI.fetchTop(Constants.JikanTypesObj.anime, 1, Constants.JikanAnimeSubTypesObj.upcoming).then((resp: JikanInterfaces.TopResult) => {
            setTopUpcomingList(resp.top);
        })
    }, [topUpcomingList.length])

    return (
        <SafeAreaView style={styles.landingPage}>
            <CustomCarousel
                items={topAiringList}
            />
            <CustomCarousel
                items={topUpcomingList}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  landingPage: {
    flex: 1
  },
});
