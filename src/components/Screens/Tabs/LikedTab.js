// external imports
import { FlatList, StyleSheet } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { shallowEqual, useSelector } from 'react-redux';

// internal imports
import { LogInMessage, Header } from '../../Misc/System';
import { ListingSummary } from '../../Misc/Displays';
import { Container } from '../../Misc/Templates';
import { listing } from '../../../util';

const LikedTab = ({ navigation }) => {
  const { top } = useSafeAreaInsets();
  const [currentUser, likes] = useSelector(({ user, likes }) =>([user, likes]))

  const [ likedListings, setLikedListings ] = useState([])

  const tabIsFocused = useRef(true)

  // load liked listings on first render
  useEffect(() => {
    listing.loadListingsById(likes).then((data) => {
      setLikedListings(data)
    })
  }, [])


  useEffect(() => {
    if (!navigation.isFocused()) {
      listing.loadListingsById(likes).then((data) => {
        setLikedListings(data)
      })
    } else {
      const blurHandler = navigation.addListener('blur', () => {
        listing.loadListingsById(likes).then((data) => {
          setLikedListings(data)
        })
      });
  
      return blurHandler;
    }
  }, [likes])

  const renderContent = () => {
    if (currentUser) {
      return (
        <FlatList
          style={styles.listingsContainer}
          data={likedListings}
          renderItem={({ item }) => (
            <ListingSummary listingInfo={item} key={item.id} likeable/>
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      );
    }

    return (
      <LogInMessage title="liked listings">You can add to and edit your liked listings once you've logged in.</LogInMessage>
    );
  }

  return (
    <Container safe={!currentUser} style={currentUser && {paddingTop: top}}>
      <Header hr shadow title='Liked'/>
      {renderContent()}
    </Container>
  );
}

export default LikedTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
