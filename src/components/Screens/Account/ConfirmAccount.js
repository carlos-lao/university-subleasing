import { useState } from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';

import { CodeInput } from '../../Misc/Inputs';
import { Button } from '../../Misc/Pressables';
import { Header } from '../../Misc/System';
import { Container, KeyboardDismisser } from '../../Misc/Templates';

const ConfirmAccount = () => {
  const { email } = "dog";

  const [code, setCode] = useState('');

  return (
    <KeyboardDismisser>
      <Header modal title='Confirm account'/>
      <Container style={styles.container}>
        <Text style={styles.message}>Please enter the confirmation code sent to your email {email}</Text>
        <CodeInput value={code} onChange={setCode} />
        <Button style={styles.button} title='Confirm' onPress={() => {}}/>
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
