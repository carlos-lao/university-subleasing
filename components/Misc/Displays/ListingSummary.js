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
import { MONTHS, ROOM_TYPES } from '../../../src/util/constants';
import { colors, dimensions, font } from '../../../assets/style-guide';
import { listing } from '../../../src/util';
import Swiper from './Swiper';

const ListingSummary = ({ listingInfo, user, likeable }) => {
  const navigation = useNavigation();
  const { roomType, title, images, rate, start, end } = listingInfo;
  const [ liked, setLiked ] = useState(false);
  const [ imageURIs, setImageURIs ] = useState(null);

//   useEffect(() => {
//     const loadImages = async () => {
//       try {
//         const imageFiles = await Storage.list(images);
//         const imagePromises = imageFiles.map((img) => Storage.get(img.key));
//         const imageResults = await Promise.all(imagePromises);
//         setImageURIs(imageResults);
//       } catch (e) {
//         console.log(e.message);
//       }
//     }
//     loadImages();
//   }, [listingInfo])

//   useEffect(() => {
//     if (user) {
//       return (async () => {
//         const unsubscribe = await likedByUser(user.email, listingInfo.id, (result) => setLiked(result))
//         return unsubscribe;
//       })();
//     }
//   }, [])
  
  useEffect(() => {
    if(!user) {
      setLiked(false);
    }
  });

  return (
    <View style={styles.container}>
      {/* Swiper  */}
      { imageURIs === null ?
        (
          <View style={[styles.swiper, styles.loadingView]}>
            <ActivityIndicator size="large" color={colors.secondary}/>
          </View>
        ) :
        (
          <CustomSwiper
            style={styles.swiper}
            images={imageURIs}
            useDots
          />
        )
      }
      {/* Like Button */}
      { 
        likeable &&
        <TouchableOpacity 
          onPress={() => {
            if (user !== null) {
              toggleListingLike(user.email, listingInfo)
                .then( (result) => { setLiked(result) } )
            } else {
              Alert.alert('Log In to Continue', 'Sorry, but you must have an account to unlock this feature.')
            }
          } } 
        style={styles.heart}>
          <Icon name={liked ? 'heart' : 'heart-outline'} size={20} color={liked ? colors.lightRed : colors.white } />
        </TouchableOpacity>
      }
      
      {/* Text Details  */}
      <Pressable
        onPress={() => {
          navigation.navigate('View Listing', {
            postPreview: false,
            listingInfo: {
              ...listingInfo,
              images: imageURIs
            }
          })
        }}
      >
        <Text style={styles.title}>{roomTypes.find( r => r.value === roomType ).label} •<Text style={styles.userTitle}> {title}</Text></Text>
        <Text style={styles.period}>{`${formatDate(start)} — ${formatDate(end)}`}</Text>
        <Text style={styles.price}>
          <Text style={{
            fontWeight: 'bold',
            color: colors.black,
          }}>
            ${rate}
          </Text> /month
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
    fontSize: font.small,
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
    fontSize: font.small,
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
