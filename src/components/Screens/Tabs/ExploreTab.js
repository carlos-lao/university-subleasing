// external
import { View, StyleSheet, FlatList, Dimensions, RefreshControl, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

// internal
import { SearchBar } from '../../Misc/Inputs';
import { ListingSummary } from '../../Misc/Displays';
import { Container } from '../../Misc/Templates';
import { useEffect, useState } from 'react';
import { colors } from '../../../../assets/style-guide';
import { listing } from '../../../util';

const ExploreTab = ({ navigation }) => {
  const { top } = useSafeAreaInsets();
  const currentUser = useSelector(({ user }) => (user))

  const [listings, setListings] = useState([])
  const [refreshing, setRefreshing] = useState(false)


  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      listing.loadListings().then((listings) => {
        setListings(listings)
      })
    });
    return focusHandler;
  }, [navigation]);

  useEffect(() => {
    listing.loadListings().then((listings) => {
      setListings(listings)
    })
  }, [])

  const refreshContent = () => {
    setRefreshing(true)
    listing.loadListings().then((listings) => {
      setListings(listings)
      setTimeout(() => {
        setRefreshing(false)
      }, 2000)
    })
  }

  return (
    <Container style={[styles.container, { paddingTop: top + 70 }]}>
      <FlatList
        style={styles.listingsContainer}
        data={listings}
        renderItem={({ item }) => (
          <ListingSummary listingInfo={item} key={item.id} likeable={item.creator != currentUser?.id}/>
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshContent}
              title="Pull to refresh"
              tintColor={colors.lightGray}
              titleColor={colors.lightGray}
           />
        }
      />
      <View style={[styles.searchWrapper, { top: top + 10 } ]}>
        <SearchBar style={styles.searchBar} addButtonEnabled={currentUser != null}/>
      </View>
    </Container>
  );
}

export default ExploreTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchWrapper: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    paddingHorizontal: 20,
    height: 60,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
  },
  listingsContainer: {
    flex: 1,
  },
});
