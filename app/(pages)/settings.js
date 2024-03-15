import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Button } from 'react-native-paper'
import { styles } from '../../utils/styles'


export default function Settings() {
    return (
        <View style={styles.container}>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Link href="/logout" asChild>
                    <Button mode="contained">Logout</Button>
                </Link>
            </View>
        </View>
    );
}
