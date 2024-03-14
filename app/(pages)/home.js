import { View, Text, Pressable } from 'react-native';

import { Link } from 'expo-router';
import { useState, useEffect } from 'react'
import { supabase, getPizzaProperties } from '../../utils/supabase'
import { styles } from '../../utils/styles'

import { Button } from 'react-native-paper'


export default function Home() {
    const [loading, setLoading] = useState(true)
    const [ratings, setRatings] = useState('');
    const [session, setSession] = useState(null);

    useEffect(() => {
        console.log("useeffect")
        async function getData() {
            setLoading(true);
            let data = await getPizzaProperties();
            console.log(data)
            if(!data) data = {};
            console.log(data)
            setRatings(data);
            setLoading(false);
        }
    
        if(typeof(ratings) === 'object') return
        getData()
    }, [session, ratings])

    return (
        <View style={styles.container}>
            <Text>Home Page</Text>
            {/* ...other links */}
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Text>{JSON.stringify(ratings)}</Text>
                <Link href="/logout" asChild>
                    <Button mode="contained">Logout</Button>
                </Link>
            </View>
        </View>
    );
}
