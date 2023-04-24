// external
import { Animated, StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// internal
import { font } from '../../../../../assets/style-guide';
import { TextInput } from '../../../Misc/Inputs';
import { Button } from '../../../Misc/Pressables';

const DescriptionEntry = ({ opacity, value, propagateChanges, onSubmit }) => {
    const { bottom } = useSafeAreaInsets()

    const [text, setText] = useState(value)

    useEffect(() => {
        propagateChanges({ description: text })
    }, [text])

    return (
        <Animated.View
            style={{ opacity: opacity }}
            onStartShouldSetResponder={() => true}
        >
            <Text style={styles.caption}>Think you missed something? Add any additional listing details in the description box below.</Text>
            <View>
                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    value={text}
                    onChangeText={(value) => {
                        if (value.length <= 1000)
                            setText(value);
                    }}
                    multiline
                />
                <Text style={styles.charCount}>{text.length}/1000</Text>
            </View>
            <Button
                style={{ marginBottom: bottom, marginTop: 20 }}
                title="Preview Listing"
                onPress={onSubmit}
            />
        </Animated.View>
    )
}

export default DescriptionEntry

const styles = StyleSheet.create({
    input: {
        marginTop: 15,
    },
    caption: {
        marginTop: 10,
        fontSize: font.medium,
        fontWeight: '300',
        lineHeight: 20,
    },
    descriptionInput: {
        width: '100%',
        height: 300,
        marginVertical: 20
    },
    charCount: {
        position: 'absolute',
        opacity: 0.5,
        bottom: 25,
        right: 8,
    },
})