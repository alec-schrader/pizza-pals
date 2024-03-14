import { useEffect, useState } from 'react';
import { Redirect, Tabs, tabs } from 'expo-router';

import { supabase } from '../../utils/supabase';
import { Icon, useTheme } from 'react-native-paper'

export default function PageLayout() {
    const theme = useTheme();

    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        async function getSession() {
            const { data, error } = await supabase.auth.getSession();
            return data
        }
        setIsLoading(true);
        setSession(getSession());
        setIsLoading(false);
    }, []);

    // You can keep the splash screen open, or render a loading screen like we do here.
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    if (!session) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href="/login" />;
    }

    // This layout can be deferred because it's not the root layout.
    return <Tabs 
        screenOptions={{
            tabBarActiveTintColor: theme.colors.tertiary,
            headerStyle: {
                backgroundColor: theme.colors.primary,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            contentStyle: {
                backgroundColor: theme.colors.backdrop,
            },
            tabBarStyle: {
                backgroundColor: theme.colors.secondary
            },
        }}
        sceneContainerStyle={{
            backgroundColor: theme.colors.backdrop,
        }}
    >
        <Tabs.Screen
            name="home"
            options={{
                title: 'Home',
                tabBarIcon: ({ color }) => <Icon
                    source="home"
                    color={color}
                    size={20}
                />,
            }}
        />
        <Tabs.Screen
            name="pals"
            options={{
                title: 'Pals',
                tabBarIcon: ({ color }) => <Icon
                    source="account-group"
                    color={color}
                    size={20}
                />,
            }}
        />
        <Tabs.Screen
            name="rankings"
            options={{
                title: 'Rankings',
                tabBarIcon: ({ color }) => <Icon
                    source="pizza"
                    color={color}
                    size={20}
                />,
            }}
        />
        <Tabs.Screen
            name="settings"
            options={{
                title: 'Settings',
                tabBarIcon: ({ color }) => <Icon
                    source="cog"
                    color={color}
                    size={20}
                />,
            }}
        />
    </Tabs>;
}
