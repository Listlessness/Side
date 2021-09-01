import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

interface CustomPickerProps {
    selectedValue: any,
    setSelectedValue: (itemValue: any) => void,
    listObject: {[index: string]: any},
    title: string,
    addEmptyValue?: boolean 
}

export const CustomPicker = ({
    selectedValue,
    setSelectedValue,
    listObject,
    title,
    addEmptyValue=true
}: CustomPickerProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Picker
                dropdownIconColor='#F77F00'
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                {addEmptyValue && <Picker.Item label={'...'} value={''} />}
                {Object.keys(listObject).map((option, index) => {
                    return <Picker.Item key={index} label={option} value={listObject[option]} />
                })}
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    picker: {
        height: windowHeight * 0.075,
        width: windowWidth * 0.35,
        color: '#FCBF49',
        fontSize: 14
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    title: {
        color: '#F5F1DB',
        fontWeight: '500',
        marginRight: 10
    }
})
