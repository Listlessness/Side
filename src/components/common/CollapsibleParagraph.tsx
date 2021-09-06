import React, { useCallback, useState } from 'react'
import { TextProps, TouchableOpacity } from 'react-native'
import { Caption, Paragraph } from 'react-native-paper'

interface Props extends TextProps{
    children?: React.ReactNode
}

export const CollapsibleParagraph = React.memo(function CollapsibleParagraph(props : Props) {

    const [synopsisShowMore, setShowMore] = useState(false)

    const toggleShowMore = useCallback(
        () => setShowMore(!synopsisShowMore),
        [synopsisShowMore],
    )

    return (
        <TouchableOpacity onPress={toggleShowMore}>
            <Paragraph
                numberOfLines={synopsisShowMore ? undefined : (props.numberOfLines || 3)}
                {...props}
            >
                {props.children}
            </Paragraph>
            <Caption {...props}>Touch to read more</Caption>
        </TouchableOpacity>
        
)
})
