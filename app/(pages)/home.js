import { View, Text, Pressable } from 'react-native';

import { Link } from 'expo-router';
import { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabase'
import { styles } from '../../utils/styles'

import { Button,BottomNavigation } from 'react-native-paper'


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

const MusicRoute = () => <Text>Home</Text>;

const AlbumsRoute = () => <Text>Pals</Text>;

const RecentsRoute = () => <Text>Rankings</Text>;

const NotificationsRoute = () => <Text>Menu</Text>;

    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home'},
      { key: 'pals', title: 'Pals', focusedIcon: 'account-group' },
      { key: 'rankings', title: 'Rankings', focusedIcon: 'pizza' },
      { key: 'menu', title: 'More', focusedIcon: 'menu', unfocusedIcon: 'menu' },
    ]);
  
    const renderScene = BottomNavigation.SceneMap({
      home: MusicRoute,
      pals: AlbumsRoute,
      rankings: RecentsRoute,
      menu: NotificationsRoute,
    });

    return (
        <><View style={styles.container}>
            <Text>Home Page</Text>
            {/* ...other links */}
            <View style={[styles.verticallySpaced, styles.mt20]}>

                <Link href="/logout" asChild>
                    <Button mode="contained">Logout</Button>
                </Link>

            </View>
        </View>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
        </>
    );
}
