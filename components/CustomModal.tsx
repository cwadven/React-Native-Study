import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

interface CustomModalProps {
    visible: boolean;
    message: string;
    onClose: () => void;
    children?: React.ReactNode; // 로딩 스피너를 위해 children 추가
}

export default function CustomModal({visible, message, onClose, children}: CustomModalProps) {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    {children}
                    {message && <Text style={styles.modalMessage}>{message}</Text>}
                    {message && !children && <Button title="닫기" onPress={onClose} />}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
});
