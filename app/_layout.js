import { Slot } from 'expo-router';
import {
    MD3LightTheme as DefaultTheme,
    PaperProvider,
} from 'react-native-paper';
import { theme } from '../utils/theme'

export default function Root() {

    const appTheme = {
        ...DefaultTheme,
        colors: theme.colors, // Copy it from the color codes scheme and then use it here
    };

    return (
        <PaperProvider theme={appTheme}>
            <Slot />
        </PaperProvider>
    );
}
