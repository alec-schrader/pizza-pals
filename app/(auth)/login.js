import React, { useState } from 'react'
import { Link } from 'expo-router';

import { View, Text, Platform } from 'react-native'
import { Button, TextInput, Dialog } from 'react-native-paper'
import { supabase } from '../../utils/supabase'
import { styles } from '../../utils/styles'
import { router, Stack } from 'expo-router';
import * as AppleAuthentication from 'expo-apple-authentication'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false);
    const [dialogText, setDialogText] = useState('');

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const platform = Platform.OS

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        setLoading(false)
        if (error) {
            setDialogText(error.message)
            showDialog()
            return
        }
        router.replace('/')
    }

    async function signInWithApple() {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            })
            // Sign in via Supabase Auth.
            if (credential.identityToken) {
                const {
                    error,
                    data: { user },
                } = await supabase.auth.signInWithIdToken({
                    provider: 'apple',
                    token: credential.identityToken,
                })
                console.log(JSON.stringify({ error, user }, null, 2))
                if (!error) {
                    // User is signed in.
                }
            } else {
                throw new Error('No identityToken.')
            }
        } catch (e) {
            if (e.code === 'ERR_REQUEST_CANCELED') {
                // handle that the user canceled the sign-in flow
            } else {
                // handle other errors
            }
        }
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
            <View style={styles.centered}>
                {platform == 'ios' ? (
                    <AppleAuthentication.AppleAuthenticationButton
                        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                        cornerRadius={5}
                        style={{ width: 200, height: 64 }}
                        onPress={signInWithApple} />) : <></>}
            </View>
            
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Alert</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium" style={{ color: 'white' }}>{dialogText}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>OK</Button>
                </Dialog.Actions>
            </Dialog>
        </>
    )
}