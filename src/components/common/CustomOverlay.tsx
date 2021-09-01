import React, { PureComponent } from 'react';
import { Dimensions, Modal, StyleSheet } from 'react-native';
import { Portal } from 'react-native-paper';


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
            <Portal>
                <Modal visible={visible} onDismiss={this.closeOverlay} style={styles.modal}>
                    {content}
                </Modal>
            </Portal>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#00151F',
        maxWidth: windowWidth * .7,
        maxHeight: windowHeight * 0.55
    }
})

