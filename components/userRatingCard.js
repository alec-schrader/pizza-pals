import { View } from 'react-native';
import { Card, Avatar, ActivityIndicator } from 'react-native-paper';
import StarRating, {StarRatingDisplay} from 'react-native-star-rating-widget';
import { useState, useEffect } from 'react';
import { styles } from '../utils/styles'
import { useAddUserRatingMutation, useUpdateUserRatingMutation, useGetUserRatingByPropertyIDQuery } from '../redux/userRatings'


const UserRatingCard = ({ property, user_id }) => {
  //console.log(property, user_id)
  const [stars, setStars] = useState(0);

  const { data: rating, isLoading: isRatingLoading, refetch: refetchRating } = useGetUserRatingByPropertyIDQuery({ pizza_property_id: property.id, user_id });

  const [updateRating, { isLoading: isUpdating }] = useUpdateUserRatingMutation();
  const [addRating, { isLoading: isAdding }] = useAddUserRatingMutation();

  useEffect(() => {
    if (rating) {
      setStars(rating.rating / 2);
    }
  }, [rating]);

  const onRatingEnd = async function () {
    const newRating = stars * 2;//makes it out of ten and removes decimals
    if(!rating) {
      await addRating({
        rating: newRating,
        pizza_property_id: property.id,
        user_id: user_id,
      }).unwrap();
    } else {
      await updateRating({
        id: rating.id,
        rating: newRating,
      }).unwrap();
    }
    await refetchRating()
  }  

  return (
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Card>
          <Card.Title
            title={property?.name || ""}
            titleVariant={"headlineSmall"}
            left={(props) => <Avatar.Icon {...props} icon="folder" />}
          />
          <Card.Content>
            <StarRating
              rating={stars}
              onRatingEnd={onRatingEnd}
              onChange={setStars}
              starSize={55}
            />
          </Card.Content>
        </Card>
      </View>
  )
};

export default UserRatingCard