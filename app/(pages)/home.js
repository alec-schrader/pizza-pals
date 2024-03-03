import { View, Text, Pressable } from 'react-native';

import { Link } from 'expo-router';
import { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabase'
import { styles } from '../../utils/styles'

import { Button } from 'react-native-elements'


export default function Page() {
    const [session, setSession] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setLoggedIn(!!session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setLoggedIn(!!session)
        })
    }, [])

    return (
        <View style={styles.container}>
            <Text>Home Page</Text>
            {/* ...other links */}
            <View style={[styles.verticallySpaced, styles.mt20]}>

            {loggedIn ? (
                <Link href="/logout" asChild>
                    <Button title="Logout" />
                </Link>

            ) : (
                <Link href="/login" asChild>
                    <Button title="Login" />
                </Link>
            )}
            </View>
        </View>
    );
}
