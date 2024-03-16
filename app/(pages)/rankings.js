import { ScrollView, View } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux'
import UserRatingCard from '../../components/userRatingCard'
import { styles } from '../../utils/styles'

import { useGetPizzaPropertiesQuery } from '../../redux/pizzaProperties'
import { useGetUserRatingsQuery } from '../../redux/userRatings'
import { useGetUserQuery } from '../../redux/user'

export default function Rankings() {
    const { data: user, error: userError, isLoading: userIsLoading } = useGetUserQuery();
    const { data: pizzaProperties, error: pizzaPropertiesError, isLoading: pizzaPropertiesIsLoading } = useGetPizzaPropertiesQuery();

    let curCategory = '';
    function PizzaPropertiesList(){
        if(pizzaPropertiesIsLoading || userIsLoading){
            return (<ActivityIndicator animating={true} />)
        }
        if(pizzaPropertiesError || userError){
            return (<Text>Error: Error Fetching Data!</Text>)
        }
        
        return pizzaProperties.map((property) => {
            if(property.category != curCategory){
                curCategory = property.category;
                return (
                    <View key={property.id}>  
                        <Text variant="displayLarge">{property.category}</Text>
                        <UserRatingCard property={property} user_id={user.id}  />
                    </View>
                )
            }
            return (<UserRatingCard property={property} key={property.id} user_id={user.id} />)
        })
    }

    return (
        <ScrollView style={styles.container}>
            {PizzaPropertiesList()}
        </ScrollView>
    );
}
