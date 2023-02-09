// external imports
import {
    Image,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';
import { faker } from '@faker-js/faker';
import { useNavigation } from '@react-navigation/native';

// internal imports
import { colors, font } from '../../../assets/style-guide';

const InboxNotification = ({ chat, comment }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.pressableArea}
                onPress={() => navigation.navigate('User Chat')}
            >
                <Image source={{ uri: faker.image.avatar() }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.from}>{from}</Text>
                    <Text style={styles.content}>{content}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default InboxNotification;

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        width: '100%',
        borderBottomWidth: 0.5,
        borderBottomColor: colors.lightGray,
    },
    pressableArea: {
        flexDirection: 'row',
        paddingVertical: 18,
        width: '100%'
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginRight: 10
    },
    textContainer: {
        justifyContent: 'center',
    },
    from: {
        fontWeight: '600',
        fontSize: font.medium,
        marginBottom: 3,
    },
    content: {
        color: colors.gray,
        fontSize: font.small
    }
});
