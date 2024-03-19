import { useState } from 'react'

import { ScrollView, View } from 'react-native';
import { Text, TextInput, Button, Divider, List, ActivityIndicator } from 'react-native-paper';
import { useGetUserPalsQuery, useAddUserPalMutation } from '../../redux/userPals'
import { useGetUserQuery } from '../../redux/user'

import { styles } from '../../utils/styles'


export default function Pals() {
    const [email, setEmail] = useState('')


    const { data: user, error: userError, isLoading: userIsLoading } = useGetUserQuery();
    const { data: pals, error: palsError, isLoading: palsIsLoading, refetch: refetchPals } = useGetUserPalsQuery(user?.id, {
        skip: userIsLoading,
    });
    const [addPal, { isLoading: isAdding }] = useAddUserPalMutation();

    const addPalButton = async function () {
        if(!email) {
          return
        } 
        await addPal({ email: email, user_id: user.id }).unwrap();
        
        await refetchPals()
      }  
    
      function PalList(){
        if(palsIsLoading || userIsLoading){
            return (<ActivityIndicator animating={true} />)
        }
        if(palsError || userError){
            return (<Text>Error: Error Fetching Data!</Text>)
        }
        
        return pals.map((pal) => {
            return (<List.Item title={pal.Users.email} key={pal.id} />)
        })
    }


    return (
        <ScrollView style={styles.container}>
            <View>
                <Text variant="displayLarge">Add pals by email.</Text>
                <View style={styles.verticallySpaced}>

                    <TextInput
                        label="Email"
                        left={<TextInput.Icon icon="email" />}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        placeholder="email@address.com"
                        inputMode='email'
                        autoCapitalize='none'
                    />
                </View>
                <View style={[styles.verticallySpaced, styles.mt20]}>
                    <Button disabled={userIsLoading || palsIsLoading} onPress={() => addPalButton()} mode="contained">Add Pizza Pal</Button>
                </View>
            </View>
            <Divider/>
            <View>
                <Text variant="displayLarge">Your Pals</Text>
                <List.Section>
                    {PalList()}
                </List.Section>
            </View>
        </ScrollView>
    );
}
