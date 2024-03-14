import { View, Text, Pressable } from 'react-native';

import { Link } from 'expo-router';
import { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabase'
import { styles } from '../../utils/styles'

import { Button } from 'react-native-paper'


export default function Home() {
    const [loading, setLoading] = useState(true)
    const [ratings, setRatings] = useState('');
    const [session, setSession] = useState(null);

    async function getSession() {
        const { data, error } = await supabase.auth.getSession();
        return data
    }
    
    useEffect(() => {
        async function getRatings() {
            supabase.auth.getSession().then(({ data: { session } }) => {
                const { data, error, status } = supabase
                .from('User_Ratings')
                .select('id, rating, Pizza_Properties ( id, category, subcategory, name, vegetarian, gluten_free)')
                .eq('userid', session?.user.id).then(( data, error ) => {
                    console.log(data, error)
                    setRatings(JSON.stringify(data))
                })
            })
        }
    
        if(session) return
        getRatings()
    }, [session, ratings])


    async function getRatings(session) {
        try {
            await getSession()
            console.log(session)
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            const { data, error, status } = await supabase
                .from('User_Ratings')
                .select('id, rating, Pizza_Properties ( id, category, subcategory, name, vegetarian, gluten_free)')
                .eq('userid', session?.user.id)
            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setRatings(data)
            }
            console.log(data)
        } catch (error) {
            if (error instanceof Error) {
                console.log(error)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text>Home Page</Text>
            {/* ...other links */}
            <View style={[styles.verticallySpaced, styles.mt20]}>

                <Link href="/logout" asChild>
                    <Button mode="contained">Logout</Button>
                </Link>
                <Text>
                    {ratings}
                </Text>
            </View>
        </View>
    );
}
