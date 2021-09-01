import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { ButtonGroup } from 'react-native-elements'

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

interface CustomPickerProps {
    selectedIndex: number,
    setSelectedIndex: (index: number) => void,
    buttons: any[],
    title: string
}

export const CustomButtonGroup = ({
    selectedIndex,
    setSelectedIndex,
    buttons,
    title
}: CustomPickerProps) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <ButtonGroup
                onPress={setSelectedIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={styles.group}
                underlayColor='#F77F00'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    group: {
        height: windowHeight * 0.05,
        width: windowWidth * 0.35
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        color: '#F5F1DB',
        fontWeight: '500',
        marginRight: 10
    }
})
