// external imports
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, Text, StyleSheet } from 'react-native';

// internal imports
import { colors, font, dimensions } from '../../../../assets/style-guide';

DropDownPicker.setListMode("SCROLLVIEW");

const Dropdown = ( { style, label, labelStyle, ...props} ) => {
  const [opened, setOpened] = useState(false);

  return (
    <View style={[
        styles.container,
        opened && {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderColor: colors.black
        },
        style
      ]}>
      <DropDownPicker
        style={styles.input}
        containerStyle={{ width: '100%', height: 51 }}
        dropDownContainerStyle={styles.dropdown}
        labelStyle={[label && styles.shiftDown, label && styles.shiftLeft]}
        placeholderStyle={[styles.placeholder, label && styles.shiftDown, label && styles.shiftLeft]}
        textStyle={styles.text}
        onOpen={() => setOpened(true)}
        onClose={() => setOpened(false)}
        {...props}
      />
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
    </View>
  );
}

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: colors.gray,
    borderRadius: dimensions.borderRadius,
  },
  label: {
    position: 'absolute',
    top: 8,
    left: 8,
    fontSize: font.xsmall,
    color: colors.gray
  },
  input: {
    height: '100%',
    borderRadius: dimensions.borderRadius,
    borderWidth: 0.5,
    borderColor: 'transparent',
    backgroundColor: 'transparent'
  },
  dropdown: {
    borderColor: colors.black,
    borderWidth: 0.5,
  },
  text: {
    fontSize: font.medium,
  },
  placeholder: {
    color: colors.lightGray,
  },
  shiftDown: {
    marginTop: 12.5
  },
  shiftLeft: {
    marginLeft: -2.8
  }
});
