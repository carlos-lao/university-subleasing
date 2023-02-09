// external imports
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

// internal imports
import { Link, Button } from '../../Misc/Pressables';
import { TextInput } from '../../Misc/Inputs';
import { Header } from '../../Misc/System';
import { Container, KeyboardDismisser } from '../../Misc/Templates';
import { colors, font, dimensions } from '../../../assets/style-guide';

// FIXME: alert on failed login
const SignIn = ({ navigation }) => {
  const [loginInfo, setLogInInfo] = useState({
    email: '',
    password: ''
  });

  const handleSignIn = () => {
    const { email, password } = loginInfo;

    navigation.goBack();
  }

  const renderDualTextInput = () => (
    <View style={styles.dualInput}>
      <TextInput
        style={[styles.inputs, styles.inputOne]}
        placeholder="Email"
        value={loginInfo.email}
        textContentType="emailAddress"
        onChangeText={(text) => setLogInInfo({ ...loginInfo, email: text })}
      />
      <TextInput
        style={[styles.inputs, styles.inputTwo]}
        placeholder="Password"
        secureTextEntry
        value={loginInfo.password}
        textContentType="password"
        onChangeText={(text) => setLogInInfo({...loginInfo, password: text })}
      />
    </View>
  )

  return (
    <KeyboardDismisser>
      <Header
        modal
        useCross
        onPressBack={navigation.goBack}
        title='Log in'
      />
      <Container style={styles.container}>
        {/* Main LogIn */}
        {renderDualTextInput()}
        <Button style={styles.loginButton} title="Log in" onPress={handleSignIn} />

        {/* LogIn Assistance */}
        <Text style={styles.signUp}>Don't have an account? <Link onPress={() => navigation.navigate('Sign Up')}>Sign up</Link></Text>
        <Link onPress={() => {}}>Forgot your password</Link>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Alt LogIn Buttons */}
        <Button
          style={styles.altLogInButton}
          containerStyle={styles.altLogInButtonContainer}
          textStyle={{ color: colors.black }}
          icon='google'
          title="Continue with Google"
          onClick={() => {}}
        />
        <Button
          style={styles.altLogInButton}
          containerStyle={styles.altLogInButtonContainer}
          textStyle={{ color: colors.black }}
          icon='facebook'
          title="Continue with Facebook"
          onClick={() => {}}
        />
      </Container>
    </KeyboardDismisser>
  );
}

export default SignIn;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  dualInput: {
    paddingTop: 30,
    width: '75%',
  },
  inputs : {
    borderRadius: 0,
    padding: 10
  },
  inputOne: {
    borderTopLeftRadius: dimensions.borderRadius,
    borderTopRightRadius: dimensions.borderRadius,
  },
  inputTwo: {
    borderTopWidth: 0,
    borderBottomLeftRadius: dimensions.borderRadius,
    borderBottomRightRadius: dimensions.borderRadius,
  },
  loginButton: {
    paddingTop: 15,
    paddingBottom: 20,
    width: '75%',
  },
  divider: {
    paddingVertical: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dividerLine: {
    borderBottomWidth: 1,
    width: '40%',
    color: 'gray',
  },
  dividerText: {
    fontSize: font.small,
    paddingHorizontal: 10,
    fontWeight: '900',
    color: colors.gray,
  },
  altLogInButton: {
    width: '75%',
    paddingBottom: 25,
  },
  altLogInButtonContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.black,
  },
  signUp: {
    marginBottom: 5,
  }
});
