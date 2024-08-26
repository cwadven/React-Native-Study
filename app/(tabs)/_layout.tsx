import {Stack, Tabs} from 'expo-router';
import React from 'react';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <>
            <Stack.Screen options={{title: 'Checker'}}/>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    headerShown: false,
                }}>
                <Tabs.Screen
                    name="home"
                    options={{
                        title: '홈',
                        tabBarIcon: ({color, focused}) => (
                            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="search"
                    options={{
                        title: '탐색',
                        tabBarIcon: ({color, focused}) => (
                            <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="my_page"
                    options={{
                        title: '마이페이지',
                        tabBarIcon: ({color, focused}) => (
                            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color}/>
                        ),
                    }}
                />
            </Tabs>
        </>
    );
}
