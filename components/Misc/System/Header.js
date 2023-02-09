// external imports
import { View, Text, StyleSheet } from 'react-native';

// internal imports
import { colors, font } from '../../../assets/style-guide';
import { BackButton } from '../Pressables';

const Header = ({ hr, title, modal, onPressBack, useCross, style }) => {
    return modal ?
        (
            <View style={[styles.modalContainer, style]}>
                {onPressBack ?
                    <BackButton useCross={useCross} onPress={onPressBack} style={styles.backButton} /> :
                    null
                }
                <Text style={styles.modalText}>{title}</Text>
            </View>
        ) :
        (
            <View style={[styles.container, hr && { borderBottomWidth: 0.5 }]}>
                <Text style={styles.text}>{title}</Text>
            </View>
        );
}

export default Header;

const styles = StyleSheet.create({
    container: {
        borderBottomColor: colors.black,
        marginTop: 10,
    },
    text: {
        fontWeight: '700',
        fontSize: font.xlarge,
        paddingBottom: 10,
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
        paddingVertical: 20,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    modalText: {
        fontSize: font.large,
        fontWeight: '700',
    },
});