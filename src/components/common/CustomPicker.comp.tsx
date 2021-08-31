import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { View, Text } from 'react-native'

interface CustomPickerProps {
    selectedValue: any,
    setSelectedValue: (itemValue: any) => void,
    listObject: {[index: string]: any},
    title: string
}

export const CustomPicker = ({
    selectedValue,
    setSelectedValue,
    listObject,
    title
}: CustomPickerProps) => {
    return (
        <View>
            <Text>{title}</Text>
            <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                {Object.keys(listObject).map((option, index) => {
                    <Picker.Item label={option} value={listObject[option]} />
                })}
            </Picker>
        </View>
    )
}
