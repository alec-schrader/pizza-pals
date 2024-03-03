import React, { useState } from 'react'
import { Link } from 'expo-router';

import { Alert, StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { supabase } from '../../utils/supabase'
import { styles } from '../../utils/styles'
import { router, Stack } from 'expo-router';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)

        router.replace('/')
    }

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: "Login",
                }}
            />
            <View style={styles.container}>
                <View style={[styles.verticallySpaced, styles.mt20]}>
                    <TextInput
                        label="Email"
                        left={<TextInput.Icon icon="email" />}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        placeholder="email@address.com"
                    />
                </View>
                <View style={styles.verticallySpaced}>
                    <TextInput
                        label="Password"
                        left={<TextInput.Icon icon="lock" />}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                        placeholder="Password"
                    />
                </View>
                <View style={[styles.verticallySpaced, styles.mt20]}>
                    <Button disabled={loading} onPress={() => signInWithEmail()} mode="contained">Sign In</Button>
                </View>
                <View style={styles.verticallySpaced}>
                    <Link href="/signup" asChild>
                        <Button>Sign up</Button>
                    </Link>
                </View>
            </View>

        </>
    )
}