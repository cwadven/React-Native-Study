import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Stack, useRouter, useSegments} from 'expo-router';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/useColorScheme';
import {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function RootLayout() {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        const checkAuthToken = async () => {
            if (segments[0] === 'login') return;

            try {
                const token = await AsyncStorage.getItem('authToken');
                console.log(token)
                if (!token) {
                    router.replace('login');
                }
            } catch (error) {
                console.error('Failed to retrieve token:', error);
                router.replace('login');
            }
        };

        checkAuthToken().then(r => r);
    }, [segments]);

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="login"/>
                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                <Stack.Screen name="+not-found"/>
            </Stack>
        </ThemeProvider>
    );
}
