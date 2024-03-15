import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import UserRatingCard from '../../components/userRatingCard'
import { styles } from '../../utils/styles'


import pizzaPropertiesReducer, { fetchPizzaProperties } from '../../redux/pizzaPropertiesSlice';

export default function Rankings() {
    const dispatch = useDispatch()
    const pizzaProperties = useSelector((state) => state.pizzaProperties.value)

    let curCategory = '';
    function RatingsList(){
        return pizzaProperties.map((rating) => {
            if(rating.category != curCategory){
                curCategory = rating.category;
                return (
                    <View key={rating.id}>  
                        <Text variant="displayLarge">{rating.category}</Text>
                        <UserRatingCard rating={rating}  />
                    </View>
                )
            }
            return (<UserRatingCard rating={rating} key={rating.id} />)
        })
    }

    useEffect(() => {
        dispatch(fetchPizzaProperties())
      }, [dispatch])

    return (
        <ScrollView style={styles.container}>
            {RatingsList()}
        </ScrollView>
    );
}
