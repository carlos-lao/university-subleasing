// external imports
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// internal imports
import { Button } from '../Pressables';
import { font } from '../../../assets/style-guide';

const LogInMessage = ({ title, children }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Log in to view your ${title}`}</Text>
      <Text style={styles.description}>{children}</Text>
      <Button title="Log In" style={styles.button} onPress={ () => navigation.navigate('Sign In Modal') }/>
    </View>
  );
}

export default LogInMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  title: {
    fontSize: font.large,
    fontWeight: '500',
  },
  description: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: font.medium,
    lineHeight: font.medium + 5,
    textAlign: 'center',
    fontWeight: '300',
  },
  button: {
    width: '50%',
  },
});
