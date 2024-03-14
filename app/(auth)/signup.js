import React, { useState } from 'react'
import { Stack } from 'expo-router';

import { View, Text } from 'react-native'
import { Button, TextInput, Dialog } from 'react-native-paper'
import { supabase } from '../../utils/supabase'
import { styles } from '../../utils/styles'
import { router } from 'expo-router';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false);
    const [dialogText, setDialogText] = useState('');

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    async function signUpWithEmail() {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
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

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: "Sign up",
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
                    <Button disabled={loading} onPress={() => signUpWithEmail()} mode="contained">Sign Up</Button>
                </View>
            </View>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Alert</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium" style={{color: 'white'}}>{dialogText}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>OK</Button>
                </Dialog.Actions>
            </Dialog>
        </>
    )
}