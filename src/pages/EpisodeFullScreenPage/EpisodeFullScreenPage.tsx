import { useFocusEffect } from '@react-navigation/native';
import React from 'react'
import * as ScreenOrientation from 'expo-screen-orientation';
import { WebView } from 'react-native-webview'
import { EpisodeFullScreenPageProps } from './episodeFullScreenPage.types'

export const EpisodeFullScreenPage = React.memo(function EpisodeFullScreenPage({
    route,
    navigation
}: EpisodeFullScreenPageProps) {
    
    const [videoLink, setVideoLink] = React.useState(route.params.link);

    useFocusEffect(
        React.useCallback(() => {
            
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

            return () => ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);;
        }, [videoLink])
    );

    return (
        <WebView
            automaticallyAdjustContentInsets={false}
            //source={{html: `<iframe width="100%" height="200%" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" src=${GogoAnimeService.GetVideoUrl(currEpisodeInfo?.videoId)} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen />`}}
            source={{uri: videoLink}}
        />
    )
})
