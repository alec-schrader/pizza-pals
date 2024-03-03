import { View, Text } from 'react-native';
import { supabase } from '../../utils/supabase'
import { styles } from '../../utils/styles'
import { router } from 'expo-router';

export default function Page() {

    async function signOut() {
        const { error } = await supabase.auth.signOut()
        router.replace('/')
    }

    signOut()

    return (
        <View style={styles.container}>
            <Text>Logging Out...</Text>
        </View>
    )
}