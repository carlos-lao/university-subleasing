// external imports
import { useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Pressable,
  Text,
  TextInput as Input,
  View,
  StyleSheet
} from 'react-native';

// internal imports
import { colors, font, dimensions } from '../../../../assets/style-guide';

const TextInput = ({ label, labelStyle, style, toggleableSecurity, focusedStyle, ...props }) => {
  const inputRef = useRef();

  const [focused, setFocused] = useState(false);
  const [hideText, setHideText] = useState(toggleableSecurity);

  return (
    <Pressable
      style={[
        styles.container,
        style,
        focused && { ...focusedStyle, borderColor: colors.black }
      ]}
      onPress={() => inputRef.current.focus()}
    >
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={styles.inputContainer}>
        <Input
          placeholderTextColor={colors.lightGray}
          ref={inputRef}
          style={[styles.input, !props.multiline && { height: 20 }]}
          autoCapitalize='none'
          autoComplete='off'
          autoCorrect={false}
          secureTextEntry={hideText}
          onFocus={ () => setFocused(true) }
          onBlur={ () => setFocused(false) }
          { ...props }
        />
        { toggleableSecurity &&
          <Pressable
            onPress={ () => setHideText(!hideText) }
            style={styles.eyeIcon}
          >
            <Icon name={ hideText ? 'eye-off' : 'eye'} size={20} color={colors.gray}/>
          </Pressable>
        }
      </View>
    </Pressable>
  );
}

export default TextInput;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 0.5,
    borderColor: colors.gray,
    borderRadius: dimensions.borderRadius,
  },
  label: {
    marginBottom: 5,
    fontSize: font.xsmall,
    color: colors.gray
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    fontSize: font.medium,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 5,
    backgroundColor: 'transparent'
  }
});
