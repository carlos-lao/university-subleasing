// external imports
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// internal imports
import { SearchBar } from '../../Misc/Inputs';
import { ListingSummary } from '../../Misc/Displays';
import { Container } from '../../Misc/Templates';

const ExploreTab = ({ user }) => {
  const { top } = useSafeAreaInsets();

  return (
    <Container style={[styles.container, { paddingTop: top + 70 }]}>
      {/* <FlatList
        style={styles.listingsContainer}
        data={posts}
        renderItem={({ item }) => (
          <ListingSummary listingInfo={item} key={item.id} likeable/>
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      /> */}
      <View style={[styles.searchWrapper, { top: top + 10 } ]}>
        <SearchBar style={styles.searchBar} addButtonEnabled={user !== null}/>
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
