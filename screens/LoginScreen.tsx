import {StyleSheet, Alert, View, Text, TextInput, Button} from 'react-native';
import React, {useState} from "react";
import {Stack, useNavigation} from "expo-router";
import {ThemedView} from "@/components/ThemedView";
import {NavigationProp} from "@react-navigation/native";

type RootStackParamList = {
    '(tabs)': undefined;
    '+not-found': undefined;
};


type LoginScreenNavigationProp = NavigationProp<RootStackParamList, '(tabs)'>;


export default function LoginScreen() {
    const navigation = useNavigation<LoginScreenNavigationProp>(); // 네비게이션 훅 사용
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        try {
            // const token = await login(username, password);
            Alert.alert('Success', 'Logged in successfully!');
            navigation.navigate('(tabs)'); // 로그인 성공 시 tabs로 이동
        } catch (error) {
            Alert.alert('Error', 'Login failed. Please check your credentials.');
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
