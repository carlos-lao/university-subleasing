import { useRef } from 'react';
import {
  TextInput,
  View,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';

const CODE_LENGTH = 6

const CodeInput = ({ value, onChange }) => {
  const inputRef = useRef()

  const codeDigitsArray = new Array(CODE_LENGTH).fill(0);

  return (
    <View style={styles.container}>
      <Pressable style={styles.inputsContainer} onPress={() => {inputRef.current.focus()}}>
        {codeDigitsArray.map((val, idx) => (
          <View key={idx} style={styles.inputContainer}>
            <Text style={styles.inputText}>{value[idx] || ' '}</Text>
          </View>
        ))}
      </Pressable>
      <TextInput
        ref={inputRef}
        autoFocus={true}
        value={value}
        onChangeText={onChange}
        keyboardType="number-pad"
        returnKeyType="done"
        maxLength={CODE_LENGTH}
        style={styles.hiddenCodeInput}
      />
    </View>
  );
}

export default CodeInput;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiddenCodeInput: {
    position: 'absolute',
    height: 0,
    width: 0,
  },
  inputsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  inputText: {
    fontSize: 24,
    
  },
});
