import { View } from 'react-native';
import { Card, Button } from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';
import { useState } from 'react';
import { styles } from '../utils/styles'


const UserRatingCard = ({ rating }) => {
  const [stars, setRating] = useState(0);
  return (
    <View style={[styles.verticallySpaced, styles.mt20]}>
      <Card>
        <Card.Title
          title={rating.name}
        />
        <Card.Actions>
          <StarRating
            rating={stars}
            onChange={setRating}
          />
        </Card.Actions>
      </Card>
    </View>
  )
};

export default UserRatingCard