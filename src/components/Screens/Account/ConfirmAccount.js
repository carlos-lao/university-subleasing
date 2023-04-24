import { useState } from 'react';
import {
  Text,
  StyleSheet,
  Alert
} from 'react-native';

import { CodeInput } from '../../Misc/Inputs';
import { Button } from '../../Misc/Pressables';
import { Header } from '../../Misc/System';
import { Container, KeyboardDismisser } from '../../Misc/Templates';
import { account } from '../../../util';

const ConfirmAccount = ({ navigation, route }) => {
  const { email, password } = route.params;

  const [code, setCode] = useState('');

  const handleSubmit = () => {
    if(code.length === 0) {
      Alert.alert("Missing Field", "Please enter the confirmation code sent to " + email)
      return
    }

    account.confirmSignUp(email, code).then((err) => {
      if (err == null) {
        Alert.alert("Success", "Confirmation successful! Now signing you in...")
        auth.signIn(email, password).then((signInErr) => {
          if (signInErr == null) {
            navigation.navigate("Profile")
          } else {
            Alert.alert("Error", signInErr)
          }
        })
      } else {
        Alert.alert("Error", err)
      }
    })
  }

  return (
    <KeyboardDismisser>
      <Header modal title='Confirm account'/>
      <Container style={styles.container}>
        <Text style={styles.message}>Please enter the confirmation code sent to your email {email}</Text>
        <CodeInput value={code} onChange={setCode} />
        <Button style={styles.button} title='Confirm' onPress={handleSubmit}/>
      </Container>
    </KeyboardDismisser>
  );
};

export default ConfirmAccount;

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  message: {
    paddingHorizontal: 5,
    fontSize: 18,
    fontWeight: '300',
    lineHeight: 30,
    marginBottom: 25,
  },
  button: {
    marginTop: 35,
  },
});
