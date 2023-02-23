// external imports
import { FlatList, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// internal imports
import { LogInMessage, Header } from '../../Misc/System';
import { ListingSummary } from '../../Misc/Displays';
import { Container } from '../../Misc/Templates';

const LikedTab = ({ user, navigation }) => {
  const { top } = useSafeAreaInsets();

  const [ likedPosts, setLikedPosts ] = useState([]);

  useEffect(() => {
    if (user) {
      const subscription = getLikedPosts(user.email, (posts) => { setLikedPosts(posts) });

      return () => { subscription?.unsubscribe?.() };
    }
  }, [])

  const renderContent = () => {
    if (user) {
      return (
        <FlatList
          style={styles.listingsContainer}
          data={likedPosts}
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
    <Container safe={!user} style={user && {paddingTop: top}}>
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