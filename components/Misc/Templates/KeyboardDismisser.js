// external imports
import {
    View,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// internal imports
import { colors } from '../../../assets/style-guide';

const KeyboardDismisser = ({ children, safe }) => {
    const { top } = useSafeAreaInsets();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[styles.container, safe && { paddingTop: top }]}>
                {children}
            </View>
        </TouchableWithoutFeedback>
    );
}

export default KeyboardDismisser;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
})
