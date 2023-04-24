// external
import { Text, StyleSheet } from 'react-native';

// internal
import { Button, Link, Redirect } from '../../Misc/Pressables'
import { Header } from '../../Misc/System';
import { Container } from '../../Misc/Templates';
import { colors, font } from '../../../../assets/style-guide';

const SignInTab = ({ navigation }) => {
  return (
    <Container style={styles.container} safe>
        <Header title='Sign in' />
        <Text style={styles.description}>Sign in to begin your sublease process.</Text>
        <Button 
            title="Sign In" 
            containerStyle={styles.button} 
            onPress={() => navigation.navigate('Sign In Modal')}
        />
        <Text style={styles.signup}>Don't have an account? <Link onPress={() => navigation.navigate('Sign Up')}>Sign up</Link></Text>
        <Text style={styles.subheader}>See More</Text>
        <Redirect
            title="Settings"
            icon={{ name: 'cog-outline', color: 'black' }}
        />
        <Redirect
            title="Help"
            icon={{ name: 'help-circle-outline', color: 'black' }}
        />
    </Container>
  );
}

export default SignInTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  description: {
    fontWeight: '400',
    fontSize: font.medium,
    color: colors.gray,
  },
  subheader: {
    fontWeight: '500',
    fontSize: font.large,
    marginTop: 30,
    marginBottom: 10,
  },
  button: {
    marginVertical: 20,
  },
  signup: {
    marginBottom: 10,
  },
});
