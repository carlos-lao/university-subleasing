// external
import { StyleSheet, Modal, Text, View, TouchableOpacity } from 'react-native'
import { useState } from 'react';

// internal
import { TextInput } from '../../../Misc/Inputs';
import { colors, font } from '../../../../../assets/style-guide';

const AddPerkModal = ({ category, visible, onClose, onSubmit }) => {
    const [text, setText] = useState('')

    const exitAndReset = () => {
        setText('');
        onClose();
    }

    return (
        <Modal
            animationType="fade"
            transparent
            visible={visible}
        >
            <View style={styles.container}>
                <View style={styles.view}>
                    <Text style={styles.title}>Add Perk: {category}</Text>
                    <Text style={styles.text}>What would you like to name this new perk?</Text>
                    <TextInput
                        placeholder="Perk Title"
                        value={text}
                        onChangeText={(val) => {
                            if (val.length <= 20)
                                val = val.replace('_', '');
                            setText(val);
                        }}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonWrapper}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={exitAndReset}
                            >
                                <Text style={[styles.buttonText, { color: colors.danger }]}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.buttonWrapper, { borderLeftWidth: 0.5 }]}>
                            <TouchableOpacity
                                disabled={text.length <= 0}
                                style={styles.button}
                                onPress={() => {
                                    onSubmit(text)
                                    exitAndReset()
                                }}
                            >
                                <Text style={[styles.buttonText, !text && styles.disabledButtonText]}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default AddPerkModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50
    },
    view: {
        margin: 20,
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingHorizontal: 35,
        paddingTop: 30,
        paddingBottom: 65,
        alignItems: "stretch",
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: font.medium
    },
    text: {
        fontWeight: '300',
        marginTop: 10,
        marginBottom: 20
    },
    buttonContainer: {
        position: 'absolute',
        flexDirection: 'row',
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    buttonWrapper: {
        flex: 1,
        borderColor: colors.gray,
        height: 45,
        borderTopWidth: 0.5,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: font.medium,
        fontWeight: '600'
    },
    disabledButtonText: {
        color: colors.lightGray,
    }
})