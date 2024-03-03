import React, { useState } from 'react'
import { Link } from 'expo-router';

import { View } from 'react-native'
import { Button, TextInput, Appbar } from 'react-native-paper'
import { supabase } from '../../utils/supabase'
import { styles } from '../../utils/styles'
import { router } from 'expo-router';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function signUpWithEmail() {
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) console.error(error)
        router.replace('/')

    }

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Link href="/login" asChild>
                    <Appbar.BackAction onPress={() => { }} />
                </Link>
                
                <Appbar.Content title="Sign Up" />
            </Appbar.Header>
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
                <Button disabled={loading} onPress={() => signUpWithEmail()} mode="contained">Sign Up</Button>
            </View>
        </View>
    )
}