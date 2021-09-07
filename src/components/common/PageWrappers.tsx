import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native'

interface ScrollPWProps {
    children: any,
    refreshing: boolean,
    onRefresh: () => void,
    scrollRef?: any,
    gradientOffset?: any
}

export const ScrollPageWrapper = React.memo(function ScrollPageWrapper({
    children,
    refreshing,
    onRefresh,
    scrollRef,
    gradientOffset
} : ScrollPWProps) {

    return (
        <ScrollView
            ref={scrollRef}
            style={styles.page}
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

interface SimplePWProps {
    children: any
}

export const SimplePageWrapper = React.memo(function SimplePageWrapper({
    children
} : SimplePWProps) {

    return (
        <View
            style={styles.page}
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
    page: {
        backgroundColor: '#000E14',
        flex: 1
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20,
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