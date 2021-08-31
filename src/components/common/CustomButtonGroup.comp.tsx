import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { ButtonGroup } from 'react-native-elements'

interface CustomPickerProps {
    selectedIndex: number,
    setSelectedIndex: (itemValue: any) => void,
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
        <View>
            <Text>{title}</Text>
            <ButtonGroup
                onPress={setSelectedIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: 100}}
            />
        </View>
    )
}
