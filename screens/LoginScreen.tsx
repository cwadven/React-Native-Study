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
                router.replace('/(tabs)/home' as Href);
            } else {
                setModalMessage('아이디 및 비밀번호\n정보가 일치하지 않습니다.');
            }
        } catch (error) {
            setModalMessage('예기치 못한 오류가 발생했습니다.');
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    return (
        <>
            <Stack.Screen options={{title: 'Checker'}}/>
            <ThemedView style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.label}>아이디:</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Enter username"
                    />
                    <Text style={styles.label}>비밀번호:</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter password"
                        secureTextEntry
                    />
                    <Button title="로그인" onPress={handleLogin}/>
                </View>

                <CustomModal
                    visible={isModalVisible}
                    message={isLoading ? '' : modalMessage}
                    onClose={() => setModalVisible(false)}
                >
                    {isLoading && <View>
                        <Text style={styles.label}>로그인 중</Text>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View>
                    }
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
