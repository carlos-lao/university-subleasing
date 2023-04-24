// external imports
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// internal imports
import { colors, font } from '../../../../assets/style-guide';

const SearchBar = ({ style, addButtonEnabled }) => {
  const navigation = useNavigation();
  const [pressed, setPressed] = useState(false);

  return (
    <View style={[styles.container, addButtonEnabled && { marginHorizontal: 20 }, style]} >
      <Pressable
        style={[styles.input, pressed && styles.shadow]}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
      >
        <Text style={styles.title}>Where's your campus?</Text>
        <Text style={styles.subtitle}>You're looking at: <Text style={styles.location}>USC</Text></Text>
        <Icon name='search' size={20} color='black' style={styles.icon}/>
        <TouchableOpacity style={styles.filter}>
          <Icon name='filter-alt' size={13} color='black'/>
        </TouchableOpacity>
      </Pressable>
      { addButtonEnabled &&
        <TouchableOpacity
          style={styles.addButton}
          onPress={ () => navigation.navigate('Create Listing') }
        >
          <Icon name='add' size={25} color='white'/>
        </TouchableOpacity>
      }
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 45,
    borderRadius: 23,
    paddingLeft: 45,
    paddingRight: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  shadow: {
    shadowOpacity: 0.3,
  },
  title: {
    fontWeight: 'bold',
    fontSize: font.small,
    marginBottom: 2,
    color: 'black',
  },
  subtitle: {
    fontSize: font.small,
    fontWeight: '200',
    color: colors.gray,
  },
  location: {
    fontWeight: '300',
  },
  icon: {
    position: 'absolute',
    top: 12,
    left: 15,
  },
  filter: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
    top: 8,
    right: 10,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
    backgroundColor: colors.primary,
    borderRadius: 17.5,
    marginLeft: 10,
  },
});
