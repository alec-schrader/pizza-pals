import { View, Text, Pressable } from 'react-native';

import { Link } from 'expo-router';
import { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabase'
import { styles } from '../../utils/styles'

import { Button } from 'react-native-paper'


export default function Home() {
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        <View style={styles.container}>
            <Text>Home Page</Text>
            {/* ...other links */}
            <View style={[styles.verticallySpaced, styles.mt20]}>

            <Link href="/logout" asChild>
                <Button mode="contained">Logout</Button>
            </Link>

            </View>
        </View>
    );
}
