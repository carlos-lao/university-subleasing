// external imports
import Icon from 'react-native-vector-icons/AntDesign';
import { default as MaterialIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';

// internal imports
import { colors, font } from '../../../assets/style-guide';

const Redirect = ({ onPress, icon, title }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress} style={styles.pressable}>
      <View style={styles.label}>
        {icon ? <MaterialIcon name={icon.name} size={20} color={icon.color} /> : null}
        <Text style={[styles.text, icon && { marginLeft: 8 }]}>{title}</Text>
      </View>
      <Icon name='right' size={20} style={styles.icon} />
    </TouchableOpacity>
  </View>
);

export default Redirect;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray,
  },
  pressable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: font.medium,
  },
});
