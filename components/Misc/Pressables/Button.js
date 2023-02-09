// external imports
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// internal imports
import { colors, dimensions, font } from '../../../assets/style-guide';

const Button = ({ style, onPress, containerStyle, title, textStyle, icon }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <View style={[styles.container, containerStyle]}>
      {icon && <Icon name={icon} size={20} style={styles.icon} />}
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </View>
  </TouchableOpacity>
);

export default Button;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: dimensions.borderRadius,
    backgroundColor: colors.primary,
  },
  text: {
    fontWeight: '600',
    fontSize: font.medium + 3,
    color: 'white'
  },
  icon: {
    position: 'absolute',
    left: 10,
  },
});
