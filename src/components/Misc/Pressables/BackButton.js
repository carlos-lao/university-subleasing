// external imports
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native';

// internal imports
import { colors } from '../../../../assets/style-guide';

const BackButton = ({ style, onPress, useCross, size }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Icon name={useCross ? 'close' : 'left'} size={size || 25} color={colors.black}/>
  </TouchableOpacity>
);

export default BackButton;
