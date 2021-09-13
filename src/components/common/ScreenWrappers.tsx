import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native'

interface ScrollSWProps {
    children: any,
    refreshing: boolean,
    onRefresh: () => void,
    scrollRef?: any,
    gradientOffset?: any
}

export const ScrollScreenWrapper = React.memo(function ScrollScreenWrapper({
    children,
    refreshing,
    onRefresh,
    scrollRef,
    gradientOffset
} : ScrollSWProps) {

    return (
        <ScrollView
            ref={scrollRef}
            style={styles.Screen}
            contentContainerStyle={styles.content}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            nestedScrollEnabled={true}
        >
            <LinearGradient
                colors={['#000E14', "#001B29", "#020413"]}
                style={{...styles.fadeTop, top: gradientOffset || 0}}
            />
            {children}
        </ScrollView>
    )
})

interface SimpleSWProps {
    children: any
}

export const SimpleScreenWrapper = React.memo(function SimpleScreenWrapper({
    children
} : SimpleSWProps) {

    return (
        <View
            style={styles.Screen}
        >
            <LinearGradient
                colors={['#000E14', "#001B29", "#00151F", "#000E14"]}
                style={styles.fadeTop}
            />
            {children}
        </View>
    )
})

const styles = StyleSheet.create({
    Screen: {
        backgroundColor: '#000E14',
        flex: 1,
        paddingBottom: 20,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 15,
        paddingLeft: 15
    },
    fadeTop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%'
    }
});