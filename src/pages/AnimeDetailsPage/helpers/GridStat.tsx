import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Caption, Paragraph, Subheading, Title } from 'react-native-paper'

interface Props {
    title: string,
    content?: any,
    footer?: any,
    hasRightDivider?: boolean
}

export const GridStat = React.memo(function GridStat({
    title,
    content,
    footer,
    hasRightDivider=false
} : Props) {

    return (
        <View style={{...styles.container, borderRightWidth: hasRightDivider ? 1 : 0, borderRightColor: hasRightDivider ? '#F77F00' : 'none'}}>
            <Caption style={styles.title}>{title}</Caption>
            <Paragraph style={styles.content}>
                {content === "Unknown" || content === null || content === undefined ? '?' : content}
            </Paragraph>
            {footer && <Caption style={styles.footer}>{footer}</Caption>}
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        width: '30%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        flexWrap: 'wrap'
    },
    title: {
        width: '100%',
        color: '#F5F1DB',
        textAlign: 'center'
    },
    content: {
        width: '100%',
        color: '#fff',
        textAlign: 'center'
    },
    footer: {
        width: '100%',
        color: '#fff',
        textAlign: 'center'
    },
    rightDivider: {
        borderRightWidth: 1,
        borderRightColor: '#F77F00'
    }
})
