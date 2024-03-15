import { View, Text, Pressable } from 'react-native';

import { Link } from 'expo-router';
import { useState, useEffect } from 'react'
import { supabase, getPizzaProperties } from '../../utils/supabase'
import { styles } from '../../utils/styles'

import { Button } from 'react-native-paper'


export default function Home() {
    return (
        <View style={styles.container}>
            <Text>Home Page</Text>
        </View>
    );
}
