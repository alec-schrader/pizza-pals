import { Slot } from 'expo-router';
import {
    MD3LightTheme as DefaultTheme,
    PaperProvider,
} from 'react-native-paper';
import { darkTheme } from '../utils/theme'
import * as SystemUI from 'expo-system-ui';


export default function Root() {

    SystemUI.setBackgroundColorAsync("black");

    const appTheme = {
        ...DefaultTheme,
        colors: darkTheme.colors,
    };

    return (
        <PaperProvider theme={appTheme}>
            <Slot />
        </PaperProvider>
    );
}
