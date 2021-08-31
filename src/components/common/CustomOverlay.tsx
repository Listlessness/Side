import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';


const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

interface OverlayProps {
    
}

interface OverlayState {
    visible: boolean,
    content: JSX.Element
}

export class CustomOverlay extends PureComponent<OverlayProps, OverlayState> {

    constructor(props: OverlayProps) {
        super(props)
    
        this.state = {
            visible: false,
            content: <></>
        }
    }

    setContent = (content: JSX.Element) => {
        this.setState({content});
        return this
    }
    
    showOverlay = () => {
        this.setState({visible: true});
    };

    closeOverlay = () => {
        this.setState({visible: false});
    };

    render() {
        const {
            visible,
            content
        } = this.state;

        return (
            <Overlay overlayStyle={styles.overlay} isVisible={visible} onBackdropPress={this.closeOverlay}>
                {content}
            </Overlay>
        )
    }
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#00151F',
        width: windowWidth * .7,
        height: windowHeight * 0.5
    }
})

