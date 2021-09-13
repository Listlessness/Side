import { useFocusEffect } from '@react-navigation/native';
import React from 'react'
import * as ScreenOrientation from 'expo-screen-orientation';
import { WebView } from 'react-native-webview'
import { EpisodeFullScreenScreenProps } from './episodeFullScreen.types'
import { StyleSheet, View } from 'react-native';
import { setStatusBarHidden } from 'expo-status-bar';

export const EpisodeFullScreenScreen = React.memo(function EpisodeFullScreenScreen({
    route,
    navigation
}: EpisodeFullScreenScreenProps) {
    
    const [videoLink, setVideoLink] = React.useState(route.params.link);

    useFocusEffect(
        React.useCallback(() => {
            
            setStatusBarHidden(true, 'slide')
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

            return () => {
                ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
                setStatusBarHidden(false, 'slide')
            };
        }, [])
    );

    return (
        <View style={styles.Screen}>
            <WebView
                automaticallyAdjustContentInsets={false}
            //source={{html: `<iframe width="100%" height="100%" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" src=${videoLink} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen />`}}
                source={{uri: videoLink}}
            />
        </View>
    )
})

const styles = StyleSheet.create({
    Screen: {
        width: '100%',
        height: '100%'
    }
})