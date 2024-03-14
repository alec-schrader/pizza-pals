import { Slot } from 'expo-router';
import {
    MD3LightTheme as DefaultTheme,
    PaperProvider,
} from 'react-native-paper';
import { lightTheme, darkTheme } from '../utils/theme'
import * as SystemUI from 'expo-system-ui';
import { useColorScheme } from 'react-native';



export default function Root() {
    let colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    SystemUI.setBackgroundColorAsync(theme.colors.backdrop);

    const appTheme = {
        ...DefaultTheme,
        colors: theme.colors,
    };

    return (
        <PaperProvider theme={appTheme}>
            <Slot />
        </PaperProvider>
    );
}
