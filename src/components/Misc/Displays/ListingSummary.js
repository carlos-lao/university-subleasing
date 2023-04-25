// external imports
import { useState, useEffect } from 'react';
import {
  Alert,
  ActivityIndicator,
  View,
  Pressable,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

// internal imports
import { ROOM_TYPES } from '../../../util/constants';
import { colors, dimensions, font } from '../../../../assets/style-guide';
import { listing } from '../../../util';
import Swiper from './Swiper';
import { useSelector } from 'react-redux';

const ListingSummary = ({ listingInfo, likeable, onToggleLike }) => {
  const { roomType, title, rate, photos, startDate, endDate } = listingInfo;
  const navigation = useNavigation();
  const [currentUser, likes] = useSelector(({ user, likes }) => ([user, likes]))

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(likes.includes(listingInfo.id))
  }, [likes])

  return (
    <View style={styles.container}>
      {/* Swiper  */}
      {photos === null ?
        (
          <View style={[styles.swiper, styles.loadingView]}>
            <ActivityIndicator size="large" color={colors.white} />
          </View>
        ) :
        (
          <Swiper
            style={styles.swiper}
            photos={photos}
            useDots
          />
        )
      }
      {/* Like Button */}
      {
        likeable &&
        <TouchableOpacity
          onPress={() => {
            if (currentUser != null) {
              if (onToggleLike != null) {
                onToggleLike(!liked)
                setLiked(!liked)
              } else {
                listing.toggleLikeListing(listingInfo, currentUser).then((result) => { setLiked(result) })
              }
            } else {
              Alert.alert('Log In to Continue', 'Sorry, you must be logged in to us this feature.', [
                {
                  text: 'OK',
                  style: 'cancel'
                },
                {
                  text: 'Sign In',
                  style: 'default',
                  onPress: () => navigation.navigate('Sign In Modal')
                }
              ])
            }
          }}
          style={styles.heart}>
          <Icon name={liked ? 'heart' : 'heart-outline'} size={25} color={liked ? colors.lightRed : colors.white} />
        </TouchableOpacity>
      }

      {/* Text Details  */}
      <Pressable
        onPress={() => {
          navigation.navigate('View Listing', {
            postPreview: false,
            listingInfo
          })
        }}
      >
        <Text style={styles.title}>{ROOM_TYPES.find(r => r.value === roomType).label} •<Text style={styles.userTitle}> {title}</Text></Text>
        <Text style={styles.period}>{`${listing.formatDate(new Date(startDate))} — ${listing.formatDate(new Date(endDate))}`}</Text>
        <Text style={styles.price}>
          <Text style={{ fontWeight: 'bold', color: colors.black, fontSize: font.medium }}>${rate}</Text>
          <Text style={{ fontSize: font.medium }}>/</Text>month
        </Text>
      </Pressable>
    </View>
  );
};

export default ListingSummary;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 20,
  },
  loadingView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGray,
  },
  swiper: {
    alignSelf: 'center',
    width: '100%',
    height: 300,
    borderRadius: dimensions.borderRadius * 2,
    overflow: 'hidden',
  },
  title: {
    fontWeight: 'bold',
    fontSize: font.medium,
    marginTop: 10,
  },
  userTitle: {
    color: colors.gray
  },
  period: {
    fontSize: font.small,
    color: colors.gray,
    marginVertical: 5,
  },
  price: {
    position: 'absolute',
    fontSize: font.xsmall,
    color: colors.gray,
    bottom: 5,
    right: 0,
  },
  heart: {
    position: 'absolute',
    top: 10,
    right: 10,
  }
});
