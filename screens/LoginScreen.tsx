import {StyleSheet, Alert, View, Text, TextInput, Button, ActivityIndicator} from 'react-native';
import React, {useState} from "react";
import {Href, Stack, useRouter} from "expo-router";
import {ThemedView} from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {fetchJwtToken} from "@/services/authService";
import CustomModal from "@/components/CustomModal";


export default function LoginScreen() {
    const router = useRouter();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isModalVisible, setModalVisible] = useState<boolean>(false); // 모달 상태
    const [modalMessage, setModalMessage] = useState<string>(''); // 모달에 표시할 메시지
    const [isLoading, setLoading] = useState<boolean>(false); // 로딩 상태

    const handleLogin = async () => {
        setLoading(true); // 로딩 시작
        setModalVisible(true);

        try {
            const token = await fetchJwtToken(username, password);
            if (token) {
                await AsyncStorage.setItem('authToken', token);
                router.replace('(tabs)' as Href);
            } else {
                setModalMessage('Login failed. Please check your credentials.');
            }
        } catch (error) {
            setModalMessage('Unknown error occurred.');
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    return (
        <>
            <Stack.Screen options={{title: 'Login'}}/>
            <ThemedView style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.label}>Username:</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Enter username"
                    />
                    <Text style={styles.label}>Password:</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter password"
                        secureTextEntry
                    />
                    <Button title="Login" onPress={handleLogin}/>
                </View>

                <CustomModal
                    visible={isModalVisible}
                    message={isLoading ? '' : modalMessage}
                    onClose={() => setModalVisible(false)}
                >
                    {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
                </CustomModal>
            </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});
