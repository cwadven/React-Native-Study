import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Stack, useRouter, useSegments, Href} from 'expo-router';
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
                if (!token) {
                    router.replace('login' as Href);
                }
            } catch (error) {
                router.replace('login' as Href);
            }
        };

        checkAuthToken().then(r => r);
    }, [segments]);

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="login"/>
            </Stack>
        </ThemeProvider>
    );
}
