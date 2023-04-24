// external
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { default as AltIcon } from 'react-native-vector-icons/AntDesign';
import {
    Animated,
    Alert,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Text,
} from 'react-native';
import { Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// internal
import { colors, font } from '../../../../../assets/style-guide';
import { Button } from '../../../Misc/Pressables';

const { width } = Dimensions.get('window')

const PhotoEntry = ({ opacity, value, onSubmit, propagateChanges, maxPhotos }) => {
    const { bottom } = useSafeAreaInsets;

    const [photos, setPhotos] = useState(value);

    useEffect(() => {
        propagateChanges({ photos: photos })
    }, [photos]);

    const checkForCameraRollPermission = async () => {
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                "Camera Permissions",
                "Please you have granted camera roll permissions inside your system's settings"
            );
        } else {
            console.log('Media Permissions are granted')
        }
    }

    const addImage = async () => {
        try {
            let _image = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true,
                aspect: [4, 3],
                quality: 1,
                selectionLimit: maxPhotos-photos.length,
            });
            if (!_image.canceled) {
                setPhotos([...photos, ..._image.assets.map((asset) => asset.uri)])
            }
        } catch (e) {
            Alert.alert("Error", "One or more of the images you selected seem to be corrupted. Please try again.");
        }
    }

    const deleteImage = (uri) => {
        setPhotos(photos.filter(elem => (elem != uri)))
    }

    return (
        <Animated.View
            style={{ opacity: opacity }}
            onStartShouldSetResponder={() => true}
        >
            <Text style={styles.caption}>Photos help your listing stand out. Add some now!</Text>
            <View style={styles.container}>
                {photos.map((src, idx) => (
                    <View style={styles.cell} key={idx}>
                        <Image
                            style={styles.image}
                            source={{ uri: src }}
                        />
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => { deleteImage(src) }}
                        >
                            <AltIcon name="close" size={15} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                ))}
                {photos.length < maxPhotos &&
                    <TouchableOpacity style={[styles.cell, styles.addButton]} onPress={addImage}>
                        <Icon name="plus" size={40} color={colors.white} />
                    </TouchableOpacity>
                }
                {photos.length < maxPhotos && Array.apply(null, Array(maxPhotos - (photos.length + 1))).map((val, idx) => (
                    <View style={[styles.cell, styles.emptyCell]} key={idx}>
                    </View>
                ))}
            </View>
            <Button
                style={{ marginBottom: bottom, marginTop: 20 }}
                title="Next"
                onPress={onSubmit}
            />
        </Animated.View>
    )
}

export default PhotoEntry

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    caption: {
        textAlign: 'center',
        lineHeight: 100,
        marginTop: 20,
        fontSize: font.medium,
        fontWeight: '300',
        lineHeight: 20,
    },
    cell: {
        width: (width - 50) / 2,
        height: ((width - 50) / 2) * .75,
        borderRadius: 10,
        marginBottom: 10,
    },
    emptyCell: {
        backgroundColor: colors.lightGray
    },
    addButton: {
        backgroundColor: colors.primary+ '80',
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        height: 20,
        width: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gray + '80'
    },
    image: {
        flex: 1,
        borderRadius: 10
    }
})