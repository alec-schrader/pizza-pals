import { Stack } from 'expo-router/stack';
import { useTheme } from 'react-native-paper';

export default function Layout() {
    const theme = useTheme();
    
    return <Stack
        screenOptions={{
            headerStyle: {
                backgroundColor: theme.colors.primary,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            contentStyle: { backgroundColor: theme.colors.backdrop },
        }}
    />;
}
