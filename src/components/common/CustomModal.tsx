import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Portal, Modal } from 'react-native-paper';


const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

interface ModalProps {
    
}

interface ModalState {
    visible: boolean,
    content: JSX.Element
}

export class CustomModal extends PureComponent<ModalProps, ModalState> {

    constructor(props: ModalProps) {
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
    
    showModal = () => {
        this.setState({visible: true});
    };

    closeModal = () => {
        this.setState({visible: false});
    };

    render() {
        const {
            visible,
            content
        } = this.state;

        return (
            <Portal>
                <Modal visible={visible} onDismiss={this.closeModal} contentContainerStyle={styles.modal}>
                    {content}
                </Modal>
            </Portal>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#00151F',
        padding: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
        maxWidth: windowWidth * 0.7,
        maxHeight: windowHeight * 0.55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
})

